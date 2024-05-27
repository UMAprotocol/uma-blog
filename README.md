## Resources

- [🤖 Nextjs](https://nextjs.org/docs)
- [🎨 TailwindCSS](https://tailwindcss.com/docs/installation)
- [✏️ Contentful API docs](https://www.contentful.com/developers/docs/references/content-delivery-api/)

## Local development

Fetch environment variables from Vercel (first link to project)

```bash
vercel env pull
```

Install packages

```bash
pnpm install
```

Inspect CMS content model and generate types, saved to `/types/contentful`

```bash
pnpm run setup
```

Run dev server

```bash
pnpm run dev
```

## Pages/routes

The blog uses Contentful as a CMS. All media and blog content is stored and delivered from the Contentful API.

`/articles/[slug]`

Each article page is **prerendered as static HTML (SSG)**

`/`

The home page is **server rendered on demand (SSR),** since we have client side filtering logic.

## Env vars

```
ACCESS_TOKEN
CMA_TOKEN
SPACE_ID
GOOGLE_ANALYTICS_TAG
PREVIEW_ACCESS_TOKEN
PREVIEW_SECRET
REVALIDATE_SECRET
MAILCHIMP_API_KEY
MAILCHIMP_SERVER_PREFIX
MAILCHIMP_LIST_ID
```

Env variables are validated at build time and also before starting the dev server. To use env vars throughout the app just import the `env` object exported from `/app/env.ts`

Now importing `SPACE_ID` is of type `string`, not `string | undefined`

```tsx
import { env } from "@/app/env";

const foo = env.SPACE_ID; // type 'string'
const bar = process.env.SPACE_ID; // type 'string | undefined'
```

## Generating types

We want type safety when it comes to querying our blog data, but we do not want to manually write interfaces for our blog entries. Instead there is a simple script at `/lib/setup.ts` to generate types and save them to `/types/contentful` .

```bash
pnpm run setup
```

This script uses [cf-content-types-generator](https://github.com/contentful-userland/cf-content-types-generator) to generate the types we need. To access our Contentful space you must have to following ENV vars:

- `SPACE_ID`
- `CMA_TOKEN`

## Fetching Blog data

To fetch blog data from our space you need the following env vars:

- `ACCESS_TOKEN`
- `PREVIEW_ACCESS_TOKEN`
- `SPACE_ID`

```tsx
const contentType = "blogPost";

export const productionClient = createClient({
  space: env.SPACE_ID,
  accessToken: env.ACCESS_TOKEN,
});

export const previewClient = createClient({
  space: env.SPACE_ID,
  accessToken: env.PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

// to fetch a single post by slug
export async function getBlogPostBySlug(
  slug: UmaBlogEntry["fields"]["slug"],
  isDraft: boolean,
) {
  const client = isDraft ? previewClient : productionClient;
  const options = {
    content_type: contentType,
    limit: 1,
    "fields.slug[match]": slug,
  } as const;
  const entries =
    await client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
      options,
    );
  return entries.total ? entries.items[0] : undefined;
}
```

- `previewClient` - Draft & Published posts
- `productionClient` - Published posts only

## Content Preview

Nextjs has a feature called [Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode) that we use to allow content writers to view unpublished content on the production site. The env var `PREVIEW_SECRET` is stored in contentful to allow this to happen. To view draft content you can visit `/api/draft/[slug-of-unpublished-article]` . This “Live Preview” is done through the Contentful UI.

To disable draft mode, you need to call /api/disable-draft . This removes the draft mode cookie from your browser so you only see published content. 👍

## Publishing

Publishing is also done through the Contentful UI. When a content writer is happy with the live preview of the blog post, they can publish. When the writer clicks the publish button, a webhook is called.

This webhook uses the env var `REVALIDATE_SECRET` to call the api route at `/api/revalidate`. This invalidates all paths in our app so that the next request tot he server refetches blog data from contentful.

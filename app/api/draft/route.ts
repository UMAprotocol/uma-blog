import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/contentful";
import { env } from "@/app/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug in request", { status: 400 });
  }

  if (secret !== env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getBlogPostBySlug(slug, true);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!post) {
    redirect("/404");
  }

  // this sets a cookie on the client,
  // telling Next to switch to server side rendering.
  draftMode().enable();
  // once cookie is set and we are able to fetch new blog data on-demand,
  // we redirect to the post page
  redirect(`/articles/${post.fields.slug}`);
}

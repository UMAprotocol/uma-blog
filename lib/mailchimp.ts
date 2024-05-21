"use server";

import { z } from "zod";
import { env } from "@/app/env";

const userSchema = z.object({
  email: z.string().email(),
});

export async function addSubscriber(data: FormData) {
  const parsed = userSchema.safeParse({
    email: data.get("subscriberEmail"),
  });

  if (!parsed.success) {
    throw new Error("Invalid email");
  }

  const { email } = parsed.data;

  const url = `https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_LIST_ID}/members?skip_merge_validation=true`;
  const encodedApiKey = Buffer.from(`key:${env.MAILCHIMP_API_KEY}`).toString(
    "base64",
  );

  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedApiKey}`,
    }),
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });

  const responseData = (await res.json()) as Record<"id", string>;

  console.log(responseData);

  if (!responseData.id) {
    throw new Error("Failed to add to list");
  }

  return true;
}

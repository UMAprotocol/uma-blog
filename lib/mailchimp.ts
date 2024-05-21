"use server";

import { z } from "zod";
import { env } from "@/app/env";

const userSchema = z.object({
  email: z.string().email(),
});

type MailchimpResponse = {
  id: string; // hash of user email
  title: string; // "Member Exists" if already subscribed
  status: number; // http code
  detail: string; // description
};

export async function addSubscriber(data: FormData) {
  const parsed = userSchema.safeParse({
    email: data.get("subscriberEmail"),
  });

  if (!parsed.success) {
    throw new Error("Invalid email");
  }

  const { email } = parsed.data;

  // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

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

  const responseData = (await res.json()) as MailchimpResponse;

  // instead of attempting to create a record where one could already exists, we could check if the record exists first.
  // https://mailchimp.com/developer/marketing/api/list-members/get-member-info/
  // you would need to hash (MD5) the email

  // handle existing record
  if (responseData.title.toLowerCase().includes("member exists")) {
    return true;
  }

  if (!responseData.id) {
    throw new Error("Failed to add to list");
  }
  // handle new record
  return true;
}

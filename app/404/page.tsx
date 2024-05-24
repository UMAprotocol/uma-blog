import { notFound } from "next/navigation";

// instead of calling notFound(), call redirect("/404") to avoid duplicating our 404 page in all route segments
export default function CustomNotFound() {
  notFound();
}

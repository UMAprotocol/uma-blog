import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen grid place-items-center gap-4">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-8xl">Not Found</h2>
        <p>This went wrong somehow</p>
        <Link href="/">Back to Blog</Link>
      </div>
    </div>
  );
}

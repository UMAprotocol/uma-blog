import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="w-full page gap-4">
      <div className="flex-1 flex w-full justify-center flex-col gap-4 items-center">
        <h2 className="text-[120px] leading-[1em] xl:text-[200px] font-light">
          404
        </h2>
        <p className="text-xl">This went wrong somehow</p>
        <Link
          type="internal"
          className="bg-text rounded-md text-background py-2 px-4"
          href="/"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

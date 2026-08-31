import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="display text-4xl">No such page</h1>
      <p className="mt-3 text-muted">
        That drone or comparison is not in the catalog.
      </p>
      <p className="mt-6">
        <Link href="/" className="underline">
          Back to the bench
        </Link>
      </p>
    </div>
  );
}

"use client";

export function CopyVerdict({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="border border-ink bg-ink px-3 py-1.5 text-xs uppercase tracking-wider text-paper hover:bg-transparent hover:text-ink"
      onClick={async () => {
        const payload = `${text}\n\n${window.location.href}`;
        try {
          if (navigator.share) {
            await navigator.share({ text: payload });
            return;
          }
        } catch {
          /* fall through to clipboard */
        }
        await navigator.clipboard.writeText(payload);
      }}
    >
      Copy verdict
    </button>
  );
}

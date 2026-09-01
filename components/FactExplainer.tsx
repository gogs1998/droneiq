"use client";

import type { GlossaryEntry } from "@/data/glossary";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const TIP_W = 288;

export function FactLabel({
  label,
  entry,
}: {
  label: string;
  entry?: GlossaryEntry;
}) {
  if (!entry) return <>{label}</>;
  return <FactExplainer label={label} entry={entry} />;
}

export function FactExplainer({
  label,
  entry,
}: {
  label?: string;
  entry: GlossaryEntry;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);
  const tipId = useId();

  const clearHide = () => {
    if (hideTimer.current != null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const place = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    let left = r.left;
    if (left + TIP_W > window.innerWidth - 8) left = window.innerWidth - TIP_W - 8;
    if (left < 8) left = 8;
    let top = r.bottom + 8;
    const tipH = tipRef.current?.offsetHeight ?? 220;
    if (top + tipH > window.innerHeight - 8 && r.top - tipH - 8 > 8) {
      top = r.top - tipH - 8;
    }
    setPos({ top, left });
  }, []);

  const show = useCallback(() => {
    clearHide();
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    clearHide();
    setOpen(false);
  }, []);

  const hideSoon = useCallback(() => {
    clearHide();
    hideTimer.current = window.setTimeout(() => setOpen(false), 160);
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => hide();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || tipRef.current?.contains(t)) return;
      hide();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, hide]);

  useEffect(() => () => clearHide(), []);

  return (
    <span
      ref={wrapRef}
      className="inline-flex max-w-full items-baseline gap-1"
      onMouseEnter={() => {
        show();
      }}
      onMouseLeave={() => {
        hideSoon();
      }}
    >
      {label ? (
        <span className="border-b border-dotted border-quiet">{label}</span>
      ) : null}
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={tipId}
        aria-label={`What ${label ?? entry.label} means`}
        className="relative top-px inline-flex h-[1.05rem] w-[1.05rem] shrink-0 items-center justify-center rounded-full border border-quiet text-[10px] font-medium italic leading-none text-quiet hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink focus-visible:outline-none"
        onFocus={show}
        onClick={(e) => {
          e.preventDefault();
          show();
        }}
      >
        i
      </button>
      {mounted && open
        ? createPortal(
            <div
              ref={tipRef}
              id={tipId}
              role="tooltip"
              style={{ top: pos.top, left: pos.left, width: TIP_W }}
              className="fixed z-[80] border border-rule bg-paper p-3 text-left shadow-[0_10px_28px_rgba(20,19,17,0.14)]"
              onMouseEnter={() => {
                show();
              }}
              onMouseLeave={() => {
                hideSoon();
              }}
            >
              <p className="text-xs font-medium leading-snug text-ink">{entry.oneLiner}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{entry.body}</p>
              <a
                href={entry.sourceUrl}
                className="mt-2 inline-block text-xs text-yellow-ink underline"
              >
                {entry.sourceLabel}
              </a>
            </div>,
            document.body,
          )
        : null}
    </span>
  );
}

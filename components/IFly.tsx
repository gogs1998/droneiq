"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import type { Drone, Series } from "@/data/types";
import { IFLY_KEY } from "@/lib/storage";

function subscribe(cb: () => void) {
  window.addEventListener("droneiq-ifly", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("droneiq-ifly", cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot() {
  return localStorage.getItem(IFLY_KEY);
}

function getServerSnapshot() {
  return null;
}

export function useIFly(): [string | null, (slug: string | null) => void] {
  const slug = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const set = useCallback((next: string | null) => {
    if (next) localStorage.setItem(IFLY_KEY, next);
    else localStorage.removeItem(IFLY_KEY);
    window.dispatchEvent(new Event("droneiq-ifly"));
  }, []);
  return [slug, set];
}

const SERIES_ORDER: Series[] = ["mini", "air", "mavic", "avata", "neo", "flip"];

const SERIES_LABEL: Record<Series, string> = {
  neo: "Neo",
  flip: "Flip",
  mini: "Mini",
  air: "Air",
  mavic: "Mavic",
  avata: "FPV",
};

export function dronesBySeries(list: Drone[]): { series: Series; label: string; drones: Drone[] }[] {
  return SERIES_ORDER.map((series) => ({
    series,
    label: SERIES_LABEL[series],
    drones: list.filter((d) => d.series === series),
  })).filter((g) => g.drones.length);
}

export function SpecChip({
  on,
  disabled,
  onClick,
  children,
}: {
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`min-h-10 border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
        on ? "border-ink bg-ink text-paper" : "border-rule text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function SeriesChipRows({
  drones,
  selected,
  onToggle,
  maxSelected,
}: {
  drones: Drone[];
  selected: string[];
  onToggle: (slug: string) => void;
  maxSelected?: number;
}) {
  const groups = dronesBySeries(drones);
  return (
    <div className="space-y-3">
      {groups.map((g) => (
        <div
          key={g.series}
          className="sm:grid sm:grid-cols-[3.25rem_1fr] sm:items-start sm:gap-x-3"
        >
          <p className="pt-2 text-xs uppercase tracking-wider text-quiet">{g.label}</p>
          <div className="mt-1 flex flex-wrap gap-2 sm:mt-0">
            {g.drones.map((d) => {
              const on = selected.includes(d.slug);
              const blocked = !on && maxSelected != null && selected.length >= maxSelected;
              return (
                <SpecChip
                  key={d.slug}
                  on={on}
                  disabled={blocked}
                  onClick={() => onToggle(d.slug)}
                >
                  {d.shortName}
                </SpecChip>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

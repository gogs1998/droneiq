"use client";

import { useCallback, useSyncExternalStore } from "react";
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

export function IFlySelect({ drones }: { drones: { slug: string; name: string }[] }) {
  const [slug, set] = useIFly();
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-quiet">I fly</span>
      <select
        className="mt-1 block w-full max-w-md border border-rule bg-paper px-3 py-2 text-ink"
        value={slug ?? ""}
        onChange={(e) => set(e.target.value || null)}
      >
        <option value="">Not set — kept in this browser</option>
        {drones.map((d) => (
          <option key={d.slug} value={d.slug}>
            {d.name}
          </option>
        ))}
      </select>
    </label>
  );
}

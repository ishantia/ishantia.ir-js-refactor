import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "hero");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportOffset = window.innerHeight * 0.32;

      if (scrollY < 100) {
        setActiveId(sectionIds[0]);
        return;
      }

      const nearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      let current = sectionIds[0];
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top <= viewportOffset) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeId;
}

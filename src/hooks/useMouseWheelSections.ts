import { useEffect } from 'react';

/**
 * Section-wise smooth scroll snap hook for desktop landing page.
 * When enabled (Home landing page), mouse wheel and arrow keys glide
 * smoothly between major cinematic sections without skipping or locking.
 */
export function useMouseWheelSections(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    let isScrolling = false;
    let scrollTimeout: number | undefined;

    const getSections = (): HTMLElement[] => {
      const ids = ['hero-section', 'packages', 'gaming', 'about', 'testimonials', 'contact'];
      const elements: HTMLElement[] = [];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getClientRects().length > 0) {
          elements.push(el);
        }
      }

      const footer = document.querySelector<HTMLElement>('footer');
      if (footer && footer.getClientRects().length > 0) {
        elements.push(footer);
      }

      return elements;
    };

    const getCurrentIndex = (sections: HTMLElement[]): number => {
      const scrollY = window.scrollY;
      const scrollBottom = scrollY + window.innerHeight;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      // Bottom-most boundary: active is footer
      if (scrollBottom >= docHeight - 40) {
        return sections.length - 1;
      }

      const probe = scrollY + window.innerHeight * 0.35;
      let bestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const dist = Math.abs(top - probe);
        if (top <= probe + 120 && dist < minDistance) {
          minDistance = dist;
          bestIndex = i;
        }
      }

      return bestIndex;
    };

    const scrollToSectionIndex = (index: number, sections: HTMLElement[]) => {
      if (index < 0 || index >= sections.length) return;
      const target = sections[index];
      const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY);

      isScrolling = true;
      window.scrollTo({
        top: Math.round(targetTop),
        behavior: 'smooth',
      });

      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 600);
    };

    const onWheel = (e: WheelEvent) => {
      // Only apply full-section snap on desktop viewports (1024px+)
      if (window.innerWidth < 1024) return;

      // Allow nested interactive scroll areas if any
      const target = e.target as HTMLElement | null;
      if (target?.closest('.modal, [data-native-wheel], input, textarea, select, .game-rail')) {
        return;
      }

      // Ignore minor jitter or tiny trackpad vibrations
      if (Math.abs(e.deltaY) < 18) return;

      const sections = getSections();
      if (sections.length === 0) return;

      e.preventDefault();

      if (isScrolling) return;

      const currentIndex = getCurrentIndex(sections);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        scrollToSectionIndex(nextIndex, sections);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(activeTag)) return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        const sections = getSections();
        if (!sections.length) return;
        e.preventDefault();
        if (isScrolling) return;
        const cur = getCurrentIndex(sections);
        if (cur < sections.length - 1) {
          scrollToSectionIndex(cur + 1, sections);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        const sections = getSections();
        if (!sections.length) return;
        e.preventDefault();
        if (isScrolling) return;
        const cur = getCurrentIndex(sections);
        if (cur > 0) {
          scrollToSectionIndex(cur - 1, sections);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(scrollTimeout);
    };
  }, [enabled]);
}

import { useEffect } from 'react';

export function useMouseWheelSections() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    let locked = false;
    let unlockTimer: number | undefined;
    let accumulated = 0;
    let lastDirection: 1 | -1 | 0 = 0;

    const getSections = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('main > section, main > div > section')
      ).filter((section) => section.id !== 'footer' && section.getClientRects().length > 0);

    const topOf = (section: HTMLElement) =>
      section.getBoundingClientRect().top + window.scrollY;

    const getContact = () => document.getElementById('contact');
    const getFooterTop = () => {
      const footer = document.querySelector<HTMLElement>('footer');
      return footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;
    };

    const currentIndex = (sections: HTMLElement[]) => {
      const footerTop = getFooterTop();
      const scrollBottom = window.scrollY + window.innerHeight;
      const inFooter = footerTop < Infinity && scrollBottom > footerTop + 12;

      // Footer is outside <main>, so when the user wheels upward from it we
      // must explicitly make Contact the previous full-page destination.
      if (inFooter) return -1;

      const y = window.scrollY + Math.min(24, window.innerHeight * 0.025);
      let index = 0;
      let bestDistance = Infinity;

      sections.forEach((section, i) => {
        const distance = Math.abs(topOf(section) - y);
        if (topOf(section) <= y && distance < bestDistance) {
          bestDistance = distance;
          index = i;
        }
      });
      return index;
    };

    const scrollToSection = (section: HTMLElement) => {
      window.scrollTo({ top: Math.max(0, Math.round(topOf(section))), behavior: 'smooth' });
    };

    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('.game-rail, [data-native-wheel]')) return;
      if (Math.abs(event.deltaY) < 0.5) return;

      const sections = getSections();
      if (!sections.length) return;

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      if (lastDirection !== direction) {
        accumulated = 0;
        lastDirection = direction;
      }

      const index = currentIndex(sections);

      // Footer -> Contact: Footer is not part of the main section list, so
      // give it an explicit upward destination instead of calculating from
      // the last main section (which used to skip Contact).
      if (index === -1 && direction < 0) {
        const contact = getContact();
        if (!contact) return;
        event.preventDefault();
        accumulated = 0;
        locked = true;
        scrollToSection(contact);
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => { locked = false; }, 720);
        return;
      }

      // While already in Footer, downward wheel should stay native.
      if (index === -1) {
        accumulated = 0;
        lastDirection = 0;
        locked = false;
        return;
      }

      const nextIndex = index + direction;

      // At the document edges, let native scrolling continue.
      if (nextIndex < 0 || nextIndex >= sections.length) {
        accumulated = 0;
        lastDirection = 0;
        locked = false;
        return;
      }

      if (locked) {
        event.preventDefault();
        return;
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < 18) return;

      event.preventDefault();
      accumulated = 0;
      locked = true;
      scrollToSection(sections[nextIndex]);

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, 720);
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.clearTimeout(unlockTimer);
    };
  }, []);
}

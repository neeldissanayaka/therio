# The Rio responsive fix

This revision adds a complete responsive pass for phones, tablets, and mobile browsers using Desktop Site mode.

- Touch devices no longer receive the desktop one-section wheel layout.
- Desktop navigation is replaced by the mobile menu on coarse-pointer devices even if the browser reports a desktop viewport.
- Hero/section wrappers are constrained to the actual viewport and no longer reserve hidden desktop columns.
- Content sections use natural document flow on small screens, avoiding oversized vertical gaps.
- Hero typography, CTA buttons, cards, gaming feature media, and footer spacing scale down at phone widths.
- `viewport-fit=cover` is enabled on all HTML entry pages.
- Desktop wheel navigation now requires a fine pointer, so touch scrolling stays native.

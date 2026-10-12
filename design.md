# Maelle Portfolio - Design System

## Typography
- **Primary Font (Headings & Large Text):** 'Inter Tight', 'Inter', sans-serif
- **Secondary Font (Body Text & Details):** 'Geist', 'Inter', sans-serif

## Color Palette
The template utilizes a strictly minimal, high-contrast monochrome palette.
- **Background:** `#ffffff` (White)
- **Primary Text:** `#121212` (Almost Black)
- **Secondary Text (Muted):** `#757575` (Dark Gray)
- **Borders / Dividers:** `#e3e3e3` (Light Gray)
- **Subtle Backgrounds (Hover/Cards):** `#f6f6f6` (Off-white)

## Spacing & Layout
- **Container:** Max-width constrained (e.g., 1200px) with fluid padding on smaller screens.
- **Grid / Layout:** Prominent use of grid for project thumbnails (1 column mobile, 2 or 3 columns desktop).
- **Whitespace:** Generous use of padding (e.g., 4rem, 8rem blocks) to let content breathe.

## Motion & Physics (motion.dev)
- **Spring Config:** `{ stiffness: 100, damping: 20, mass: 1 }` for natural feeling transitions.
- **Reveal Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for smooth upward reveals.
- **Parallax:** Scroll-linked transforms on images.
- **Stagger:** 0.1s staggering for list items (projects, nav links).

## Component Breakdown (Planned)
- **Typography:** `<Text>`, `<Heading>`, `<Caption>` wrappers.
- **Layout:** `<Container>`, `<Section>`
- **Project Grid:** `<ProjectCard>` with image reveal and hover states.
- **Motion:** `<RevealText>`, `<FadeIn>` wrappers.

# Zerobugg UI/UX Standards

**Version:** 1.0  
**Last updated:** 7 September 2026  
**Applies to:** Zerobugg marketing sites, service sites, product microsites, case studies, and internal web tools.

This file captures the visual language already used on `zerobugg.com` and turns it into a reusable standard. It should be the starting point for new Zerobugg websites. Preserve the system below, then adapt the content and one supporting accent or visual motif to the subject of each new site.

## 1. Brand direction

Zerobugg should feel:

- precise, capable, and technically credible;
- editorial rather than dashboard-like;
- modern without looking like a generic SaaS template;
- calm in layout, with one memorable technical visual per page;
- direct and useful in its language.

The recognizable Zerobugg signature is the combination of oversized tightly set type, monospace system labels, warm-paper and near-black surfaces, violet-to-cyan signals, fine structural rules, and diagrams made from paths, nodes, grids, or orbits.

### Non-negotiable brand elements

1. Use the Zerobugg mark and uppercase `ZEROBUGG.` wordmark. The dot is cyan.
2. Use Geist for interface and display text, Geist Mono for labels/data, and Georgia italic only as an editorial accent.
3. Every page needs a clear dark or light surface hierarchy; do not place every section on the same background.
4. Violet is the action color. Cyan is a signal, focus, or technical-detail color—not the main CTA fill.
5. Use fine borders and spacing to organize content before adding shadows or decorative containers.
6. Spend visual boldness in one place per page: an orbit, path, grid, diagram, or subject-specific technical visual.

## 2. Design tokens

Use semantic variables instead of hard-coded color values in new work. This starter block consolidates the values already present in `app/globals.css`.

```css
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: "Geist Mono";
  src: url("/fonts/geist-mono-latin.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}

:root {
  /* Brand */
  --zb-violet: #7058ff;
  --zb-violet-bright: #715cff;
  --zb-violet-soft: #8e80ff;
  --zb-cyan: #54d8ff;
  --zb-gradient-signal: linear-gradient(90deg, var(--zb-cyan), var(--zb-violet));

  /* Dark surfaces */
  --zb-ink: #08090c;
  --zb-surface-dark: #0b0c10;
  --zb-surface-dark-raised: #111218;
  --zb-surface-dark-soft: #161720;

  /* Light surfaces */
  --zb-paper: #f3f1ea;
  --zb-paper-raised: #f6f4ed;
  --zb-paper-inset: #ebe9e2;

  /* Text on dark */
  --zb-text-dark-primary: #eeece5;
  --zb-text-dark-secondary: #a8a9b1;
  --zb-text-dark-tertiary: #777985;

  /* Text on light */
  --zb-text-light-primary: #111216;
  --zb-text-light-secondary: #62636a;
  --zb-text-light-tertiary: #77787f;

  /* Structure */
  --zb-rule-dark: rgba(255, 255, 255, 0.14);
  --zb-rule-light: #c8c7c1;
  --zb-glass: rgba(11, 12, 16, 0.68);
  --zb-focus: #54d8ff;

  /* Feedback. Use only for status, not decoration. */
  --zb-success: #16a34a;
  --zb-success-hover: #15803d;
  --zb-warning-bg: #fff8d6;
  --zb-warning-border: #c8b15b;
  --zb-warning-text: #625413;
  --zb-error: #8c2c2c;

  /* Typography */
  --zb-font-sans: "Geist", Arial, sans-serif;
  --zb-font-mono: "Geist Mono", ui-monospace, monospace;
  --zb-font-editorial: Georgia, "Times New Roman", serif;

  /* Layout */
  --zb-container: 1320px;
  --zb-container-wide: 1440px;
  --zb-container-reading: 1140px;
  --zb-gutter: max(28px, calc((100vw - var(--zb-container)) / 2));
  --zb-section-space: 130px;

  /* Shape */
  --zb-radius-xs: 3px;
  --zb-radius-sm: 8px;
  --zb-radius-md: 12px;
  --zb-radius-lg: 18px;
  --zb-radius-pill: 999px;

  /* Motion */
  --zb-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --zb-duration-fast: 200ms;
  --zb-duration-base: 350ms;
  --zb-duration-slow: 450ms;

  /* Elevation */
  --zb-shadow-float: 0 18px 60px rgba(0, 0, 0, 0.24);
  --zb-shadow-media: 0 30px 80px rgba(0, 0, 0, 0.38);
}

@media (max-width: 960px) {
  :root { --zb-section-space: 95px; }
}

@media (max-width: 720px) {
  :root {
    --zb-gutter: clamp(16px, 5vw, 20px);
    --zb-section-space: clamp(58px, 16vw, 72px);
  }
}
```

## 3. Colour system

### Core palette

| Token | Hex | Use |
|---|---:|---|
| Ink | `#08090C` | Page background, footer, deepest surfaces |
| Warm paper | `#F3F1EA` | Light sections and controls |
| Violet | `#7058FF` | Primary actions, selected states, important emphasis |
| Cyan | `#54D8FF` | Focus, technical signals, nodes, wordmark dot |
| Dark text | `#EEECE5` | Primary copy on dark surfaces |
| Light text | `#111216` | Primary copy on paper surfaces |
| Dark secondary | `#A8A9B1` | Supporting text on dark surfaces |
| Light secondary | `#62636A` | Supporting text on paper surfaces |

### Approved colour schemes

**Default dark — brand and technology**

- Background: Ink or Dark Surface.
- Primary text: `#EEECE5`.
- Secondary text: `#A8A9B1`.
- Rules: 14% white.
- Action: violet; signal/focus: cyan.

**Editorial light — explanations, process, forms, and long reading**

- Background: Warm Paper.
- Primary text: `#111216`.
- Secondary text: `#62636A`.
- Rules: `#C8C7C1`.
- Action: violet; reserve cyan for focus or small signals.

**Violet campaign — high-energy CTA or mobile navigation**

- Background: `#6F5AFF` or `#715CFF`.
- Primary text: white.
- Secondary text: `#DED9FF`.
- Use for one major block, not the entire page.

**Optional showcase accents — portfolio imagery only**

- Violet: `#BCB5FF` → `#6D59F4` → `#2E206D`.
- Cyan: `#9CE7F3` → `#3E7F9C` → `#0E2B38`.
- Lime: `#E5EDBB` → `#92A26A` → `#344023`.
- A new Zerobugg site may introduce one subject-specific showcase accent, but violet and cyan remain the shared brand signals.

### Colour rules

- Do not use cyan and violet as large competing fills in the same section. Violet owns action; cyan communicates signal.
- Never use secondary grey for essential labels, buttons, or small text without checking contrast.
- Use success, warning, and error colours only for real feedback.
- Prefer a fine rule over a pale card background when grouping content.
- Gradients belong to glows, paths, charts, and showcase media—not body text.

## 4. Typography

### Font roles

| Role | Font | Treatment |
|---|---|---|
| Display and UI | Geist | Variable weight; tightly tracked for headings |
| Labels and data | Geist Mono | Uppercase, small, widely tracked |
| Editorial accent | Georgia italic | Only a short phrase inside a display heading |
| Long-form article body | Georgia | 19px/1.75 desktop, 17px/1.65 mobile |

Font files live at `public/fonts/geist-latin.woff2` and `public/fonts/geist-mono-latin.woff2`. Copy the accompanying `NOTICE.md` when fonts are copied to another repository.

### Type scale

| Style | Desktop | Mobile | Notes |
|---|---|---|---|
| Hero display | `clamp(58px, 7.7vw, 126px)` / `.86` | `clamp(36px, 10.5vw, 42px)` / `.96` | Weight 620; tracking `-.075em` desktop, `-.065em` mobile |
| Page display | `clamp(62px, 8.2vw, 120px)` / `.88` | `clamp(36px, 10.5vw, 42px)` / `.98` | Interior-page H1 |
| Section display | `clamp(45px, 6.3vw, 92px)` / `.95` | `clamp(28px, 8.4vw, 34px)` / `1.02` | Weight 590; tracking `-.065em` |
| Card title | 23–35px / 1.1–1.2 | 21–29px | Weight 520–550; tracking about `-.04em` |
| Lead copy | 17–18px / 1.6–1.65 | 15px / 1.55 | Keep lines near 45–70 characters |
| Body | 14–16px / 1.55–1.65 | 14–15px / 1.5–1.6 | Use regular weight |
| Utility label | 9–11px / 1–1.4 | 8–9px | Geist Mono; uppercase; tracking `.08em–.14em` |
| Button/link | 12–14px | 13–14px | Weight 620–650 |

### Typography rules

- Sentence case for navigation, controls, headings, and body copy. Uppercase is reserved for short metadata and the wordmark.
- Keep display headings compact and purposeful. Use `<em>` for at most one short editorial phrase.
- Avoid centered body copy except inside a diagram or a deliberately focused state.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs and list items.
- Do not use Georgia as a decorative second font across entire headings or UI controls.

## 5. Layout and spacing

### Containers

- Standard content: maximum 1320px.
- Wide hero/header/technology rail: maximum 1440px.
- Editorial/article content: maximum 1140px, with the reading column capped around 760px.
- Desktop gutter: at least 28px.
- Mobile gutter: 16–20px.

### Breakpoints

| Breakpoint | Behaviour |
|---:|---|
| `1200px` | Replace desktop navigation with the menu control; reduce 4-column systems |
| `960px` | Collapse split layouts and sticky visuals; reduce section spacing |
| `720px` | Use mobile type, gutters, controls, and mostly single-column layouts |
| `359px` | Compact safety pass for narrow devices |

Design desktop, 960px, 720px, and a 320–359px narrow state. Do not simply shrink desktop cards; change their layout and reading order.

### Spacing rhythm

Use an 8px base with selected 4px half-steps:

`4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 72, 96, 128px`

- Standard section padding: 130px desktop, 95px tablet, 58–72px mobile.
- Grid/card gaps: 12px for related cards; 32–80px for distinct content columns.
- Text spacing: 8–18px within a component; 24–40px between a heading group and its action.
- Use whitespace, rules, and alignment as the main hierarchy. Avoid filling every gap with a container.

## 6. Shape, borders, and elevation

- **3–4px:** media frames and technical cards.
- **8–12px:** controls, buttons, menus, and compact panels.
- **15–18px:** the floating header.
- **999px:** pills, nav CTA, circular controls, nodes.
- **0px:** editorial form fields and rule-led content blocks.
- Dark border: `1px solid rgba(255,255,255,.14)`.
- Light border: `1px solid #C8C7C1`.
- Shadows are reserved for floating navigation and media/mockups. Structural cards should usually be flat.

## 7. Core UI elements

### Brand lockup

- Header mark: 32px desktop, 28px mobile.
- Wordmark: 19px desktop, 17px mobile; weight 760; tracking `-.04em`.
- Footer mark: 44px; footer wordmark: 25px.
- Maintain at least one-quarter of the mark width as clear space.
- Use `public/brand/zerobugg-mark.png`; never stretch, recolour, crop, or place it on a noisy image.

### Header and navigation

- Float 18px from the viewport on desktop and 8px on mobile.
- Use dark translucent glass, a 1px light rule, 20px blur, and the floating shadow token.
- Height: 68px desktop, 54px mobile.
- Current navigation is white and may use a 1px cyan-to-violet underline.
- On scroll, the header becomes narrower and pill-shaped.
- At 1200px and below, use a dedicated full-screen violet menu; trap focus, support Escape, restore focus, and prevent background scrolling.

### Eyebrow/system label

```html
<p class="zb-eyebrow"><span aria-hidden="true"></span>How we work</p>
```

- 9–11px Geist Mono, uppercase, `.08em–.14em` tracking.
- Precede it with a 6–7px cyan signal dot.
- The label must describe the section; it is not decorative filler.

### Buttons

**Primary:** violet fill, white text, 52px desktop / 44px mobile minimum height, 10–12px radius.  
**Light:** warm-paper fill on a dark or violet section.  
**Ghost:** transparent with a subtle rule.  
**Text link:** text plus right arrow and a 1px underline.  
**Service-specific:** a recognized service colour may be used only when it clarifies the destination, such as WhatsApp green.

Button labels use an action plus outcome: “Tell us your challenge,” “Explore service,” or “Open my email draft.” Avoid “Submit,” “Learn more,” or “Click here.”

Hover may translate a filled CTA up by 2px. Text-link arrows may move 5px right. Never rely on movement or colour alone to explain state.

### Cards and lists

Choose the card pattern based on information structure:

- **Rule-led row:** services, jobs, articles, outcomes, or any scan-heavy list.
- **Technical grid card:** capabilities, industries, principles, or comparable items.
- **Feature card:** engagement models and priority offers; only one may be visually featured.
- **Media case-study card:** large project visual paired with concise metadata.
- **Accordion row:** layered information where a short overview must remain scannable.

Cards use a small index, one icon, a clear title, concise copy, and one action. Avoid a shadow, gradient, icon circle, badge, and glow all on the same card.

### Tags and pills

- Use for categories, technologies, or filters—not as decoration.
- Geist Mono, 8–12px, uppercase when the content is metadata.
- Transparent background with a 1px rule; selected filter may invert to near-black/white.

### Forms

- Place forms on a light inset surface (`#EBE9E2`) within a warm-paper section.
- Labels sit above controls and remain visible; placeholders are examples, not labels.
- Controls use at least 48px height on mobile and 16px input text to avoid viewport zoom.
- Inputs use square corners to preserve the editorial tone.
- Focus: violet border and outline with a soft violet halo.
- Mark required fields explicitly and label optional fields with small monospace text.
- Keep entered values after errors. Explain what happened and how to fix it.
- Confirmation copy must match the action. If the interface opens a draft, say “Draft prepared,” not “Message sent.”

### Icons

- Prefer simple geometric glyphs or restrained 1.5–1.8px line icons.
- Standard size: 15–24px; feature icons may be larger.
- Icons supplement labels and do not replace them for important actions.
- Decorative icons use `aria-hidden="true"`; icon-only controls require an accessible name.

### Final CTA and footer

- Use one violet final-CTA block before the dark footer.
- Pair a large outcome-oriented question with one primary action and, at most, one secondary link.
- The orbit motif may appear here; keep it behind the content and decorative to assistive technology.
- Footer uses the oversized `ZEROBUGG` word as a strong close, followed by legal and social links.

## 8. Page composition

A typical Zerobugg marketing page follows this rhythm:

```text
[floating glass header]

[dark hero: eyebrow + decisive H1 + short proof/copy + action]
[one signature technical visual]

[light explanation / process]
[dark capabilities or evidence]
[light detail / work / editorial content]

[violet final CTA]
[dark oversized-word footer]
```

This is a rhythm, not a mandatory template. A new page should keep the surface hierarchy and typography while selecting the structure that best explains its content.

## 9. Signature graphics

Use one family per page:

- path with numbered stages;
- concentric orbit/ring;
- measured grid with nodes;
- central system with surrounding capabilities;
- restrained dashboard or product mockup;
- subject-specific diagram that uses the same rules and token colours.

Graphics should communicate a relationship, process, system, or result. Decorative grids may sit at 11–14% opacity. Glows use violet or cyan radial gradients and remain secondary to text.

Do not use generic floating glass blobs, random 3D shapes, stock illustrations, or multiple unrelated visual metaphors.

## 10. Motion and interaction

- Fast feedback: 200–250ms.
- Standard reveal/hover: 350ms.
- Expanding panels or full-screen menu: 400–450ms.
- Preferred easing: `cubic-bezier(.16,1,.3,1)`.
- Reveal content with a maximum 10–14px vertical movement and opacity change.
- Use a single orchestrated entrance or active technical visual instead of animating every element.
- Keep scroll progress to a 2px cyan-to-violet line.
- Pause or reduce nonessential continuous movement when appropriate.

Every project must include:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 11. UX and content standards

- Lead with the user’s problem, desired change, or decision—not the technology stack.
- One page, one primary job. One section, one clear point.
- Keep primary actions consistent from entry point through confirmation.
- Use specific verbs: “Compare plans,” “Explore service,” “Book a call,” “Send via WhatsApp.”
- Navigation names should be familiar and short.
- Progressive disclosure is preferred for secondary service detail.
- Empty states invite the next action. Error states name the problem and the remedy.
- Never invent testimonials, customers, metrics, case-study outcomes, job openings, or performance claims. Mark unverified material for review.
- Public marketing content should remain server-rendered unless interaction requires a client component.

## 12. Accessibility baseline

Every Zerobugg site must:

- use semantic landmarks and one logical H1;
- provide a “Skip to content” link;
- preserve visible keyboard focus with a 2px cyan or violet outline and 4px offset;
- keep interactive targets at least 44px high where practical;
- support keyboard operation for menus, accordions, tabs, filters, and forms;
- trap and restore focus in modal navigation;
- use `aria-current`, `aria-expanded`, `aria-controls`, status announcements, and accessible names where relevant;
- hide purely decorative graphics from assistive technology;
- preserve meaningful reading order when responsive grids collapse;
- avoid horizontal overflow at 320px;
- respect reduced motion and safe-area insets;
- validate dark, light, hover, focus, active, error, success, empty, loading, and disabled states.

## 13. New-site checklist

Before design:

- Define the site’s audience and single main conversion.
- Choose the default dark/light rhythm and one signature visual.
- Copy the approved fonts, mark, tokens, and license notice.
- Identify any new accent as a showcase/subject colour, not a replacement brand colour.

Before handoff:

- Check desktop, tablet, mobile, and 320–359px layouts.
- Test keyboard navigation, visible focus, menu focus management, and form errors.
- Test reduced motion, long headings, long navigation labels, and content overflow.
- Verify the primary flow from hero action to completion.
- Check contrast and do not rely on colour alone for state.
- Confirm all commercial claims and remove placeholder content.
- Check the browser console and production build.

## 14. Current implementation references

Use these files as working examples:

- `app/globals.css` — current visual rules, responsive behaviour, and states.
- `app/components/Site.tsx` — section heading, page hero, final CTA, and footer patterns.
- `app/components/SiteHeader.tsx` — responsive navigation and focus management.
- `app/components/HomeInteractions.tsx` — accordion and interactive-process patterns.
- `app/components/ContactForm.tsx` — form, validation, and honest confirmation language.
- `app/components/MotionObserver.tsx` — progressive reveal and reduced-motion handling.
- `app/components/BrandMark.tsx` — approved mark and wordmark construction.
- `app/components/Icons.tsx` — current icon language.
- `public/brand/zerobugg-mark.png` — approved brand mark.
- `public/fonts/NOTICE.md` — font licensing notice.

When the implementation and this standard differ, treat the standard as the direction for new sites and update both deliberately when the Zerobugg brand evolves.

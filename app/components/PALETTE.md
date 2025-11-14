# TecWeb Studio - Color Palette 🎨

## Futuristic Green & White Scale

### Primary Colors

- **Emerald** `#10b981` - Primary brand color, elegant and professional
- **Green** `#22c55e` - Vibrant accent, energetic feel
- **Lime** `#84cc16` - Bright accent for highlights and CTAs

### Accent Colors

- **Emerald Light** `#a7f3d0` - Light accent for hover states
- **Emerald Bright** `#6ee7b7` - Mid-tone for secondary elements

### Neutral & Background Colors

- **White** `#ffffff` - Pure white for contrast
- **Off-White** `#f8fafc` - Soft background alternative
- **Light Gray** `#f1f5f9` - Light mode backgrounds

### Dark Mode Colors (Default)

- **Dark Blue** `#0f172a` - Primary dark background
- **Darker Blue** `#020617` - Secondary dark background
- **Primary Text** `#ffffff` - White text
- **Secondary Text** `#cbd5e1` - Light gray text
- **Muted Text** `#94a3b8` - Faded gray text

### Glow Effects

- **Emerald Glow** `#10b98180` - Emerald with 50% opacity for shadows
- **Green Glow** `#22c55e80` - Green with 50% opacity for shadows

---

## Usage Guide

### CSS Variables

All colors are available as CSS variables in the `:root` scope:

```css
color: var(--primary-emerald);
background: linear-gradient(
  135deg,
  var(--primary-green) 0%,
  var(--primary-emerald) 100%
);
box-shadow: 0 0 20px var(--glow-green);
```

### Utility Classes

Custom utility classes are available:

- `.text-emerald-glow` - Emerald text with glow effect
- `.text-green-glow` - Green text with glow effect
- `.glow-emerald` - Box shadow glow effect
- `.glow-green` - Box shadow glow effect
- `.gradient-emerald-green` - Gradient background
- `.gradient-green-lime` - Gradient background

### Tailwind Classes

Use standard Tailwind CSS with our color values:

```html
<div class="bg-emerald-500 text-white hover:bg-green-500">
  Futuristic Element
</div>
```

---

## Component Guidelines

### Navbar

- Background: `backdrop-blur-md` with transparent black
- Border: `border-emerald-500/20`
- Text: `text-white/80` → hover `text-emerald-400`
- Buttons: `gradient-to-r from-emerald-500 to-green-500`

### Buttons

- Gradient: `bg-gradient-to-r from-emerald-500 to-green-500`
- Hover: Enhanced shadow with glow effect
- Border: `border-emerald-400/30` → hover `border-emerald-400`

### Text & Headings

- Primary: Pure white (`#ffffff`)
- Secondary: Light gray (`#cbd5e1`)
- Accent: Emerald or Green for highlights

### Backgrounds

- Dark mode: Linear gradient from `#0f172a` to `#020617`
- Light mode: Reverse colors for readability

---

## Contrast & Accessibility

✅ **WCAG AA Compliant** combinations:

- White text on emerald backgrounds ✓
- White text on green backgrounds ✓
- Dark text on off-white backgrounds ✓

---

## Animation & Effects

- **Smooth Transitions**: `transition-all duration-300`
- **Glow Effects**: 20px box-shadow with color variables
- **Gradients**: 135deg angle for diagonal flow
- **Backdrop Blur**: `backdrop-blur-md` for frosted glass effect

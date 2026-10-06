# Asif Ali - Personal Portfolio Website

A responsive personal portfolio for **Asif Ali**, BS Computer Science student at COMSATS University Islamabad, Wah Campus (FA24-BCS).

Built with **only HTML5, CSS3 and Vanilla JavaScript** - no frameworks, no libraries, no build step.

## Features

- Dark and light mode with a toggle (choice is remembered)
- Sticky navbar, smooth scrolling, active link highlighting
- Mobile hamburger menu, mobile-first responsive layout
- Sections: Hero, About, Skills, Projects, Education, Achievements, Academic Interests, Contact, Footer
- Scroll reveal animations (respects "reduce motion" setting)
- Contact form with JavaScript validation (frontend only - it does not send email)
- Back-to-top button and automatic footer year

## Project structure

```text
portfolio/
├── index.html          page structure (HTML)
├── css/
│   └── style.css       design, themes, responsive rules (CSS)
├── js/
│   └── script.js       all interactivity (JavaScript)
├── assets/
│   ├── profile.jpg     profile photo (replace with your own anytime)
│   └── images/         extra images for future use
└── README.md
```

## Run locally

**Option 1 - simplest:** open the `portfolio` folder and double-click `index.html`.

**Option 2 - VS Code Live Server:**
1. Open the `portfolio` folder in VS Code.
2. Install the "Live Server" extension.
3. Right-click `index.html` and choose **Open with Live Server**.

**Option 3 - Python:**
```bash
cd portfolio
python -m http.server 8000
```
Then visit http://localhost:8000

## Things to update

1. **Project GitHub links:** in `index.html`, replace each `YOUR_PROJECT_GITHUB_LINK` with the real repository URL. Until then the GitHub buttons show a "coming soon" hint.
2. **Demo buttons:** set the real URL in the `href` of a Demo button and delete its `data-demo="pending"` attribute.
3. **Profile photo:** replace `assets/profile.jpg`. If the file is missing, a clean "AA" placeholder is shown automatically.

## Deploy on GitHub Pages

1. Create a new repository and upload the contents of this folder.
2. Go to **Settings -> Pages**, choose the `main` branch and the root folder, and save.
3. Your site appears at `https://<username>.github.io/<repository>/`.

---

## Viva guide - how it works

### HTML

- **Semantic tags:** `header` + `nav` (navigation), `main` (page content), `section` (each part of the page), `article` (self-contained cards such as a project), `footer`. These give the page meaning for search engines and screen readers.
- **IDs and anchors:** each section has an `id` (for example `id="about"`). A link such as `<a href="#about">` scrolls to it.
- **Forms:** the contact form has `label` + `input` pairs linked with `for`/`id`. `novalidate` turns off the browser's default popups so our own JavaScript messages are used.
- **Accessibility:** `aria-label` on icon buttons, `alt` text on the image, `aria-expanded` on the hamburger.
- **Viewport meta tag:** makes the layout scale correctly on phones.

### CSS

- **CSS variables:** colours are defined once in `:root` (for example `--primary-color`). The light theme overrides them inside `:root[data-theme="light"]`. Changing one attribute re-colours the whole site.
- **Mobile-first:** base styles are for phones. `@media (min-width: 640px)` and `@media (min-width: 900px)` add more columns and the horizontal navbar for larger screens.
- **Flexbox and Grid:** Flexbox for rows such as the navbar and buttons; Grid for card layouts (`grid-template-columns: repeat(3, 1fr)`).
- **Sticky navbar:** `position: sticky; top: 0`.
- **Smooth scrolling:** `scroll-behavior: smooth` on `html`; `scroll-padding-top` stops the navbar covering headings.
- **Hover effects and transitions:** `transition` plus `transform: translateY(...)` on cards.
- **Hamburger menu in CSS:** on mobile the menu has `max-height: 0`; the `.open` class changes it to a larger value.

### JavaScript

- **Theme toggle:** reads the `data-theme` attribute, flips it between `dark` and `light`, and saves it with `localStorage`. A tiny script in the `<head>` applies the saved theme before the page paints.
- **Hamburger menu:** `classList.toggle("open")` shows/hides the menu and updates `aria-expanded`.
- **Active link:** `IntersectionObserver` watches each section; when one is in the middle of the screen, the matching nav link gets the `active` class.
- **Scroll animations:** elements with class `reveal` get class `visible` when they enter the screen, and CSS animates the change.
- **Form validation:** `validateForm()` checks each field (length, email pattern via a regular expression). Errors appear under the field; if everything is valid, `event.preventDefault()` stops the page reload and a success message is shown. The form is frontend-only: nothing is sent to a server.
- **Back-to-top:** a `scroll` listener shows the button after 400px and `window.scrollTo({ top: 0, behavior: "smooth" })` scrolls up.
- **Footer year:** `new Date().getFullYear()`.
- **Image fallback:** if `profile.jpg` fails to load, the `error` event shows the "AA" placeholder.

### Likely viva questions

1. *Why use CSS variables for themes?* One change to a variable updates every element that uses it, so dark/light mode needs no duplicated CSS.
2. *Why is the form not sending email?* Sending email needs server-side code or a third-party service; this project is frontend-only by design, so it validates and shows a message.
3. *What is `event.preventDefault()`?* It stops the browser's default action (reloading the page on form submit, or jumping on a placeholder link).
4. *What is mobile-first design?* Write the phone layout first, then use `min-width` media queries to enhance it for bigger screens.
5. *What is `localStorage`?* Small browser storage that survives page reloads; used here to remember the chosen theme.

---

&copy; 2026 Asif Ali. All rights reserved.

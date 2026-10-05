<div align="center">

<h1>Mohammed Emad Hamdy</h1>
<h3>Data Engineer &amp; AI Specialist</h3>

<p>Data pipelines. Intelligent systems. Reliable backends.</p>

<p>
  <a href="https://mohammed-emad2004.github.io/My-Portfolio/"><strong>Explore the live portfolio →</strong></a>
</p>

<p>
  <a href="https://github.com/Mohammed-Emad2004">GitHub</a> ·
  <a href="https://linkedin.com/in/mohammedemadhamdy">LinkedIn</a> ·
  <a href="mailto:mohammedemadhamdy142@gmail.com">Email</a>
</p>

<p>
  <img src="https://img.shields.io/badge/HTML-60a5fa?style=flat-square&amp;logo=html5&amp;logoColor=080c17" alt="HTML">
  <img src="https://img.shields.io/badge/CSS-93c5fd?style=flat-square&amp;logo=css&amp;logoColor=080c17" alt="CSS">
  <img src="https://img.shields.io/badge/JavaScript-bae6fd?style=flat-square&amp;logo=javascript&amp;logoColor=080c17" alt="JavaScript">
</p>

</div>

---

A responsive, single-page portfolio showcasing my work in data engineering, AI, computer vision, and backend systems. Built with vanilla HTML, CSS, and JavaScript, with no framework, package installation, or build step.

## Features

- **Midnight navy × icy blue:** a consistent palette, subtle background glows, and refined cards.
- **Responsive portfolio:** an interactive architecture intro, about section, skills, experience timeline, projects, education, and contact links.
- **Connected-node background:** a canvas network stays behind every section after entering the portfolio.
- **Desktop interactions:** a custom cursor and hover effects for devices with a fine pointer; touch devices use the native experience.
- **Accessible motion controls:** respects reduced-motion preferences and pauses decorative effects when the page is hidden or their section is offscreen.
- **Automatic age:** uses the `Africa/Cairo` calendar, updates on my birthday, and catches up when a suspended tab becomes active again.
- **Local assets:** self-hosted DM Sans and Syne WOFF2 fonts, WebP photos, and lazy-loaded portfolio images.

## Run locally

From the repository folder, start a local server with Python 3:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open **[127.0.0.1:8080](http://127.0.0.1:8080/)** in your browser. Press `Ctrl+C` in the terminal to stop the server.

## Project structure

```text
.
├── index.html                      # Content, sections, and sharing metadata
├── css/
│   └── style.css                   # Theme, layouts, and animations
├── js/
│   └── script.js                   # Interactions, canvas, and age updates
├── images/
│   ├── mohammed-hackathon.webp
│   ├── mohammed-speaker.webp
│   └── mohammed-hackathon.jpeg      # Open Graph and Twitter preview
├── fonts/
│   ├── dm-sans-latin.woff2
│   ├── syne-latin.woff2
│   ├── DM-Sans-OFL.txt
│   └── Syne-OFL.txt
└── .github/workflows/
    └── pages.yml                   # GitHub Pages deployment
```

## Customize

| File | What to change |
| --- | --- |
| [index.html](index.html) | Personal content, projects, experience, contact links, and social metadata. |
| [css/style.css](css/style.css) | Colors in `:root`, typography, card styles, and responsive layouts. |
| [js/script.js](js/script.js) | Canvas behavior, cursor interactions, motion controls, and birthdate/timezone settings. |
| [images/](images/) | Portfolio photos; keep the JPEG preview referenced by the sharing metadata. |
| [fonts/](fonts/) | Local font files and their license notices. |

## Deployment

The [GitHub Pages workflow](.github/workflows/pages.yml) publishes the site automatically on pushes to `main`. It also supports manual runs through GitHub Actions.

GitHub Pages should use **GitHub Actions** as its publishing source in the repository settings. The workflow uploads the static site directly; no build command is needed.

**Live site:** [mohammed-emad2004.github.io/My-Portfolio](https://mohammed-emad2004.github.io/My-Portfolio/)

## Font credits

DM Sans and Syne are distributed under the SIL Open Font License. Their notices are included in [fonts/DM-Sans-OFL.txt](fonts/DM-Sans-OFL.txt) and [fonts/Syne-OFL.txt](fonts/Syne-OFL.txt).

---

<p align="center">Designed and developed by <strong>Mohammed Emad Hamdy</strong>.</p>

# NSCC Task 1 — Personal Introduction Page

> A responsive and interactive personal introduction website built using HTML5, CSS3, and Vanilla JavaScript.

This project was developed as part of the **NSCC Technical Domain**.

The objective was to create a personal introduction website while demonstrating fundamental frontend development concepts such as semantic HTML, responsive CSS, JavaScript DOM manipulation, event handling, animations, accessibility, and browser-based storage.

---

## 🌐 Live Website

**[🚀 View the Live Personal Introduction Page](https://nimiso0110.github.io/NSCC/Personal%20Introduction%20Page/)**

---

## 📌 Project Overview

The Personal Introduction Page is a custom-designed single-page website that presents my background, interests, experience, activities, and current technical direction.

Rather than relying on a frontend framework, the project was developed using the core technologies of the web:

- HTML5
- CSS3
- Vanilla JavaScript
- DOM APIs
- Browser APIs
- LocalStorage

The website combines a structured layout with interactive components, responsive behaviour, animations, theme switching, and mobile navigation.

The project is completely client-side and does not require a backend, database, or external JavaScript framework.

---

## ✨ Highlights

- 🎨 Custom visual design
- 📱 Fully responsive layout
- 🌙 Dark / Light theme switching
- 💾 Persistent theme preference using `localStorage`
- 🧭 Responsive navigation
- 📱 Mobile navigation menu
- ⚡ JavaScript-powered interactions
- 👀 Scroll-based reveal animations
- 🖱️ Pointer-responsive interactions
- 🧲 Magnetic-style controls
- 🌌 Animated background effects
- 🔄 CSS-based animations
- ♿ Reduced-motion support
- 🖼️ Local profile image
- 📸 Project screenshots
- 🎥 Demonstration video
- 🚫 No frontend framework required

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, layout, animations and responsive design |
| **Vanilla JavaScript** | Interactivity and dynamic behaviour |
| **DOM API** | Dynamic manipulation of page elements |
| **IntersectionObserver** | Scroll-based reveal animations |
| **localStorage** | Persistent theme preference |
| **CSS Media Queries** | Responsive layouts across screen sizes |

---

## 🚫 No Framework Dependency

This project intentionally uses the fundamentals of frontend development.

It does **not** require:

- React
- Vue
- Angular
- Tailwind CSS
- Bootstrap
- jQuery
- npm packages
- JavaScript frameworks

The website can be opened directly in a browser without installing dependencies.

---

# 🎯 Objectives

The main objectives of the project were to demonstrate:

- Understanding of HTML structure
- Semantic HTML implementation
- CSS styling and layout
- Responsive web design
- JavaScript fundamentals
- DOM manipulation
- Event listeners
- Browser APIs
- Interactive UI development
- CSS animations
- JavaScript-driven animations
- Theme persistence
- Mobile navigation
- Accessibility considerations
- Proper project organization
- Git and GitHub usage

---

# 🧩 Website Sections

## 01 — Hero / Introduction

The hero section acts as the primary introduction to the website.

It establishes the visual identity of the page and provides the first overview of the profile.

### Includes

- Personal introduction
- Profile photograph
- Short description
- Primary navigation
- Animated decorative elements
- Responsive layout
- Visual background effects

---

## 02 — About

The About section provides additional context about my background and current direction.

The content is designed around my actual interests and experience rather than generic placeholder information.

The section helps establish the purpose and personality of the website while maintaining the overall visual language of the page.

---

## 03 — Interests

The Interests section presents the areas I am currently interested in and exploring.

### Technical Interests

- Software Engineering
- Cybersecurity
- Ethical Hacking
- Technology
- Learning and experimentation

### Other Interests

- Chess
- Competitive tournament participation

The section uses interactive UI elements rather than presenting the information as a simple static list.

---

## 04 — Experience & Highlights

The Highlights section presents relevant activities, experience, and achievements.

Examples include:

- School Tech Club coordination
- Technical Operations for an inter-state MUN
- FIDE-rated chess tournament participation
- Summer Internship Program in Ethical Hacking at IIT Kanpur

The section is designed to provide context without turning the website into a conventional resume.

---

## 05 — Current Toolkit

The Current Toolkit section presents technologies and technical areas that are relevant to my current learning and development.

The purpose of the section is to communicate the areas I am working with and exploring while keeping the presentation visually consistent with the rest of the website.

---

# ⚡ Interaction System

The website contains multiple interactive components implemented using JavaScript and CSS.

---

## 🌙 Theme Toggle

The website supports both:

- Light mode
- Dark mode

The selected theme is stored using browser `localStorage`.

This means the user's selected theme can persist after refreshing the page.

### Basic flow

```text
User selects theme
        ↓
JavaScript updates theme
        ↓
Theme preference saved
        ↓
Page reload
        ↓
Saved preference restored
📱 Mobile Navigation

The navigation system adapts to smaller screen sizes.

On desktop screens, navigation links are displayed normally.

On smaller screens, the navigation changes into a mobile-friendly menu.

The menu can be:

Opened
Closed
Navigated using links

Navigation links also close the mobile menu after selection where appropriate.

No external navigation library is required.

👀 Scroll Reveal Animations

The website uses the native browser IntersectionObserver API for scroll-based animations.

Elements can transition into their visible state when they enter the viewport.

A simplified representation of the mechanism is:

element.classList.add("visible");

When the element leaves the viewport, the class can be removed:

element.classList.remove("visible");

This allows sections to animate naturally as the user scrolls through the page.

🖱️ Pointer Interactions

Selected interface elements respond to pointer movement.

The interactions are intentionally subtle so that the interface remains usable and visually clean.

The goal is to provide additional feedback without making the page unnecessarily distracting.

🧲 Magnetic Controls

Some controls use pointer position to create subtle movement.

This gives important interactive elements additional visual feedback while keeping the implementation lightweight.

🌌 Animated Background

The visual background system uses CSS-based effects including:

Gradients
Grid patterns
Ambient glow effects
Decorative geometry
Motion
Layered visual elements

These effects are implemented without using a video background or heavy animation library.

🌀 Animated Orbit Elements

The profile area contains animated orbital/decorative elements.

These effects are implemented using CSS animations rather than an external animation package.

This keeps the implementation lightweight and dependency-free.

📱 Responsive Design

The website is designed to work across different screen sizes.

The layout adapts for:

🖥️ Desktop
💻 Laptop
📱 Mobile
📟 Tablet-sized screens

Responsive behaviour is primarily handled through CSS media queries.

Responsive considerations include
Flexible layouts
Scalable typography
Mobile navigation
Responsive spacing
Flexible sections
Adaptive controls
Mobile-friendly interactions
Responsive images

The project uses a single responsive website rather than maintaining separate desktop and mobile versions.

♿ Accessibility

Accessibility was considered during the development of the interface.

The project includes considerations such as:

Semantic HTML
Keyboard-accessible controls
Appropriate interactive elements
Responsive navigation
Reduced-motion support
Clear visual hierarchy
Readable text
Sufficient spacing between interactive elements
Reduced Motion

The website takes reduced-motion preferences into account.

Users who prefer reduced motion should not be forced to experience unnecessary animations.

This helps make the interface more comfortable and accessible.

🖼️ Profile Photograph

The profile photograph is stored locally inside the project:

assets/
└── profile.png

The image is referenced using a relative path.

Because the image is stored inside the project itself, it works when the project is:

Opened locally
Uploaded to GitHub
Deployed using GitHub Pages
Hosted using another static hosting service

No external image-hosting service is required.

📁 Project Structure
Personal Introduction Page/
│
├── index.html
├── README.md
│
├── assets/
│   └── profile.png
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── screenshots/
│   ├── 01-hero.png
│   ├── 02-about.png
│   ├── 03-interests.png
│   ├── 04-highlights.png
│   ├── 05-toolkit.png
│   └── 06-final.png
│
└── demo/
    └── demo-video.mp4
📄 File Responsibilities
index.html

Contains the structure and content of the website.

It defines:

Navigation
Hero section
About section
Interests
Highlights
Toolkit
Footer / final section
Interactive elements
css/style.css

Contains the visual styling and responsive behaviour.

It handles:

Typography
Colours
Layout
Spacing
Cards
Navigation
Animations
Transitions
Responsive layouts
Theme styling
Decorative effects
js/script.js

Contains the client-side interaction logic.

It handles functionality such as:

Theme switching
LocalStorage
Navigation interactions
Mobile menu
Scroll-based animations
Pointer interactions
Dynamic UI behaviour
assets/profile.png

Contains the profile photograph used by the website.

screenshots/

Contains screenshots documenting the completed website.

screenshots/
├── 01-hero.png
├── 02-about.png
├── 03-interests.png
├── 04-highlights.png
├── 05-toolkit.png
└── 06-final.png
demo/demo-video.mp4

Contains a walkthrough demonstration of the completed website.

🖥️ How to Run
Option 1 — Open Directly

No installation is required.

Simply open:

index.html

in a modern web browser.

Option 2 — VS Code + Live Server

For development, the project can be opened in VS Code.

Steps
Open the project folder in VS Code.
Open index.html.
Start Live Server.
Open the generated local address in your browser.

Live Server is optional and is only useful during development.

🌐 Browser Compatibility

The website is intended for modern browsers that support standard HTML5, CSS3, and JavaScript APIs.

Recommended browsers include:

Google Chrome
Microsoft Edge
Mozilla Firefox
Safari

The project does not require any browser-specific plugin.

⚡ Performance Approach

The project intentionally avoids unnecessary dependencies.

Performance considerations include:

No JavaScript framework
No animation library
No external runtime dependency
CSS-based animations
Native browser APIs
Local assets
Lightweight DOM interactions
Responsive CSS
No separate mobile application
No backend processing

The result is a lightweight static website that can be hosted without a server-side backend.

🎥 Demo Video

A walkthrough of the completed website is included in:

demo/demo-video.mp4

The demonstration covers:

Initial page load
Hero section
Navigation
Scrolling behaviour
Reveal animations
Interactive sections
Theme switching
Mobile navigation
Responsive behaviour
📸 Screenshots
01 — Hero / Introduction

The opening section introduces the website and establishes the overall visual system.

02 — About

The About section provides additional personal and technical context.

03 — Interests

The Interests section presents the main areas I am currently interested in.

04 — Highlights

The Highlights section presents relevant activities, experience, and achievements.

05 — Current Toolkit

The Toolkit section presents the technologies and areas I am currently working with or learning.

06 — Final Section

The final section closes the introduction and provides the final navigation/action area.

🚀 Deployment

This project is a static HTML/CSS/JavaScript website.

It does not require:

A backend
A database
Server-side code
A build process
npm packages

It can therefore be deployed using static hosting services.

Supported hosting options
GitHub Pages
Netlify
Vercel
Cloudflare Pages
Other static hosting providers
GitHub Pages

The project is currently deployed using GitHub Pages.

Live Website

🌐 Open Personal Introduction Page

Deployment Flow
Local Project
      ↓
Git Repository
      ↓
GitHub
      ↓
GitHub Pages
      ↓
Public Website
📦 Repository

The project is part of the NSCC repository.

📁 View NSCC GitHub Repository

🧪 Testing Checklist
Functionality
 Website loads correctly
 Navigation works
 Mobile navigation works
 Theme toggle works
 Theme preference is stored
 Scroll interactions work
 Interactive elements respond correctly
 Local assets load correctly
Responsive Design
 Desktop layout
 Laptop layout
 Tablet-sized layout
 Mobile layout
 Responsive navigation
 Responsive content sections
 Responsive images
Documentation
 README
 Project structure
 Setup instructions
 Technical explanation
 Screenshots
 Demo video
 Live website
 GitHub repository
✅ Submission Checklist
Core Requirements
 Personal introduction
 Personal photograph
 HTML5 implementation
 CSS3 implementation
 Vanilla JavaScript
 Responsive design
 Mobile layout
 DOM manipulation
 Event listeners
 Interactive navigation
 Dark / Light mode
 Theme persistence using localStorage
 Scroll-based animations
 CSS animations
 Reduced-motion support
Project Documentation
 README
 Project structure
 Setup instructions
 Technical explanation
 Screenshots
 Demo video
 Live deployment URL
 GitHub repository URL
💡 Technical Summary

The project demonstrates how a complete interactive website can be created using the fundamental technologies of the web without relying on a frontend framework.

The implementation follows a simple separation of responsibilities:

HTML
 ↓
Structure & Content
 ↓
CSS
 ↓
Visual Design & Responsive Layout
 ↓
JavaScript
 ↓
Interaction & Behaviour
 ↓
Browser APIs
 ↓
Persistence & Dynamic Features

This approach keeps the project lightweight while providing enough functionality to demonstrate practical frontend development skills.

🎓 Learning Outcomes

Through this project, I worked with and strengthened my understanding of:

HTML document structure
Semantic HTML
CSS layouts
Responsive design
CSS animations
CSS transitions
JavaScript fundamentals
DOM manipulation
Event listeners
Browser APIs
IntersectionObserver
LocalStorage
Responsive navigation
Accessibility considerations
Static website deployment
Git version control
GitHub Pages
👨‍💻 Author

Nameesh Shah

GitHub: @nimiso0110

⭐ Final Note

This project was intentionally developed using HTML5, CSS3, and Vanilla JavaScript to demonstrate a practical understanding of frontend fundamentals without relying on a frontend framework.

The focus is on combining structure, styling, responsiveness, interaction, accessibility, and deployment into a complete working website.
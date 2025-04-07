// This is script.ts — converted to TypeScript for Vite

const sections: NodeListOf<HTMLElement> = document.querySelectorAll("section");
function revealSections(): void {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

const sidebarLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".sidebar a");
sidebarLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href) {
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        target.classList.add("glow");
        setTimeout(() => target.classList.remove("glow"), 1000);
      }
    }
  });
});

const collapsibleSections: NodeListOf<HTMLElement> = document.querySelectorAll(".collapsible");
collapsibleSections.forEach(section => {
  section.classList.add("open");
});

const toggles: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".toggle-section");
toggles.forEach((btn, idx) => {
  const section = collapsibleSections[idx];
  btn.addEventListener("click", () => {
    section.classList.toggle("open");
  });
});

document.addEventListener("keydown", e => {
  if (e.key >= "1" && e.key <= "6") {
    const anchors = document.querySelectorAll<HTMLAnchorElement>(".sidebar a");
    const target = anchors[parseInt(e.key) - 1];
    if (target) {
      target.click();
    }
  }
});

const themeBtn = document.getElementById("toggleTheme") as HTMLButtonElement | null;
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
}

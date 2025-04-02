// Section fade-in on scroll
const sections = document.querySelectorAll("section");

function revealSections() {
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

// Smooth scroll with glow effect
const sidebarLinks = document.querySelectorAll(".sidebar a");
sidebarLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
        target.classList.add("glow");
        setTimeout(() => target.classList.remove("glow"), 1000);
    });
});

// Section toggle buttons (sections open by default)
document.querySelectorAll(".collapsible").forEach(section => {
    section.classList.add("open");
});

const toggles = document.querySelectorAll(".toggle-section");
toggles.forEach((btn, idx) => {
    const section = document.querySelectorAll(".collapsible")[idx];
    btn.addEventListener("click", () => {
        section.classList.toggle("open");
    });
});

// Screenshot upload preview
const screenshotInput = document.getElementById("uploadScreenshot");
const previewImage = document.getElementById("previewScreenshot");
if (screenshotInput && previewImage) {
    screenshotInput.addEventListener("change", function() {
        const reader = new FileReader();
        reader.onload = e => {
            previewImage.src = e.target.result;
            previewImage.classList.remove("d-none");
        };
        if (this.files[0]) {
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// Search filter
document.getElementById("searchBox").addEventListener("input", function() {
    const term = this.value.toLowerCase();
    document.querySelectorAll("section").forEach(section => {
        const visible = section.innerText.toLowerCase().includes(term);
        section.style.display = visible ? "block" : "none";
    });
});

// Keyboard shortcut navigation
document.addEventListener("keydown", e => {
    if (e.key >= 1 && e.key <= 6) {
        const anchors = document.querySelectorAll(".sidebar a");
        if (anchors[e.key - 1]) {
            anchors[e.key - 1].click();
        }
    }
});

// Theme toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});
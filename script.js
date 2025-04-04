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
const themeBtn = document.getElementById("toggleTheme");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}

function logGeoToConsole(section = "Unknown Section") {
    if (!navigator.geolocation) {
        console.warn("Geolocation not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        const timestamp = new Date().toLocaleString();

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            const address = data.address;
            const city = address.city || address.town || address.village || address.hamlet || "Unknown city";
            const country = address.country || "Unknown country";

            console.log(`📍 Location Log:
  • Section: ${section}
  • Time: ${timestamp}
  • Coordinates: ${lat}, ${lon}
  • Location: ${city}, ${country}`);
        } catch (err) {
            console.error("Reverse geocoding failed:", err);
        }
    }, err => {
        console.warn("Geolocation error:", err.message);
    });
}

// Trigger when each section becomes visible (once)
document.querySelectorAll("section").forEach(section => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logGeoToConsole(section.id);
                observer.unobserve(section); // only log once
            }
        });
    });
    observer.observe(section);
});
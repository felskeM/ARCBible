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

let geoLogs = [];

function logGeolocation(sectionName = 'Unknown') {
    if (!navigator.geolocation) {
        console.warn('Geolocation not supported by this browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date().toISOString();
        geoLogs.push({ section: sectionName, latitude, longitude, timestamp });
        console.log(`Logged: ${sectionName} @ ${latitude}, ${longitude} @ ${timestamp}`);
    }, error => {
        console.warn('Geolocation error:', error.message);
    });
}

function exportToCSV() {
    if (geoLogs.length === 0) return alert("No data to export.");

    const headers = ['Section', 'Latitude', 'Longitude', 'Timestamp'];
    const rows = geoLogs.map(log => [log.section, log.latitude, log.longitude, log.timestamp]);

    const csvContent = [headers, ...rows]
        .map(row => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'geolog.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Log geolocation when each section becomes visible
document.querySelectorAll("section").forEach(section => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logGeolocation(section.id);
                observer.unobserve(section); // log only once per section
            }
        });
    });
    observer.observe(section);
});

// Optional: Add a button to export
const exportBtn = document.createElement("button");
exportBtn.textContent = "Download Log CSV";
exportBtn.className = "btn btn-sm btn-outline-info m-3";
exportBtn.onclick = exportToCSV;
document.body.appendChild(exportBtn);
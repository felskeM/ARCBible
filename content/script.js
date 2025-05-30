document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-section");
    const collapsibleSections = document.querySelectorAll(".collapsible");

    toggleButtons.forEach((button, index) => {
        const section = collapsibleSections[index];

        button.addEventListener("click", () => {
            section.classList.toggle("open");
            const state = section.classList.contains("open") ? "expanded" : "collapsed";
            console.log(`Section ${index + 1} ${state}`);
        });
    });

    console.log("Dark-mode-only script initialized.");
});
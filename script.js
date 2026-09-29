const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (year) {
    year.textContent = new Date().getFullYear();
}


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (mainNav.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("open");
        }

        if (menuToggle) {
            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

});


const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (document.documentElement.getAttribute("data-theme") === "dark") {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

}

updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        if (isDark) {

            document.documentElement.removeAttribute("data-theme");

            localStorage.setItem("portfolio-theme", "light");

        } else {

            document.documentElement.setAttribute("data-theme", "dark");

            localStorage.setItem("portfolio-theme", "dark");

        }

        updateThemeIcon();

    });

}


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


if (contactForm) {

    contactForm.addEventListener("submit", async event => {

        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");

        submitButton.disabled = true;

        submitButton.innerHTML = `
            Sending...
            <i class="fas fa-spinner fa-spin"></i>
        `;

        formStatus.textContent = "";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {

                formStatus.textContent =
                    "Message sent successfully. Thank you for reaching out!";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

            }

        } catch (error) {

            formStatus.textContent =
                "Unable to send message. Please try again later.";

        }

        submitButton.disabled = false;

        submitButton.innerHTML = `
            Send Message
            <i class="fas fa-paper-plane"></i>
        `;

    });

}
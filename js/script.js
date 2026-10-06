/* =====================================================
   Asif Ali - Portfolio JavaScript (Vanilla JS, no libraries)
   Features:
   1.  Dark / Light theme toggle (saved in localStorage)
   2.  Mobile hamburger menu
   3.  Smooth navigation (menu closes after a click)
   4.  Active navigation link while scrolling
   5.  Scroll reveal animations
   6.  Contact form validation + success/error messages
   7.  Back-to-top button
   8.  Dynamic current year in footer
   9.  Extras: navbar shadow, profile photo fallback, demo-button toast
   ===================================================== */

// Tell CSS that JavaScript is running (used by the .reveal animation rules)
document.documentElement.classList.add("js");

// Wait until the HTML is fully loaded before running our code
document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------
       Grab the elements we need (one time, at the start)
       ------------------------------------------------- */
    var root          = document.documentElement;
    var header        = document.getElementById("siteHeader");
    var themeToggle   = document.getElementById("themeToggle");
    var menuToggle    = document.getElementById("menuToggle");
    var navLinks      = document.getElementById("navLinks");
    var navLinkItems  = document.querySelectorAll(".nav-link");
    var backToTop     = document.getElementById("backToTop");
    var form          = document.getElementById("contactForm");
    var formStatus    = document.getElementById("formStatus");
    var toast         = document.getElementById("toast");


    /* =================================================
       1. DARK / LIGHT THEME
       The theme is stored as data-theme="dark" or "light"
       on the <html> tag. CSS variables do the rest.
       ================================================= */
    function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem("theme", theme); } catch (e) { /* ignore if blocked */ }
    }

    themeToggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        setTheme(current === "light" ? "dark" : "light");
    });


    /* =================================================
       2. MOBILE HAMBURGER MENU
       Clicking the button adds/removes the "open" class.
       ================================================= */
    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }

    menuToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Press Escape to close the menu
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") { closeMenu(); }
    });


    /* =================================================
       3. SMOOTH NAVIGATION
       Smooth scrolling itself is done in CSS (scroll-behavior).
       Here we only close the mobile menu after a link is tapped.
       ================================================= */
    navLinkItems.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });


    /* =================================================
       4. ACTIVE NAVIGATION LINK
       IntersectionObserver tells us which section is in view,
       and we highlight the matching menu link.
       ================================================= */
    var sections = document.querySelectorAll("main section[id]");

    function setActiveLink(id) {
        navLinkItems.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", isActive);
            if (isActive) { link.setAttribute("aria-current", "true"); }
            else { link.removeAttribute("aria-current"); }
        });
    }

    if ("IntersectionObserver" in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { setActiveLink(entry.target.id); }
            });
        }, {
            // A section counts as "current" when it crosses the middle band of the screen
            rootMargin: "-45% 0px -50% 0px"
        });
        sections.forEach(function (section) { sectionObserver.observe(section); });
    }


    /* =================================================
       5. SCROLL REVEAL ANIMATIONS
       Elements with class "reveal" fade in when they enter the screen.
       ================================================= */
    var revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);   // animate only once
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) { revealObserver.observe(item); });
    } else {
        // Very old browsers: just show everything
        revealItems.forEach(function (item) { item.classList.add("visible"); });
    }


    /* =================================================
       6. CONTACT FORM VALIDATION
       This is a frontend-only form. It checks the input and shows a
       message, but it does NOT send anything to a server.
       ================================================= */

    // Show an error under one field (or clear it when message is "")
    function setFieldError(fieldId, message) {
        var input = document.getElementById(fieldId);
        var errorBox = document.getElementById(fieldId + "Error");
        input.parentElement.classList.toggle("invalid", message !== "");
        errorBox.textContent = message;
    }

    // Simple email pattern: something@something.something
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    // Check every field. Returns true only if all of them are valid.
    function validateForm() {
        // Note: we use getElementById (not form.name) because form.name is the
        // form's own "name" attribute, not the input field.
        var name    = document.getElementById("name").value.trim();
        var email   = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();
        var valid   = true;

        if (name.length < 2) {
            setFieldError("name", "Please enter your name (at least 2 characters).");
            valid = false;
        } else { setFieldError("name", ""); }

        if (email === "") {
            setFieldError("email", "Please enter your email address.");
            valid = false;
        } else if (!isValidEmail(email)) {
            setFieldError("email", "Please enter a valid email address.");
            valid = false;
        } else { setFieldError("email", ""); }

        if (subject.length < 3) {
            setFieldError("subject", "Please enter a subject (at least 3 characters).");
            valid = false;
        } else { setFieldError("subject", ""); }

        if (message.length < 10) {
            setFieldError("message", "Your message should be at least 10 characters.");
            valid = false;
        } else { setFieldError("message", ""); }

        return valid;
    }

    function showStatus(text, type) {
        formStatus.textContent = text;
        formStatus.className = "form-status " + type;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();   // stop the page from reloading

        if (validateForm()) {
            showStatus("Thank you! Your message has been prepared successfully.", "success");
            form.reset();
            // Hide the success message after 6 seconds
            setTimeout(function () { showStatus("", ""); }, 6000);
        } else {
            showStatus("Please fix the highlighted fields and try again.", "error");
        }
    });

    // Clear an error as soon as the user starts fixing that field
    ["name", "email", "subject", "message"].forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            setFieldError(id, "");
        });
    });


    /* =================================================
       7. BACK-TO-TOP BUTTON + NAVBAR SHADOW
       Both depend on how far the page is scrolled.
       ================================================= */
    function onScroll() {
        var scrolled = window.scrollY;
        backToTop.classList.toggle("show", scrolled > 400);
        header.classList.toggle("scrolled", scrolled > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();   // run once on load

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* =================================================
       8. DYNAMIC CURRENT YEAR IN FOOTER
       ================================================= */
    document.getElementById("year").textContent = new Date().getFullYear();


    /* =================================================
       9. SMALL EXTRAS
       ================================================= */

    // a) Profile photo fallback: if assets/profile.jpg is missing,
    //    show the "AA" placeholder instead of a broken image.
    var profileImg = document.getElementById("profileImg");
    var avatarWrap = profileImg.parentElement;

    function showPlaceholder() { avatarWrap.classList.add("no-image"); }

    profileImg.addEventListener("error", showPlaceholder);
    // If the image already failed before this script ran:
    if (profileImg.complete && profileImg.naturalWidth === 0) { showPlaceholder(); }

    // b) Toast message helper
    var toastTimer;
    function showToast(text) {
        toast.textContent = text;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3000);
    }

    // c) Demo buttons are placeholders until a live demo link is added
    document.querySelectorAll('.demo-link[data-demo="pending"]').forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            showToast("Live demo link coming soon.");
        });
    });

    // d) GitHub buttons that still hold the placeholder link show a hint instead of a broken page
    document.querySelectorAll('a[href="YOUR_PROJECT_GITHUB_LINK"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showToast("Add the real GitHub link for this project in index.html.");
        });
    });
});

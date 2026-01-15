document.addEventListener("DOMContentLoaded", function() {

    const headerHTML = `
    <header>
        <nav>
            <a href="index.html" id="logo-link">
                <img src="logo.jpg" alt="PC-Creations Logo" width="100"> 
            </a>
            
            <ul>
                <li><a href="index.html" id="nav-home">Home</a></li>
                <li><a href="index.html#services" id="nav-services">Leistungen</a></li>
                <li><a href="faq.html" id="nav-faq">FAQ</a></li>
                <li><a href="index.html#contact" id="nav-contact">Kontakt</a></li>
            </ul>
        </nav>
    </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    const footerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-left">
                &copy; 2026 PC-Creations.<br>Alle Rechte vorbehalten.
            </div>
            
            <div class="footer-center">
                <a href="impressum.html">Impressum</a>
                <span class="separator">|</span>
                <a href="datenschutz.html">Datenschutz</a>
                <span class="separator">|</span>
                <a href="#" id="open-cookie-settings">Cookie-Einstellungen</a>
            </div>

            <div class="footer-right social-icons">
                <a href="https://www.instagram.com/pc_creations_at/" target="_blank" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="https://www.facebook.com/people/PC-Creations-by-Samuel/100089715983825/" target="_blank" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                </a>
                <a href="https://www.youtube.com/@pc-creations" target="_blank" aria-label="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                </a>
            </div>
        </div>
    </footer>
    `;
    
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    const path = window.location.pathname;
    const page = path.split("/").pop(); 

    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => link.classList.remove("active"));

    if (page === "faq.html") {
        const faqLink = document.getElementById("nav-faq");
        if(faqLink) faqLink.classList.add("active");
    }

    const isHome = page === "index.html" || page === "" || page === "/";
    if (isHome) {
        const homeLinks = document.querySelectorAll('a[href="index.html"]');
        homeLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.pushState(null, null, "index.html");
            });
        });
    }

    const cookieHTML = `
    <div id="cookie-banner" style="display: none;">
        <div class="cookie-content">
            <h3>🍪 Cookie-Einstellungen</h3>
            <p>
                Wir nutzen Cookies und externe Dienste. Einige sind essenziell (für die Funktion der Seite). 
                Andere helfen uns, diese Webseite zu verbessern (Statistiken).
                Da wir <strong>Google Analytics</strong> und <strong>Google Maps</strong> nutzen, können Daten in die USA übertragen werden. 
                Mit Klick auf "Alle akzeptieren" willigen Sie in diese Verarbeitung ein.
            </p>
            <p class="cookie-links-text">
                Sie können Ihre Entscheidung jederzeit ändern oder widerrufen.
                <br>
                <a href="impressum.html">Impressum</a> | <a href="datenschutz.html">Datenschutz</a>
            </p>
            
            <div class="cookie-buttons">
                <button id="cookie-decline">Nur notwendige</button>
                <button id="cookie-accept">Alle akzeptieren</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", cookieHTML);

    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    function loadGoogleMaps() {
        const iframe = document.getElementById("google-map-iframe");
        const placeholder = document.getElementById("map-placeholder");

        if (iframe && iframe.getAttribute("data-src")) {
            iframe.src = iframe.getAttribute("data-src");
            iframe.style.display = "block";
            iframe.removeAttribute("data-src");
        }

        if (placeholder) {
            placeholder.style.display = "none";
        }
    }

    function loadAnalytics() {
        console.log("Analytics loading...");
        let script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-6NJ2MFR660";
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6NJ2MFR660', { 'anonymize_ip': true });

        loadGoogleMaps();
    }

    const consent = localStorage.getItem("cookieConsent");
    
    if (!consent) {
        if(banner) banner.style.display = "block";
    } 
    else if (consent === "accepted") {
        loadAnalytics();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "accepted");
            if(banner) banner.style.display = "none";
            loadAnalytics();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener("click", function() {
            const wasAccepted = localStorage.getItem("cookieConsent") === "accepted";
            
            localStorage.setItem("cookieConsent", "declined");
            if(banner) banner.style.display = "none";

            if (wasAccepted) {
                location.reload(); 
            }
        });
    }

    const loadMapBtn = document.getElementById("load-map-btn");
    if (loadMapBtn) {
        loadMapBtn.addEventListener("click", function(e) {
            e.preventDefault();
            loadGoogleMaps();
        });
    }

    const settingsLink = document.getElementById("open-cookie-settings");
    if (settingsLink) {
        settingsLink.addEventListener("click", function(e) {
            e.preventDefault();
            if(banner) banner.style.display = "block";
        });
    }
});
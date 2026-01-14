document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. HEADER EINFÜGEN
    // ==========================================
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

    // ==========================================
    // 2. AKTIVE SEITE ERKENNEN
    // ==========================================
    const path = window.location.pathname;
    const page = path.split("/").pop(); 

    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => link.classList.remove("active"));

    if (page === "faq.html") {
        const faqLink = document.getElementById("nav-faq");
        if(faqLink) faqLink.classList.add("active");
    }

    // ==========================================
    // 3. FLACKERN VERHINDERN (Smart Link)
    // ==========================================
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

    // ==========================================
    // 4. COOKIE BANNER HINZUFÜGEN (Optimiert & Transparent)
    // ==========================================
    const cookieHTML = `
    <div id="cookie-banner" style="display: none;">
        <div class="cookie-content">
            <h3>🍪 Datenschutzeinstellungen</h3>
            <p>
                Wir verwenden Cookies und ähnliche Technologien auf unserer Website. Einige von ihnen sind essenziell (z. B. für die Speicherung Ihrer Entscheidung), während andere uns helfen, unser Online-Angebot zu verbessern (<strong>Statistik / Google Analytics</strong>).
            </p>
            <p>
                <strong>Hinweis zur Datenverarbeitung in den USA:</strong> Wenn Sie auf "Alle akzeptieren" klicken, willigen Sie zugleich ein, dass Ihre Daten in den USA verarbeitet werden (z. B. durch Google). US-Behörden könnten theoretisch auf diese Daten zugreifen.
            </p>
            <p class="cookie-links-text">
                Sie können Ihre Auswahl jederzeit unter <a href="datenschutz.html">Datenschutz</a> widerrufen.
                Weitere Informationen finden Sie im <a href="impressum.html">Impressum</a>.
            </p>
            
            <div class="cookie-buttons">
                <button id="cookie-decline">Nur notwendige Cookies</button>
                <button id="cookie-accept">Alle akzeptieren</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", cookieHTML);

    // ==========================================
    // 5. COOKIE & TRACKING LOGIK
    // ==========================================

    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    // --- Die Google Analytics Funktion (Wird erst bei Zustimmung geladen) ---
    function loadAnalytics() {
        console.log("Analytics Cookies erlaubt - Lade Tracking...");
        
        // 1. Skript-Tag erstellen
        let script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-6NJ2MFR660"; // Deine ID
        document.head.appendChild(script);

        // 2. Konfiguration starten
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-6NJ2MFR660', { 'anonymize_ip': true });
    }

    // Prüfen: Wurde schon eine Entscheidung getroffen?
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
        // Keine Entscheidung bisher -> Banner zeigen
        if(banner) banner.style.display = "block";
    } else if (consent === "accepted") {
        // Schon erlaubt -> Analytics direkt laden
        loadAnalytics();
    }

    // Klick auf "Alle akzeptieren"
    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "accepted");
            if(banner) banner.style.display = "none";
            loadAnalytics(); // Tracking starten!
        });
    }

    // Klick auf "Ablehnen"
    if (declineBtn) {
        declineBtn.addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "declined");
            if(banner) banner.style.display = "none";
            // Hier passiert NICHTS weiter. Kein Google Code wird geladen.
        });
    }
});
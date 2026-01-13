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
    // 2. AKTIVE SEITE ERKENNEN (Button blau machen)
    // ==========================================
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Holt z.B. "faq.html"

    // Alle active-Klassen entfernen
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => link.classList.remove("active"));

    if (page === "faq.html") {
        document.getElementById("nav-faq").classList.add("active");
    }

    // ==========================================
    // 3. FLACKERN VERHINDERN (Smart Link)
    // ==========================================
    
    // Prüfen: Sind wir gerade auf der Startseite?
    // (index.html oder einfach nur "/" bei GitHub Pages)
    const isHome = page === "index.html" || page === "" || page === "/";

    if (isHome) {
        // Wir suchen das Logo UND den Home-Text-Link
        const homeLinks = document.querySelectorAll('a[href="index.html"]');

        homeLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                // STOPP! Nicht neu laden!
                event.preventDefault();
                
                // Stattdessen weich nach oben scrollen
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                
                // URL in der Adresszeile "säubern" (falls z.B. #contact da stand)
                history.pushState(null, null, "index.html");
            });
        });
    }
});
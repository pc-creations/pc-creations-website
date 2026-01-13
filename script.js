document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. ELEMENTE AUSWÄHLEN
    // ==========================================
    
    const modal = document.getElementById("contact-modal");
    
    // Der Start-Button existiert nur auf der Hauptseite (index.html).
    // Auf FAQ/Impressum ist er null. Das müssen wir beachten.
    const btn = document.querySelector("#start button"); 
    
    const closeBtn = document.getElementsByClassName("close-btn")[0]; 
    
    // Formular-Container
    const formContainer = document.getElementById("form-container");
    const successContainer = document.getElementById("success-container");
    
    const form = document.getElementById("my-form");
    const errorMsg = document.getElementById("form-error-msg");

    // ==========================================
    // 2. MODAL LOGIK (Öffnen/Schließen)
    // ==========================================

    // Nur ausführen, wenn der Button tatsächlich da ist (also auf der Startseite)
    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
            resetModal(); 
        }
    }

    // Modal schließen
    function closeModal() {
        if(modal) modal.style.display = "none";
        resetModal();
    }

    // Klick auf das X
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Klick neben das Fenster (Hintergrund) schließt es auch
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Formular zurücksetzen (für den nächsten Aufruf)
    function resetModal() {
        if(formContainer) formContainer.style.display = "block";   
        if(successContainer) successContainer.style.display = "none"; 
        if(form) form.reset();                            
        if(errorMsg) errorMsg.innerHTML = "";                 
    }

    // ==========================================
    // 3. FORMULAR LOGIK (Validierung & Senden)
    // ==========================================

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); 
            
            // Button holen um ihn gleich zu deaktivieren
            const submitBtn = form.querySelector("button[type='submit']");
            errorMsg.innerHTML = ""; // Alte Fehlermeldungen löschen

            // --- DATEN SAMMELN ---
            const formData = new FormData(form);
            const email = formData.get("email");
            const phone = formData.get("phone");
            const honeypot = formData.get("_gotcha"); // Das unsichtbare Feld

            // --- A. SPAM CHECK (Honeypot) ---
            // Wenn ein Bot das versteckte Feld ausgefüllt hat: Abbruch!
            if (honeypot) {
                console.log("Bot detected!");
                // Wir tun so, als ob es geklappt hätte, damit der Bot nicht weitermacht
                formContainer.style.display = "none";
                successContainer.style.display = "block";
                return; 
            }

            // --- B. VALIDIERUNG (Eingaben prüfen) ---

            // E-Mail Prüfung (Muss Text @ Text . Text sein)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errorMsg.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
                return; 
            }

            // Telefon Prüfung (Nur wenn was eingetippt wurde)
            // Erlaubt: +, Zahlen, Leerzeichen, -, (), min. 6 Zeichen
            if (phone && phone.trim() !== "") {
                const phonePattern = /^[+0-9\s\-\(\)]{6,}$/;
                if (!phonePattern.test(phone)) {
                    errorMsg.innerHTML = "Bitte geben Sie eine gültige Telefonnummer ein.";
                    return; 
                }
            }

            // --- C. ABSENDEN AN FORMSPREE ---
            
            // Button sperren, damit man nicht doppelt klickt
            submitBtn.disabled = true;
            submitBtn.innerText = "Senden...";

            fetch(event.target.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    // Erfolg: Formular weg, Danke-Text her
                    formContainer.style.display = "none";
                    successContainer.style.display = "block";
                    
                    // Im Modal nach oben scrollen, damit man den Text sieht
                    document.querySelector('.modal-content').scrollTop = 0;
                } else {
                    // Fehler von Formspree anzeigen
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            errorMsg.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            errorMsg.innerHTML = "Oops! Es gab ein Problem beim Senden.";
                        }
                    });
                }
            }).catch(error => {
                errorMsg.innerHTML = "Netzwerkfehler. Bitte später erneut versuchen.";
            }).finally(() => {
                // Button wieder freigeben (falls Fehler auftrat)
                submitBtn.disabled = false;
                submitBtn.innerText = "Absenden";
            });
        });
    }
});
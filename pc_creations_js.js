document.addEventListener("DOMContentLoaded", function() {
    
    // Elemente auswählen
    const modal = document.getElementById("contact-modal");
    const btn = document.querySelector("#start button"); 
    const closeBtn = document.getElementsByClassName("close-btn")[0]; 
    
    // Container auswählen
    const formContainer = document.getElementById("form-container");
    const successContainer = document.getElementById("success-container");
    // const closeSuccessBtn ... ENTFERNT, da Button weg ist

    const form = document.getElementById("my-form");
    const errorMsg = document.getElementById("form-error-msg");

    // --- MODAL ÖFFNEN ---
    btn.onclick = function() {
        modal.style.display = "block";
        resetModal(); 
    }

    // --- MODAL SCHLIESSEN ---
    function closeModal() {
        modal.style.display = "none";
        resetModal();
    }

    closeBtn.onclick = closeModal;

    // --- ZURÜCKSETZEN ---
    function resetModal() {
        formContainer.style.display = "block";   
        successContainer.style.display = "none"; 
        form.reset();                            
        errorMsg.innerHTML = "";                 
    }

    // --- FORMULAR SENDEN ---
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); 
        
        const data = new FormData(event.target);
        const submitBtn = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.innerText = "Senden...";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                // Formular weg, Text an
                formContainer.style.display = "none";
                successContainer.style.display = "block";
                
                // Nach oben scrollen
                document.querySelector('.modal-content').scrollTop = 0;
            } else {
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
            submitBtn.disabled = false;
            submitBtn.innerText = "Absenden";
        });
    });
});
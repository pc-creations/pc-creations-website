document.addEventListener("DOMContentLoaded", function() {

    const modal = document.getElementById("contact-modal");
    const btn = document.querySelector("#start button"); 
    const closeBtn = document.getElementsByClassName("close-btn")[0]; 

    if (btn && modal) {
        btn.onclick = function() {
            modal.style.display = "block";
            resetFormStates(); 
        }
    }

    function closeModal() {
        if(modal) modal.style.display = "none";
        resetFormStates();
    }

    if (closeBtn && modal) {
        closeBtn.onclick = closeModal;
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }

    function resetFormStates() {
        const formContainer = document.getElementById("form-container");
        const successContainer = document.getElementById("success-container");
        const form = document.getElementById("contact-form");
        const errorMsg = document.getElementById("form-error-msg");

        if(formContainer) formContainer.style.display = "block";   
        if(successContainer) successContainer.style.display = "none"; 
        if(form) form.reset();                            
        if(errorMsg) errorMsg.innerHTML = "";                 
    }

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const formContainer = document.getElementById("form-container");
            const successContainer = document.getElementById("success-container");
            const errorMsg = document.getElementById("form-error-msg");
            const submitBtn = form.querySelector("button[type='submit']");

            errorMsg.innerHTML = "";

            const formData = new FormData(form);
            const email = formData.get("email");
            const phone = formData.get("phone");
            const honeypot = formData.get("_gotcha");

            if (honeypot) {
                console.log("Spam detected");
                if(formContainer) formContainer.style.display = "none";
                if(successContainer) successContainer.style.display = "block";
                return; 
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errorMsg.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
                return; 
            }

            if (phone && phone.trim() !== "") {
                const phonePattern = /^[+0-9\s\-\(\)]{6,}$/;
                if (!phonePattern.test(phone)) {
                    errorMsg.innerHTML = "Bitte geben Sie eine gültige Telefonnummer ein.";
                    return; 
                }
            }

            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Senden...";

            emailjs.sendForm('service_2oe8qfd', 'template_97p9mzd', this)
                .then(function() {
                    console.log('E-Mail erfolgreich gesendet!');
                    
                    if(formContainer) formContainer.style.display = "none";
                    if(successContainer) successContainer.style.display = "block";
                    const modalContent = document.querySelector('.modal-content');
                    if(modalContent) modalContent.scrollTop = 0;
                    
                    form.reset();
                }, function(error) {
                    console.log('Fehler beim Senden:', error);
                    errorMsg.innerHTML = "Es gab ein technisches Problem. Bitte versuchen Sie es später noch einmal oder schreiben Sie mir direkt per E-Mail.";
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                });
        });
    }
});
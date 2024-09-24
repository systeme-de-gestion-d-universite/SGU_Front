
    document.addEventListener("DOMContentLoaded", function() {
        // Sélection des deux contenus à masquer/afficher
        const firstAdminPageContent = document.querySelectorAll(".admin-page-content")[0];
        const secondAdminPageContent = document.querySelectorAll(".admin-page-content")[1];
        const filiere=document.querySelectorAll(".filiere-item");
        const firsttableaufiliere=document.querySelectorAll("tableau-filiere")[0]
        const secondtableaufiliere=document.querySelectorAll("tableau-filiere")[1]
        // On masque le second contenu par défaut filiere-item
        secondAdminPageContent.style.display = "none";

        // Ajout d'un événement de clic sur les départements
        document.querySelectorAll(".liste-item").forEach(item => {
            item.addEventListener("click", function(event) {
                event.preventDefault();  // Empêche le lien de rediriger

                // Lorsque l'utilisateur clique sur un département :
                // - Masquer le premier contenu
                firstAdminPageContent.style.display = "none";

                // - Afficher le second contenu
                secondAdminPageContent.style.display = "block";
            });
            
        });
    });

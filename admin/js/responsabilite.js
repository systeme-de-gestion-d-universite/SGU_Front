document.getElementById("openPopup").onclick = function() {
    document.getElementById("popupForm").style.display = "block";
};

document.getElementById("closePopup").onclick = function() {
    document.getElementById("popupForm").style.display = "none";
};

window.onclick = function(event) {
    if (event.target == document.getElementById("popupForm")) {
        document.getElementById("popupForm").style.display = "none";
    }
};

// Gestion de la soumission du formulaire
document.getElementById("responsableForm").onsubmit = function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const nom = document.getElementById("nom").value;
    const matricule = document.getElementById("matricule").value;
    const fonction = document.getElementById("fonction").value;
    const etablissement = document.getElementById("etablissement").value;
    const titre = document.getElementById("titre").value;
    const services = document.getElementById("services").value;

    // Ajouter une nouvelle ligne dans le tableau
    const table = document.querySelector("table tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input class="form-checkbox" type="checkbox"></td>
        <td>${nom}</td>
        <td>${matricule}</td>
        <td>${fonction}</td>
        <td>${etablissement}</td>
        <td>${titre}</td>
        <td>${services}</td>
        <td><a href="#">modifier</a> | <a href="#">supprimer</a></td>
    `;
    table.appendChild(row);

    // Fermer le pop-up après soumission
    document.getElementById("popupForm").style.display = "none";

    // Réinitialiser le formulaire
    document.getElementById("responsableForm").reset();
};

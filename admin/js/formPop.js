 // // Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du pop-up de recrutement
    document.getElementById("recrutBtn").onclick = function() {
        clearForm();
        document.getElementById("recrutPopup").style.display = "block";
    };

    document.querySelector(".close-btn").onclick = function() {
        document.getElementById("recrutPopup").style.display = "none";
    };

    // Enregistrement d'un nouveau personnel ou mise à jour
    document.getElementById("saveBtn").onclick = function() {
        const nomPrenom = document.getElementById("nomPrenom").value;
        const matricule = document.getElementById("matriculeInput").value;
        const fonction = document.getElementById("fonctionInput").value;
        const etablissement = document.getElementById("etablissementInput").value;
        const services = document.getElementById("servicesInput").value;
        const date = document.getElementById("dateInput").value;

        const selectedRow = document.querySelector("#personnelTableBody tr.selected");
        if (selectedRow) {
            // Mettre à jour la ligne existante
            updateRow(selectedRow, nomPrenom, matricule, fonction, etablissement, services, date);
        } else {
            // Ajouter une nouvelle ligne
            addNewRow(nomPrenom, matricule, fonction, etablissement, services, date);
        }

        clearForm();
        document.getElementById("recrutPopup").style.display = "none";
    };

    // Gestion de la modification et suppression des lignes
    document.getElementById("personnelTableBody").addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            if (confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
                e.target.closest('tr').remove();
            }
        } else if (e.target.classList.contains('edit-btn')) {
            e.preventDefault();
            const row = e.target.closest('tr');
            fillFormForEdit(row);
            row.classList.add('selected');
            document.getElementById("recrutPopup").style.display = "block";
        } else if (e.target.classList.contains('btn-modify')) {
            handleModifyButton(e.target);
        } else if (e.target.classList.contains('btn-success') && e.target.textContent === 'Ajouter') {
            handleAddButton(e.target);
        } else if (e.target.classList.contains('btn-danger') && e.target.textContent === 'Retirer') {
            handleRemoveButton(e.target);
        }
    });

    // Fonctionnalité de recherche par matricule
    document.getElementById("matricule").addEventListener("input", function() {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#personnelTableBody tr");

        rows.forEach(row => {
            const matriculeCell = row.cells[2].textContent.toLowerCase();
            row.style.display = matriculeCell.includes(filter) ? "" : "none";
        });
    });
});

// Fonctions utilitaires
function clearForm() {
    const formInputs = ["nomPrenom", "matriculeInput", "fonctionInput", "etablissementInput", "servicesInput", "dateInput"];
    formInputs.forEach(id => document.getElementById(id).value = "");
    document.querySelector("#personnelTableBody tr.selected")?.classList.remove('selected');
}

function updateRow(row, nomPrenom, matricule, fonction, etablissement, services, date) {
    const cells = row.cells;
    cells[1].textContent = nomPrenom;
    cells[2].textContent = matricule;
    cells[3].textContent = fonction;
    cells[4].textContent = etablissement;
    cells[5].textContent = services;
    cells[6].textContent = date;
}

function addNewRow(nomPrenom, matricule, fonction, etablissement, services, date) {
    const tableBody = document.getElementById("personnelTableBody");
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td><input class="form-checkbox" type="checkbox"></td>
        <td>${nomPrenom}</td>
        <td>${matricule}</td>
        <td>${fonction}</td>
        <td>${etablissement}</td>
        <td>${services}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-primary btn-modify">Modifier</button>
            <button class="btn btn-danger delete-btn">Supprimer</button>
        </td>
    `;
}

function fillFormForEdit(row) {
    const cells = row.cells;
    document.getElementById("nomPrenom").value = cells[1].textContent;
    document.getElementById("matriculeInput").value = cells[2].textContent;
    document.getElementById("fonctionInput").value = cells[3].textContent;
    document.getElementById("etablissementInput").value = cells[4].textContent;
    document.getElementById("servicesInput").value = cells[5].textContent;
    document.getElementById("dateInput").value = cells[6].textContent;
}

function handleModifyButton(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td:not(:first-child):not(:last-child)');
    
    if (button.textContent === 'Modifier') {
        cells.forEach(cell => {
            if (!cell.querySelector('select')) {
                const text = cell.textContent;
                cell.innerHTML = `<input type="text" value="${text}" class="form-control">`;
            }
        });
        button.textContent = 'Sauvegarder';
        button.classList.replace('btn-primary', 'btn-success');
    } else {
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            if (input) {
                cell.textContent = input.value;
            }
        });
        button.textContent = 'Modifier';
        button.classList.replace('btn-success', 'btn-primary');
        console.log('Modifications sauvegardées pour la ligne:', row.rowIndex);
    }
}

function handleAddButton(button) {
    const row = button.closest('tr');
    const selectElement = row.querySelector('select');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption) {
        console.log('Ajouter enseignant:', selectedOption.text, 'à', row.querySelector('td:nth-child(3)').textContent);
        // Logique pour ajouter l'enseignant
    }
}

function handleRemoveButton(button) {
    const row = button.closest('tr');
    const selectElement = row.querySelector('select');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption) {
        console.log('Retirer enseignant:', selectedOption.text, 'de', row.querySelector('td:nth-child(3)').textContent);
        // Logique pour retirer l'enseignant
    }
}
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
 const personnel = [];

    function addPersonnel(nom, matricule, fonction, etablissement, services, date) {
        personnel.push({ nom, matricule, fonction, etablissement, services, date });
        renderTable();
    }

    function renderTable() {
        const tableBody = document.getElementById("personnelTableBody");
        tableBody.innerHTML = "";

        personnel.forEach((p, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" class="form-checkbox"></td>
                <td>${p.nom}</td>
                <td>${p.matricule}</td>
                <td>${p.fonction}</td>
                <td>${p.etablissement}</td>
                <td>${p.services}</td>
                <td>${p.date}</td>
                <td>
                    <button class="btn btn-danger" onclick="deletePersonnel(${index})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function deletePersonnel(index) {
        personnel.splice(index, 1);
        renderTable();
    }

    function filterTable() {
        const searchTerm = document.getElementById("matricule").value.toLowerCase();
        const department = document.getElementById("departmentFilter").value;
        const filteredPersonnel = personnel.filter(p => {
            const matchesMatricule = p.matricule.toLowerCase().includes(searchTerm);
            const matchesDepartment = department === "" || p.etablissement === department;
            return matchesMatricule && matchesDepartment;
        });
        renderFilteredTable(filteredPersonnel);
    }
// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.getElementById("recrutBtn").onclick = showRecruitmentPopup;
    document.querySelector(".close-btn").onclick = hideRecruitmentPopup;
    document.getElementById("saveBtn").onclick = savePersonnel;
    document.getElementById("personnelTableBody").addEventListener('click', handleTableEvents);
    document.getElementById("matricule").addEventListener("input", filterByMatricule);
}

function showRecruitmentPopup() {
    clearForm();
    document.getElementById("recrutPopup").style.display = "block";
}

function hideRecruitmentPopup() {
    document.getElementById("recrutPopup").style.display = "none";
}

function savePersonnel() {
    const personnel = getPersonnelData();
    const selectedRow = document.querySelector("#personnelTableBody tr.selected");
    
    if (selectedRow) {
        updateRow(selectedRow, personnel);
    } else {
        addNewRow(personnel);
    }

    clearForm();
    hideRecruitmentPopup();
}

function getPersonnelData() {
    return {
        nomPrenom: document.getElementById("nomPrenom").value,
        matricule: document.getElementById("matriculeInput").value,
        fonction: document.getElementById("fonctionInput").value,
        etablissement: document.getElementById("etablissementInput").value,
        services: document.getElementById("servicesInput").value,
        date: document.getElementById("dateInput").value
    };
}

function handleTableEvents(e) {
    if (e.target.classList.contains('delete-btn')) {
        handleDeleteButton(e);
    } else if (e.target.classList.contains('edit-btn')) {
        handleEditButton(e);
    } else if (e.target.classList.contains('btn-modify')) {
        handleModifyButton(e.target);
    } else if (e.target.classList.contains('btn-success') && e.target.textContent === 'Ajouter') {
        handleAddButton(e.target);
    } else if (e.target.classList.contains('btn-danger') && e.target.textContent === 'Retirer') {
        handleRemoveButton(e.target);
    }
}

function handleDeleteButton(e) {
    e.preventDefault();
    if (confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
        e.target.closest('tr').remove();
    }
}

function handleEditButton(e) {
    e.preventDefault();
    const row = e.target.closest('tr');
    fillFormForEdit(row);
    row.classList.add('selected');
    showRecruitmentPopup();
}

function filterByMatricule() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#personnelTableBody tr");

    rows.forEach(row => {
        const matriculeCell = row.cells[2].textContent.toLowerCase();
        row.style.display = matriculeCell.includes(filter) ? "" : "none";
    });
}

function clearForm() {
    const formInputs = ["nomPrenom", "matriculeInput", "fonctionInput", "etablissementInput", "servicesInput", "dateInput"];
    formInputs.forEach(id => document.getElementById(id).value = "");
    document.querySelector("#personnelTableBody tr.selected")?.classList.remove('selected');
}

function updateRow(row, personnel) {
    const cells = row.cells;
    Object.values(personnel).forEach((value, index) => {
        cells[index + 1].textContent = value;
    });
}

function addNewRow(personnel) {
    const tableBody = document.getElementById("personnelTableBody");
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td><input class="form-checkbox" type="checkbox"></td>
        ${Object.values(personnel).map(value => `<td>${value}</td>`).join('')}
        <td>
            <button class="btn btn-primary btn-modify">Modifier</button>
            <button class="btn btn-danger delete-btn">Supprimer</button>
        </td>
    `;
}

function fillFormForEdit(row) {
    const cells = row.cells;
    const formInputs = ["nomPrenom", "matriculeInput", "fonctionInput", "etablissementInput", "servicesInput", "dateInput"];
    formInputs.forEach((id, index) => {
        document.getElementById(id).value = cells[index + 1].textContent;
    });
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
document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.getElementById('requestForm');
    const requestsTableBody = document.querySelector('#requestsTable tbody');
  
    // Fonction pour générer un ID unique (simple)
    function generateUniqueId() {
      return 'EXAM-' + Date.now();
    }
  
    // Fonction pour créer une nouvelle ligne dans le tableau
    function addRequestToTable(requestData) {
      const row = document.createElement('tr');
  
      // Création des cellules
      const idCell = document.createElement('td');
      idCell.textContent = requestData.examId;
      row.appendChild(idCell);
  
      const examNameCell = document.createElement('td');
      examNameCell.textContent = requestData.examName;
      row.appendChild(examNameCell);
  
      const studentNameCell = document.createElement('td');
      studentNameCell.textContent = requestData.studentName;
      row.appendChild(studentNameCell);
  
      const matriculeCell = document.createElement('td');
      matriculeCell.textContent = requestData.studentMatricule;
      row.appendChild(matriculeCell);
  
      const gradeCell = document.createElement('td');
      gradeCell.textContent = requestData.grade;
      row.appendChild(gradeCell);
  
      const annonymatCell = document.createElement('td');
      annonymatCell.textContent = requestData.annonymat;
      row.appendChild(annonymatCell);
  
      const statusCell = document.createElement('td');
      statusCell.textContent = requestData.status;
      row.appendChild(statusCell);
  
      const requestTypeCell = document.createElement('td');
      requestTypeCell.textContent = requestData.requestType;
      row.appendChild(requestTypeCell);
  
      // Bouton Détails
      const detailsCell = document.createElement('td');
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'Détails';
      detailsButton.classList.add('details-button');
      detailsButton.addEventListener('click', function() {
        afficherDetails(requestData);
      });
      detailsCell.appendChild(detailsButton);
      row.appendChild(detailsCell);
  
      // Ajout de la ligne au tableau
      requestsTableBody.appendChild(row);
    }
  
    // Fonction pour afficher les détails (par exemple, dans une alerte)
    function afficherDetails(data) {
      const details = `
        ID Examen: ${data.examId}
        Nom Examen: ${data.examName}
        Nom Étudiant: ${data.studentName}
        Matricule: ${data.studentMatricule}
        Note: ${data.grade}
        annonymat: ${data.annonymat}
        Statut: ${data.status}
        Nature Requête: ${data.requestType}
      `;
      alert(details);
    }
  
    // Gestion de la soumission du formulaire
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Récupération des valeurs du formulaire
      const examName = document.getElementById('examName').value;
      const studentName = document.getElementById('studentName').value.trim();
      const studentMatricule = document.getElementById('studentMatricule').value.trim();
      const grade = document.getElementById('grade').value;
      const annonymat = document.getElementById('annonymat').value.trim();
      const status = document.getElementById('status').value.trim();
      const requestType = document.getElementById('requestType').value;
  
      // Validation supplémentaire si nécessaire
      if (!examName || !studentName || !studentMatricule || !grade || !annonymat || !status || !requestType) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
  
      // Génération de l'ID d'examen unique
      const examId = generateUniqueId();
      document.getElementById('examId').value = examId;
  
      // Création de l'objet de données
      const requestData = {
        examId,
        examName,
        studentName,
        studentMatricule,
        grade,
        annonymat,
        status,
        requestType
      };
  
      // Ajout des données au tableau
      addRequestToTable(requestData);
  
      // Réinitialisation du formulaire
      requestForm.reset();
      document.getElementById('examId').value = '';
  
      // Optionnel : afficher une confirmation
      alert('Requête envoyée avec succès !');
    });
  });
  
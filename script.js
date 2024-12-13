const formAdd = document.getElementById('athlete-add-form');
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const sportInput = document.getElementById('sport');
const nationalityInput = document.getElementById('nationality');

const formUpdate = document.getElementById('athlete-update-form');
const idInputUpdate = document.getElementById('idUpdate');
const nameInputUpdate = document.getElementById('nameUpdate');
const sportInputUpdate = document.getElementById('sportUpdate');
const nationalityInputUpdate = document.getElementById('nationalityUpdate');

const tbody = document.getElementById('tbody');

// Load all athletes when the page is loaded
getAllAthletes();

// Fetch all athletes from the server
async function getAllAthletes() {
    try {
        const response = await fetch('http://localhost:3000/athletes');

        if (!response.ok) {
            throw new Error(`Greška: ${response.status} - ${response.statusText}`);
        }

        const athletes = await response.json();
        updateTable(athletes);
    } catch (error) {
        console.error('Došlo je do greške prilikom dohvaćanja sportista:', error);
    }
}

// Add a new athlete to the server
async function addAthlete(athlete) {
    try {
        const response = await fetch('http://localhost:3000/athletes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(athlete)
        });

        if (!response.ok) {
            throw new Error(`Greška: ${response.status} - ${response.statusText}`);
        }

        getAllAthletes();
    } catch (error) {
        console.error('Došlo je do greške prilikom dodavanja sportiste:', error);
    }
}

// Update an athlete's data on the server
async function updateAthlete(athlete) {
    try {
        const response = await fetch(`http://localhost:3000/athletes/${athlete.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(athlete)
        });

        if (!response.ok) {
            throw new Error(`Greška: ${response.status} - ${response.statusText}`);
        }

        getAllAthletes();
    } catch (error) {
        console.error('Došlo je do greške prilikom ažuriranja sportista:', error);
    }
}

// Delete an athlete from the server
async function deleteAthlete(id) {
    try {
        const response = await fetch(`http://localhost:3000/athletes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Greška: ${response.status} - ${response.statusText}`);
        }

        getAllAthletes();
    } catch (error) {
        console.error('Došlo je do greške prilikom brisanja sportista:', error);
    }
}

// Fill the update form with the athlete's data
function updateTable(athletes) {
    tbody.innerHTML = '';

    athletes.forEach(athlete => {
        let tr = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.innerHTML = athlete.id;

        let tdName = document.createElement('td');
        tdName.innerHTML = athlete.name;

        let tdSport = document.createElement('td');
        tdSport.innerHTML = athlete.sport;

        let tdNationality = document.createElement('td');
        tdNationality.innerHTML = athlete.nationality;

        let tdBtnEdit = document.createElement('td');
        let BtnEdit = document.createElement('button');
        BtnEdit.innerHTML = 'Edit';
        BtnEdit.type = 'button';
        BtnEdit.className = "btn btn-success"
        BtnEdit.addEventListener('click', () => fillUpdateForm(athlete));
        tdBtnEdit.appendChild(BtnEdit);

        let tdBtnDelete = document.createElement('td');
        let BtnDelete = document.createElement('button');
        BtnDelete.innerHTML = 'Delete';
        BtnDelete.type = 'button';
        BtnDelete.className = "btn btn-danger"
        BtnDelete.addEventListener('click', () => deleteAthlete(athlete.id));
        tdBtnDelete.appendChild(BtnDelete);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSport);
        tr.appendChild(tdNationality);
        tr.appendChild(tdBtnEdit);
        tr.appendChild(tdBtnDelete);

        tbody.appendChild(tr);
    });
}

// Function to fill the update form with the athlete's data
function fillUpdateForm(athlete) {
    idInputUpdate.value = athlete.id;
    nameInputUpdate.value = athlete.name;
    sportInputUpdate.value = athlete.sport;
    nationalityInputUpdate.value = athlete.nationality;
}

// Event listener for adding an athlete
formAdd.addEventListener('submit', function (event) {
    event.preventDefault();

    const athlete = {
        "name": nameInput.value,
        "sport": sportInput.value,
        "nationality": nationalityInput.value
    };

    addAthlete(athlete);
    formAdd.reset();
});

// Event listener for updating an athlete
formUpdate.addEventListener('submit', function (event) {
    event.preventDefault();

    const athlete = {
        "id": idInputUpdate.value,
        "name": nameInputUpdate.value,
        "sport": sportInputUpdate.value,
        "nationality": nationalityInputUpdate.value
    };

    updateAthlete(athlete);
    formUpdate.reset();
});
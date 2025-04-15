const apiUrl = 'http://localhost:3000/ora';

const napok = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];

async function loadOrak() {
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    const tbody = document.querySelector('#orak-table tbody');
    tbody.innerHTML = '';

    data.forEach((ora, index) => {
        const sor = document.createElement('tr');

        const napokCella = document.createElement('td');
        napokCella.textContent = napok[index] || "";
        sor.appendChild(napokCella);

        const orakSorSzama = ['elso', 'masodik', 'harmadik', 'negyedik', 'otodik', 'hatodik', 'hetedik', 'nyolcadik'];
        orakSorSzama.forEach(szam => {
            const cella = document.createElement('td');
            cella.textContent = ora[szam];
            cella.style.backgroundColor = '#22f5ea';
            napokCella.classList.add('nap-cell');
            sor.appendChild(cella);
        });

        sor.dataset.id = ora.id;
        tbody.appendChild(sor);
    });
}


function showEditForm() {
    document.getElementById('edit-form').style.display = 'block';
}

async function submitEdit() {
    const id = document.getElementById('edit-id').value;
    const field = document.getElementById('edit-field').value;
    const newValue = document.getElementById('edit-value').value;

    if (!id || !field || newValue === "") {
        alert("Kérlek tölts ki minden mezőt.");
        return;
    }

    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const existingOra = data[id]; 
    const dbId = existingOra.id;

    if (!existingOra) {
        alert("Érvénytelen index.");
        return;
    }

    existingOra[field] = newValue;

    if (!existingOra.nap) {
        existingOra.nap = napok[id]; 
    }

    const updateResp = await fetch(`${apiUrl}/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(existingOra)
    });

    if (updateResp.ok) {
        loadOrak();
        document.getElementById('edit-form').style.display = 'none';
    } else {
        const errorText = await updateResp.text();
        alert("Nem sikerült frissíteni: " + errorText);
    }
}

function showDeleteForm() {
    document.getElementById('delete-cell-form').style.display = 'block';
}

async function deleteCell() {
    const index = document.getElementById('delete-id').value;
    const field = document.getElementById('delete-field').value;

    if (!index || !field) {
        alert("Kérlek tölts ki minden mezőt.");
        return;
    }

    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const ora = data[index];

    if (!ora || !(field in ora)) {
        alert("Érvénytelen ID vagy mező.");
        return;
    }

    ora[field] = ""; 

    const dbId = ora.id; 

    const updateResp = await fetch(`${apiUrl}/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ora)
    });

    if (updateResp.ok) {
        loadOrak();
        document.getElementById('delete-cell-form').style.display = 'none';
    } else {
        const errorText = await updateResp.text();
        alert("Nem sikerült törölni: " + errorText);
    }
}

document.addEventListener('DOMContentLoaded', loadOrak);
var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} `;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector("main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#NamaDepan").value = "";
    document.querySelector("#NamaBelakang").value = "";
    document.querySelector("#NPM").value = "";
}

// Save Data to Local Storage
function saveDataToLocalStorage(NamaDepan, NamaBelakang, NPM) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ NamaDepan, NamaBelakang, NPM });
    localStorage.setItem("students", JSON.stringify(students));
}

// Load Data from Local Storage
function loadDataFromLocalStorage() {
    let students = JSON.parse(localStorage.getItem("students")) || [];

       // Add the initial data
       students.push({
        NamaDepan: "Muhamad Saidar",
        NamaBelakang: "Bahrin",
        NPM: "50421880"
    });

    students.push({
        NamaDepan: "Ayu",
        NamaBelakang: "Kartika",
        NPM: "50421523"
    });

    students.push({
        NamaDepan: "Wahyu",
        NamaBelakang: "Pratama",
        NPM: "50421157"
    });

    students.push({
        NamaDepan: "Rani",
        NamaBelakang: "Rinjani",
        NPM: "50421852"
    });

    students.push({
        NamaDepan: "Dito",
        NamaBelakang: "Mahatir",
        NPM: "50421629"
    });

    const list = document.querySelector("#student-list");
    list.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.NamaDepan}</td>
            <td>${student.NamaBelakang}</td>
            <td>${student.NPM}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
        list.appendChild(row);
    });
}

// Update Local Storage
function updateLocalStorage(index, NamaDepan, NamaBelakang, NPM) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = { NamaDepan, NamaBelakang, NPM };
    localStorage.setItem("students", JSON.stringify(students));
}

// Remove from Local Storage
function removeFromLocalStorage(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
}

// Add Data
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromLocalStorage();
});

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const NamaDepan = document.querySelector("#NamaDepan").value;
    const NamaBelakang = document.querySelector("#NamaBelakang").value;
    const NPM = document.querySelector("#NPM").value;

    // Validate
    if (NamaDepan == "" || NamaBelakang == "" || NPM == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${NamaDepan}</td>
                <td>${NamaBelakang}</td>
                <td>${NPM}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                `;
            list.appendChild(row);
            showAlert("Student Added", "success");

            // Save to Local Storage
            saveDataToLocalStorage(NamaDepan, NamaBelakang, NPM);
        } else {
            selectedRow.children[0].textContent = NamaDepan;
            selectedRow.children[1].textContent = NamaBelakang;
            selectedRow.children[2].textContent = NPM;
            showAlert("Student Info Edited", "info");

            // Update Local Storage
            updateLocalStorage(selectedRow.rowIndex - 1, NamaDepan, NamaBelakang, NPM);
        }

        clearFields();
    }
});

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        const rowIndex = target.parentElement.parentElement.rowIndex - 1;
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");

        // Remove from Local Storage
        removeFromLocalStorage(rowIndex);
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        // Find the selected row
        selectedRow = target.parentElement.parentElement;

        // Populate form fields with selected row data
        document.querySelector("#NamaDepan").value = selectedRow.children[0].textContent;
        document.querySelector("#NamaBelakang").value = selectedRow.children[1].textContent;
        document.querySelector("#NPM").value = selectedRow.children[2].textContent;
    } else if (target.classList.contains("delete")) {
        // ... (previous code)
    }
});
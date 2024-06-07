var firebaseUrl = "https://organizatorifestivala-default-rtdb.firebaseio.com";

var userID = [];
var users = {};

function getUsers() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        users = JSON.parse(request.responseText);
        for (let id in users) {
          userID.push(id);
        }
      } else {
        alert("Error occurred. Users could not be loaded.");
      }
    }
  };
  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();
}

getUsers();

function showUserTable() {
  var table = document.getElementById("table-content");
  table.innerHTML = "";
  for (let i = 0; i < userID.length; i++) {
    let user = users[userID[i]];
    table.innerHTML += `
        <tr>
            <td><b>${user.korisnickoIme}</b></td>
            <td>${user.lozinka}</td>
            <td>${user.ime}</td>
            <td>${user.prezime}</td>
            <td>${user.email}</td>
            <td>${user.datumRodjenja}</td>
            <td>${user.adresa}</td>
            <td>${user.telefon}</td>
            <td>${user.zanimanje}</td>
        </tr>
    `;
  }
}

function dropDownMenuEdit() {
  var x = document.getElementById("usernameEdit");
  x.innerHTML = "";
  for (let i = 0; i < userID.length; i++) {
    let user = users[userID[i]];
    x.innerHTML += `
        <option value="${userID[i]}">${user.korisnickoIme}</option>
      `;
  }
}

function displayTable() {
  var x = document.getElementById("myTable");
  if (x.style.display === "none") {
    x.style.display = "block";
    showUserTable();
  } else {
    x.style.display = "none";
  }
}

function displayAddForm() {
  var x = document.getElementById("myAddForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayEditForm() {
  var x = document.getElementById("editUserForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuEdit();
  } else {
    x.style.display = "none";
  }
}

function deleteUser() {
  var x = document.getElementById("deleteUserForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuDelete();
  } else {
    x.style.display = "none";
  }
}

function validateRemoval() {
  let confirmation = confirm(
    "Da li ste sigurni da želite da obrišete korisnika?"
  );
  return confirmation;
}

var deleteButton = document.getElementById("deleteUserButton");
deleteButton.addEventListener("click", function (e) {
  if (validateRemoval()) {
    var selectElement = document.getElementById("usernameDelete");
    var deleteUserID = selectElement.value;
    var request = new XMLHttpRequest();
    request.open(
      "DELETE",
      firebaseUrl + "/korisnici/" + deleteUserID + ".json",
      true
    );
    request.send();
    deleteUserFormMessage("Korisnik je uspešno obrisan.", "success");
  } else {
    deleteUserFormMessage("Brisanje korisnika nije izvršeno.", "error");
  }
});

function dropDownMenuDelete() {
  var x = document.getElementById("usernameDelete");
  x.innerHTML = "";
  for (let i = 0; i < userID.length; i++) {
    let user = users[userID[i]];
    x.innerHTML += `
        <option value="${userID[i]}">${user.korisnickoIme}</option>
      `;
  }
}

function deleteUserFormMessage(message, type) {
  let messageElement = document.getElementById("deleteUserFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

var editUserButton = document.getElementById("editUserButton");
editUserButton.addEventListener("click", function (e) {
  var selectElement = document.getElementById("usernameEdit");
  var userID = selectElement.value;
  var user = users[userID];
  var password = document.getElementById("passwordEdit").value;
  var firstName = document.getElementById("firstNameEdit").value;
  var lastName = document.getElementById("lastNameEdit").value;
  var email = document.getElementById("emailEdit").value;
  var dateOfBirth = document.getElementById("dateOfBirthEdit").value;
  var adress = document.getElementById("adressEdit").value;
  var phoneNumber = document.getElementById("phoneEdit").value;
  var job = document.getElementById("jobEdit").value;
  let updatedUser = {
    korisnickoIme: user.korisnickoIme,
    lozinka: password,
    ime: firstName,
    prezime: lastName,
    email: email,
    datumRodjenja: dateOfBirth,
    adresa: adress,
    telefon: phoneNumber,
    zanimanje: job,
  };
  var request = new XMLHttpRequest();
  if (validateEditUser()) {
    request.open("PATCH", firebaseUrl + "/korisnici/" + userID + ".json", true);
    request.send(JSON.stringify(updatedUser));
    editUserFormMessage("Korisnik uspešno izmenjen", "success");
  }
});

function editUserFormMessage(message, type) {
  let messageElement = document.getElementById("editUserFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = this.getElementById("usernameEdit");
  const password = this.getElementById("passwordEdit");
  const firstName = this.getElementById("firstNameEdit");
  const lastName = this.getElementById("lastNameEdit");
  const email = this.getElementById("emailEdit");
  const dateOfBirth = this.getElementById("dateOfBirthEdit");
  const adress = this.getElementById("adressEdit");
  const phoneNumber = this.getElementById("phoneEdit");
  const job = this.getElementById("jobEdit");

  dropdown.addEventListener("change", function () {
    const id = dropdown.value;
    const user = users[id];
    password.value = user.lozinka;
    firstName.value = user.ime;
    lastName.value = user.prezime;
    email.value = user.email;
    dateOfBirth.value = user.datumRodjenja;
    adress.value = user.adresa;
    phoneNumber.value = user.telefon;
    job.value = user.zanimanje;
  });
});

function validateEditUser() {
  editUserFormMessage("", "success");
  let passwordInput = document.getElementById("passwordEdit");
  let password = passwordInput.value;

  let nameInput = document.getElementById("firstNameEdit");
  let firstName = nameInput.value;

  let surnameInput = document.getElementById("lastNameEdit");
  let lastName = surnameInput.value;

  let emailInput = document.getElementById("emailEdit");
  let email = emailInput.value;

  let dateOfBirthInput = document.getElementById("dateOfBirthEdit");
  let dateOfBirth = dateOfBirthInput.value;

  let addressInput = document.getElementById("adressEdit");
  let address = addressInput.value;

  let phoneNumberInput = document.getElementById("phoneEdit");
  let phoneNumber = phoneNumberInput.value;

  let professionInput = document.getElementById("jobEdit");
  let job = professionInput.value;

  if (!/^[\w\d!@#$%^&*()-_+=~`[\]{}|:;"'<>,.?\/]{5,}$/.test(password)) {
    editUserFormMessage("Lozinka mora sadržati najmanje 5 karaktera", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(firstName.trim())) {
    editUserFormMessage("Molimo unesite samo slova za ime", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(lastName.trim())) {
    editUserFormMessage("Molimo unesite samo slova za prezime", "error");
    return false;
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
    editUserFormMessage("Molimo unesite validnu email adresu", "error");
    return false;
  }

  let currentDate = new Date();
  let parts = dateOfBirth.split("/");
  let userDate = new Date(parts[2], parts[0] - 1, parts[1]);

  if (userDate > currentDate) {
    editUserFormMessage("Datum rođenja ne može biti u budućnosti", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s\d.,]+$/.test(address)) {
    editUserFormMessage(
      "Adresa može sadržati samo slova, brojeve, zareze, tačke, i razmake",
      "error"
    );
    return false;
  }

  if (phoneNumber.trim().length == 0) {
    editUserFormMessage("Molimo unesite broj telefona", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(job)) {
    editUserFormMessage(
      "Profesija može sadržati samo slova i razmake",
      "error"
    );
    return false;
  }

  return true;
}

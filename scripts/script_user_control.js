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

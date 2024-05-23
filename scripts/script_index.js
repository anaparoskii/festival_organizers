var firebaseUrl = "https://organizatorifestivala-default-rtdb.firebaseio.com";

var organizerID = [];
var organizers = {};
var festivalID = [];
var festivals = {};

function getOrganizers() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        organizers = JSON.parse(request.responseText);
        for (let id in organizers) {
          organizerID.push(id);
        }
        showOrganizers();
      } else {
        alert("Error occurred. Organizers could not be loaded.");
      }
    }
  };
  request.open("GET", firebaseUrl + "/organizatoriFestivala.json");
  request.send();
}

getOrganizers();

function getFestivals() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        festivals = JSON.parse(request.responseText);
        for (let id in festivals) {
          festivalID.push(id);
        }
      } else {
        alert("Error occurred. Organizers could not be loaded.");
      }
    }
  };
  request.open("GET", firebaseUrl + "/festivali.json");
  request.send();
}

getFestivals();

function showOrganizers() {
  var organizersDiv = document.getElementById("organizers");
  organizersDiv.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    let column = document.createElement("div");
    column.className = "col";
    column.innerHTML = `
    <div class="card p-3">
      <img class="img-fluid d-block w-100 fit-cover" style="height: 200px" src="${organizer.logo}">
      <div class="py-4">
        <h2>${organizer.naziv}</h2>
        <ul class="list-group"></ul>
        <ul>
          <li><b>Adresa:</b> ${organizer.adresa}</li>
          <li><b>Godina osnivanja:</b> ${organizer.godinaOsnivanja}</li>
          <li><b>Telefon:</b> ${organizer.kontaktTelefon}</li>
          <li><b>Email:</b> ${organizer.email}</li>
        </ul>
        <a href="organizer.html?id=${organizerID[i]}">Pogledajte detalje...</a> 
      </div>
    </div>
    `;
    organizersDiv.appendChild(column);
  }
}

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000);
}

function displayTable() {
  var x = document.getElementById("myTable");
  if (x.style.display === "none") {
    x.style.display = "block";
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
  var x = document.getElementById("myEditForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showRegisterFormPart1() {
  var registerForm = document.getElementById("registerFormPart1");
  if (registerForm.style.display === "none") {
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
  }
}

function showRegisterFormPart2() {
  var registerForm = document.getElementById("registerFormPart2");
  var closeRegisterForm = document.getElementById("registerFormPart1");
  if (registerForm.style.display === "none") {
    closeRegisterForm.style.display = "none";
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
  }
}

function showRegisterFormPart3() {
  var registerForm = document.getElementById("registerFormPart3");
  var closeRegisterForm = document.getElementById("registerFormPart2");
  if (registerForm.style.display === "none") {
    closeRegisterForm.style.display = "none";
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
  }
}

function closeRegisterForm() {
  var registerForm = document.getElementById("registerForm");
  registerForm.style.display = "none";
}

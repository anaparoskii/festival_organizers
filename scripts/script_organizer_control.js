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

function showOrganizerTable() {
  var table = document.getElementById("table-content");
  table.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    let organizersFestivals = organizer.festivali;
    let currentFestivals = Object.keys(festivals[organizersFestivals]);
    table.innerHTML += `
      <tr>
        <td><b>${organizer.naziv}</b></td>
        <td>${organizer.adresa}</td>
        <td>${organizer.godinaOsnivanja}</td>
        <td>${organizer.kontaktTelefon}</td>
        <td>${organizer.email}</td>
      </tr>
      <tr>
        <th></th>
        <th>Naziv</th>
        <th>Tip</th>
        <th>Prevoz</th>
        <th>Cena</th>
        <th>Broj posetilaca</th>
      </tr>
    `;
    for (let j = 0; j < currentFestivals.length; j++) {
      let index = currentFestivals[j];
      let festival = festivals[organizersFestivals][index];
      table.innerHTML += `
        <tr>
          <td></td>
          <td>${festival.naziv}</td>
          <td>${festival.tip}</td>
          <td>${festival.prevoz}</td>
          <td>${festival.cena}</td>
          <td>${festival.maxOsoba}</td>
        </tr>
      `;
    }
  }
}

function dropDownMenuEdit() {
  var x = document.getElementById("pickName");
  x.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    x.innerHTML += `
      <option value="${organizerID[i]}">${organizer.naziv}</option>
    `;
  }
}

function dropDownMenuEditOrganizer() {
  var x = document.getElementById("organizerName");
  x.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    x.innerHTML += `
      <option value="${organizerID[i]}">${organizer.naziv}</option>
    `;
  }
}

function dropDownMenuEditFestival() {
  var x = document.getElementById("editFestivalName");
  x.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    let organizersFestivals = organizer.festivali;
    let currentFestivals = Object.keys(festivals[organizersFestivals]);
    for (let j = 0; j < currentFestivals.length; j++) {
      let index = currentFestivals[j];
      let festival = festivals[organizersFestivals][index];
      x.innerHTML += `
        <option value="${index}">${festival.naziv}</option>
      `;
    }
  }
}

function displayTable() {
  var x = document.getElementById("myTable");
  if (x.style.display === "none") {
    x.style.display = "block";
    showOrganizerTable();
  } else {
    x.style.display = "none";
  }
}

function displayAddForm() {
  var x = document.getElementById("addOrganizerForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayEditForm() {
  var x = document.getElementById("editOrganizerForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuEditOrganizer();
  } else {
    x.style.display = "none";
  }
}

function displayAddFestivalForm() {
  var x = document.getElementById("addFestival");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuEdit();
  } else {
    x.style.display = "none";
  }
}

function displayEditFestivalForm() {
  var x = document.getElementById("editFestivalForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuEditFestival();
  } else {
    x.style.display = "none";
  }
}

function getFestival(festivalId) {
  for (let id of festivalID) {
    if (festivals[id]) {
      if (festivals[id][festivalId]) {
        return festivals[id][festivalId];
      }
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = this.getElementById("organizerName");
  const adress = this.getElementById("updateOrganizerAdress");
  const year = this.getElementById("updateOrganizerYear");
  const phone = this.getElementById("updateOrganizerPhone");
  const email = this.getElementById("updateOrganizerEmail");

  dropdown.addEventListener("change", function () {
    const id = dropdown.value;
    const organizer = organizers[id];
    adress.value = organizer.adresa;
    year.value = organizer.godinaOsnivanja;
    phone.value = organizer.kontaktTelefon;
    email.value = organizer.email;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = this.getElementById("editFestivalName");
  const type = this.getElementById("editFestivalType");
  const drive = this.getElementById("editFestivalDrive");
  const price = this.getElementById("editFestivalPrice");
  const capacity = this.getElementById("editFestivalCapacity");

  dropdown.addEventListener("change", function () {
    const id = dropdown.value;
    const festival = getFestival(id);
    type.value = festival.tip;
    drive.value = festival.prevoz;
    price.value = festival.cena;
    capacity.value = festival.maxOsoba;
  });
});

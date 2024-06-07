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

function displayTable() {
  var x = document.getElementById("myTable");
  if (x.style.display === "none") {
    x.style.display = "block";
    showOrganizerTable();
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

var editOrganizerButton = document.getElementById("editOrganizerButton");
editOrganizerButton.addEventListener("click", function (e) {
  var selectElement = document.getElementById("organizerName");
  var organizerID = selectElement.value;
  var organizer = organizers[organizerID];
  var adress = document.getElementById("updateOrganizerAdress").value;
  var year = document.getElementById("updateOrganizerYear").value;
  var phone = document.getElementById("updateOrganizerPhone").value;
  var email = document.getElementById("updateOrganizerEmail").value;
  let updatedOrganizer = {
    naziv: organizer.naziv,
    adresa: adress,
    godinaOsnivanja: year,
    logo: organizer.logo,
    kontaktTelefon: phone,
    email: email,
    festivali: organizer.festivali,
  };
  var request = new XMLHttpRequest();
  if (validateEditOrganizerForm()) {
    request.open(
      "PATCH",
      firebaseUrl + "/organizatoriFestivala/" + organizerID + ".json",
      true
    );
    request.send(JSON.stringify(updatedOrganizer));
    editOrganizerFormMessage("Organizator uspešno izmenjen", "success");
  }
});

function displayAddFestivalForm() {
  var x = document.getElementById("addFestival");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuEdit();
  } else {
    x.style.display = "none";
  }
}

var addFestivalButton = document.getElementById("addFestivalButton");
addFestivalButton.addEventListener("click", function (e) {
  if (validateAddFestivalForm()) {
    var selectElement = document.getElementById("pickName");
    var organizerID = selectElement.value;
    var organizer = organizers[organizerID];
    var name = document.getElementById("addFestivalName").value;
    var type = document.getElementById("addFestivalType").value;
    var transport = document.getElementById("addFestivalDrive").value;
    var price = document.getElementById("addFestivalPrice").value;
    var visitors = document.getElementById("addFestivalCapacity").value;
    var description = document.getElementById("addFestivalDescription").value;
    var request = new XMLHttpRequest();
    request.open(
      "POST",
      firebaseUrl + "/festivali/" + organizer.festivali + ".json",
      true
    );
    request.send(
      JSON.stringify({
        naziv: name,
        tip: type,
        prevoz: transport,
        cena: price,
        maxOsoba: visitors,
        opis: description,
      })
    );
    addFestivalFormMessage("Festival uspešno dodat", "success");
  }
});

function addFestivalFormMessage(message, type) {
  let messageElement = document.getElementById("addFestivalFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
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

function deleteOrganizer() {
  var x = document.getElementById("deleteOrganizerForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuDeleteOrganizer();
  } else {
    x.style.display = "none";
  }
}

function validateOrganizerRemoval() {
  let confirmation = confirm(
    "Da li ste sigurni da želite da obrišete organizatora? Ova radnja će obrisati i sve njegove festivale"
  );
  return confirmation;
}

var deleteOrganizerButton = document.getElementById("deleteOrganizerButton");
deleteOrganizerButton.addEventListener("click", function (e) {
  if (validateOrganizerRemoval()) {
    var selectElement = document.getElementById("nameDelete");
    var deleteOrganizerID = selectElement.value;
    var request = new XMLHttpRequest();
    request.open(
      "DELETE",
      firebaseUrl + "/organizatori/" + deleteOrganizerID + ".json",
      true
    );
    request.send();
    deleteOrganizerFormMessage("Organizator uspešno obrisan", "success");
  } else {
    deleteOrganizerFormMessage("Brisanje organizatora otkazano", "error");
  }
});

function dropDownMenuDeleteOrganizer() {
  var x = document.getElementById("nameDelete");
  x.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    x.innerHTML += `
        <option value="${organizerID[i]}">${organizer.naziv}</option>
      `;
  }
}

function deleteOrganizerFormMessage(message, type) {
  let messageElement = document.getElementById("deleteOrganizerFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

function deleteFestival() {
  var x = document.getElementById("deleteFestivalForm");
  if (x.style.display === "none") {
    x.style.display = "block";
    dropDownMenuPickOrganizer();
    dropDownMenuDeleteFestival();
  } else {
    x.style.display = "none";
  }
}

function validateFestivalRemoval() {
  let confirmation = confirm(
    "Da li ste sigurni da želite da obrišete festival?"
  );
  return confirmation;
}

var deleteFestivalButton = document.getElementById("deleteFestivalButton");
deleteFestivalButton.addEventListener("click", function (e) {
  if (validateFestivalRemoval()) {
    var selectOrganizer = document.getElementById("oName");
    var organizerID = selectOrganizer.value;
    var organizerFestivals = organizers[organizerID].festivali;
    var selectElement = document.getElementById("deleteFestivalName");
    var deleteFestivalID = selectElement.value;
    var request = new XMLHttpRequest();
    request.open(
      "DELETE",
      firebaseUrl +
        "/festivali/" +
        organizerFestivals +
        "/" +
        deleteFestivalID +
        ".json",
      true
    );
    request.send();
    deleteFestivalFormMessage("Festival uspešno obrisan", "success");
  } else {
    deleteFestivalFormMessage("Brisanje festivala otkazano", "error");
  }
});

function dropDownMenuDeleteFestival(organizerId) {
  var x = document.getElementById("deleteFestivalName");
  x.innerHTML = "";
  var organizerFestivals = organizers[organizerId].festivali;
  var festivalKeys = Object.keys(festivals[organizerFestivals]);
  for (let i = 0; i < festivalKeys.length; i++) {
    let festival = festivals[organizerFestivals][festivalKeys[i]];
    x.innerHTML += `
      <option value="${festivalKeys[i]}">${festival.naziv}</option>
    `;
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

function dropDownMenuPickOrganizer() {
  var x = document.getElementById("oName");
  x.innerHTML = "";
  for (let i = 0; i < organizerID.length; i++) {
    let organizer = organizers[organizerID[i]];
    x.innerHTML += `
      <option value="${organizerID[i]}">${organizer.naziv}</option>
    `;
  }
}

function deleteFestivalFormMessage(message, type) {
  let messageElement = document.getElementById("deleteFestivalFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
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
  const dropdown = this.getElementById("oName");

  dropdown.addEventListener("change", function () {
    const id = dropdown.value;
    dropDownMenuDeleteFestival(id);
  });
});

function validateEditOrganizerForm() {
  editOrganizerFormMessage("", "success");
  let addressInput = document.getElementById("updateOrganizerAdress");
  let address = addressInput.value;

  let yearInput = document.getElementById("updateOrganizerYear");
  let year = yearInput.value;

  let phoneInput = document.getElementById("updateOrganizerPhone");
  let phone = phoneInput.value;

  let emailInput = document.getElementById("updateOrganizerEmail");
  let email = emailInput.value;

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s\d.,]+$/.test(address)) {
    editOrganizerFormMessage(
      "Adresa može sadržati samo slova, brojeve, zareze, tačke, i razmake",
      "error"
    );
    return false;
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
    editOrganizerFormMessage("Molimo unesite validnu email adresu", "error");
    return false;
  }

  if (phone.trim().length == 0) {
    editOrganizerFormMessage("Molimo unesite kontakt telefon", "error");
    return false;
  }

  if (!/^\d{4}$/.test(year.trim())) {
    editOrganizerFormMessage("Godina mora da sadrži 4 broja", "error");
    return false;
  }
  return true;
}

function editOrganizerFormMessage(message, type) {
  let messageElement = document.getElementById("editOrganizerFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

function validateAddFestivalForm() {
  addFestivalFormMessage("", "success");
  let nameInput = document.getElementById("addFestivalName");
  let name = nameInput.value;

  let typeInput = document.getElementById("addFestivalType");
  let type = typeInput.value;

  let driveInput = document.getElementById("addFestivalDrive");
  let drive = driveInput.value;

  let priceInput = document.getElementById("addFestivalPrice");
  let price = priceInput.value;

  let capacityInput = document.getElementById("addFestivalCapacity");
  let capacity = capacityInput.value;

  if (!/^[\p{L}\s]+$/u.test(name.trim())) {
    addFestivalFormMessage("Molimo unesite samo slova za naziv", "error");
    return false;
  }

  if (!/^[\p{L}\s]+$/u.test(type.trim())) {
    addFestivalFormMessage(
      "Molimo unesite samo slova za tip festivala",
      "error"
    );
    return false;
  }

  if (!/^[\p{L}\s]+$/u.test(drive.trim())) {
    addFestivalFormMessage(
      "Molimo unesite samo slova za oblik prevoza",
      "error"
    );
    return false;
  }

  if (price.trim() < 0 || price.trim() == "") {
    addFestivalFormMessage("Molimo unesite validnu cenu", "error");
    return false;
  }

  if (capacity.trim() < 0 || capacity.trim() == "") {
    addFestivalFormMessage("Molimo unesite validan broj posetilaca", "error");
    return false;
  }

  return true;
}

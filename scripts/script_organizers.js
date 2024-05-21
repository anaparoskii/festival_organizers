var firebaseUrl = "https://organizatorifestivala-default-rtdb.firebaseio.com";

var organizerID = [];
var organizers = {};
var festivalID = [];
var festivals = {};
const url = window.location.href;
let organizerId = getIdFromUrl(url);
var allFestivals;

function getOrganizers() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        organizers = JSON.parse(request.responseText);
        for (let id in organizers) {
          organizerID.push(id);
        }
        showOrganizerInfo();
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
        showFestivals();
      } else {
        alert("Error occurred. Organizers could not be loaded.");
      }
    }
  };
  request.open("GET", firebaseUrl + "/festivali.json");
  request.send();
}

getFestivals();

function showOrganizerInfo() {
  if (organizerId == null) {
    return;
  }
  let organizer = organizers[organizerId];
  var organizerDiv = document.getElementById("organizer-info");
  organizerDiv.innerHTML = `
    <h1 class="fw-bold">${organizer.naziv}</h1>
    <ul>
        <li><b>Adresa:</b> ${organizer.adresa}</li>
        <li><b>Godina osnivanja:</b> ${organizer.godinaOsnivanja}</li>
        <li><b>Telefon:</b> ${organizer.kontaktTelefon}</li>
        <li><b>Email:</b> ${organizer.email}</li>
    </ul>
    <a href="index.html">Vidi sve organizatore</a>
  `;
}

function showFestivals() {
  allFestivals = organizers[organizerId].festivali;
  currentFestivals = Object.keys(festivals[allFestivals]);
  var festivalsDiv = document.getElementById("festivals-cards");
  festivalsDiv.innerHTML = "";
  for (let i = 0; i < currentFestivals.length; i++) {
    let index = currentFestivals[i];
    let festival = festivals[organizerFestivalID][index];
    let column = document.createElement("div");
    column.className = "col";
    column.innerHTML = `
    <div class="card">
        <div class="card-body pt-5 p-4">
            <h2 class="card-title">${festival.naziv}</h2>
            <h4 class="text-muted card-subtitle mb-2"><b>Tip:</b>${festival.tip}</h4>
        </div>
        <div class="card-footer p-4 py-3">
            <a href="festival.html?id=${index}">Pogledaj još</a>
        </div>
    </div>
    `;
    festivalsDiv.appendChild(column);
  }
}

function findCurrentFestivals() {
    allFestivals = organizers[organizerId].festivali;
    
}

function getIdFromUrl(url) {
  const queryString = url.split("?")[1];
  if (queryString) {
    const params = new URLSearchParams(queryString);
    return params.get("id");
  }
  return null;
}

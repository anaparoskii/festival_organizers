var firebaseUrl = "https://organizatorifestivala-default-rtdb.firebaseio.com";

var organizerID = [];
var organizers = {};
var festivalID = [];
var festivals = {};
const url = window.location.href;
let organizerId = getIdFromUrl(url);

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

function showOrganizerInfo() {
  if (organizerId == null) {
    return;
  }
  var organizerDiv = document.getElementById("my-data");
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

function getIdFromUrl(url) {
  const queryString = url.split("?")[1];
  if (queryString) {
    const params = new URLSearchParams(queryString);
    return params.get("id");
  }
  return null;
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

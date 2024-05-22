var firebaseUrl = "https://organizatorifestivala-default-rtdb.firebaseio.com";

var organizerID = [];
var organizers = {};
var festivalID = [];
var festivals = {};
const url = window.location.href;
let festivalId = getIdFromUrl(url);

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
        showFestivalInfo();
        showGallery();
      } else {
        alert("Error occurred. Organizers could not be loaded.");
      }
    }
  };
  request.open("GET", firebaseUrl + "/festivali.json");
  request.send();
}

getFestivals();

function showFestivalInfo() {
  if (festivalId == null) {
    return;
  }
  let festival = getFestival(festivalId);
  var festivalDiv = document.getElementById("festival-info");
  festivalDiv.innerHTML = `
    <h1 id="start" class="fw-bold text-center">${festival.naziv}</h1>
    <br/>
    <p class="description w-lg-50">${festival.opis}</p>
    <p><b>Tip:</b> ${festival.tip}<br>
       <b>Prevoz:</b> ${festival.prevoz}<br>
       <b>Cena:</b> ${festival.cena}<br>
       <b>Maksimalan broj posetilaca:</b> ${festival.maxOsoba}<br></p>
    `;
}

function showGallery() {
  if (festivalId == null) {
    return;
  }
  let festival = getFestival(festivalId);
  var galleryDiv = document.getElementById("my-gallery");
  let gallery = festival.slike;
  galleryDiv.innerHTML = "";
  for (let i = 0; i < gallery.length; i++) {
    galleryDiv.innerHTML += `
      <div class="mySlides">
        <img src="${gallery[i]}" style="width:100%">
      </div>
    `;
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

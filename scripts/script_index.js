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

function searchFunction() {
  var input, filter, ul, li, h2, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("organizers");
  li = ul.getElementsByClassName("card");

  for (i = 0; i < li.length; i++) {
    h2 = li[i].getElementsByTagName("h2")[0];
    txtValue = h2.textContent || h2.innerText;
    var highlightedText = txtValue.replace(new RegExp(filter, 'gi'), function(match) {
      return '<span class="highlight">' + match + '</span>';
    });
    h2.innerHTML = highlightedText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

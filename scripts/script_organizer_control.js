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
        showOrganizerTable();
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
    table.innerHTML += `
        <tr>
            <td>${organizer.naziv}</td>
            <td>${organizer.adresa}</td>
            <td>${organizer.godinaOsnivanja}</td>
            <td>${organizer.kontaktTelefon}</td>
            <td>${organizer.email}</td>
            <td><button class="button function" onclick="showFestivalInfo()">...</button></td>
            <tr>
                <td colspan="5" id="nested">
                </td>
            </tr>
        </tr>
      `;
  }
}

function showFestivalTable() {
    
}

function showFestivalInfo() {
  var x = document.getElementById("nested");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
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

// <table class="table">
// <tr>
// <th>Naziv</th>
// <th>Tip</th>
// <th>Prevoz</th>
{/* <th>Cena</th>
<th>Broj posetilaca</th>
</tr>
<tr>
<td>Ime</td>
<td>Tip</td>
<td>Kola</td>
<td>1000</td>
<td>1000</td>
</tr>
</table>  */}

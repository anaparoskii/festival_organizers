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

var currentTab = 0;

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  fixStepIndicator(n);
  if (n == 0) {
    document.getElementById("previous").style.display = "none";
  } else {
    document.getElementById("previous").style.display = "inline";
  }
  if (n == x.length - 2) {
    let register = document.getElementById("next");
    register.getAttribute("type", "submit");
    register.innerHTML = "Registruj se";
  } else {
    document.getElementById("next").innerHTML = "Dalje";
  }
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && currentTab == 0 && validateUserData() == false) return;
  if (n == 1 && currentTab == 1 && validateContactData() == false) return;
  if (n == 1 && currentTab == 2 && validateDetailsData() == false) return;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab == 3) {
    document.getElementById("registerForm").submit();
    document.getElementById("next").style.display = "none";
    document.getElementById("previous").style.display = "none";
    registerFormMessage("Uspešno ste se registrovali!", "success");
  }
  registerFormMessage("", "success");
  showTab(currentTab);
}

function validateUserData() {
  let usernameInput = document.getElementById("usernameRegister");
  let username = usernameInput.value;

  let passwordInput = document.getElementById("passwordRegister");
  let password = passwordInput.value;

  let nameInput = document.getElementById("firstNameRegister");
  let firstName = nameInput.value;

  let surnameInput = document.getElementById("lastNameRegister");
  let lastName = surnameInput.value;

  for (let id in users) {
    if (users[id].korisnickoIme == username) {
      registerFormMessage("Korisničko ime već postoji", "error");
      return false;
    }
  }

  if (!/^[\w\d!@#$%^&*()-_+=~`[\]{}|:;"'<>,.?\/]{5,}$/.test(password)) {
    registerFormMessage(
      "Lozinka mora sadržati najmanje 5 karaktera i može uključivati slova, brojeve i specijalne znakove",
      "error"
    );
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(firstName.trim())) {
    registerFormMessage("Molimo unesite samo slova za ime", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(lastName.trim())) {
    registerFormMessage("Molimo unesite samo slova za prezime", "error");
    return false;
  }

  return true;
}

function validateContactData() {
  let emailInput = document.getElementById("emailRegister");
  let email = emailInput.value;

  let phoneNumberInput = document.getElementById("phoneRegister");
  let phoneNumber = phoneNumberInput.value;

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
    registerFormMessage("Molimo unesite validnu email adresu", "error");
    return false;
  }

  if (!/^[/+\-]?\d+$/.test(phoneNumber)) {
    registerFormMessage(
      "Broj telefona može sadržati samo brojeve, opcionalno sa /, - ili + na početku",
      "error"
    );
    return false;
  }

  return true;
}

function validateDetailsData() {
  let dateOfBirthInput = document.getElementById("dateOfBirthRegister");
  let dateOfBirth = dateOfBirthInput.value;

  let addressInput = document.getElementById("adressRegister");
  let address = addressInput.value;

  let professionInput = document.getElementById("jobRegister");
  let job = professionInput.value;

  let currentDate = new Date();
  let parts = dateOfBirth.split("/");
  let userDate = new Date(parts[2], parts[0] - 1, parts[1]);

  if (userDate > currentDate) {
    registerFormMessage("Datum rođenja ne može biti u budućnosti", "error");
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s\d.,]+$/.test(address)) {
    registerFormMessage(
      "Adresa može sadržati samo slova, brojeve, zareze, tačke, i razmake",
      "error"
    );
    return false;
  }

  if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(job)) {
    registerFormMessage(
      "Profesija može sadržati samo slova i razmake",
      "error"
    );
    return false;
  }

  return true;
}

function showRegisterForm() {
  var registerForm = document.getElementById("registerForm");
  if (registerForm.style.display === "none") {
    registerForm.style.display = "block";
    showTab(currentTab);
  } else {
    registerForm.style.display = "none";
  }
}

function closeRegisterForm() {
  var registerForm = document.getElementById("registerForm");
  registerForm.style.display = "none";
}

function showLoginForm() {
  var registerForm = document.getElementById("loginForm");
  if (registerForm.style.display === "none") {
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
  }
}

function closeLoginForm() {
  var registerForm = document.getElementById("loginForm");
  registerForm.style.display = "none";
}

function registerFormMessage(message, type) {
  let messageElement = document.getElementById("registerFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let usernameInput = document.getElementById("usernameLogin");
    let username = usernameInput.value;

    let passwordInput = document.getElementById("passwordLogin");
    let password = passwordInput.value;

    for (let id in users) {
      if (
        users[id].korisnickoIme == username &&
        users[id].lozinka == password
      ) {
        loginFormMessage("Uspešno ste se prijavili!", "success");
        return;
      }
    }

    loginFormMessage("Pogrešno korisničko ime ili lozinka", "error");
  });

function loginFormMessage(message, type) {
  let messageElement = document.getElementById("loginFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

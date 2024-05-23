document
  .getElementById("addOrganizerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nameInput = document.getElementById("nameOrganizer");
    let name = nameInput.value;

    let addressInput = document.getElementById("adressOrganizer");
    let address = addressInput.value;

    let yearInput = document.getElementById("yearOrganizer");
    let year = yearInput.value;

    let phoneInput = document.getElementById("phoneOrganizer");
    let phone = phoneInput.value;

    let emailInput = document.getElementById("emailOrganizer");
    let email = emailInput.value;

    if (!/^[\p{L}\s]+$/u.test(name.trim())) {
      addOrganizerFormMessage("Molimo unesite samo slova za naziv", "error");
      return;
    }

    if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s\d.,]+$/.test(address)) {
      addOrganizerFormMessage(
        "Adresa može sadržati samo slova, brojeve, zareze, tačke, i razmake",
        "error"
      );
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
      addOrganizerFormMessage("Molimo unesite validnu email adresu", "error");
      return;
    }

    if (!/^[/+\-]?\d+$/.test(phone.trim())) {
      addOrganizerFormMessage(
        "Broj telefona može sadržati samo brojeve, opcionalno sa /, - ili + na početku",
        "error"
      );
      return;
    }

    if (!/^\d{4}$/.test(year.trim())) {
      addOrganizerFormMessage("Godina mora da sadrži 4 broja", "error");
      return;
    }

    addOrganizerFormMessage("Podaci uspešno uneseni!", "success");
  });

function addOrganizerFormMessage(message, type) {
  let messageElement = document.getElementById("addOrganizerFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

document
  .getElementById("editOrganizerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

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
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
      editOrganizerFormMessage("Molimo unesite validnu email adresu", "error");
      return;
    }

    if (!/^[/+\-]?\d+$/.test(phone.trim())) {
      editOrganizerFormMessage(
        "Broj telefona može sadržati samo brojeve, opcionalno sa /, - ili + na početku",
        "error"
      );
      return;
    }

    if (!/^\d{4}$/.test(year.trim())) {
      editOrganizerFormMessage("Godina mora da sadrži 4 broja", "error");
      return;
    }

    editOrganizerFormMessage("Podaci uspešno uneseni!", "success");
  });

function editOrganizerFormMessage(message, type) {
  let messageElement = document.getElementById("editOrganizerFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

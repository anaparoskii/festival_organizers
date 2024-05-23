document
  .getElementById("addFestival")
  .addEventListener("submit", function (event) {
    event.preventDefault();

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
      return;
    }

    if (!/^[\p{L}\s]+$/u.test(type.trim())) {
      addFestivalFormMessage(
        "Molimo unesite samo slova za tip festivala",
        "error"
      );
      return;
    }

    if (!/^[\p{L}\s]+$/u.test(drive.trim())) {
      addFestivalFormMessage(
        "Molimo unesite samo slova za oblik prevoza",
        "error"
      );
      return;
    }

    if (!/^\d$/.test(price.trim())) {
      addFestivalFormMessage("Cena mora da sadrži samo brojeve", "error");
      return;
    }

    if (!/^\d$/.test(capacity.trim())) {
      addFestivalFormMessage(
        "Broj posetilaca mora da sadrži samo brojeve",
        "error"
      );
      return;
    }

    addFestivalFormMessage("Podaci uspešno uneseni!", "success");
  });

function addFestivalFormMessage(message, type) {
  let messageElement = document.getElementById("addFestivalFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

document
  .getElementById("editFestivalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let typeInput = document.getElementById("editFestivalType");
    let type = typeInput.value;

    let driveInput = document.getElementById("editFestivalDrive");
    let drive = driveInput.value;

    let priceInput = document.getElementById("editFestivalPrice");
    let price = priceInput.value;

    let capacityInput = document.getElementById("editFestivalCapacity");
    let capacity = capacityInput.value;

    if (!/^[\p{L}\s]+$/u.test(type.trim())) {
      editFestivalFormMessage(
        "Molimo unesite samo slova za tip festivala",
        "error"
      );
      return;
    }

    if (!/^[\p{L}\s]+$/u.test(drive.trim())) {
      editFestivalFormMessage(
        "Molimo unesite samo slova za oblik prevoza",
        "error"
      );
      return;
    }

    if (!/^\d$/.test(price.trim())) {
      editFestivalFormMessage("Cena mora da sadrži samo brojeve", "error");
      return;
    }

    if (!/^\d$/.test(capacity.trim())) {
      editFestivalFormMessage(
        "Broj posetilaca mora da sadrži samo brojeve",
        "error"
      );
      return;
    }

    editFestivalFormMessage("Podaci uspešno uneseni!", "success");
  });

function editFestivalFormMessage(message, type) {
  let messageElement = document.getElementById("editFestivalFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

document
  .getElementById("editUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let passwordInput = document.getElementById("passwordEdit");
    let password = passwordInput.value;

    let nameInput = document.getElementById("firstNameEdit");
    let firstName = nameInput.value;

    let surnameInput = document.getElementById("lastNameEdit");
    let lastName = surnameInput.value;

    let emailInput = document.getElementById("emailEdit");
    let email = emailInput.value;

    let dateOfBirthInput = document.getElementById("dateOfBirthEdit");
    let dateOfBirth = dateOfBirthInput.value;

    let addressInput = document.getElementById("adressEdit");
    let address = addressInput.value;

    let phoneNumberInput = document.getElementById("phoneEdit");
    let phoneNumber = phoneNumberInput.value;

    let professionInput = document.getElementById("jobEdit");
    let job = professionInput.value;

    if (!/^[\w\d!@#$%^&*()-_+=~`[\]{}|:;"'<>,.?\/]{5,}$/.test(password)) {
      editUserFormMessage(
        "Lozinka mora sadržati najmanje 5 karaktera i može uključivati slova, brojeve i specijalne znakove !@#$%^&*()-_+=~`[]{}|:;\"'<>,.?/",
        "error"
      );
      return;
    }

    if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(firstName.trim())) {
      editUserFormMessage("Molimo unesite samo slova za ime", "error");
      return;
    }

    if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(lastName.trim())) {
      editUserFormMessage("Molimo unesite samo slova za prezime", "error");
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
      editUserFormMessage("Molimo unesite validnu email adresu", "error");
      return;
    }

    let currentDate = new Date();
    let parts = dateOfBirth.split("/");
    let userDate = new Date(parts[2], parts[0] - 1, parts[1]);

    if (userDate > currentDate) {
      editUserFormMessage("Datum rođenja ne može biti u budućnosti", "error");
      return;
    }

    if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s\d.,]+$/.test(address)) {
      editUserFormMessage(
        "Adresa može sadržati samo slova, brojeve, zareze, tačke, i razmake",
        "error"
      );
      return;
    }

    if (!/^[/+\-]?\d+$/.test(phoneNumber)) {
      editUserFormMessage(
        "Broj telefona može sadržati samo brojeve, opcionalno sa /, - ili + na početku",
        "error"
      );
      return;
    }

    if (!/^[a-zA-ZčćšđžČĆŠĐŽ\s]+$/.test(job)) {
      editUserFormMessage(
        "Profesija može sadržati samo slova i razmake",
        "error"
      );
      return;
    }

    editUserFormMessage("Podaci uspešno uneseni!", "success");
  });

function editUserFormMessage(message, type) {
  let messageElement = document.getElementById("editUserFormMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}

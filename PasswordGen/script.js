const  lowercase = "abcddefghijklmnopqrstuvwxyzåäö";
const  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
const  numbers = '1234567890';
const  symbols = "!@#€%&/()=?+*^-";

function randomCharacters (characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function generatePassword(length, options) {
    let characters = "";
    let password = "";
    
    if (options.includeUppercase) {
        characters += uppercase;
    } 
    if (options.includeLowercase) {
        characters += lowercase;
    }
    if (options.includeNumbers) {
        characters += numbers;
    }
    if (options.includeSymbols) {
        characters += symbols;
    }
    for (let i = 0; i < length; i++) {
        password += randomCharacters(characters);
    }
    return password;
}

const generateButton = document.getElementById("generate-button");
const passwordField = document.getElementById("password-field");
const lengthField = document.getElementById("length-field");
const uppercaseCheckbox = document.getElementById("uppercase-checkbox");
const lowercaseCheckbox = document.getElementById("lowercase-checkbox");
const numbersCheckbox = document.getElementById("numbers-checkbox");
const symbolsCheckbox = document.getElementById("symbols-checkbox");

generateButton.addEventListener("click", function() {
    const length = parseInt(lengthField.value);
    const options = {
      includeUppercase: uppercaseCheckbox.checked,
      includeLowercase: lowercaseCheckbox.checked,
      includeNumbers: numbersCheckbox.checked,
      includeSymbols: symbolsCheckbox.checked
    };
    const password = generatePassword(length, options);
    passwordField.value = password;
  });
  
  const slider = document.getElementById("slider");
  const length = document.getElementById("length-field");

  slider.addEventListener("input", function() {
    lengthField.value = slider.value;
    updateStaplar();
  });

  slider.addEventListener("mousemove", function() {
    let x = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    let color = 'linear-gradient(90deg, rgb(129, 12, 168) ' + x + '%, rgb(45, 3, 59) ' + x + '%)';
    slider.style.background = color;
  });

  const copy = document.getElementById("copy-icon");
  const password = document.getElementById("password-field");

  copy.addEventListener("click", function() {
    password.select();
    document.execCommand("copy");
  });

  const checkboxes = document.querySelectorAll(".checks");
  const countElement = document.getElementById("length-field");
  const staplarElement = document.getElementById("strength");
  
  function updateStaplar() {
    const checkedCheckboxes = [
      uppercaseCheckbox,
      lowercaseCheckbox,
      numbersCheckbox,
      symbolsCheckbox,
    ].filter((checkbox) => checkbox.checked);
    const characterCount = parseInt(lengthField.value);
    const strengthElement = document.getElementById("strength");
    const firstStaple = document.getElementById("first");
    const secondStaple = document.getElementById("second");
    const thirdStaple = document.getElementById("third");
    const fourthStaple = document.getElementById("fourth");
  
    if (checkedCheckboxes.length === 2 && characterCount < 17) {
      strengthElement.textContent = "Weak";
      firstStaple.style.backgroundColor = "";
      secondStaple.style.backgroundColor = "";
      thirdStaple.style.backgroundColor = "";
      fourthStaple.style.backgroundColor = "";
    } else if (
      (checkedCheckboxes.length === 2 && characterCount >= 17) ||
      (checkedCheckboxes.length === 3 && characterCount >= 10 && characterCount < 15) ||
      (checkedCheckboxes.length === 4 && characterCount <= 12)
    ) {
      strengthElement.textContent = "Medium";
      firstStaple.style.backgroundColor = "yellow";
      secondStaple.style.backgroundColor = "yellow";
      thirdStaple.style.backgroundColor = "yellow";
      fourthStaple.style.backgroundColor = "";
    } else if (
      (checkedCheckboxes.length >= 3 && characterCount >= 15) ||
      (checkedCheckboxes.length === 4 && characterCount >= 12)
    ) {
      strengthElement.textContent = "Strong";
      firstStaple.style.backgroundColor = "green";
      secondStaple.style.backgroundColor = "green";
      thirdStaple.style.backgroundColor = "green";
      fourthStaple.style.backgroundColor = "green";
    } else {
      strengthElement.textContent = "Weak";
      firstStaple.style.backgroundColor = "";
      secondStaple.style.backgroundColor = "";
      thirdStaple.style.backgroundColor = "";
      fourthStaple.style.backgroundColor = "";
    }
  }  

uppercaseCheckbox.addEventListener("change", updateStaplar);
lowercaseCheckbox.addEventListener("change", updateStaplar);
numbersCheckbox.addEventListener("change", updateStaplar);
symbolsCheckbox.addEventListener("change", updateStaplar);
lengthField.addEventListener("input", updateStaplar);


import { Tamagotchi } from "./modules/tamagotchi.js";


//skapar en addEvenListener på form elementet som kallar en funktion och skapar en ny Tamagotchi objekt
const form = document.getElementById("new-form");
function handleSubmit(event) {
  event.preventDefault();
  const userInputs = Object.fromEntries(new FormData(form).entries());
  const { name, type } = userInputs;
  const tamagotchi = new Tamagotchi(name, type);
  console.log(tamagotchi);
}
form.addEventListener("submit", handleSubmit);

// FormData(form) skapar en instans av FormData-klassen, som samlar in alla formulärdata från ett HTML-formulär.
// .entries() returnerar en lista av värdena i formulärdata, där varje element i listan är en array med två värden - ett nyckelvärde (namnet på formulärfältet) och ett data-värde (värdet som användaren har angett).
// Object.fromEntries() konverterar denna lista till ett JavaScript-objekt, där nycklarna i objektet är formulärfältens namn och värdena i objektet är värdena som användaren har angett.
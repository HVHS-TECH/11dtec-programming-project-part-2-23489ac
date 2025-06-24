// List of cars
const cars = [
  { name: "BAC Mono", seats: 1, price: 25 },
  { name: "MX5", seats: 2, price: 45 },
  { name: "Mini", seats: 4, price: 30 },
  { name: "i30", seats: 4, price: 35 },
  { name: "Falcon", seats: 5, price: 60 },
  { name: "Kona", seats: 5, price: 55 },
  { name: "Prado", seats: 5, price: 70 },
  { name: "Outlander", seats: 7, price: 85 },
  { name: "Estima", seats: 8, price: 90 }
];

const INSURANCE_COST = 15;

let userName = "";
let seatsNeeded = 0;
let rentalDays = 0;
let wantsInsurance = false;
let matchingCars = [];
let selectedCar = null;

// Start rental
function startRental() {
  const app = document.getElementById("app");
  app.innerHTML = `
   <label>Welcome to rob's rental</label>
    <label>What is your name?</label>
    <input type="text" id="nameInput" />
    <button onclick="askSeats()">Next</button>
  `;
}

// Ask seats needed
function askSeats() {
  const name = document.getElementById("nameInput").value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  userName = name;

  const app = document.getElementById("app");
  app.innerHTML = `
    <p>Hello ${userName}!</p>
    <label>How many seats do you need?</label>
    <input type="text" id="seatsInput" />
    <button onclick="askDays()">Next</button>
  `;
}

// Ask days to rent
function askDays() {
  const seatsText = document.getElementById("seatsInput").value.trim();
  const seatsNumber = Number(seatsText);

  if (
    seatsText === "" ||
    isNaN(seatsNumber) ||
    !Number.isInteger(seatsNumber) ||
    seatsNumber < 1 ||
    seatsNumber > 8
  ) {
    alert("Please enter a whole number of seats between 1 and 8.");
    return;
  }

  seatsNeeded = seatsNumber;
  matchingCars = cars.filter(car => car.seats >= seatsNeeded);

  if (matchingCars.length === 0) {
    alert("No cars with that many seats are available.");
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <label>How many days do you want to rent?</label>
    <input type="text" id="daysInput" />
    <button onclick="askInsurance()">Next</button>
  `;
}

// Ask if want insurance
function askInsurance() {
  const daysText = document.getElementById("daysInput").value.trim();
  const daysNumber = Number(daysText);

  if (
    daysText === "" ||
    isNaN(daysNumber) ||
    !Number.isInteger(daysNumber) ||
    daysNumber < 1 ||
    daysNumber > 30
  ) {
    alert("Please enter a whole number of days between 1 and 30.");
    return;
  }

  rentalDays = daysNumber;

  const app = document.getElementById("app");
  app.innerHTML = `
    <label>Do you want insurance for $15 per day?</label>
    <select id="insuranceInput">
      <option value="no">No</option>
      <option value="yes">Yes</option>
    </select>
    <button onclick="chooseCar()">Next</button>
  `;
}

// Choose car from list
function chooseCar() {
  const insuranceChoice = document.getElementById("insuranceInput").value;
  wantsInsurance = insuranceChoice === "yes";

  let optionsHtml = "";
  for (let i = 0; i < matchingCars.length; i++) {
    const car = matchingCars[i];
    const totalCost = car.price * rentalDays + (wantsInsurance ? INSURANCE_COST * rentalDays : 0);
    optionsHtml += `<option value="${i}">${car.name} - $${car.price}/day - Total: $${totalCost}</option>`;
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <label>Choose your car:</label>
    <select id="carChoice">${optionsHtml}</select>
    <button onclick="showSummary()">Finish</button>
  `;
}

// Show summary of rental
function showSummary() {
  const choiceIndex = Number(document.getElementById("carChoice").value);
  selectedCar = matchingCars[choiceIndex];

  const baseCost = selectedCar.price * rentalDays;
  const insuranceCost = wantsInsurance ? INSURANCE_COST * rentalDays : 0;
  const total = baseCost + insuranceCost;

  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Thank you, ${userName}!</h2>
    <p>You chose: <strong>${selectedCar.name}</strong></p>
    <p>Seats needed: ${seatsNeeded}</p>
    <p>Days to rent: ${rentalDays}</p>
    <p>Insurance: ${wantsInsurance ? "Yes" : "No"}</p>
    <p><strong>Total cost: $${total}</strong></p>
    <button onclick="startRental()">Start Over</button>
  `;
} 
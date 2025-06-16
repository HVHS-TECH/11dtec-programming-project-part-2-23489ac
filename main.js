/******************************
 * Cars Data
 ******************************/
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

/******************************
 * Main Function
 ******************************/
function startRental() {
  const name = document.getElementById("userName").value;
  const seatsNeeded = parseInt(document.getElementById("seatNumber").value);
  const days = parseInt(document.getElementById("rentalDays").value);
  const insurance = document.getElementById("insurance").value;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  // Input Validation
  if (!name || isNaN(seatsNeeded) || isNaN(days) || days < 1 || days > 30) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter valid input in all fields.</p>";
    return;
  }

  // Filter matching cars
  const matchingCars = cars.filter(car => car.seats >= seatsNeeded);

  if (matchingCars.length === 0) {
    resultDiv.innerHTML = "<p>No cars available for that many seats.</p>";
    return;
  }

  // Show all matching cars and prices
  let options = "<h2>Hello " + name + ", choose from these options:</h2><ul>";
  matchingCars.forEach(car => {
    const basePrice = car.price * days;
    const insuranceFee = insurance === "yes" ? INSURANCE_COST * days : 0;
    const total = basePrice + insuranceFee;
    options += `<li>${car.name} - \$${car.price}/day, Total: \$${total} (${days} days${insurance === "yes" ? ", incl. insurance" : ""})</li>`;
  });
  options += "</ul>";

  resultDiv.innerHTML = options;
}

document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

function calculateResults() {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please enter a valid number.");
  }
}

function showError(error) {
  // create a div
  const errorDiv = document.createElement("div");
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";

  //get Elements where the error div is gonna be located in

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add a class so it pops up in a proper style (red error)
  errorDiv.className = "alert alert-danger";

  //create a text node and append it to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert the error message above heading
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 1000);
}

function clearError() {
  document.querySelector(".alert").remove();
}

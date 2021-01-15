import 'bootstrap/dist/css/bootstrap.min.css';

const loanForm = document.querySelector('#loan-form');
const errorAlert = document.querySelector('#error-alert');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submitBtn = document.querySelector('#submit-btn');
const spinner = document.querySelector('#spinner');

const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

loanForm.addEventListener('submit', calculateResults);

function calculateResults(e) {
  e.preventDefault();

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    submitBtn.setAttribute('disabled', true);
    spinner.classList.remove('d-none');

    setTimeout(() => {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = (monthly * calculatedPayments - principal).toFixed(
        2,
      );

      spinner.classList.add('d-none');
      submitBtn.removeAttribute('disabled');
    }, 1000);
  } else {
    showError('Please check your numbers');
  }
}

function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove('d-none');

  setTimeout(() => {
    errorAlert.classList.add('d-none');
  }, 2000);
}

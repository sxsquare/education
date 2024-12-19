           /*---- topbar ----*/
document.addEventListener('DOMContentLoaded', () => {
  const menubar = document.getElementById("my_menubar");
  const menuBtn = document.getElementById("menu-icon");

  menuBtn.addEventListener('click', function() {
    const transformValue = window.getComputedStyle(menuBtn).transform;

    if (transformValue === "none" || transformValue === "matrix(1, 0, 0, 1, 0, 0)") {
      menubar.style.maxHeight = '100rem';
      menuBtn.style.transform = "rotate(-540deg)";
    } else {
      menubar.style.maxHeight = '0';
      menuBtn.style.transform = "rotate(0deg)";
    }
  });
});

           /*---- inputs function ----*/
document.addEventListener('DOMContentLoaded', () => {
  const mainBox = document.getElementById('content');
  
  const nameInputBox = document.getElementById('name-box');
  const nameInput = document.getElementById('inp_name');
  const nameCheckIcon = document.getElementById('name-check-icon');
  const nameErrorIcon = document.getElementById('name-error-icon');
  const nameErrorMsg = document.getElementById('name-error-msg');

  const amInputBox = document.getElementById('am-box');
  const amInput = document.getElementById('inp_am');
  const amCheckIcon = document.getElementById('am-check-icon');
  const amErrorIcon = document.getElementById('am-error-icon');
  const amErrorMsg = document.getElementById('am-error-msg');

  const finalBox = document.getElementById('payment-summary');
  const qrBtn = document.getElementById('qr-btn');
  const finalName = document.getElementById('final-name');
  const finalAm = document.getElementById('final-am');
  const img = document.getElementById('qr-img');
  const loading = document.getElementById('loading-bg');

function validateInputs() {
  const name = document.getElementById('inp_name').value.trim();
  const pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const am = document.getElementById('inp_am').value.trim();

  let isNameValid = false;
  let isAmValid = false;

  // Validate Name
  if (pattern.test(name)) {
    nameInputBox.style.marginBottom = '1.5rem';
    nameInput.style.border = '.1rem solid #00cc00';
    nameCheckIcon.style.display = 'block';
    nameErrorIcon.style.display = 'none';
    nameErrorMsg.style.display = 'none';

    isNameValid = true;
  } else {
    nameInputBox.style.marginBottom = '0';
    nameInput.style.border = '.1rem solid red';
    nameCheckIcon.style.display = 'none';
    nameErrorIcon.style.display = 'block';
    nameErrorMsg.style.display = 'block';
    nameErrorMsg.classList.add('shake');
    setTimeout(() => {
      nameErrorMsg.classList.remove('shake');
    }, 500);

    if (name === '') {
      nameErrorMsg.textContent = "Name cannot be empty!";
    } else if (!pattern.test(name)) {
      nameErrorMsg.textContent = "Please enter a valid name!";
    } else {
      nameErrorMsg.textContent = "Invalid name entered!";
    }

    isNameValid = false;
  }

  // Validate Amount
  if (am && am > 0 && am <= 100000) {
    amInputBox.style.marginBottom = '1.5rem';
    amInput.style.border = '.1rem solid #00cc00';
    amCheckIcon.style.display = 'block';
    amErrorIcon.style.display = 'none';
    amErrorMsg.style.display = 'none';

    isAmValid = true;
  } else {
    amInputBox.style.marginBottom = '0';
    amInput.style.border = '.1rem solid red';
    amCheckIcon.style.display = 'none';
    amErrorIcon.style.display = 'block';
    amErrorMsg.style.display = 'block';
    amErrorMsg.classList.add('shake');
    setTimeout(() => {
      amErrorMsg.classList.remove('shake');
    }, 500);

    if (am === '') {
      amErrorMsg.textContent = "Amount cannot be empty!";
    } else if (am <= 0) {
      amErrorMsg.textContent = "Amount must be greater than zero!";
    } else if (am > 100000) {
      amErrorMsg.innerHTML = "Amount cannot exceed 1 lakh,<br>as per UPI limits!";
    } else {
      amErrorMsg.textContent = "Please enter a valid amount!";
    }

    isAmValid = false;
  }

  return { isNameValid, isAmValid, name: name, amount: am };
}


let timerInterval;
let remainingTime = 0;
let startTime = 0;
const timerDuration = 2 * 60; // Set timer duration here (e.g., 2 minutes)

function startTimer(duration) {
    // Check if there's any saved time in localStorage, else start fresh
    if (localStorage.getItem('remainingTime')) {
        remainingTime = parseInt(localStorage.getItem('remainingTime'));
    } else {
        remainingTime = duration;
    }

    clearInterval(timerInterval); // Clear any previous intervals

    startTime = Date.now(); // Mark the start time

    timerInterval = setInterval(function() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time

        // Update remaining time based on elapsed time
        remainingTime = Math.max(0, duration - elapsedTime);

        // Update the timer display
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const display = document.getElementById('timer');
        display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Save remaining time to localStorage every second
        localStorage.setItem('remainingTime', remainingTime);

        // Timer expiry condition
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            handleTimerExpiry();
        }
    }, 1000);
}

// Function to handle timer expiry
function handleTimerExpiry() {
    console.log("Timer expired!");
    // Add any logic here, e.g., showing a message or refreshing the page
}

// This function will be called to initiate the timer
function initiateTimer() {
    localStorage.removeItem('remainingTime'); // Reset the stored time when initiating a new timer
    startTimer(timerDuration); // Start the timer from fresh state
}

function formatIndianCurrency(amount) {
  // Convert amount to string and format with commas as per Indian numbering system
  const [integerPart, decimalPart] = amount.toString().split('.'); // Separate integer and decimal parts

  // Format integer part with Indian currency style commas
  const lastThree = integerPart.slice(-3); // Get the last three digits
  const otherDigits = integerPart.slice(0, -3); // Get the remaining digits
  const formattedInteger = otherDigits
    ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;

  // Return formatted amount with decimal part, if present
  return decimalPart ? `₹ ${formattedInteger}.${decimalPart}` : `₹ ${formattedInteger}`;
}


// Event Listener for Generate QR Button
qrBtn.addEventListener('click', function () {
  const { isNameValid, isAmValid, name, amount } = validateInputs();

  if (isNameValid && isAmValid) {
    const eSrc = "aHR0cHM6Ly9xdWlja2NoYXJ0LmlvL3FyP3NpemU9MjAwJnRleHQ9dXBpJTNBJTJGJTJGcGF5JTNGcGElM0RzeHNxdWFyZSU0MHlibCUyNnBuJTNEU1hTJTIwRURVQ0FUSU9OJTI2dG4lM0RUaGFua3MlMjBmb3IlMjB0cnVzdGluZyUyMHVzISUyNmN1JTNESU5SJTI2YW0lM0Q=";
    const dSrc = atob(eSrc);
    const qrSrc = `${dSrc}${amount}`;
  
    mainBox.style.opacity = '0';
    loading.style.display = 'grid';
    
    mainBox.addEventListener('transitionend', function () { 
      mainBox.style.display = 'none';
      setTimeout(() => {
        loading.style.display = 'none';
        initiateTimer();
      }, 2000);
      img.src = qrSrc;
      finalBox.style.display = 'grid';
      finalName.textContent = `${name}`;
      const amount = document.getElementById('inp_am').value;
      finalAm.textContent = formatIndianCurrency(amount);
      img.style.display = 'block';
      console.log('QR code generated successfully...');
    });
  } else {
    console.log('Please fix the errors before generating the QR code!');
  }
});
  
  nameInput.addEventListener('input', function () {
    const id = document.getElementById('inp_name').value.trim();
    const pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  
      if (pattern.test(id)) {
        nameInputBox.style.marginBottom = '1.5rem';
        nameInput.style.border = '.1rem solid #00cc00';
        nameCheckIcon.style.display = 'block';
        nameErrorIcon.style.display = 'none';
        nameErrorMsg.style.display = 'none';
      } else {
          nameInputBox.style.marginBottom = '0';
          nameInput.style.border = '.1rem solid red';
          nameCheckIcon.style.display = 'none';
          nameErrorIcon.style.display = 'block';
          nameErrorMsg.style.display = 'block';
          nameErrorMsg.classList.add('shake');
          img.style.display = 'none';
          setTimeout(() => {
            nameErrorMsg.classList.remove('shake');
          }, 500);

          if (id === '') {
            nameErrorMsg.textContent = "Name cannot be empty!";
          } else if (!pattern.test(id)) {
              nameErrorMsg.textContent = "Please enter a valid name!";
            } else {
                nameErrorMsg.textContent = "Invalid name entered!";
              }
        }

  });


  amInput.addEventListener('input', function () {
    const id = document.getElementById('inp_name').value;    const value = document.getElementById('inp_am').value;
    
      if (value && value > 0 && value <= 100000) {
        amInput.style.border = '.1rem solid #00cc00';
        amInputBox.style.marginBottom = '1.5rem';
        amCheckIcon.style.display = 'block';
        amErrorIcon.style.display = 'none';
        amErrorMsg.style.display = 'none';
      } else {
          amInput.style.border = '.1rem solid red';
          amInputBox.style.marginBottom = '0';
          amCheckIcon.style.display = 'none';
          amErrorIcon.style.display = 'block';
          amErrorMsg.style.display = 'block';
          amErrorMsg.classList.add('shake');
          setTimeout(() => {
            amErrorMsg.classList.remove('shake');
          }, 500);
        
          if (value === '') {
            amErrorMsg.textContent = "Amount cannot be empty!";
          } else if (value <= 0) {
              amErrorMsg.textContent = "Amount must be greater than zero!";
            } else if (value > 100000) {
                amErrorMsg.innerHTML = "Amount cannot exceed 1 lakh,<br>as per UPI limits!";
              } else {
                  amErrorMsg.textContent = "Please enter a valid amount!";
                }
        }
  });
});

   
   
         /*-- Online/Offline status --*/
function updateStatusBar() {
  const statusBar = document.getElementById('status-bar');
  const img = document.getElementById('internet-img');
  const msg = document.getElementById('internet-msg');

  if (navigator.onLine) {
    setTimeout(() => {
      statusBar.style.display = 'none';
      document.body.style.overflowY = 'scroll';
    }, 1900);
    setTimeout(() => {
      statusBar.style.opacity = '0';
    }, 1000)
    img.src = 'https://assets.onecompiler.app/42fkuwhzd/42u3dq83t/1000043203.png';
    msg.style.color = '#00cc00';
    msg.textContent = 'Back Online'
  } else {
    setTimeout(() => {
      statusBar.style.opacity = '1';
      document.body.style.overflowY = 'hidden';
    }, 500);
    statusBar.style.display = 'grid';
    img.src = 'https://assets.onecompiler.app/42fkuwhzd/42u3dq83t/1000043166.png';
    msg.style.color = 'red';
    msg.textContent = 'No Internet Connection!'
  }
}

window.addEventListener('online', updateStatusBar);
window.addEventListener('offline', updateStatusBar);

document.addEventListener('DOMContentLoaded', () => {
  updateStatusBar();
});

        /*---- © current year ----*/
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
});
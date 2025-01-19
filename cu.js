                  /*---- Home ----*/
document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
    home.addEventListener('click', () => {
      window.location.replace("index.html");
    });
});

                /*---- onBack ----*/
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname !== '/index.html') {
    history.replaceState(null, '', 'index.html'); // Replace the initial state with index.html
  }
  history.pushState(null, '', window.location.pathname);
  window.addEventListener('popstate', (event) => {
    if (window.location.pathname !== '/index.html') {
      window.location.replace('index.html');
    }
  });
});

              /*---- feedback submission ----*/
document.addEventListener('DOMContentLoaded', () => {
  const pk = "V2lqYkJ2S0EzaVM1bzNzZXo=";
  const form = document.getElementById('form');
  const inputFields = form.querySelectorAll('input, select, textarea');
  const nameInput = document.getElementById('inp_name');
  const emailInput = document.getElementById('inp_email');
  const phoneInput = document.getElementById('inp_phone');
  const msgChar = document.getElementById('msg-char');
  const msgCharText = msgChar.textContent;
  const msgText = document.getElementById('text_msg');
  const submitBtn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading-bg');
  const loadingContent = document.getElementById('loading');
  const loadingError = document.getElementById('loading-error');
  const formStatus = document.getElementById('form-status');
  const successBox = document.getElementById('success-box-bg');
  const closeSb = document.getElementById('close-success');
  
  function validateOnInput() {
    inputFields.forEach(input => {
      const error = input.nextElementSibling;
      const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventType, () => {
        if (input.checkValidity()) {
          error.classList.remove('report');
          input.classList.remove('invalid');
          input.classList.add('valid');
        } else {
          input.classList.remove('valid');
          input.classList.add('invalid');
        }
      });
      
        if (input.value.trim()) {
          if (input.checkValidity()) {
            input.classList.add('valid');
          } else {
            input.classList.add('invalid');
          }
        }
    });
  }
  
  validateOnInput();
  
  nameInput.addEventListener('input', function () {
      const value = this.value;
      const words = value.split(' ');
      const capitalizedWords = words.map(word => {
        return word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
      });

      this.value = capitalizedWords.join(' ');
  });
  
  msgText.addEventListener('input', function () {
    msgLength = this.value.length;
    msgChar.textContent = `${msgLength} / 500`;
   
    if (this.value.startsWith(" ")) {
      this.value = this.value.trimStart();
    }
   
    if (msgLength >= 500) {
      msgChar.classList.add('warn');
      setTimeout(() => {
        msgChar.classList.remove('warn');
      }, 5000);
    } else {
      msgChar.classList.remove('warn');
    }
  });

  function validateAndStyleInputs() {
    let formIsValid = true;

    for (let input of inputFields) {
      const error = input.nextElementSibling;
      
        if (input.checkValidity()) {
          error.classList.remove('report');
          input.classList.remove('invalid');
          input.classList.add('valid');
        } else {
          input.focus();
          error.classList.add('report');
          input.classList.remove('valid');
          input.classList.add('invalid');
          formIsValid = false;
          break;
        }
    }

    return formIsValid;
  }
  
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const formIsValid = validateAndStyleInputs();
    if (formIsValid) {
        event.target.style.pointerEvents = 'none';
        formStatus.textContent = 'Submitting your form... Please wait a moment!';
        formStatus.classList.remove('unsuccessful', 'successful');
        formStatus.classList.add('processing');
        inputFields.forEach((field) => {
          field.style.pointerEvents = 'none';
        });
        submitForm();
    } else {
      console.log('Please fix all the error before submitting the feedback!');
    }
  });
  
  emailjs.init(atob(pk));
  
  function submitForm() {
  try {
    const fullName = nameInput.value.trim();
    const name = fullName.split(' ')[0];
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim() || 'N/A';
    const msg = msgText.value.trim();
    
    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      message: msg
    };

    emailjs.send('service_5y2g7ri', 'template_gqgnddd', templateParams)
      .then((response) => {
        console.log('Success:', response);
        form.reset();
        msgChar.textContent = msgCharText;
        inputFields.forEach((field) => {
          field.classList.remove('valid', 'invalid');
          field.style.pointerEvents = 'auto';
        });
        formStatus.classList.remove('processing');
        formStatus.classList.add('successful');
        formStatus.textContent = 'Form submitted successfully! Thank you for reaching out. We’ll get back to you shortly.'
        setTimeout(() => {
          formStatus.classList.remove('successful');
        }, 5000);
      })
      .catch((error) => {
        console.log('Error:', error);
        formStatus.textContent = 'Something went wrong. Please check your internet connection and review the provided input details before trying again!';
        formStatus.classList.add('unsuccessful');    
      });
  } catch (error) {
    alert(error);
  }
  }
  
  closeSb.addEventListener('click', () => {
    setTimeout(() => {
      successBox.classList.remove('visible');
    }, 250);
  });
});


          /*-- Online/Offline status --*/
function updateStatusBar() {
  const statusBar = document.getElementById('status-bar');
  const statusBarIcons = document.getElementById('status-bar-icons');
  const internet = document.getElementById('internet-img');
  const noInternet = document.getElementById('no-internet-icon')
  const msg = document.getElementById('internet-msg');
  const logo = document.getElementById('logo');

  if (navigator.onLine) {
    setTimeout(() => {
      statusBar.style.display = 'none';
      document.body.style.overflowY = 'scroll';
    }, 1900);
    setTimeout(() => {
      statusBar.style.opacity = '0';
    }, 1000);
    statusBarIcons.style.borderColor = '#0ef';
    internet.style.opacity = '1';
    noInternet.style.opacity = '0';
    msg.style.color = '#00cc00';
    msg.textContent = 'Back Online'
    logo.style.margin = '0';
  } else {
    setTimeout(() => {
      statusBar.style.opacity = '1';
      document.body.style.overflowY = 'hidden';
    }, 50);
    statusBar.style.display = 'grid';
    statusBarIcons.style.borderColor = '#007bff';
    internet.style.opacity = '0';
    noInternet.style.opacity = '1';
    msg.style.color = 'red';
    msg.textContent = 'No Internet Connection!'
    setTimeout(() => {
      logo.style.margin = 'auto';
    }, 500);
  }
}

window.addEventListener('online', updateStatusBar);
window.addEventListener('offline', updateStatusBar);

document.addEventListener('DOMContentLoaded', updateStatusBar);

        /*---- © current year ----*/
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
});

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

         /*-- instruction check button --*/
document.addEventListener('DOMContentLoaded', () => {
  const instructionCheckBtn = document.getElementById('instruction_check_btn');
  const startDisabledBtn = document.getElementById('start-disabled-btn');
  const checkboxError = document.querySelector('.checkbox-error');
  const startBtn = document.querySelector('.form-start-btn');

  instructionCheckBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const checked = instructionCheckBtn.classList.toggle('btn-checked');

    if (checked) {
      startDisabledBtn.style.display = 'none';
      checkboxError.style.display = 'none';
      startBtn.style.display = 'inline-block';
      instructionCheckBtn.style.marginBottom = '2.2rem';
      instructionCheckBtn.classList.remove('invalid');
      instructionCheckBtn.classList.add('valid');
    } else {
      startDisabledBtn.style.display = 'inline-block';
      startBtn.style.display = 'none';
      instructionCheckBtn.classList.remove('valid');
      instructionCheckBtn.classList.add('invalid');
    }
  });
});

       /*-- container's buttons function --*/
document.addEventListener('DOMContentLoaded', () => {

    const welcomeBox = document.getElementById('welcome-box');
    const giContainer = document.getElementById('g_i_container');
    const loading = document.getElementById('loading-bg');
    const formParentContainer = document.querySelector('.container');
    const scrollBox = document.getElementById('scroll-box');
    const instructionCheckBtn = document.getElementById('instruction_check_btn');
    const startDisabledBtn = document.getElementById('start-disabled-btn');
    const checkboxError = document.querySelector('.checkbox-error');
    const formStartBtn = document.querySelector('.form-start-btn');
    const giBtn = document.querySelector('.gi-btn');


    startDisabledBtn.addEventListener('click', function() {
      checkboxError.style.display = 'block';
      checkboxError.classList.add('shake');
      setTimeout(() => {
        checkboxError.classList.remove('shake');
      }, 500);
      instructionCheckBtn.classList.add('invalid');
      instructionCheckBtn.style.marginBottom = '.3rem';
      scrollBox.scrollTop = scrollBox.scrollHeight;
    });
    
    formStartBtn.addEventListener('click', function () {
        setTimeout(() => {
            document.body.style.overflowY = 'hidden';
            loading.style.display = 'grid';
            welcomeBox.style.opacity = '0';
            formParentContainer.style.display = 'grid';
            formParentContainer.classList.remove('left');
            formParentContainer.classList.remove('right');
            giContainer.classList.add('up');
            generateCaptcha();
        }, 200);

        giContainer.addEventListener('transitionend', function () {
            giContainer.style.display = 'none';
            welcomeBox.style.display = 'none';
            setTimeout(() => {
                formParentContainer.classList.add('left');
                document.body.style.overflowY = 'scroll';
                loading.style.display = 'none';
            }, 50);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { once: true });
    });

    giBtn.addEventListener('click', function () {
        setTimeout(() => {
            document.body.style.overflowY = 'hidden';
            loading.style.display = 'grid';
            giContainer.classList.remove('up');
            giContainer.classList.add('down');
            formParentContainer.classList.add('right');
        }, 200);

        formParentContainer.addEventListener('transitionend', function () {
            formParentContainer.style.display = 'none';
            giContainer.style.display = 'block';
            giContainer.style.marginTop = '9rem';
            setTimeout(() => {
                giContainer.classList.remove('down');
                document.body.style.overflowY = 'scroll';
                loading.style.display = 'none';
            }, 1000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { once: true });
    });
});

        /*---- Academic session ----*/
document.addEventListener('DOMContentLoaded', function() {
    function updateSession() {
        const today = new Date();
        const year = today.getFullYear();
        const startOfYear = new Date(year, 3, 1);

        let sessionText;
        if (today < startOfYear) {
            sessionText = (year - 1) + " - " + year;
        } else {
            sessionText = year + " - " + (year + 1);
        }

        document.getElementById('academic-session').innerText = sessionText;
    }

    updateSession();
});

       /*---- Input-floatation ----*/
document.addEventListener('DOMContentLoaded', () => {
  const label = input.nextElementSibling;

  input.addEventListener('focus', () => {
    label.classList.add('float');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      label.classList.remove('float');
    }
  });
});

         /*---- Make inputs sensible ----*/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input').forEach(input => {
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'off');
  });
  
  document.querySelectorAll('input:not(#inp_email):not(#inp_captcha):not(#inp_c_email)').forEach(input => {
    input.addEventListener('input', () => {
      const value = input.value;
      const words = value.split(' ');
      
      const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      input.value = capitalizedWords.join(' '); // Join words back with spaces
    });
  });
});

     /*---- Onclick enter btn in form ----*/
document.addEventListener('keydown', function(event) {
 
  if (event.key === 'Enter') {
    event.preventDefault();

      const focusableElements = Array.from(document.querySelectorAll('input:not(#inp_city):not(#inp_state), select'))
         .filter(el => el.type !== 'hidden' && el.type !== 'image');
    
      const currentIndex = focusableElements.indexOf(document.activeElement);

        if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
            focusableElements[currentIndex + 1].focus();
        }
  }
});

    /*---- Onclick span over select field ----*/
document.addEventListener('DOMContentLoaded', () => {
  const selectFields = document.querySelectorAll('.select-fields');
  const alertBar = document.querySelector('.alert-bar');

  selectFields.forEach(field => {
    const label = field.querySelector('label');
    const select = field.querySelector('select');
    const span = field.querySelector('span');
  
    span.addEventListener('click', () => {
      select.focus();
      alertBar.classList.add('show-alert');
      setTimeout(() => {
        alertBar.classList.remove('show-alert');
      }, 4000); 
    });
  });
});

      /*---- Select element functions ----*/
document.addEventListener('DOMContentLoaded', () => {
  const selectFields = document.querySelectorAll('.select-fields');

  selectFields.forEach(field => {
    const label = field.querySelector('label');
    const select = field.querySelector('select');
    const span = field.querySelector('span');
    
    if (select.value === '') {
      label.style.display = 'none';
      span.style.display = 'block';
    } else {
      label.style.display = 'block';
      span.style.display = 'none';
    }

    select.addEventListener('change', () => {
      if (select.value === '') {
        label.style.display = 'none';
        span.style.display = 'block';
      } else {
        label.style.display = 'block';
        span.style.display = 'none';
      }
    });
  });
});

        /*---- Fetch City & State ----*/
        
let pincodeIsValid = false;

function getCityState() {
  const pincode = document.getElementById('inp_pincode').value;
  const pincodeField = document.getElementById('inp_pincode');
  const cityField = document.getElementById('inp_city');
  const stateField = document.getElementById('inp_state');
  const errorIcon = document.getElementById('error-icon');
  const errorMsg = document.getElementById('error');
    
    cityField.value = '';
    stateField.value = '';
    errorIcon.style.display = 'none';
    errorMsg.style.display = 'none';

    if (pincode.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success") {
                    const postOffice = data[0].PostOffice[0];
                    cityField.value = postOffice.District;
                    stateField.value = postOffice.State;
                    pincodeField.classList.remove('invalid');
                    pincodeField.classList.add('valid');
                    cityField.classList.remove('invalid');
                    cityField.classList.add('valid');
                    stateField.classList.remove('invalid');
                    stateField.classList.add('valid');
                    pincodeIsValid = true;
                } else {
                    errorIcon.style.display = 'block';
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = "Invalid Pincode!";
                    pincodeField.classList.remove('valid');
                    pincodeField.classList.add('invalid');
                    cityField.value = '';
                    stateField.value = '';
                    cityField.classList.remove('valid');
                    stateField.classList.remove('valid');
                    pincodeIsValid = false;
                }
            })
            .catch(error => {
                errorIcon.style.display = 'block';
                errorMsg.style.display = 'block';
                errorMsg.textContent = "Something Went Wrong, try after sometimes!";
                pincodeField.classList.remove('valid');
                pincodeField.classList.add('invalid');
                cityField.value = '';
                stateField.value = '';
                cityField.classList.remove('valid');
                stateField.classList.remove('valid');
                pincodeIsValid = false;
            });
    } else {
        errorIcon.style.display = 'block';
        errorMsg.style.display = 'block';
   }
}

document.addEventListener('DOMContentLoaded', () => {
    const pincodeField = document.getElementById('inp_pincode');
    const cityField = document.getElementById('inp_city');
    const stateField = document.getElementById('inp_state');

    pincodeField.addEventListener('input', function() {
        if (this.value.length === 6) {
            getCityState();
        } else {
            cityField.value = '';
            stateField.value = '';
            cityField.classList.remove('valid');
            stateField.classList.remove('valid');
        }
    });
});

       /*-- Preview student's photo --*/
document.addEventListener('DOMContentLoaded', () => {
  const photoBox = document.getElementById('photo_box');
  const fileInput = document.getElementById('inp_photo');
  const uploadPhotoBtn = document.getElementById('upload_photo_btn');
  const deletePhotoBtn = document.getElementById('delete_photo_btn');
  const uploadError = document.getElementById('upload-error');
  const preview = document.getElementById('default_image_photo');
  const errorMsg = document.getElementById('photo-error');
  const defaultPhotoImageSrc = 'https://assets.onecompiler.app/42fkuwhzd/42rfnf4fh/1000038208.png';
  const maxSize = 2 * 1024 * 1024;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  uploadPhotoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    
    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        photoBox.classList.remove('invalid');
        deletePhotoBtn.style.display = 'inline-block';
        uploadPhotoBtn.style.display = 'none';
        uploadError.style.display = 'none';
        errorMsg.style.display = 'none';
      };
      reader.readAsDataURL(file);
    } else {
      errorMsg.textContent = file && !allowedTypes.includes(file.type) 
        ? 'Invalid file type! '
        : 'File size exceeds the limit.';
      errorMsg.style.display = 'block';
      fileInput.value = '';
      preview.src = defaultPhotoImageSrc;
      photoBox.classList.add('invalid');
      deletePhotoBtn.style.display = 'none';
      uploadPhotoBtn.style.display = 'inline-block';
      uploadError.style.display = 'none';
    }
  });
  
  deletePhotoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    preview.src = defaultPhotoImageSrc;
    deletePhotoBtn.style.display = 'none';
    uploadPhotoBtn.style.display = 'inline-block';
    uploadPhotoBtn.classList.add('invalid');
    fileInput.value = '';
    errorMsg.style.display = 'none';
  });
});

       /*-- Declaration check button --*/
document.addEventListener('DOMContentLoaded', () => {
  const declarationCheckBtn = document.getElementById('declaration_check_btn');
  const declarationCheckboxError = document.querySelector('.declaration-checkbox-error');
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.querySelector('.form-submit-btn');
  
  declarationCheckBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const checked = declarationCheckBtn.classList.toggle('btn-checked');

    if (checked) {
      declarationCheckboxError.style.display = 'none';
      declarationCheckBtn.style.marginBottom = '2.5rem';
      declarationCheckBtn.classList.remove('invalid');
      declarationCheckBtn.classList.add('valid');
    } else {
      declarationCheckBtn.classList.remove('valid');
      declarationCheckBtn.classList.add('invalid');
    }
  });
});

             /*---- CAPTCHA ----*/
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  document.getElementById('captcha').innerText = captcha;
}

function validateCaptcha() {
  const captcha = document.getElementById('captcha').innerText;
  const captchaInputValue = document.getElementById('inp_captcha').value;
  const captchaInput = document.getElementById('inp_captcha');
  const msg = document.getElementById('captcha_msg');
  
    if (captchaInputValue === '') {
      msg.innerText = 'Please Fill CAPTCHA!';
      msg.style.color = 'red';
      captchaInput.classList.remove('valid');
      captchaInput.classList.add('invalid');
    } else if (captchaInputValue === captcha) {
      msg.innerText = 'CAPTCHA Validated.';
      msg.style.color = '#00cc00';
      captchaInput.classList.remove('invalid');
      captchaInput.classList.add('valid');
    } else {
      msg.innerText = 'Invalid CAPTCHA!';
      msg.style.color = 'red';
      captchaInput.classList.remove('valid');
      captchaInput.classList.add('invalid');
      captchaInput.value = "";
      generateCaptcha();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
});

        /*-- Validation of inputs --*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const pk = "MUhaVTVUUHhFX0JzLVlfZkc=";
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.querySelector('.form-submit-btn');
  const emailInput = document.getElementById('inp_email');
  const email = emailInput.value.trim();
  const pincodeField = document.getElementById('inp_pincode');
  const pErrorMsg = document.getElementById('error');
  const name = document.getElementById('inp_student_first_name').value.trim();
  const declarationCheckBtn = document.getElementById('declaration_check_btn');
  const declarationCheckboxError = document.querySelector('.declaration-checkbox-error');
  const reviewBar = document.querySelector('.review-bar');
  const afterReview = document.getElementById('after-review');
  const verifyBox = document.getElementById('v-box-bg');
  const vLock = document.getElementById('v-lock');
  const vUnlock = document.getElementById('v-unlock');
  const eye = document.getElementById('v-eye');
  const eyeSlash = document.getElementById('v-eye-slash');
  const maskMail = document.getElementById('mask-mail');
  const editBtn = document.getElementById('edit-btn');
  const q = document.getElementById('q');
  const editQ = document.getElementById('edit-q');
  const editYes = document.getElementById('edit-yes');
  const editNo = document.getElementById('edit-no');
  const editInp = document.getElementById('edit-inp');
  const quiteEdit = document.getElementById('quite-edit');
  const cEmailInput = document.getElementById('inp_c_email');
  const cEmail = cEmailInput.value.trim();
  const cEmailMsg = document.getElementById('c-email-msg');
  const otpBtn = document.getElementById('otp-btn');
  
  const otpInput = document.getElementById('inp_otp');
  const otpMsg = document.getElementById('otp-msg');
  const otpVerifyGif = document.getElementById('otp-verify-gif');
  const loading = document.getElementById('loading-bg');
  const loadingContent = document.getElementById('loading');
  const loadingError = document.getElementById('loading-error');
  const formError = document.getElementById('form-error');
  const backNote = document.querySelector('.back-note');
  const waitNote = document.querySelector('.wait-note');

  let letEmail = "";
  let letCEmail = "";

  function validateOnInput() {
    const inputFields = form.querySelectorAll('input:not(.inp_captcha), select');
    inputFields.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
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

  function validateAndStyleInputs() {
    const inputFields = form.querySelectorAll('input, select');
    let formIsValid = true;

    inputFields.forEach((input) => {
    
      if (input.type === 'file' || input.offsetParent !== null) {
        if (input.checkValidity()) {
          input.classList.remove('invalid');
          input.classList.add('valid');
        } else {
          input.classList.remove('valid');
          input.classList.add('invalid');
          formIsValid = false;
        }
      }
    });

    return formIsValid;
  }

  function isDeclarationChecked() {
    return declarationCheckBtn.classList.contains('btn-checked');
  }
 
  submitDisabledBtn.addEventListener('click', (event) => {
      event.preventDefault();
      form.reportValidity();
    
      if (validateAndStyleInputs() && pincodeIsValid) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        reviewBar.classList.add('show-alert');
        setTimeout(() => {
          reviewBar.classList.remove('show-alert');
        }, 5000);
        setTimeout(() => {
          afterReview.style.display = 'block';
          submitDisabledBtn.style.display = 'none';
          submitBtn.style.display = 'inline-block';
        }, 1000);
        console.log('Form is valid. Once review again...');
      }
      else {
        console.log('Form is invalid! Please correct the errors and try again.');
    
        if (!pincodeIsValid) {
          if(pincodeField.value.length === 6) {
            pincodeField.focus();
            pincodeField.classList.remove('valid');
            pincodeField.classList.add('invalid');
            pErrorMsg.textContent = "Please enter a valid pincode!";
            pErrorMsg.classList.add('error-shake');
            setTimeout(() => {
              pErrorMsg.classList.remove('error-shake');
            }, 500);
          }
        }
      }
  });

  function maskEmail(currentEmail) {
    const [localPart, domain] = currentEmail.split("@");
    const maskedLocal = localPart[0] + "*".repeat(localPart.length - 2) + localPart.slice(-1);
   
    return `${maskedLocal}@${domain}`;
  }

  submitBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const otpEmail = document.getElementById('inp_email').value.trim();
      const finalName = document.getElementById('inp_student_first_name').value.trim();
      const submitError = document.getElementById('submit-error');
      const subjectField = document.getElementById('subject');
      subjectField.value = `${finalName}'s Form Submitted Successfully.`;

      if (validateAndStyleInputs() && pincodeIsValid && isDeclarationChecked()) {
        submitError.style.display = 'none';
        formError.style.display = 'none';
        loading.style.display = 'grid';
        letEmail = emailInput.value.trim();
        letCEmail = letEmail;
        cEmailInput.value = letCEmail;
        maskMail.textContent = maskEmail(emailInput.value.trim());
        sendOTP(otpEmail, finalName);
        console.log('Form is valid. Proceeding to the next page...');
      }
      else {
        submitError.style.display = 'block';
        submitError.classList.add('shake');
        setTimeout(() => {
          submitError.classList.remove('shake');
        }, 500);
        console.log('Form is invalid. Please correct the errors and try again.');
 
        if (!pincodeIsValid) {
          pincodeField.classList.remove('valid');
          pincodeField.classList.add('invalid');
          pErrorMsg.textContent = "Please enter a valid pincode!";
        }
        
        if (!isDeclarationChecked()) {
          declarationCheckboxError.style.display = 'block';
          declarationCheckBtn.classList.remove('valid');
          declarationCheckBtn.classList.add('invalid');
          declarationCheckBtn.style.marginBottom = '.3rem';
        }
      }
  });
  
  eye.addEventListener('click', () => {
      maskMail.textContent = emailInput.value.trim();
      eye.style.display = 'none';
      eyeSlash.style.display = 'block';
  });
  
  eyeSlash.addEventListener('click', () => {
      maskMail.textContent = maskEmail(emailInput.value.trim());
      eyeSlash.style.display = 'none';
      eye.style.display = 'block';
  });
  
  editBtn.addEventListener('click', () => {
      maskMail.textContent = maskEmail(emailInput.value.trim());
      editQ.classList.add('expand');
      eyeSlash.style.display = 'none';
      eye.style.display = 'block';
  });
  
  editYes.addEventListener('click', () => {
      q.style.display = 'none';
      editInp.style.display = 'block';
  });
  
  editNo.addEventListener('click', () => {
      editQ.classList.remove('expand');
  });
  
  quiteEdit.addEventListener('click', () => {
      editQ.classList.remove('expand');
      setTimeout(() => {
        cEmailInput.value = '';
        cEmailInput.classList.remove('invalid');
        cEmailMsg.classList.remove('unsuccessful');
      }, 500);
  });
  
  function sendOtpToCEmail(currentEmail) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
    if (currentEmail === emailInput.value.trim()) { // Check if the new email is the same as the old one
      cEmailInput.classList.remove('valid');
      cEmailInput.classList.add('invalid');
      cEmailMsg.classList.remove('successful');
      cEmailMsg.classList.add('unsuccessful');
      cEmailMsg.textContent = "Email can't be same as previous one!";
      cEmailMsg.classList.add('shake');
      setTimeout(() => {
        cEmailMsg.classList.remove('shake');
      }, 500);
      console.log('Email can not be the same as the previous one!');
    } else if (currentEmail === "") {
      cEmailInput.classList.remove('valid');
      cEmailInput.classList.add('invalid');
      cEmailMsg.classList.remove('successful');
      cEmailMsg.classList.add('unsuccessful');
      cEmailMsg.textContent = "Email input can't be empty!";
      cEmailMsg.classList.add('shake');
      setTimeout(() => {
        cEmailMsg.classList.remove('shake');
      }, 500);
      console.log('Error in Email correction!');
    } else if (pattern.test(currentEmail)) {
      cEmailInput.classList.remove('invalid');
      cEmailInput.classList.add('valid');
      cEmailMsg.classList.remove('unsuccessful');
      cEmailMsg.classList.add('successful');
      cEmailMsg.textContent = "Email updated and OTP sent successfully...";
    
      letCEmail = cEmailInput.value.trim();
      letEmail = letCEmail;
      emailInput.value = letEmail;
      maskMail.textContent = maskEmail(emailInput.value.trim());
   
      console.log('Email updated and OTP sent successfully...');
    } else {
      cEmailInput.classList.remove('valid');
      cEmailInput.classList.add('invalid');
      cEmailMsg.classList.remove('successful');
      cEmailMsg.classList.add('unsuccessful');
      cEmailMsg.textContent = "Please enter a valid email address!";
      cEmailMsg.classList.add('shake');
      setTimeout(() => {
        cEmailMsg.classList.remove('shake');
      }, 500);
      console.log('Error in Email correction!');
    }
  }
  
  cEmailInput.addEventListener('input', function () {
    if (this.value === email) {
      cEmailInput.classList.remove('valid');
      cEmailInput.classList.add('invalid');
    } else if (this.checkValidity()) {
      cEmailInput.classList.remove('invalid');
      cEmailInput.classList.add('valid');
    } else {
      cEmailInput.classList.remove('valid');
      cEmailInput.classList.add('invalid');
    }
  });
 
  otpBtn.addEventListener('click', () => {
    sendOtpToCEmail(cEmailInput.value.trim());
  });

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  }
  
  emailjs.init(atob(pk));

  function sendOTP(email, name) {
    const otp = generateOTP(); // Generate OTP
    const templateParams = {
      user_email: email, // User email input
      s_name: name,
      otp_code: otp // OTP code to send
    };

    // Send email via EmailJS
    emailjs.send('service_dyp7uux', 'template_w63jyif', templateParams)
      .then((response) => {
        console.log('Success:', response);
        // Save OTP temporarily (store in sessionStorage for limited time)
        sessionStorage.setItem('otp', otp);
        setTimeout(() => {
          loading.style.display = 'none';
          verifyBox.classList.add('visible');
        }, 2000);
        verifyBox.style.display = 'grid';
        setTimeout(() => {
          sessionStorage.removeItem('otp'); // OTP expires after 5 minutes
        }, 5 * 60 * 1000); // 5 minutes
      })
      .catch((error) => {
        console.log('Error:', error);
        setTimeout(() => {
          loadingContent.style.display = 'none';
          loadingError.style.display = 'block';
          formError.style.display = 'block';
        }, 3000); 
        setTimeout(() => {
          loading.style.display = 'none';
        }, 5000);
        setTimeout(()=> {
          loadingContent.style.display = 'block';
          loadingError.style.display = 'none';
        }, 5200);
        console.log('Something went wrong!');
      });
  }

  function verifyOTP(enteredOTP) {
    const storedOTP = sessionStorage.getItem('otp'); // Retrieve the stored OTP
    const pattern = /^\d{6}$/;

    if (enteredOTP === storedOTP) {
      vLock.style.display = 'none';
      vUnlock.style.display = 'block';
      otpInput.style.pointerEvents = 'none';
      otpInput.classList.remove('invalid');
      otpInput.classList.add('valid');
      otpMsg.classList.remove('unsuccessful');
      otpMsg.classList.add('successful');
      otpMsg.textContent = "Verification Successful...";
      otpVerifyGif.style.display = 'none';
      setTimeout(() => {
        verifyBox.classList.remove('visible');
      }, 1500);
      setTimeout(() => {
        verifyBox.style.display = 'none';
        loading.style.display = 'grid';
        backNote.style.display = 'block';
        form.submit();
      }, 2000);
      setTimeout(() => {
        form.reset();
      }, 12000);
      setTimeout(() => {
        waitNote.style.display = 'block';
      }, 52000);
      console.log('OTP verified successfully.');
      // Proceed with registration or login process
    } else {
        otpInput.classList.remove('valid');
        otpInput.classList.add('invalid');
        otpMsg.classList.remove('successful');
        otpMsg.classList.add('unsuccessful');
        otpMsg.classList.add('shake');
        otpVerifyGif.style.display = 'none';
        setTimeout(() => {
          otpMsg.classList.remove('shake');
        }, 500);
      
      if (pattern.test(enteredOTP)) {
        otpMsg.textContent = "Invalid OTP!";
        vLock.style.display = 'block';
        vUnlock.style.display = 'none';
        console.log('Invalid OTP! Please try again...');
      } else {
        otpMsg.textContent = "Enter a valid 6-digit OTP!";
        otpInput.value = "";
        vLock.style.display = 'block';
        vUnlock.style.display = 'none';
        console.log('Please enter a valid 6-digit OTP...');
      }
    }
  }

  otpInput.addEventListener('input', () => {
    const enteredOTP = otpInput.value.trim();
     
    if (enteredOTP.length === 6) {
      otpVerifyGif.style.display = 'block';
      setTimeout(() => {
        verifyOTP(enteredOTP);
      }, 2000);
    } else {
      console.log('Please enter 6-digit OTP');
    }
  });
});

    /*-- uploadBtn border onclick submit btn --*/
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('inp_photo');
  const uploadPhotoBtn = document.getElementById('upload_photo_btn');
  const error = document.getElementById('upload-error');
  const errorMsg = document.getElementById('photo-error');
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.querySelector('.form-submit-btn');
  const result = document.getElementById('result');
  
    submitDisabledBtn.addEventListener('click', () => {
       
      if (fileInput.value === '') {
        uploadPhotoBtn.classList.remove('valid');
        uploadPhotoBtn.classList.add('invalid');
        error.style.display = 'block';
        error.classList.add('shake');
        setTimeout(() => {
          error.classList.remove('shake');
        }, 500);
        errorMsg.style.display = 'none';
      } else {
        error.style.display = 'none';
      }
    });
   
    submitBtn.addEventListener('click', () => {
       
      if (fileInput.value === '') {
        uploadPhotoBtn.classList.remove('valid');
        uploadPhotoBtn.classList.add('invalid');
        error.style.display = 'block';
        errorMsg.style.display = 'none';
      } else {
        error.style.display = 'none';
      }
    });
});

       /*-- Online/Offline status --*/
function updateStatusBar() {
  const statusBar = document.getElementById('status-bar');
  const img = document.getElementById('internet-img');
  const msg = document.getElementById('internet-msg');
  const logo = document.getElementById('logo');
  const menubar = document.getElementById("my_menubar");
  const bellBtn = document.getElementById('bell-icon');
  const menuBtn = document.getElementById("menu-icon");
  const adblockContainer = document.getElementById('adblockContainer');

  if (navigator.onLine) {
    setTimeout(() => {
      statusBar.style.display = 'none';
      document.body.style.overflowY = 'scroll';
      adblockContainer.style.opacity = '1';
    }, 1900);
    setTimeout(() => {
      statusBar.style.opacity = '0';
      menubar.style.opacity = '1';
      bellBtn.style.opacity = '1';
      menuBtn.style.opacity = '1';
    }, 1000);
    img.src = 'https://assets.onecompiler.app/42fkuwhzd/42u3dq83t/1000043203.png';
    msg.style.color = '#00cc00';
    msg.textContent = 'Back Online'
    logo.style.margin = '0';
    menubar.style.display = 'block';
    bellBtn.style.display = 'block';
    menuBtn.style.display = 'block';
  } else {
    setTimeout(() => {
      statusBar.style.opacity = '1';
      document.body.style.overflowY = 'hidden';
    }, 50);
    statusBar.style.display = 'grid';
    img.src = 'https://assets.onecompiler.app/42fkuwhzd/42u3dq83t/1000043166.png';
    msg.style.color = 'red';
    msg.textContent = 'No Internet Connection!'
    menubar.style.opacity = '0';
    bellBtn.style.opacity = '0';
    menuBtn.style.opacity = '0';
    adblockContainer.style.opacity = '0';
    setTimeout(() => {
      logo.style.margin = 'auto';
      menubar.style.display = 'none';
      bellBtn.style.display = 'none';
      menuBtn.style.display = 'none';
    }, 500);
  }
}

window.addEventListener('online', updateStatusBar);
window.addEventListener('offline', updateStatusBar);

document.addEventListener('DOMContentLoaded', () => {
  updateStatusBar();
});

      /*-- Function to detect ad blockers --*/
let adblockDetected = false;

function detectAdBlock() {
    const adblockContainer = document.getElementById('adblockContainer');

    const testScript = document.createElement('script');
    testScript.type = 'text/javascript';
    testScript.async = true;
    testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?nocache=' + Math.floor(Math.random() * 1000);

    testScript.onerror = function () {
        if (!adblockDetected) {
            adblockDetected = true;
            adblockContainer.style.display = 'grid';
        }
    };

    testScript.onload = function () {
        if (adblockDetected) {
            adblockDetected = false;
            adblockContainer.style.display = 'none';
        }
    };

    document.head.appendChild(testScript);
}

document.addEventListener('DOMContentLoaded', () => {
  const formStartBtn = document.querySelector('.form-start-btn');
   
  formStartBtn.addEventListener('click', function () {
    setTimeout(detectAdBlock, 1000);
    setInterval(detectAdBlock, 5000);
  });      
});

        /*---- © current year ----*/
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
});
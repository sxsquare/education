            /*---- initial content loading ----*/
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('my_navbar');
  const pageC = document.getElementById('page-content');
  const pageSk = document.getElementById('page-sk');
  const minT = 1000;
  const maxT = 8000;
  const pageLoadT = Math.random() * (maxT - minT) + minT;

    navbar.style.transform = 'translateY(0)';
    setTimeout(() => {
      pageC.style.opacity = '1';
      pageSk.style.display = 'none';
    }, pageLoadT);
});

              /*---- notifications ----*/
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById("my_sidebar");
  const bellBtn = document.getElementById("bell-icon");
  const closeBtn = document.getElementById("close-icon");

  bellBtn.addEventListener('click', function() {
    this.style.display = 'none';
    sidebar.classList.add('open-msg');
    closeBtn.style.display = 'block';
    document.body.style.overflowY = 'hidden';
  });
  
  closeBtn.addEventListener('click', function() {
    this.style.display = 'none';
    sidebar.classList.remove('open-msg');
    bellBtn.style.display = 'block';
    document.body.style.overflowY = 'scroll';
  });
  
});

              /*---- menuBar ----*/
document.addEventListener('DOMContentLoaded', () => {
  const menubar = document.getElementById("my_menubar");
  const menuBtn = document.getElementById("menu-btn");
  const menuIcon = document.getElementById("menu-icon");

  menuBtn.addEventListener('click', function() {
    const transformValue = window.getComputedStyle(menuIcon).transform;

    if (transformValue === "none" || transformValue === "matrix(1, 0, 0, 1, 0, 0)") {
      menubar.classList.add('open-menu');
      this.classList.add('active');
      menuIcon.style.transform = "rotate(-540deg)";
    } else {
      menubar.classList.remove('open-menu');
      this.classList.remove('active');
      menuIcon.style.transform = "rotate(0deg)";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
  const fs = document.getElementById('fee-submission');
  const fb = document.getElementById('feedback');
  const cu = document.getElementById('contact-us');

  home.addEventListener('click', () => {
    location.reload();
  });
  fs.addEventListener('click', () => {
    window.location.replace('fs.html');
  });
  fb.addEventListener('click', () => {
    window.location.replace('fb.html');
  });
  cu.addEventListener('click', () => {
    window.location.replace('cu.html');
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
    const captchaInput = document.getElementById('inp_captcha');
    const msg = document.getElementById('captcha_msg');

    startDisabledBtn.addEventListener('click', () => {
      checkboxError.style.display = 'block';
      checkboxError.classList.add('shake');
      setTimeout(() => {
        checkboxError.classList.remove('shake');
      }, 500);
      instructionCheckBtn.classList.add('invalid');
      instructionCheckBtn.style.marginBottom = '.3rem';
      scrollBox.scrollTop = scrollBox.scrollHeight;
    });
    
    formStartBtn.addEventListener('click', () => {
        setTimeout(() => {
            document.body.style.overflowY = 'hidden';
            loading.style.display = 'grid';
            welcomeBox.style.opacity = '0';
            formParentContainer.style.display = 'grid';
            formParentContainer.classList.remove('left');
            formParentContainer.classList.remove('right');
            giContainer.classList.add('up');
            msg.innerText = '';
            captchaInput.classList.remove('valid');
            captchaInput.classList.remove('invalid');
            captchaInput.value = "";
            generateCaptcha();
        }, 200);

        giContainer.addEventListener('transitionend', function () {
            this.style.display = 'none';
            welcomeBox.style.display = 'none';
            setTimeout(() => {
                formParentContainer.classList.add('left');
                document.body.style.overflowY = 'scroll';
                loading.style.display = 'none';
                applyOSA();
            }, 50);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { once: true });
    });

    giBtn.addEventListener('click', () => {
        setTimeout(() => {
            document.body.style.overflowY = 'hidden';
            loading.style.display = 'grid';
            giContainer.classList.remove('up');
            giContainer.classList.add('down');
            formParentContainer.classList.add('right');
        }, 200);

        formParentContainer.addEventListener('transitionend', function () {
            this.style.display = 'none';
            giContainer.style.display = 'block';
            giContainer.style.marginTop = '6rem';
            setTimeout(() => {
                giContainer.classList.remove('down');
                document.body.style.overflowY = 'scroll';
                loading.style.display = 'none';
            }, 1000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { once: true });
    });
});

         /*---- Object's initial animation ----*/
  function objectShowingAnimation() {
    const objects = document.querySelectorAll('.input-fields, .select-fields, .osa-element');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    objects.forEach(object => {
        observer.observe(object);
    });
  }
  
  function runOSA() {
    objectShowingAnimation();
  }
  
  function applyOSA() {
    const objects = document.querySelectorAll('.input-fields, .select-fields, .osa-element');
      objects.forEach(object => {
          object.classList.remove('animate');
      });
     
      setTimeout(() => {
        runOSA();
      }, 250);
  }

            /*---- Academic session ----*/
document.addEventListener('DOMContentLoaded', () => {
    function updateSession() {
        const today = new Date();
        const year = today.getFullYear();
        const startOfYear = new Date(year, 3, 1);
        const session = document.getElementById('academic-session');

        let sessionText;
        if (today < startOfYear) {
            sessionText = (year - 1) + " - " + year;
        } else {
            sessionText = year + " - " + (year + 1);
        }

      session.innerText = sessionText;
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
  
  document.querySelectorAll('input:not(.no-cap)').forEach(input => {
    input.addEventListener('input', function () {
      const value = this.value;
      const words = value.split(' ');
      const capitalizedWords = words.map(word => {
        return word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
      });

      this.value = capitalizedWords.join(' ');
    });
  });
  
  document.querySelectorAll('.sna').forEach(input => {
    input.addEventListener('input', function () {
      this.value = this.value.replace(/\s+/g, '');
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

          /*---- alert-functions ----*/
  let typingTimer;
  let alertTimer;

  function typeMsg(element, text) {
    let index = 0;
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    element.textContent = "";

    function typeLetter() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        typingTimer = setTimeout(typeLetter, 25);
      } else {
        console.log('Typing complete.');
      }
    }
    
    typeLetter();
  }

  function showAlert(alertBox, msg, alertType) {
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    if (alertBox) {
      alertBox.classList.remove("warning", "review");
      alertBox.classList.add(alertType);
      typeMsg(alertBox, msg);
      alertTimer = setTimeout(() => {
        alertBox.classList.remove(alertType);
        alertBox.textContent = "";
        alertTimer = null;
      }, 6000);
    }
  }

           /*---- Dob functions ----*/
document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById('inp_student_dob');
  const fl = document.querySelector('.dob-fl');
  const ol = document.querySelector('.dob-ol'); 
  const alertBox = document.getElementById('alert-box');
  
  flatpickr("#inp_student_dob", {
    minDate: "1976-01-01",
    maxDate: "today",
    dateFormat: "d-m-Y"
  });

  function toggleLabels() {
    if (inp.value === '') {
      fl.style.display = 'none';
      ol.style.display = 'block';
    } else {
      fl.style.display = 'block';
      ol.style.display = 'none';
    }
  }

  toggleLabels();

  inp.addEventListener('change', toggleLabels);

  ol.addEventListener('click', () => {
    const alertMsg = "To select date of birth, please click in blank area or on arrow.";
    showAlert(alertBox, alertMsg, "warning");
  });
});

    /*---- Onclick span over select field ----*/
document.addEventListener('DOMContentLoaded', () => {
  const selectFields = document.querySelectorAll('.select-fields');
  const alertBox = document.getElementById('alert-box');

  selectFields.forEach(field => {
    const label = field.querySelector('label');
    const select = field.querySelector('select');
    const span = field.querySelector('span');
  
    span.addEventListener('click', () => {
      select.focus();
      const alertMsg = "To select an option, please click in blank area or on arrow.";
      showAlert(alertBox, alertMsg, "warning");
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

        /*---- Onclick city-state input ----*/
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.cs-box');
  const alertBox = document.getElementById('alert-box');
  
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      const input = box.querySelector('input');
      if (!input.value.trim()) {
        const alertMsg = "Please enter your Pincode to automatically fetch the City & State.";
        showAlert(alertBox, alertMsg, "warning");
      }
    });
  });
});

    /*-- uploadBtn border onclick submit btn --*/
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('inp_photo');
  const uploadPhotoBtn = document.getElementById('upload_photo_btn');
  const error = document.getElementById('upload-error');
  const errorMsg = document.getElementById('photo-error');
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.getElementById('submit-btn');
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
  const submitBtn = document.getElementById('submit-btn');
  
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
  let captchaIsValid = false;
  
    if (captchaInputValue === '') {
      msg.innerText = 'Please Fill CAPTCHA!';
      msg.style.color = 'red';
      captchaInput.classList.remove('valid');
      captchaInput.classList.add('invalid');
      captchaIsValid = false;
    } else if (captchaInputValue === captcha) {
      msg.innerText = 'CAPTCHA Validated.';
      msg.style.color = '#00cc00';
      captchaInput.classList.remove('invalid');
      captchaInput.classList.add('valid');
      captchaIsValid = true;
    } else {
      msg.innerText = 'Invalid CAPTCHA!';
      msg.style.color = 'red';
      captchaInput.classList.remove('valid');
      captchaInput.classList.add('invalid');
      captchaInput.value = "";
      generateCaptcha();
      captchaIsValid = false;
    }
    
  return captchaIsValid;
}

document.addEventListener('DOMContentLoaded', generateCaptcha);


          /*-- Student's registration process --*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const pk = "MUhaVTVUUHhFX0JzLVlfZkc=";
  const sk = "VkRCV2RtTnNiRmxTYWs1UlZrUkJPUT09";
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.getElementById('submit-btn');
  const emailInput = document.getElementById('inp_email');
  const email = emailInput.value.trim();
  const pincodeField = document.getElementById('inp_pincode');
  const pErrorMsg = document.getElementById('error');
  const name = document.getElementById('inp_student_first_name');
  const declarationCheckBtn = document.getElementById('declaration_check_btn');
  const declarationCheckboxError = document.querySelector('.declaration-checkbox-error');
  const alertBox = document.getElementById('alert-box');
  const afterReview = document.getElementById('after-review');
  const xd = atob(sk);
  const yd = atob(xd);
  const zd = atob(yd);
  const verifyBox = document.getElementById('v-box-bg');
  const verifyBoxContent = document.getElementById('v-box');
  const vLock = document.getElementById('v-lock');
  const vUnlock = document.getElementById('v-unlock');
  const vDl = document.getElementById('v-dl');
  const vHeading = document.getElementById('v-heading');
  const vOtpVerify = document.getElementById('v-otp-verify');
  const eye = document.getElementById('v-eye');
  const eyeSlash = document.getElementById('v-eye-slash');
  const maskMail = document.getElementById('mask-mail');
  const editBtn = document.getElementById('edit-btn');
  const editQ = document.getElementById('edit-q');
  const editQContent = document.getElementById('edit-q-content');
  const q = document.getElementById('q');
  const editYes = document.getElementById('edit-yes');
  const editNo = document.getElementById('edit-no');
  const editInp = document.getElementById('edit-inp');
  const quiteEdit = document.getElementById('quite-edit');
  const cEmailInput = document.getElementById('inp_c_email');
  const cEmail = cEmailInput.value.trim();
  const cEmailMsg = document.getElementById('c-email-msg');
  const otpBtn = document.getElementById('otp-btn');
  const toString = atob(zd);
  const resendOtp = document.getElementById('resend-otp');
  const resendMsg = document.getElementById('resend-msg');
  const otpInput = document.getElementById('inp_otp');
  const otpMsg = document.getElementById('otp-msg');
  const otpVerifyGif = document.getElementById('otp-verify-gif');
  const vFormPrint = document.getElementById('v-form-dl');
  const dlNo = document.getElementById('dl-no');
  const dlYes = document.getElementById('dl-yes');
  const verifyLoading = document.getElementById('vlg-bg');
  const loading = document.getElementById('loading-bg');
  const loadingContent = document.getElementById('loading');
  const loadingError = document.getElementById('loading-error');
  const formError = document.getElementById('form-error');
  const backNote = document.getElementById('back-note');
  const waitNote = document.getElementById('wait-note');

  let letEmail = "";
  let letCEmail = "";

  function validateOnInput() {
    const inputFields = form.querySelectorAll('input:not(.inp_captcha), select');
    inputFields.forEach(input => {
      const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventType, () => {
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

    inputFields.forEach(input => {
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
      const formIsValid = validateAndStyleInputs();
      
      if (formIsValid && pincodeIsValid) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const alertMsg = "Please review all the details once again before final submission.";
        showAlert(alertBox, alertMsg, "review");
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

      const pwEmail = emailInput.value.trim();
      const finalName = name.value.trim();
      const submitError = document.getElementById('submit-error');
      const subjectField = document.getElementById('subject');
      subjectField.value = `${finalName}'s Form Submitted Successfully.`;
      
      const optSubject = document.getElementById('opt_subjects');
      const inpSubject = document.getElementById('inp_subjects');
      const selectedOptions = Array.from(optSubject.selectedOptions).map(option => option.value);
      inpSubject.value = selectedOptions.join(', ');
   
      
      const formIsValid = validateAndStyleInputs();
      const captchaIsValid = validateCaptcha();

      if (formIsValid && pincodeIsValid && captchaIsValid && isDeclarationChecked()) {
        submitError.style.display = 'none';
        formError.style.display = 'none';
        loading.style.display = 'grid';
        letEmail = emailInput.value.trim();
        letCEmail = letEmail;
        cEmailInput.value = letCEmail;
        maskMail.textContent = maskEmail(emailInput.value.trim());
        sendPw(pwEmail, finalName);
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
      editQContent.classList.add('move-in');
      setTimeout(() => {
        q.style.display = 'none';
        editInp.style.display = 'block';
        editQContent.classList.add('move-out');
        quiteEdit.classList.add('move');
      }, 1000);
  });
  
  editNo.addEventListener('click', () => {
      editQ.classList.remove('expand');
  });
  
  quiteEdit.addEventListener('click', () => {
      editQ.classList.remove('expand');
      setTimeout(() => {
        cEmailInput.value = emailInput.value.trim();
        cEmailInput.classList.remove('valid');
        cEmailInput.classList.remove('invalid');
        cEmailMsg.classList.remove('unsuccessful');
      }, 500);
  });
  
  function generatePw() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  emailjs.init(atob(pk));

  function sendPw(email, name, mode = "initial") {
    sessionStorage.removeItem('dmVyaWZpY2F0aW9uUHc=');
    sessionStorage.removeItem('ZHluYW1pYyBrZXk=');
    
    const pw = generatePw();
    const templateParams = {
      user_email: email,
      s_name: name,
      p_c: pw
    };
    
    const pwD = CryptoJS.SHA256(Date.now().toString() + Math.random().toString()).toString();
    const ePw = CryptoJS.AES.encrypt(pw, pwD).toString();
    const pwdD = CryptoJS.SHA256(toString).toString();
    const ePwd = CryptoJS.AES.encrypt(pwD, pwdD).toString();
    
    emailjs.send('service_dyp7uux', 'template_w63jyif', templateParams)
      .then((response) => {
        console.log('Success:', response);
        sessionStorage.setItem('dmVyaWZpY2F0aW9uUHc=', ePw);
        sessionStorage.setItem('ZHluYW1pYyBrZXk=', ePwd);
        if (mode === "initial") {
          verifyBox.style.display = 'grid';
          setTimeout(() => {
            initiateTimer();
            loading.style.display = 'none';
            verifyBox.classList.add('visible');
          }, 2000);
        } else if (mode === "resend") {
          resendMsg.classList.add('successful');
          resendMsg.textContent = 'OTP sent successfully...';
          otpInput.value = "";
          otpInput.classList.remove('invalid');
          otpMsg.classList.remove('unsuccessful');
          setTimeout(() => {
            initiateTimer();
          }, 1000);
          setTimeout(() => {
            verifyLoading.style.display = 'none';
          }, 1500);
          setTimeout(() => {
            resendMsg.classList.remove('successful');
          }, 2000);
        } else if (mode === "correction") {
          letCEmail = email;
          letEmail = letCEmail;
          emailInput.value = letEmail;
          maskMail.textContent = maskEmail(emailInput.value.trim());
          cEmailMsg.classList.add('successful');
          cEmailMsg.textContent = 'OTP sent successfully...';
          otpInput.value = "";
          otpInput.classList.remove('invalid');
          otpMsg.classList.remove('unsuccessful');
          setTimeout(() => {
            initiateTimer();
            editQ.classList.remove('expand');
          }, 1500);
          setTimeout(() => {
            cEmailInput.value = email;
            cEmailInput.classList.remove('valid');
            cEmailMsg.classList.remove('successful');
            editQContent.classList.remove('move-in');
            q.style.display = 'block';
            editInp.style.display = 'none';
            editQContent.classList.remove('move-out');
            quiteEdit.classList.remove('move');
          }, 2000);
          setTimeout(() => {
            verifyLoading.style.display = 'none';
          }, 2500);
        }
        setTimeout(() => {
          sessionStorage.removeItem('dmVyaWZpY2F0aW9uUHc=');
          sessionStorage.removeItem('ZHluYW1pYyBrZXk=');
        }, 5 * 60 * 1000);
      })
      .catch((error) => {
        console.log('Error:', error);
        if (mode === "initial") {
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
        } else if (mode === "resend") {
          resendMsg.classList.add('unsuccessful');
          resendMsg.textContent = 'Something went wrong!';
          setTimeout(() => {
            verifyLoading.style.display = 'none';
          }, 500);
        } else if (mode === "correction") {
          cEmailMsg.classList.add('unsuccessful');
          cEmailMsg.textContent = 'Error: check Email and try again!';
          setTimeout(() => {
            verifyLoading.style.display = 'none';
          }, 500);
        }
      });
  }

  function verifyPw(enteredPw) {
    const pwdD = CryptoJS.SHA256(toString).toString();
    const ePwd = sessionStorage.getItem('ZHluYW1pYyBrZXk=');
    const dPwdBytes = CryptoJS.AES.decrypt(ePwd, pwdD);
    const dPwd = dPwdBytes.toString(CryptoJS.enc.Utf8);

    const ePw = sessionStorage.getItem('dmVyaWZpY2F0aW9uUHc=');
    const dPwBytes = CryptoJS.AES.decrypt(ePw, dPwd);
    const dPw = dPwBytes.toString(CryptoJS.enc.Utf8);
  
    const pattern = /^\d{6}$/;

    if (enteredPw === dPw) {
      const random = Math.floor(100000 + Math.random() * 900000);
      regId = `SE${random}R`;
      confirmTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-GB');
      vLock.style.display = 'none';
      vUnlock.style.display = 'block';
      otpInput.classList.remove('invalid');
      otpInput.classList.add('valid');
      otpMsg.classList.remove('unsuccessful');
      otpMsg.classList.add('successful');
      otpMsg.textContent = "Verification Successful...";
      otpVerifyGif.style.display = 'none';
      setTimeout(() => {
        verifyBoxContent.classList.add('close');
      }, 500);
      setTimeout(() => {
        vUnlock.style.display = 'none';
        vDl.style.display = 'block';
        vHeading.textContent = 'Download Form';
        vOtpVerify.style.display = 'none';
        vFormPrint.style.display = 'block';
        verifyBoxContent.classList.remove('close');
      }, 1000);
      console.log('OTP verified successfully.');
    } else {
        otpInput.focus();
        otpInput.style.pointerEvents = 'auto';
        editBtn.style.pointerEvents = 'auto';
        otpInput.classList.remove('valid');
        otpInput.classList.add('invalid');
        otpMsg.classList.remove('successful');
        otpMsg.classList.add('unsuccessful');
        otpMsg.classList.add('shake');
        otpVerifyGif.style.display = 'none';
        setTimeout(() => {
          otpMsg.classList.remove('shake');
        }, 500);
      
      if (pattern.test(enteredPw)) {
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

  function submitForm() { 
    setTimeout(() => {
      verifyBox.classList.remove('visible');
    }, 1500);
    setTimeout(() => {
      verifyBox.style.display = 'none';
      loading.style.display = 'grid';
      backNote.style.display = 'block';
      form.submit();
    }, 1750);
    setTimeout(() => {
      form.reset();
    }, 12000);
    setTimeout(() => {
      waitNote.style.display = 'block';
    }, 52000);
  }
  
  otpInput.addEventListener('input', function () {
    const enteredOTP = otpInput.value.trim();
     
    if (enteredOTP.length === 6) {
      this.blur();
      this.style.pointerEvents = 'none';
      otpVerifyGif.style.display = 'block';
      editBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        verifyPw(enteredOTP);
      }, 2000);
    } else {
      console.log('Please enter 6-digit OTP');
    }
  });
  
  let timerInterval;
  let remainingTime = 0;
  let startTime = 0;
  const timerDuration = 2 * 60;

  function startTimer(duration) {
    if (localStorage.getItem('cmVzZW5kX290cA==')) {
        remainingTime = parseInt(localStorage.getItem('cmVzZW5kX290cA=='));
    } else {
        remainingTime = duration;
    }

    clearInterval(timerInterval);

    startTime = Date.now();

    timerInterval = setInterval(function() {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

      remainingTime = Math.max(0, duration - elapsedTime);

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      const timer = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      resendOtp.innerHTML = `(Resend OTP) <span class="fa fa-clock-o clock"></span> <strong class="timer">${timer}</strong>`; 

      localStorage.setItem('cmVzZW5kX290cA==', remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        handleTimerExpiry();
      }
    }, 1000);
  }

  function handleTimerExpiry() {
    resendOtp.textContent = 'Resend OTP';
    console.log("Timer expired!");
  }

  function initiateTimer() {
    localStorage.removeItem('cmVzZW5kX290cA==');
    startTimer(timerDuration);
  }
  
  resendOtp.addEventListener('click', () => {
    const sameEmail = emailInput.value.trim();
    const sameName = name.value.trim();

    if (remainingTime <= 0) {
      verifyLoading.style.display = 'grid';
      sendPw(sameEmail, sameName, "resend");
    }
  });
  
  function sendPwToCEmail(currentEmail) {
    let emailIsValid = false;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function setValidationState(input, msgElement, isValid, message, shake = true) {
      input.classList.toggle('valid', isValid);
      input.classList.toggle('invalid', !isValid);
      msgElement.classList.toggle('unsuccessful', !isValid);
      msgElement.textContent = message;

      if (shake) {
        msgElement.classList.add('shake');
        setTimeout(() => {
          msgElement.classList.remove('shake');
        }, 500);
      }
    }

    if (currentEmail === emailInput.value.trim()) {
      setValidationState(
        cEmailInput,
        cEmailMsg,
        false,
        "Email can't be same as previous one!"
      );
      emailIsValid = false;
    } else if (!currentEmail) {
      setValidationState(cEmailInput, cEmailMsg, false, "Email input can't be empty!");
      emailIsValid = false;
    } else if (pattern.test(currentEmail)) {
      setValidationState(
        cEmailInput,
        cEmailMsg,
        true,
        "",
        false
      );
      emailIsValid = true;
      console.log('Email updated and OTP sent successfully...');
    } else {
      setValidationState(
        cEmailInput,
        cEmailMsg,
        false,
        "Please enter a valid email address!"
      );
      emailIsValid = false;
    }
    
    return emailIsValid;
  }
  
  cEmailInput.addEventListener('input', function () {
    sendPwToCEmail(this.value.trim());
  });
 
  otpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newEmail = cEmailInput.value.trim();
    const sameName = name.value.trim();
    const emailIsValid = sendPwToCEmail(newEmail);
    
    if (emailIsValid) {
      verifyLoading.style.display = 'grid';
      sendPw(newEmail, sameName, "correction");
    } else {
      console.log('Please fix errors before sending otp to corrected email!');
    }
  });
  
  dlNo.addEventListener('click', () => {
    verifyLoading.style.display = 'grid';
    setTimeout(() => {
      submitForm();
    }, 1000);
  });
  
  dlYes.addEventListener('click', () => {
    verifyLoading.style.display = 'grid';
    setTimeout(() => {
      printForm();
    }, 1000);
    setTimeout(() => {
      submitForm();
    }, 1500);
  });
});

          /*---- convert photo to base64 ----*/
document.addEventListener('DOMContentLoaded', () => {
  const photoInput = document.getElementById('inp_photo');
  photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      photoBase64 = reader.result; // Save base64 string of the image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

let photoBase64 = null;
let regId = null;
let confirmTime = null;

           /*---- Receipt generation ----*/
function printForm() {
  const form = document.getElementById('form');
  const firstNameInput = document.getElementById('inp_student_first_name');
  const midNameInput = document.getElementById('inp_student_middle_name');
  const lastNameInput = document.getElementById('inp_student_last_name')
  const gradeInput = document.getElementById('opt_class');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const logoURL = 'https://i.ibb.co/mv8T96b/sxs-logo.png';

    // page measurement
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const paddingTop = 20;
    const paddingBottom = 20;
    
    // Add Logo
    const logoWidth = 75;
    const logoHeight = 17;
    const centerX = (pageWidth - logoWidth) / 2;
    const logoY = paddingTop;
    doc.addImage(logoURL, 'PNG', centerX, logoY, logoWidth, logoHeight);
    
    // tagline
    const taglineY = logoY + logoHeight + 5;
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('"Excess Your Success With SXS"', pageWidth / 2, taglineY, null, null, 'center');
    
    // Green Box for Fee Payment Receipt
    const greenBoxX = 20;
    const greenBoxY = taglineY + 12;
    const greenBoxWidth = doc.internal.pageSize.getWidth() - 40;
    const greenBoxHeight = 12;

    doc.setFillColor(0, 128, 0);
    doc.rect(greenBoxX, greenBoxY, greenBoxWidth, greenBoxHeight, 'F');

    const greenText = "STUDENT REGISTRATION FORM";
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const greenTextX = greenBoxX + (greenBoxWidth - doc.getTextWidth(greenText)) / 2;
    const greenTextY = greenBoxY + (greenBoxHeight + 14 * 0.352777778) / 2;
    doc.text(greenText, greenTextX, greenTextY);

    // photo
    const imgX = doc.internal.pageSize.getWidth() - 60; // Adjust this for exact placement
    const imgY = greenBoxY + greenBoxHeight + 5; // Top margin
    const imgWidth = 35; // Image width
    const imgHeight = 35; // Image height

    if (photoBase64) {
      doc.setFillColor(200, 200, 200);
      doc.rect(imgX, imgY, imgWidth, imgHeight, 'F');
      doc.addImage(photoBase64, 'JPEG', imgX, imgY, imgWidth, imgHeight);
      doc.setDrawColor(0); // Black border
      doc.setLineWidth(0.3); // Border thickness
      doc.rect(imgX, imgY, imgWidth, imgHeight, 'S');
    }
    // text in left of photoBase64
    const firstName = firstNameInput.value.trim();
    const midName = midNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const grade = gradeInput.value.trim();
    const topTextX = 30; // Left padding
    const topTextY = imgY + 10;
  
    doc.setFontSize(11);
    doc.setTextColor(40, 60, 90);
    doc.text(`Registration ID: ${regId}`, topTextX, topTextY);
    doc.text(`Date & Time: ${confirmTime}`, topTextX, topTextY + 6);
    if (midName) {
        doc.text(`Name: ${firstName} ${midName} ${lastName}`, topTextX, topTextY + 12);
    } else {
      doc.text(`Name: ${firstName} ${lastName}`, topTextX, topTextY + 12);
    }
    doc.text(`Grade: ${grade}`, topTextX, topTextY + 18)
    
    // Add Table
    const formData = [];
    const elements = form.querySelectorAll('input:not(.no-table):not([type="file"]), select:not(.no-table)');

      elements.forEach((el) => {
        if (el.type === 'hidden') {
          if (el.dataset.include === 'true') {
            const label = el.name || el.id || 'Field';
            const value = el.value.trim() || 'N/A';
            formData.push([label, value]);
          }
        } else {
          const label = el.name || el.id || 'Field';
          const value = el.value.trim() || 'N/A';
          formData.push([label, value]);
        }
      });
    
    const tableStartY = imgY + imgHeight + 5;
    doc.autoTable({
      startY: tableStartY,
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      theme: 'grid',
      head: [],
      body: formData,
    });

    // White Box for Note
    const noteBoxX = 20;
    const noteBoxY = doc.lastAutoTable.finalY + 15;
    const noteBoxWidth = doc.internal.pageSize.getWidth() - 40;
    const noteBoxHeight = 50;

    doc.setFillColor(255, 255, 255); // White color for the box
    doc.setLineWidth(0.3); // Thicker border
    doc.setDrawColor(0, 0, 0); // Black border
    doc.roundedRect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight, 5, 5, 'DF');

    // Add Note Heading
    const noteHeading = "NOTE";
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    const noteHeadingX = noteBoxX + (noteBoxWidth - doc.getTextWidth(noteHeading)) / 2;
    const noteHeadingY = noteBoxY + 10;
    doc.text(noteHeading, noteHeadingX, noteHeadingY);

    // Add Note Points
    const bulletPoints = [
      "This printout is a summary of the details you provided in the student registration form.",
      "We trust our users and value your honesty in providing accurate information.",
      "Details are subject to verification; we’ll contact you for any discrepancies.",
      "Once the verification process is complete, you will receive a confirmation email.",
      "If you face any issues or have queries, feel free to contact us for assistance.",
    ];

    let bulletY = noteHeadingY + 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    bulletPoints.forEach((point) => {
      doc.text(`\u2022 ${point}`, noteBoxX + 5, bulletY);
      bulletY += 6;
    });
    
    const qrElements = form.querySelectorAll('input:not(.no-qr):not([type="file"]), select:not(.no-qr)');
    let formattedData = '';
    qrElements.forEach((el) => {
      if (el.type === 'hidden') {
        if (el.dataset.include === 'true') {
          const label = el.name || el.id || 'Field';
          const value = el.value.trim() || 'N/A';
          formattedData += `${label}: ${value}\n`;
        }
      } else {
        const label = el.name || el.id || 'Field';
        const value = el.value.trim() || 'N/A';
        formattedData += `${label}: ${value}\n`;
      }
    });
    
    const qrWidth = 40;
    const qrHeight = 40;
    const qrX = (pageWidth - qrWidth) / 2;
    const qrY = noteBoxY + noteBoxHeight + 15;
    const qrDataStart = `S² Education\nStudent Registration Form\nRegistration ID: ${regId}\nDate & Time: ${confirmTime}\n`;
    const qrDataEnd = 'Thanks for Trusting Us!';
    const qrData = `${qrDataStart}${formattedData}${qrDataEnd}`;

    // Footer
    const footerY = qrY + qrHeight + 20;
    doc.setFont('times', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 90);
    doc.text("Thanks For Trusting Us!", pageWidth / 2, footerY, null, null, 'center');

    const linkText = "S² Education";
    const textWidth = doc.getTextWidth(linkText);
    const linkX = (pageWidth - textWidth) / 2;
    const linkY = footerY + 10;
    doc.textWithLink(linkText, linkX, linkY, { url: 'https://sxsquare.github.io/education/' });
    doc.setLineWidth(0.2);
    doc.setDrawColor(40, 60, 90);
    doc.line(linkX, linkY + 1, linkX + textWidth, linkY + 1);
     
    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Electronically Generated, does not require Signature.", pageWidth / 2, footerY + 20, null, null, 'center');

    // Save pdf with QR Code
    const qrContainer = document.createElement('div');
    const qr = new qrcode(0, 'L');
    qr.addData(qrData);
    qr.make();
    qrContainer.innerHTML = qr.createImgTag(4);
    const qrImg = qrContainer.querySelector('img');
    
    if (qrImg) {
      qrImg.onload = () => {
        doc.addImage(qrImg.src, 'PNG', qrX, qrY, qrWidth, qrHeight);
        doc.save("student_registration_form.pdf");
        console.log('Pdf Downloaded Successfully...');
      };
      qrImg.onerror = () => {
        doc.save("student_registration_form.pdf");
        console.log('some error occurred, may be QR will not available in pdf.');
      };
    } else {
      doc.save("student_registration_form.pdf");
      console.log('pdf downloaded, but QR will not available.');
    }
}









         /*-- Online/Offline status --*/
function updateStatusBar() {
  const statusBar = document.getElementById('status-bar');
  const statusBarIcons = document.getElementById('status-bar-icons');
  const internet = document.getElementById('internet-img');
  const noInternet = document.getElementById('no-internet-icon')
  const msg = document.getElementById('internet-msg');
  const logo = document.getElementById('logo');
  const menubar = document.getElementById("my_menubar");
  const bellBtn = document.getElementById('bell-icon');
  const menuBtn = document.getElementById("menu-btn");
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
    statusBarIcons.style.borderColor = '#0ef';
    internet.style.opacity = '1';
    noInternet.style.opacity = '0';
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
    statusBarIcons.style.borderColor = '#007bff';
    internet.style.opacity = '0';
    noInternet.style.opacity = '1';
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

document.addEventListener('DOMContentLoaded', updateStatusBar);

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

         /*---- chatbase.co ----*/
window.embeddedChatbotConfig = {
  chatbotId: "9YRSDWYGQFngIG3W6Ahqp",
  domain: "www.chatbase.co"
}

        /*---- © current year ----*/
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
});
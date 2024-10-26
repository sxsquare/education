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
      instructionCheckBtn.style.border = '.1rem solid #00cc00';
    } else {
      startDisabledBtn.style.display = 'inline-block';
      startBtn.style.display = 'none';
      instructionCheckBtn.style.border = '.1rem solid red';
    }
  });
});


       /*-- container's buttons function --*/
document.addEventListener('DOMContentLoaded', () => {

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
      instructionCheckBtn.style.border = '.1rem solid red';
      instructionCheckBtn.style.marginBottom = '.3rem';
      scrollBox.scrollTop = scrollBox.scrollHeight;
    });
    
    formStartBtn.addEventListener('click', function () {
        setTimeout(() => {
            document.body.style.overflowY = 'hidden';
            loading.style.display = 'grid';
            formParentContainer.style.display = 'grid';
            formParentContainer.classList.remove('left');
            formParentContainer.classList.remove('right');
            giContainer.classList.add('up');
        }, 200);

        giContainer.addEventListener('transitionend', function () {
            giContainer.style.display = 'none';
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

        /*---- Off spell-checker ----*/
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.setAttribute('spellcheck', 'false'));
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
                } else {
                    errorIcon.style.display = 'block';
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = "Invalid Pincode!";
                    pincodeField.classList.remove('valid');
                    pincodeField.classList.add('invalid');
                    cityField.classList.remove('valid');
                    stateField.classList.remove('valid');
                }
            })
            .catch(error => {
                errorIcon.style.display = 'block';
                errorMsg.style.display = 'block';
                errorMsg.textContent = "Something Went Wrong!";
                pincodeField.classList.remove('valid');
                pincodeField.classList.add('invalid');
                cityField.classList.remove('valid');
                stateField.classList.remove('valid');
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
        photoBox.style.border = '.1rem solid #0ef';
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
      photoBox.style.border = '.1rem solid red';
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
    uploadPhotoBtn.style.border = '.1rem solid red';
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
      declarationCheckBtn.style.border = '.1rem solid #00cc00';
    } else {
      declarationCheckBtn.style.border = '.1rem solid red';
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
      captchaInput.style.border = '.1rem solid red';
    } else if (captchaInputValue === captcha) {
      msg.innerText = 'CAPTCHA Validated.';
      msg.style.color = '#00cc00';
      captchaInput.style.border = '.1rem solid #00cc00';
    } else {
      msg.innerText = 'Invalid CAPTCHA!';
      msg.style.color = 'red';
      captchaInput.style.border = '.1rem solid red';
      captchaInput.value = "";
      generateCaptcha();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
});

        /*-- Validation of inputs --*/
document.addEventListener('DOMContentLoaded', () => {
  const submitDisabledBtn = document.getElementById('submit-disabled-btn');
  const submitBtn = document.querySelector('.form-submit-btn');
  const form = document.getElementById('form');
  const declarationCheckBtn = document.getElementById('declaration_check_btn');
  const declarationCheckboxError = document.querySelector('.declaration-checkbox-error');
  const reviewBar = document.querySelector('.review-bar');
  const afterReview = document.getElementById('after-review');
  const loading = document.getElementById('loading-bg');
  const backNote = document.querySelector('.back-note');
  const waitNote = document.querySelector('.wait-note');
  
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
    
      if (validateAndStyleInputs()) {
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
      }
  });

  
  submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      
      const cc = document.getElementById('cc');
      cc.value = atob(cc.value);
      
      const firstName = document.getElementById('inp_student_first_name').value;
      const subjectField = document.getElementById('subject');
      subjectField.value = `${firstName}'s Form Submitted Successfully.`;

      if (validateAndStyleInputs() && isDeclarationChecked()) {
        loading.style.display = 'grid';
        backNote.style.display = 'block';
        form.submit();
        setTimeout(() => {
          form.reset();
        }, 10000);
        setTimeout(() => {
          waitNote.style.display = 'block';
        }, 50000);
        console.log('Form is valid. Proceeding to the next page...');
      }
      else {
        console.log('Form is invalid. Please correct the errors and try again.');
        
          if (!isDeclarationChecked()) {
            declarationCheckboxError.style.display = 'block';
            declarationCheckBtn.style.border = '.1rem solid red';
            declarationCheckBtn.style.marginBottom = '.3rem';
          }
      }
    });

  document.querySelectorAll('input:not(.inp_captcha), select').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
      }
    });
    
    if (input.value) {
      if (input.checkValidity()) {
        input.classList.add('valid');
      } else {
        input.classList.add('invalid');
      }
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
        uploadPhotoBtn.style.border = '.1rem solid red';
        error.style.display = 'block';
        errorMsg.style.display = 'none';
      } else {
        error.style.display = 'none';
      }
    });
   
    submitBtn.addEventListener('click', () => {
       
      if (fileInput.value === '') {
        uploadPhotoBtn.style.border = '.1rem solid red';
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

      /*-- Function to detect ad blockers --*/
let adblockDetected = false;

function detectAdBlock() {
    const adblockContainer = document.getElementById('adblockContainer');

    if (!navigator.onLine) {
        adblockContainer.style.display = 'none';
        return;
    }

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

document.addEventListener('DOMContentLoaded', function () {
    detectAdBlock();
    setInterval(detectAdBlock, 5000);
});

        /*---- © current year ----*/
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
});

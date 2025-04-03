              /*---- Porting ----*/
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { 
    getAuth,
    updateProfile,
    applyActionCode,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    signInWithPhoneNumber,
    RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

export function showNotification(message, timestamp) {
  const panel = document.getElementById('my_sidebar');
  const defaultMsg = document.getElementById('default-notify-msg');

  if (!message) return;

  const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
  existingNotifications.push({ id: uniqueId, message, timestamp, seen: false });
  localStorage.setItem('notifications', JSON.stringify(existingNotifications));

  if (!panel) return;

  const notification = document.createElement('div');
  notification.className = 'notification-message unseen';
  notification.innerHTML = `
    <p>${message}</p>
    <small class="timestamp">${timestamp}</small>
    `;
  
  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'fa fa-trash-o delete-icon';
  deleteIcon.onclick = () => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      notification.remove();
      removeNotificationFromStorage(uniqueId);
      toggleDefaultMessage();
    }, 500);
  };

  notification.appendChild(deleteIcon);
  panel.insertBefore(notification, panel.firstChild);

  defaultMsg.classList.add('invisible');

  toggleBellDot();
}

const correctPath = window.location.pathname.includes("education/index.html") || window.location.pathname.endsWith("education/");

if (correctPath) {

document.addEventListener('DOMContentLoaded', () => {
  
              /*---- initial content loading ----*/
   const navbar = document.getElementById('my_navbar');  
   navbar.style.transform = 'translateY(0)';
  
   const animeBg = document.getElementById('initial-anime-bg')
   const animeLogo = document.getElementById('anime-logo-box');
 
   animeLogo.addEventListener('animationend', function () {
     setTimeout(() => { 
       this.classList.add('hide');
       animeBg.classList.add('hide');
     }, 1000);
   });

              /*---- notification-system ----*/
  const sidebar = document.getElementById("my_sidebar");
  const bellBtn = document.getElementById("bell-icon");
  const closeBtn = document.getElementById("close-icon");

  bellBtn.addEventListener('click', function() {
    this.style.display = 'none';
    sidebar.classList.add('open-msg');
    closeBtn.style.display = 'block';
    document.body.style.overflowY = 'hidden';
 
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = notifications.map((notif) => ({ ...notif, seen: true }));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    toggleBellDot();
  });
       
  
  closeBtn.addEventListener('click', function() {
    this.style.display = 'none';
    sidebar.classList.remove('open-msg');
    bellBtn.style.display = 'block';
    document.body.style.overflowY = 'scroll';
    
    markAllNotificationsAsSeen();
  });
  
  loadNotifications();


function toggleDefaultMessage() {
  const panel = document.getElementById('my_sidebar');
  const defaultMsg = document.getElementById('default-notify-msg');
  const remainingNotifications = panel.querySelectorAll('.notification-message').length;

  remainingNotifications === 0 ? defaultMsg.classList.remove('invisible') : defaultMsg.classList.add('invisible');
}

function removeNotificationFromStorage(notificationId) {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const updatedNotifications = notifications.filter((notif) => notif.id !== notificationId);
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
}

function loadNotifications() {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const panel = document.getElementById('my_sidebar');

  notifications.forEach(({ id, message, timestamp, seen }) => {
    const notification = document.createElement('div');
    notification.className = `notification-message ${!seen ? 'unseen' : ''}`; // Add unseen class for unseen notifications
    notification.innerHTML = `
      <p>${message}</p>
      <small class="timestamp">${timestamp}</small>
      `;

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'fa fa-trash-o delete-icon';
    deleteIcon.onclick = () => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        notification.remove();
        removeNotificationFromStorage(id);
        toggleDefaultMessage();
      }, 500);
    };

    notification.appendChild(deleteIcon);
    panel.insertBefore(notification, panel.firstChild);
  });

  toggleDefaultMessage();
  toggleBellDot();
}

function toggleBellDot() {
  const bellDot = document.getElementById('bell-dot');
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const hasUnseenNotifications = notifications.some((notif) => notif.seen === false);

  bellDot.style.display = hasUnseenNotifications ? 'block' : 'none';
}

function markAllNotificationsAsSeen() {
  const panel = document.getElementById('my_sidebar');
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

  const notificationElements = panel.querySelectorAll('.notification-message.unseen');
  notificationElements.forEach((notification) => {
    setTimeout(() => {
      notification.classList.remove('unseen');
    }, 500);
  });

  const updatedNotifications = notifications.map((notif) => ({ ...notif, seen: true }));
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

  toggleBellDot();
}

              /*---- menuBar ----*/
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


/*
document.getElementById('inp_dp').addEventListener('change', () => {
  var preview = document.getElementById('choose-profile-pic'); 
  var file    = document.querySelector('input[type=file]').files[0]; 
  var reader  = new FileReader(); 
  reader.addEventListener("load", function () { 
    preview.src = reader.result;
    localStorage.setItem('profilePicture', reader.result);
    document.getElementById('default-profile-pic').src = reader.result;
  }, false); 
    if (file) {
      reader.readAsDataURL(file); 
    } 
});

document.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      document.getElementById('default-profile-pic').src = savedImage;
      document.getElementById('choose-profile-pic').src = savedImage;
    }
});
*/
/*document.getElementById('edit').addEventListener('click', () => {
  document.getElementById("name").style.pointerEvents = "auto"; 
  document.getElementById("name").style.borderBottom = ".2rem solid green"; 
  document.getElementById("name").style.fontStyle = "normal"; 
  document.getElementById("edit").style.display = "none"; 
  document.getElementById("save").style.display = "block"; 
  document.getElementById("circle").style.pointerEvents = "auto";
  document.getElementById("circle").style.border = ".2rem solid green";
  document.getElementById("default-profile-pic").style.display = "none";
  document.getElementById("choose-profile-pic").style.display = "block";
  document.getElementById("success-msg").style.display = "none";
});

document.getElementById('save').addEventListener('click', () => {
  const inputFields = document.getElementById("name");
  const editBtn = document.getElementById("edit");
  const saveBtn = document.getElementById("save");
  const imgCircle = document.getElementById("circle");
  const picInput = document.querySelector(".file-upload").value;
  const defaultPic = document.getElementById("default-profile-pic");
  const choosePic = document.getElementById("choose-profile-pic");
  const nameInput = document.getElementById('name').value;
  const errorMsg = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');

    if (nameInput === '') {
        errorMsg.textContent = 'Please fill out this field.';
        errorMsg.style.display = 'block';
        errorMsg.style.animation = "hang 1s linear infinite";
    } else {
        errorMsg.style.display = 'none';
        inputFields.style.pointerEvents = "none"; 
        inputFields.style.borderBottom = ".1rem solid #262626"; 
        inputFields.style.fontStyle = "italic"; 
        editBtn.style.display = "block"; 
        saveBtn.style.display = "none"; 
        imgCircle.style.pointerEvents = "none";
        imgCircle.style.border = ".2rem solid #262626";
        successMsg.style.display = "block";
    }
    
    if (picInput === '') {
        choosePic.style.display = "none";
        defaultPic.style.display = "block";
    } else {
        defaultPic.style.display = "none";
        choosePic.style.display = "block";
    }
    
  setTimeout(() => {
        successMsg.style.display = "none"; 
    }, 1500); 

});
*//*
     // save inputs in local storage
document.addEventListener('DOMContentLoaded', (event) => {
    const inputFields = document.querySelectorAll('.input-saved');
    
    inputFields.forEach(input => {
        const key = input.dataset.key;
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
            input.value = savedValue;
        }

        input.addEventListener('input', () => {
            const value = input.value;
            localStorage.setItem(key, value);
        });
    });
});
*/
            
            /*---- page-navigation ----*/
  const home = document.getElementById('home');
  const fs = document.getElementById('fee-submission');
  const fb = document.getElementById('feedback');
  const cu = document.getElementById('contact-us');

  home.addEventListener('click', () => {
    location.reload();
  });
  fs.addEventListener('click', () => {
    window.location.href = 'fs.html';
  });
  fb.addEventListener('click', () => {
    window.location.href = 'fb.html';
  });
  cu.addEventListener('click', () => {
    window.location.href = 'cu.html';
  });

                /*---- Sign In/Up ----*/
  const login = document.getElementById('login');
  const logIcon = document.getElementById('login-icon');
  const logText = logIcon.nextElementSibling;
  const logTextContent = logText.textContent;
  const signPopup = document.getElementById('success-box-bg'); 
  
  login.addEventListener('click', () => {
    const logState = logIcon.classList.contains('fa-user-large');
    const closeState = logIcon.classList.contains('fa-chevron-right');
    
    if (logState) {
        signPopup.classList.add('show');
        logIcon.classList.replace('fa-user-large', 'fa-chevron-right');
        logText.textContent = 'Close';
    } else {
        signPopup.classList.remove('show');
        logIcon.classList.replace('fa-chevron-right', 'fa-user-large');
        logText.textContent = logTextContent;
    }
  });
  
             /*---- reg-navigation ----
  const regBtn = document.getElementById('reg-btn');
  
  regBtn.addEventListener('click', () => {
      
  });
  */
            /*---- account-manager ----*/
  //  localStorage.setItem('test', 'hello');
  const frontBox = document.getElementById('front-box');
  const toggleBtn = document.getElementById('toggle-form');
  const signBox = document.getElementById('signup-box');
  const signStatus = document.getElementById('sign-status');
  const logBox = document.getElementById('login-box');
  const pcMenu = document.getElementById('pc_menubar');
  const pcDp = document.getElementById('pc-dp');
  const bellBox = document.getElementById('bell-box');
  const qlinks = document.querySelectorAll(".quick-link");
  const plusEls = document.querySelectorAll(".plus");
  const logBtn = document.getElementById('login-btn');
  const logEmail = document.getElementById('inp_log_email');
  const logPw = document.getElementById('inp_log_pw');
  const forgot = document.getElementById('forgot');
  const logStatus = document.getElementById('log-status');
  const fgBox = document.getElementById('forgot-box');
  const fgEmail = document.getElementById('inp_forgot_email');
  const fgStatus = document.getElementById('forgot-status');
  const resetPwBtn = document.getElementById('resetPw-btn');
  const signBtn = document.getElementById("signup-btn");
  const signName = document.getElementById('inp_sign_name');
  const signEmail = document.getElementById("inp_sign_email");
  const signPw = document.getElementById("inp_sign_pw");
  const name = document.getElementById('pro-name');
  const email = document.getElementById('pro-email');
  const image = document.querySelectorAll('#dp, #pc-dp');
  
  const firebaseConfig = {
    apiKey: "AIzaSyDjcYwQSstXZPf3ratDeYHJvgYiLdpc4JU",
    authDomain: "sxs-education.firebaseapp.com",
    projectId: "sxs-education",
    storageBucket: "sxs-education.firebasestorage.app",
    messagingSenderId: "688203518667",
    appId: "1:688203518667:web:b19d0f7bed2a569f02814e",
    measurementId: "G-71ZY8YPJSW"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()  
   
  auth.useDeviceLanguage();
  provider.setCustomParameters({ hl: "en" });
  
  
  toggleBtn.addEventListener('click', () => {  
    const fgBoxOpen = fgBox.classList.contains('show');
    if (fgBoxOpen) {
        fgBox.classList.remove('show');
        logBox.classList.remove('hide');
        toggleBtn.textContent = 'Sign Up';
    } else {
        if (window.matchMedia("(max-width: 768px)").matches) {
            if (!logBox.classList.contains('hide')) {
              logBox.classList.add('hide');
              toggleBtn.classList.add('disable');
              logBox.addEventListener('transitionend', function () {
                signBox.style.display = 'grid';
                setTimeout(() => {
                  this.style.display = 'none';
                  signBox.classList.add('show');
                  toggleBtn.classList.remove('disable');
                }, 100);
              }, { once: true });
            } else {
              signBox.classList.remove('show');
              toggleBtn.classList.add('disable');
              signBox.addEventListener('transitionend', function () {
                logBox.style.display = 'grid';
                setTimeout(() => {
                  this.style.display = 'none';
                  logBox.classList.remove('hide');
                  toggleBtn.classList.remove('disable');
                }, 100);
              }, { once: true });
            }           
        } else {         
            frontBox.classList.toggle('move');
            logBox.classList.toggle('hide');
            signBox.classList.toggle('show');
        }
        
        toggleBtn.textContent = toggleBtn.textContent === 'Sign Up' ? 'Login' : 'Sign Up';
    }
  });
  
  
 
    // Get the oobCode from URL
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  //alert(mode);
  const oobCode = urlParams.get('oobCode');
  //alert(oobCode);

  //alert('script loaded...');

  // Check if it's a verification request
 /*
  if (mode === 'verifyEmail' && oobCode) {
    confirmEmailVerification(oobCode);
    alert('verification function called!!');
  }
  
  function confirmEmailVerification(oobCode) {
    alert('alert inside confirmation fn');
   try {
    applyActionCode(auth, oobCode)
      .then(() => {
        alert("Email Verified Successfully! ✅");
        // Redirect to login page
     //   window.location.href = "/login";
      })
      .catch((error) => {
        alert("Verification Failed: " + error.message);
      });
   } catch (error) {
       alert(error);
   }
  }
*/


  if (mode === 'login') {
      signPopup.classList.add('show');
  }
      
  
   onAuthStateChanged(auth, (user) => {
     if (user) {
        login.style.display = 'none';
        name.textContent = user.displayName;                                                            
        email.textContent = user.email;
        image.forEach((img) => {
          img.src = user.photoURL
          img.onerror = function() {
              this.src = 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
          };
        });
        bellBox.style.display = 'inline-block';
        menubar.style.display = 'block';
        qlinks.forEach((link) => link.classList.remove('quick-link'));
      //  alert(user.photoURL);
     //   window.location.href = user.photoURL;
        
        if (window.matchMedia("(min-width: 768px)").matches) {
            pcMenu.style.display = 'flex';
            pcDp.style.display = 'block';
            menubar.style.display = 'none';
            menuBtn.style.display = 'none';
        } else {
            menubar.style.display = 'block';
            menuBtn.style.display = 'block';
            pcMenu.style.display = 'none';
            pcDp.style.display = 'none';
        }        
     } else {
         console.log('No user logged in!!');
         plusEls.forEach((el) => el.style.display = 'none');    
         if (mode !== "login") {
           login.style.display = 'flex';
         }
     }
   });
      
  forgot.addEventListener('click', () => {
      fgEmail.value = logEmail.value.trim();
      logBox.classList.add('hide');
      fgBox.classList.add('show');
      toggleBtn.textContent = 'Back to login';
  });
   
  resetPwBtn.addEventListener('click', () => {
    sendPasswordResetEmail(auth, fgEmail.value)
    .then(() => {
       fgStatus.textContent = 'Password reset link sent! Check your email to reset your password.';
       setTimeout(() => {
           window.location.replace('index.html?mode=login');
       }, 2000);

    //   alert("mail to reset password sent successfully...");
    })
    .catch((error) => {
        fgStatus.textContent = handleAuthError(error);
    });
  });
  
  
  
  
  
  
/*
  document.getElementById("uploadFile").addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("key", "d8e4ccd142ddf84767dac0474af959ea"); // Replace with your Imgbb API Key
    formData.append("image", file);

    try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.data.url) {
            const imageUrl = data.data.url;
            console.log("Uploaded Image URL:", imageUrl);
            updateFirebaseProfile(imageUrl); // Send URL to Firebase
        } else {
            console.error("Upload Failed:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  });


function updateFirebaseProfile(imageUrl) {
  
    if (auth.currentUser) {
        updateProfile(auth.currentUser, {
            photoURL: imageUrl
        }).then(() => {
            alert("Profile picture updated successfully!");
        }).catch(error => {
            console.error("Error updating profile:", error);
        });
    } else {
        console.log("User not signed in.");
    }
}
*/
  
  /*
  const savedName = localStorage.getItem('name');
  const savedEmail = localStorage.getItem('email');
  const savedImage = localStorage.getItem('photo');
  
  if (savedName && savedEmail && savedImage) {
      name.textContent = savedName;
      email.textContent = savedEmail;
      image.src = savedImage;
  }
  */
  
  document.getElementById("google-btn").addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
   
        const user = result.user;
        console.log(result);
        name.textContent = user.displayName;                                                            
        email.textContent = user.email;
        image.src = user.photoURL;
        
     //   const photoUrl = user.photoURL;
      //  console.log(photoUrl);
        window.location.replace('index.html');
     //   if (photoUrl && photoUrl.includes("i.ibb.co")) {
   //         console.log('already stored in imgbb');
    //        location.reload();
   //     } else {
          //  updateUserProfileWithNewImage(user, user.photoURL);
    //    }
        
        
    /*              
        localStorage.setItem('name', name.textContent);
        localStorage.setItem('email', email.textContent);
        localStorage.setItem('photo', user.photoURL);
    */ 
        
      })
      .catch((error) => {
        console.error(error);
        logStatus.textContent = 'Some error occurred, please try again!';
      });
  });

// Function to upload image to Imgbb
/*
async function uploadToImgbb(imageUrl) {
 
    alert(imageUrl);
    if (!imageUrl) {
        alert('image url not found in imgbb function');
    }
  try {
    const urlRes = await fetch(imageUrl);
    const apiKey = "d8e4ccd142ddf84767dac0474af959ea";  // Replace with your Imgbb API key
    const blob = await urlRes.blob();
    alert(blob);
    const formData = new FormData();
    formData.append("image", blob);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
    });
    alert('after append image');
    const data = await response.json();
    if (data.success) {
        alert('success to get perma url');
        return data.data.url;  // Permanent image URL
    } else {
        console.error("Image upload failed:", data.error);
        return null;
    }
  } catch (error) {
      alert(error);
  }
}
   
async function updateUserProfileWithNewImage(user, photoUrl) {
  try {
    if (user && photoUrl) {
    alert(photoUrl);
        const permanentUrl = await uploadToImgbb(photoUrl);
        if (permanentUrl) {
            await updateProfile(user, { photoURL: permanentUrl });
            alert("Profile updated successfully!");
        }
    } else {
        alert('photourl not found');
    }
    
   // location.reload();
  } catch (error) {
      alert(error);
  }
}
*/  
       

function handleAuthError(error) {
    const errorMessage = error.message.toLowerCase(); // Convert to lowercase for case-insensitive matching

    if (errorMessage.includes("network-request-failed")) {
        return "Network error! Please check your internet connection.";
    }
    if (errorMessage.includes("wrong-password")) {
        return "Incorrect password. Please try again.";
    }
    if (errorMessage.includes("auth/password-does-not-meet-requirements")) {
        return "Password should be alphanumeric and 6-12 characters!";
    }
    if (errorMessage.includes("user-not-found")) {
        return "No account found with this email. Please sign up first.";
    }
    if (errorMessage.includes("email-already-in-use")) {
        return "This email is already registered. Try logging in instead.";
    }
    if (errorMessage.includes("invalid-email")) {
        return "Invalid email format. Please enter a valid email.";
    }
    if (errorMessage.includes("invalid-credential")) {
        return "Invalid Credentials!";
    }
    if (errorMessage.includes("weak-password")) {
        return "Weak password! Please use at least 6 characters with numbers and letters.";
    }
    if (errorMessage.includes("too-many-requests")) {
        return "Too many failed attempts. Please try again later.";
    }
    if (errorMessage.includes("operation-not-allowed")) {
        return "This sign-in method is not enabled. Contact support.";
    }
    if (errorMessage.includes("missing-password")) {
        return "Please enter a password.";
    }
    if (errorMessage.includes("missing-email")) {
        return "Please enter an email.";
    }
    if (errorMessage.includes("requires-recent-login")) {
        return "For security reasons, please log in again.";
    }
    if (errorMessage.includes("popup-closed-by-user")) {
        return "Popup closed before completing sign-in.";
    }
    if (errorMessage.includes("credential-already-in-use")) {
        return "This account is already linked to another sign-in method.";
    }

    // If error is something else (very rare)
    return "Something went wrong! Please try again later.";
}


     
       
  function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
            logStatus.textContent = 'Email not verified! Please check your inbox and verify.';
            signOut(auth);
        } else {
            alert(userCredential.user);
            console.log("Login successful");
            logStatus.style.display = 'none';
        }
        
        window.location.replace('index.html');
      })
      .catch((error) => {
        logStatus.textContent = handleAuthError(error);
      });
  }
  
  
  
  
 /* 
    const logBtn = document.getElementById("login-btn");
    const logEmail = document.getElementById("inp_log_email");
    const logPw = document.getElementById("inp_log_pw");
 */
    logBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = logEmail.value;
      const password = logPw.value;
      loginUser(email, password)  
    });
  
  async function signUpUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const name = signName.value.trim();
          await updateProfile(user, { displayName: name });
     //     const user = userCredential.user;
          await sendEmailVerification(user);
          signStatus.textContent = "Verification link sent! Please check your email and verify your account before logging in.";
          setTimeout(() => {
            window.location.replace('index.html?mode=login');
          }, 2000);
     //     alert(userCredential.user);    
    } catch (error) {
        signStatus.textContent = handleAuthError(error);
    }
  }
 /*
    const signBtn = document.getElementById("signup-btn");
    const signEmail = document.getElementById("inp_sign_email");
    const signPw = document.getElementById("inp_sign_pw");
  */   
    signBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = signEmail.value;
      const password = signPw.value;
      signUpUser(email, password)      
    });
    
    const logOutBtn = document.getElementById('open-profile');    
    logOutBtn.addEventListener("click", () => {
      signOut(auth)
      .then(() => {
          location.reload();
      })
      .catch((error) => {
          console.log(error);
      });
    });

         /*-- Online/Offline status --*/
function updateStatusBar() {
  const statusBar = document.getElementById('status-bar');
  const statusBarIcons = document.getElementById('status-bar-icons');
  const internet = document.getElementById('internet-img');
  const noInternet = document.getElementById('no-internet-icon')
  const msg = document.getElementById('internet-msg');
  const navbar = document.getElementById('my_navbar');
  const menubar = document.getElementById("my_menubar");
  const bellBox = document.getElementById('bell-box');
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
      bellBox.style.opacity = '1';
      menuBtn.style.opacity = '1';
    }, 1000);
    statusBarIcons.style.borderColor = '#0ef';
    internet.style.opacity = '1';
    noInternet.style.opacity = '0';
    msg.style.color = '#00cc00';
    msg.textContent = 'Back Online';
    menubar.style.display = 'block';
  //  bellBox.style.display = 'block';
  //  menuBtn.style.display = 'block';
  } else {
    setTimeout(() => {
      statusBar.style.opacity = '0.5';
      document.body.style.overflowY = 'hidden';
    }, 50);
    statusBar.style.display = 'grid';
    statusBarIcons.style.borderColor = '#007bff';
    internet.style.opacity = '0';
    noInternet.style.opacity = '1';
    msg.style.color = 'red';
    msg.textContent = 'No Internet Connection!';
    menubar.style.opacity = '0';
    bellBox.style.opacity = '0';
    menuBtn.style.opacity = '0';
    adblockContainer.style.opacity = '0';
    setTimeout(() => {
      menubar.style.display = 'none';
      bellBox.style.display = 'none';
      menuBtn.style.display = 'none';
    }, 500);
  }
}

  updateStatusBar();


         /*---- chatbase.co ----*/
window.embeddedChatbotConfig = {
  chatbotId: "9YRSDWYGQFngIG3W6Ahqp",
  domain: "www.chatbase.co"
}

 setTimeout(() => {
  const userName = "SSS";  
  if (userName && window.chatbase && window.chatbase.setInitialMessages) {
    window.chatbase.setInitialMessages([
      `Hello ${userName}, how can I help!`
    ]);
  } else {
      console.error('something wrong');
  }
 }, 3000);


        /*---- © current year ----*/
  const year = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
  
  
});

               /*---- page-refreshment ----*/
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        location.reload(); // Reload page if loaded from bfcache
    }
});

               /*---- sliders-alignment ----*/
window.addEventListener("load", () => {
    const sliders = document.querySelectorAll(".slider");
    const boxes = document.querySelector(".boxes");
    
    sliders.forEach((slider) => {
    // Check if the total width of boxes is smaller than the slider width
      if (slider.scrollWidth <= slider.clientWidth) {
          slider.style.justifyContent = "center";  // Center when not overflowing
      }
    });  // else {
   //     boxes.style.justifyContent = "flex-start"; // Normal scrolling
  //  }
});

                /*---- status checker ----*/
window.addEventListener('online', updateStatusBar);
window.addEventListener('offline', updateStatusBar);

}
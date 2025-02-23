const inputMinLength = "6";
let crossIconHover = false;
function validateUserName(event) {
  const usernameInputRegex = /^[a-zA-Z0-9]+$/;
  const usernameValue =
    event.type === "paste"
      ? event.clipboardData.getData("text/plain")
      : event.key;
  return usernameInputRegex.test(usernameValue);
}

function validatePassword(event) {
  const pwdInputRegex = /^\S*$/;
  return pwdInputRegex.test(event.key);
}

function showHidePassword() {
  var password = document.getElementById("password");
  var toggler = document.getElementById("toggler");
  if (password.type == "password") {
    password.setAttribute("type", "text");
    toggler.classList.replace("icon-eye-close", "icon-eye-open");
  } else {
    toggler.classList.replace("icon-eye-open", "icon-eye-close");
    password.setAttribute("type", "password");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const iconToggler = document.getElementById("iconToggler");
  const userinput = document.getElementById("userinput");
  const loginBtn = document.getElementById("loginBtn");
  const passwordinput = document.getElementById("passwordinput");

  const removeError = () =>{
    document.querySelectorAll(".ui-bpi-input-control").forEach((element) => {
      element.classList.remove("ui-bpi-input-error-border");
    });
    document.querySelectorAll(".ui-bpi-input-error").forEach((element) => {
      element.style.display = "none";
    });
    document.getElementById("toggler").classList.remove("error");
  };

  const toggleIconVisibility = () => {
    const isUsernameEmpty = username.value === "";
    iconToggler.style.display = isUsernameEmpty ? "none" : "block";
  };
  const handleFocusIn = (event) => {
    if (event.target.value !== "") {
      toggleIconVisibility();
    }
  };

  const handleFocusOut = () => {
    iconToggler.style.display = "none";
    crossIconHover && handleIconClick();
  }

  const handleMouseEnter = () => {
    if (username.value !== "") {
      toggleIconVisibility();
    }
  };

  const handleMouseLeave = () => {
    if (document.activeElement === username && username.value !== "") {
      toggleIconVisibility();
    } else {
      iconToggler.style.display = "none";
    }
  };

  const handleIconClick = () => {
    username.value = '';
    iconToggler.style.display = "none";
    removeError();
    isLoginValid();
  };
  const isLoginValid = () =>{
      const isLoginValid = username.value.length >= inputMinLength && password.value.length >= inputMinLength;
      loginBtn.classList.toggle("disabled", !isLoginValid);
      loginBtn.disabled = !isLoginValid;

  }
  const onusernameinput = () =>{
    toggleIconVisibility();
    isLoginValid();
    userinput.classList.contains("ui-bpi-input-error-border") && removeError();

  }
  const onpasswordinput = () =>{
    isLoginValid();
    passwordinput.classList.contains("ui-bpi-input-error-border") && removeError();
  }

  const handleIconMouseEnter = () => { crossIconHover = true };
  const handleIconMouseLeave = () => { crossIconHover = false };

  if (username || password) {
    username.addEventListener('input', onusernameinput);
    password.addEventListener('input', onpasswordinput);
    username.addEventListener('focusin', handleFocusIn);
    username.addEventListener('focusout', handleFocusOut);
    userinput.addEventListener('mouseenter', handleMouseEnter);
    userinput.addEventListener('mouseleave', handleMouseLeave);
    iconToggler.addEventListener('click', handleIconClick);
    iconToggler.addEventListener('mouseenter', handleIconMouseEnter);
    iconToggler.addEventListener('mouseleave', handleIconMouseLeave);
  }
});

function onSubmit() {
  if(loginBtn.classList.contains('disabled')) {
    return false;
   } else {
    loginBtn.innerText = '';
    loginBtn.classList.add('disabled');
    loginBtn.classList.add('button-loader');
    return true;
   }
}

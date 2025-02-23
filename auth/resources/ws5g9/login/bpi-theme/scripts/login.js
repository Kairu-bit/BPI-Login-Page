const ExternalUrls = {
    CONTACT_US: 'https://www2.bpi.com.ph/contactus',
    HOME: 'https://www.bpi.com.ph/',
    PRIVACY_POLICY: 'https://www.bpi.com.ph/digital-banking/privacy-notice',
    SERVICE_AGREEMENT: 'https://www.bpi.com.ph/online/internet-banking-service-agreement',
    SECURITY_FEATURES: 'https://www.bpi.com.ph/digital-banking/security-features',
    BPI_TO_CASH:'https://app.bpitocash.com/',
    AUTO_DEBIT_ARRANGEMENT:'https://bpi-ada.com/',
    OPEN_SITE_TOOLTIP:'https://globalsign.ssllabs.com/analyze.html?d=online.bpi.com.ph',
    BSP_GOV:'https://www.bsp.gov.ph/SitePages/Default.aspx'
};
let host = "";

const backbaseInvalidCredentials = '<div class="alert-heading">Incorrect username or password</div><div class="alert-description">Please check your details and try again</div>';

function navigateToRemittance() {
  window.location.href = host + "/remittance-status-inquiry";
}
function registerNow(){
  window.location.href = host + "/register-to-channel"
}
function navigateToLockMyAccess() {
  window.location.href = host + "/lock-my-access";
}
function navigateToForgotPassword() {
  window.location.href = host + "/forgot-password"
}

function showInquiry() {
  const loginForm = document.getElementById("login-form");
  const inquiryMenu = document.getElementById("inquiry-menu");
  inquiryMenu.style.left = document.body.offsetWidth <= 768 ? 0 : loginForm.offsetWidth + 'px';
  inquiryMenu.classList.remove("invisible");
  inquiryMenu.classList.add("visible");
  document.body.scrollTop = 0;
  loginForm.classList.add("shadow");
}

function checkForLogoutToaster() {
  let sessionExpired = new URLSearchParams(window.location.search).get('sessionExpired');
  if(sessionExpired) {
    document.getElementById('logout-toaster').style.visibility = 'visible';
    calculateToasterPosition();
    window.history.pushState({}, "", window.location.href.split("sessionExpired")[0]);
  }
}

function getKillSwitchData() {
  handleExistingSession();
  checkForLogoutToaster();
  host = window.location.origin;
  const t = new Date().getTime();
  let url = host + '/configurable/web/config?t=' + t;
  
    // Making our request
    fetch(url, { method: 'GET' })
        .then(result => result.json())
        .then(response => {
          const imgLink = response.images.login;
          const imgElm = document.getElementById('image-login');
          imgLink ? (imgElm.style.background = "url(" + host+imgLink + ") no-repeat center center") : imgElm.classList.add("show-default-image");
          const forgotUsernameKillSwitch = response.killSwitch.userIdRetrieval;
          const forgotPasswordKillSwitch = response.killSwitch.forgotPassword;
          if(forgotUsernameKillSwitch && forgotPasswordKillSwitch) {
            document.getElementById('forgot-links').remove();
          } else if(forgotUsernameKillSwitch) {
            document.getElementById('or').remove();
            document.getElementById('forgot-username').remove();
          } else if (forgotPasswordKillSwitch) {
            document.getElementById('or').remove();
            document.getElementById('forgot-password').remove();
          }
        })
        .catch(() => {
          const imgElm = document.getElementById('image-login');
          imgElm.classList.add("show-default-image");
        })
}

function handleExistingSession() {
  const isAuthenticated = Boolean(sessionStorage.getItem("isAuthenticated"));
  if (isAuthenticated && sessionStorage.getItem("token")) {
    //set an item in session storage which will be used in BB6 code as an identification to logout the user
    sessionStorage.setItem("isInvalidNavigation", "true");
  }
}

function errorHandlerModal(error) {
  if (['AUTH-02', '017', '990','989'].includes(error)) {
    return;
  } else if (
    error == 'AUTH-01' ||
    error == backbaseInvalidCredentials ||
    error == '018' 
  ) {
    document.querySelectorAll(".ui-bpi-input-control").forEach((element) => {
      element.classList.add("ui-bpi-input-error-border");
    });
    document.getElementById("toggler").classList.add("error");
    return;
  } else {
    const modal = document.getElementById("genericErrorModal");
    error && (modal.style.display = "flex");
  }
}
function hideInquiry() {
  const loginForm = document.getElementById("login-form");
  const inquiryMenu = document.getElementById("inquiry-menu");
  inquiryMenu.classList.remove("visible");
  inquiryMenu.classList.add("invisible");
  loginForm.classList.remove("shadow");
}
function navigateToLink(link) {
  const url = ExternalUrls[link] ? ExternalUrls[link] : link;
  window.open(url, "_blank");
}
function openModal() {
  const modal = document.getElementById("forgotUsernameModal");
  modal.style.display = "flex";
}
function openLockAccess(){
  const modal = document.getElementById("lockMyAccessModal");
  modal.style.display = "flex";
}

function closeModal() {
  const forgotUsernameModal = document.getElementById("forgotUsernameModal");
  const lockMyAccessModal = document.getElementById("lockMyAccessModal");
  const noticeModal = document.getElementById("noticeModal");
  forgotUsernameModal.style.display = "none";
  lockMyAccessModal.style.display="none";
  noticeModal.style.display="none";
}

function openNoticePopup(){
  const modal = document.getElementById("noticeModal");
  modal.style.display = "flex";
}

function openMenu() {
  const modal = document.getElementById("topBarModal");
  modal.style.display = "flex";
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  hamburgerMenu.classList.add("shadow");
}

function closeMenu() {
  const modal = document.getElementById("topBarModal");
  modal.style.display = "none";
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  hamburgerMenu.classList.remove("shadow");
}
document.addEventListener("DOMContentLoaded",()=>{
  const tooltip = document.getElementById("tooltip");
  const tooltipText = document.getElementById("tooltipText");

    function showTooltip() {
      tooltipText.style.visibility = "visible";
      tooltipText.style.opacity = "1";
    }
  

    function hideTooltip() {
      if (!cursorOverContent) {
        tooltipText.style.visibility = "hidden";
        tooltipText.style.opacity = "0";
      }
    }

    tooltip.addEventListener("mouseenter", () => {
      cursorOverContent = true;
      showTooltip();
    });
  
    tooltip.addEventListener("mouseleave", () => {
      cursorOverContent = false;
      setTimeout(() => {
        hideTooltip();
              }, 1000);
    });
  
    tooltipText.addEventListener("mouseenter", () => {
      cursorOverContent = true;
    });
  
    tooltipText.addEventListener("mouseleave", () => {
      cursorOverContent = false;
      setTimeout(() => {
        hideTooltip();
      }, 1000);
    });

    checkForIdentityError();
})

function checkForIdentityError() {
  const identityError = document.getElementById('identity-error');
  const multiSessionError = document.getElementById('multi-session-error');
  if(identityError && identityError.innerText.includes('already authenticated')) {
    identityError.hidden = true;
  } else {
    multiSessionError && (multiSessionError.hidden = true);
  }
}

function showTooltipresponsive(){
  const tooltipText = document.getElementById("responsive-tooltipText");
  const isTooltipVisible = tooltipText.classList.contains("show-tooltip");

  if(isTooltipVisible){
    tooltipText.classList.remove("show-tooltip");
  }
  else{
    tooltipText.classList.add("show-tooltip");
  }

}
function showTooltipweb(){
  const tooltipText = document.getElementById("web-tooltipText");
  const isTooltipVisible = tooltipText.classList.contains("show-tooltip");

  if(isTooltipVisible){
    tooltipText.classList.remove("show-tooltip");
  }
  else{
    tooltipText.classList.add("show-tooltip");
  }

}
document.addEventListener("click", function (event) {
  const tooltip = document.getElementById("responsive-tooltip");
  const tooltipText = document.getElementById("responsive-tooltipText");

  if (
      event.target !== tooltip &&
      !tooltip.contains(event.target)
  ) {
      const isTooltipVisible = tooltipText.classList.contains("show-tooltip");
      if(isTooltipVisible){
        tooltipText.classList.remove("show-tooltip");
      }
  }
});

function calculateToasterPosition() {
  const body = document.body.getBoundingClientRect();
  const toaster = document.getElementById('logout-toaster');
  const toasterLeft = Math.floor(body.width / 2 + body.left - toaster.offsetWidth / 2);
  toaster.style.left = toasterLeft + 'px';
  toasterLeft <= 10 ? (toaster.style.margin = '16px') : (toaster.style.margin = '0px');
}

function removeToaster() {
  document.getElementById("logout-toaster").remove();
}

function reloadLogin() {
  window.location.reload();
}

// ============================
// SYSTEM AUTH - Open Shared Module (Zero Passwords, Open Access)
// ============================
// Firebase database configs preserved for zero data loss
const MAIN_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBajCZMATK21mgaEFcccyhLne4pgdaxMfk",
  authDomain: "dent-35a17.firebaseapp.com",
  databaseURL: "https://dent-35a17-default-rtdb.firebaseio.com",
  projectId: "dent-35a17",
  storageBucket: "dent-35a17.firebasestorage.app",
  messagingSenderId: "416163754700",
  appId: "1:416163754700:web:dec496619e3e6fff3e0869"
};

const PERMISSIONS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbYhhg5eL94AUE5BwV4xv6jbFU98QZbdQ",
  authDomain: "loutsresults.firebaseapp.com",
  databaseURL: "https://loutsresults-default-rtdb.firebaseio.com",
  projectId: "loutsresults",
  storageBucket: "loutsresults.firebasestorage.app",
  messagingSenderId: "801603969666",
  appId: "1:801603969666:web:e6d45a7a6819022bc10a9b"
};

let AUTH_DB = null, WITHDRAWAL_DB = null, SRC_DB = null, PERMISSIONS_DB = null, AUTH_IS_OFFLINE = false;

try {
  if (typeof firebase !== 'undefined') {
    let mainApp = null;
    try { mainApp = firebase.app(); } catch (e) {}
    if (!mainApp) mainApp = firebase.initializeApp(MAIN_FIREBASE_CONFIG);
    if (mainApp.auth) mainApp.auth().signInAnonymously().catch(() => {});
    AUTH_DB = firebase.database(mainApp);
    WITHDRAWAL_DB = AUTH_DB;
    SRC_DB = AUTH_DB;

    let permApp = null;
    try { permApp = firebase.app('permissionsApp'); } catch (e) {}
    if (!permApp) permApp = firebase.initializeApp(PERMISSIONS_FIREBASE_CONFIG, 'permissionsApp');
    PERMISSIONS_DB = firebase.database(permApp);
  } else {
    AUTH_IS_OFFLINE = true;
  }
} catch (e) {
  AUTH_IS_OFFLINE = true;
}

// Open session for full access everywhere
const SYSTEM_ADMIN_USER = {
  username: "admin",
  name: "مدير النظام",
  role: "admin",
  loginTime: Date.now(),
  permissions: ["*"],
  employeeId: "admin"
};

try {
  const jsonStr = JSON.stringify(SYSTEM_ADMIN_USER);
  localStorage.setItem('lotus_auth_session', jsonStr);
  localStorage.setItem('lotus_session', jsonStr);
  localStorage.setItem('auth_session', jsonStr);
} catch(e) {}

window.getCurrentUser = function () {
  return SYSTEM_ADMIN_USER;
};

window.hasPermission = function () {
  return true; // Always true - no restrictions
};

window.authNormalizePermissions = function () {
  return ["*"];
};

window.authGetAllEmployees = async function () {
  return [SYSTEM_ADMIN_USER];
};

window.authSaveEmployeeToDb = async function () {
  return true;
};

window.authDeleteEmployeeFromDb = async function () {
  return true;
};

window.authHashPassword = function (pw) {
  return pw || '';
};

window.authLogActivity = async function () {
  return true;
};

window.openLoginModal = function () {};
window.closeLoginModal = function () {};
window.submitLogin = async function () {
  return true;
};
window.logoutUser = function () {};

window.requireAuthAndNavigate = function (e, target) {
  if (e && e.preventDefault) e.preventDefault();
  window.location.href = target;
};

window.AUTH_DB = AUTH_DB;
window.WITHDRAWAL_DB = WITHDRAWAL_DB;
window.SRC_DB = SRC_DB;
window.PERMISSIONS_DB = PERMISSIONS_DB;
window.AUTH_IS_OFFLINE = AUTH_IS_OFFLINE;

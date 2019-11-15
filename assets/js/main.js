const db = new DatabaseService("assets/database/database.json");

const builder = new GridBuilder({ gridClassName: "logo-library" });

const buildGrid = reszort => {
  const rows = db.getReszortByName(reszort);
  builder.build(rows);
};

const menu = new MenuHandler(buildGrid, {
  hamburgerClass: "hamburger-button",
  hiddenMenuClass: "hidden-menu",
  menuItemsClass: "menu-items"
});

const buildMenu = () => {
  const menuItems = db.getReszortNames();
  menu.addMenuItems(menuItems);
  menu.addEventListeners();
};

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const init = async() => {
  await db.update();
  buildMenu();
  buildGrid("Simonyi");
};

init();

document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.querySelector('input[type="checkbox"]');
  var isDarkMode = getCookie('isDarkMode');
  if (isDarkMode) checkbox.checked = true;
  else checkbox.checked = false;

  if (checkbox.checked) {
    let navBar = document.getElementsByTagName('body')[0];
    let logoLibrary = document.getElementsByClassName('logo-library')[0];
    navBar.classList.toggle("dark", true);
    logoLibrary.classList.toggle("dark", true);
    setCookie('isDarkMode', true, 7);
  } else {
    let navBar = document.getElementsByTagName('body')[0];
    let logoLibrary = document.getElementsByClassName('logo-library')[0];
    navBar.classList.toggle("dark", false);
    logoLibrary.classList.toggle("dark", false);
    setCookie('isDarkMode', false, 7);
  }

  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      let navBar = document.getElementsByTagName('body')[0];
      let logoLibrary = document.getElementsByClassName('logo-library')[0];
      navBar.classList.toggle("dark", true);
      logoLibrary.classList.toggle("dark", true);
      setCookie('isDarkMode', true, 7);
    } else {
      let navBar = document.getElementsByTagName('body')[0];
      let logoLibrary = document.getElementsByClassName('logo-library')[0];
      navBar.classList.toggle("dark", false);
      logoLibrary.classList.toggle("dark", false);
      setCookie('isDarkMode', false, 7);
    }
  });
});
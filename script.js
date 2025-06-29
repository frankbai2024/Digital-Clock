const toggleFormat = document.getElementById("toggleFormat");
const toggleMode = document.getElementById("toggleMode");
const clockContainer = document.getElementById("clockContainer");
const clock = document.getElementById("clock");
const clockDisply = document.getElementById("clockDisply");
const dateDisplay = document.getElementById("dateDisplay");

var valueHour = "";
var valueMIn = "03";
var valueSec = "45";
var originalHours = 0; // Variable to store original hours for AM/PM conversion
var valueAMPM = "AM";

let is24HourFormat = true;
toggleFormat.checked = is24HourFormat;

let isDarkMode = true;
toggleMode.checked = isDarkMode;

toggleFormat.addEventListener("change", updateClock);

toggleMode.addEventListener("change", () => {
  isDarkMode = toggleMode.checked;
  console.log("isDarkMode:", isDarkMode);
  if (isDarkMode) {
    clockContainer.classList.remove("lightMode");
    clockContainer.classList.add("darkMode");
  } else {
    clockContainer.classList.add("lightMode");
    clockContainer.classList.remove("darkMode");
  }
});

updateClock();
setInterval(updateClock, 1000); // Update the clock every second

function updateClock() {
  is24HourFormat = toggleFormat.checked;
  //console.log("is24HourFormat:", is24HourFormat);
  getTime();
  displayClock();
}

function displayClock() {
  if (!is24HourFormat) {
    //console.log("12-hour format: ", originalHours);
    valueAMPM = originalHours >= 12 ? "PM" : "AM";
    clockDisply.innerHTML = `<h2>${valueHour}:${valueMIn}:${valueSec} ${valueAMPM}</h2>`;
  } else {
    clockDisply.innerHTML = `<h2>${valueHour}:${valueMIn}:${valueSec}</h2>`;
  }
}

function getTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  originalHours = hours; // Store original hours for AM/PM conversion

  if (!is24HourFormat) {
    hours = hours % 12 || 12; // Convert to 12-hour format
  }

  valueHour = String(hours).padStart(2, "0");
  valueMIn = String(minutes).padStart(2, "0");
  valueSec = String(seconds).padStart(2, "0");
  console.log("Current Time:", `${valueHour}:${valueMIn}:${valueSec}`);

  dateDisplay.innerHTML = `<h2>${date.toLocaleDateString()}</h2>`;
}

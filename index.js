const minuteContainer = document.querySelector(".minute-container");
const hourContainer = document.querySelector(".hour-container");

function fillNumericContainer(length, destinationContainer) {
  destinationContainer.innerHTML += `<div></div><div></div>`;
  for (let i = 0; i < length; ++i) {
    destinationContainer.innerHTML += `<div>${padTo2Digits(i)}</div>`;
  }
  destinationContainer.innerHTML += `<div></div><div></div>`;
}

fillNumericContainer(24, hourContainer);
fillNumericContainer(60, minuteContainer);

let activePos =
  Math.round(minuteContainer.getBoundingClientRect().top) + 2 * 50 - 1;

window.addEventListener("resize", () => {
  activePos =
    Math.round(minuteContainer.getBoundingClientRect().top) + 2 * 50 - 1;
});

calculateActive(minuteContainer);
calculateActive(hourContainer);

setScrollbarsPosition();

function setScrollbarsPosition() {
  const currentTime = new Date();
  const setMinScrollPos = 50 * currentTime.getMinutes();
  const setHourScrollPos = 50 * currentTime.getHours();

  minuteContainer.scrollTop = setMinScrollPos;
  hourContainer.scrollTop = setHourScrollPos;
}

function calculateActive(node) {
  const divs = Array.from(node.childNodes);
  let hasActive = false;
  divs.forEach(function (element) {
    try {
      /* console.log(
        Math.round(element.getBoundingClientRect().y) +
          " " +
          element.textContent
      ); */
      if (
        Math.round(element.getBoundingClientRect().y) === activePos ||
        Math.round(element.getBoundingClientRect().y) === activePos + 1
      ) {
        element.classList.add("active");
        /* console.log("set active"); */
      } else {
        element.classList.remove("active");
      }
      if (element.classList.value === "active") {
        hasActive = true;
      }
    } catch (err) {
      console.log(err);
    }
  });
  if (!hasActive) {
    divs.forEach(function (element) {
      /* console.log(
        Math.round(element.getBoundingClientRect().y) +
          " " +
          element.textContent +
          " " +
          activePos +
          " " +
          hourContainer.scrollTop
      ); */
      let elementPos = Math.round(element.getBoundingClientRect().y);
      if (elementPos >= activePos - 25 && elementPos <= activePos + 25) {
        element.classList.add("active");
        node.scrollTop = element.textContent * 50;
      }
    });
  }
}

var minuteTimer = null;
minuteContainer.addEventListener("scroll", (e) => {
  clearTimeout(minuteTimer);

  minuteTimer = setTimeout(function () {
    calculateActive(minuteContainer);
  }, 100);
});
var hourTimer = null;
hourContainer.addEventListener("scroll", (e) => {
  clearTimeout(hourTimer);

  hourTimer = setTimeout(function () {
    calculateActive(hourContainer);
  }, 100);
});

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function getTimeValue() {
  let hour, minute;
  Array.from(hourContainer.childNodes).forEach(function (element) {
    try {
      if (
        Math.round(element.getBoundingClientRect().y) === activePos ||
        Math.round(element.getBoundingClientRect().y) === activePos + 1
      ) {
        hour = element.textContent;
      }
    } catch {}
  });
  Array.from(minuteContainer.childNodes).forEach(function (element) {
    try {
      if (
        Math.round(element.getBoundingClientRect().y) === activePos ||
        Math.round(element.getBoundingClientRect().y) === activePos + 1
      ) {
        minute = element.textContent;
      }
    } catch {}
  });
  window.alert(`Setted value is: ${hour}:${minute}`);
}

function toggleTimeModal() {
  document.querySelector(".time-modal").classList.toggle("hide");
}

function toggleDateModal() {
  document.querySelector(".date-modal").classList.toggle("hide");
}
/* Date Selector */
const yearContainer = document.querySelector(".year-container");
const monthContainer = document.querySelector(".month-container");
const dayContainer = document.querySelector(".day-container");
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const today = new Date();
const years = [
  today.getFullYear() - 3,
  today.getFullYear() - 2,
  today.getFullYear() - 1,
  today.getFullYear(),
  today.getFullYear() + 1,
  today.getFullYear() + 2,
  today.getFullYear() + 3,
];

let days = generateDaysArray(31);

function fillContainer(array, destinationContainer) {
  destinationContainer.innerHTML += `<div></div><div></div>`;
  array.forEach((element) => {
    destinationContainer.innerHTML += `<div>${element}</div>`;
  });
  destinationContainer.innerHTML += `<div></div><div></div>`;
}
function generateDaysArray(length) {
  let resultArray = [];
  for (let i = 0; i < length; ++i) {
    resultArray = [...resultArray, padTo2Digits(i)];
  }
  return resultArray;
}

fillContainer(years, yearContainer);
fillContainer(months, monthContainer);
fillContainer(days, dayContainer);

function setScrollbarsPositionDate() {
  const dateToday = new Date();

  let yearIndex = years.findIndex((x) => x === dateToday.getFullYear());
  let monthIndex = months.findIndex((x) => x === months[dateToday.getMonth()]);
  let dayIndex = days.findIndex(
    (x) => padTo2Digits(x) === `${dateToday.getDate()}`
  );
  yearContainer.scrollTop = yearIndex * 50;
  monthContainer.scrollTop = monthIndex * 50;
  dayContainer.scrollTop = dayIndex * 50;
}

setScrollbarsPositionDate();

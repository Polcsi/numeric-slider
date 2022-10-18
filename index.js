const minuteContainer = document.querySelector(".minute-container");
const hourContainer = document.querySelector(".hour-container");

minuteContainer.innerHTML += `<div></div>`;
minuteContainer.innerHTML += `<div></div>`;
hourContainer.innerHTML += `<div></div>`;
hourContainer.innerHTML += `<div></div>`;
for (let i = 0; i < 60; ++i) {
  minuteContainer.innerHTML += `<div>${padTo2Digits(i)}</div>`;
}
for (let i = 0; i < 24; ++i) {
  hourContainer.innerHTML += `<div>${padTo2Digits(i)}</div>`;
}
hourContainer.innerHTML += `<div></div>`;
hourContainer.innerHTML += `<div></div>`;
minuteContainer.innerHTML += `<div></div>`;
minuteContainer.innerHTML += `<div></div>`;

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

function getValue() {
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

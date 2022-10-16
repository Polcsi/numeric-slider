const minuteContainer = document.querySelector(".minute-container");
const secondsContainer = document.querySelector(".seconds-container");

minuteContainer.innerHTML += `<div></div>`;
minuteContainer.innerHTML += `<div></div>`;
for (let i = 0; i < 60; ++i) {
  minuteContainer.innerHTML += `<div>${padTo2Digits(i)}</div>`;
  /* secondsContainer.innerHTML += `<div>${i}</div>`; */
}
minuteContainer.innerHTML += `<div></div>`;
minuteContainer.innerHTML += `<div></div>`;

Array.from(minuteContainer.childNodes).forEach(function (element, index) {
  console.log(
    Math.round(element.getBoundingClientRect().y) + " " + element.textContent
  );
  if (
    Math.round(element.getBoundingClientRect().y) === 308 ||
    Math.round(element.getBoundingClientRect().y) === 309
  ) {
    element.classList.add("active");
    console.log("set active");
  } else {
    element.classList.remove("active");
  }
});

var timer = null;
/* minuteContainer.addEventListener("scroll", (e) => {
  clearTimeout(timer);

  timer = setTimeout(function () {
    Array.from(e.path[0].childNodes).forEach(function (element, index) {
      console.log(
        Math.round(element.getBoundingClientRect().y) +
          " " +
          element.textContent
      );
      if (
        Math.round(element.getBoundingClientRect().y) === 308 ||
        Math.round(element.getBoundingClientRect().y) === 309
      ) {
        element.classList.add("active");
        console.log("set active");
      } else {
        element.classList.remove("active");
      }
    });
  }, 100);
}); */

minuteContainer.addEventListener("dragstart", (e) => e.preventDefault());

// Touch events
minuteContainer.addEventListener("touchstart", touchStart);
minuteContainer.addEventListener("touchend", touchEnd);
minuteContainer.addEventListener("touchmove", touchMove);

// Mobile events
minuteContainer.addEventListener("mousedown", touchStart);
minuteContainer.addEventListener("mouseup", touchEnd);
minuteContainer.addEventListener("mouseleave", touchEnd);
minuteContainer.addEventListener("mousemove", touchMove);

let isDragging = false;
let animationID = null;
let startPos = 0;

function touchStart(event) {
  isDragging = true;
  startPos = getPositionY(event);
  console.log(`start ${startPos}`);

  animationID = requestAnimationFrame(animation);
  minuteContainer.classList.add("grabbing");
}

function touchEnd() {
  console.log("end");
  isDragging = false;
  cancelAnimationFrame(animationID);

  minuteContainer.classList.remove("grabbing");
}

function touchMove(event) {
  if (isDragging) {
    console.log(`move ${getPositionY(event)}`);
  }
}

function animation() {
  // animation funciton
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function getPositionY(event) {
  return event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

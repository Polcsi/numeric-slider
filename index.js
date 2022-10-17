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

calculateActive(minuteContainer);
calculateActive(hourContainer);

function calculateActive(node) {
  Array.from(node.childNodes).forEach(function (element, index) {
    console.log(
      Math.round(element.getBoundingClientRect().y) + " " + element.textContent
    );
    if (
      Math.round(element.getBoundingClientRect().y) === 281 ||
      Math.round(element.getBoundingClientRect().y) === 282
    ) {
      element.classList.add("active");
      console.log("set active");
    } else {
      element.classList.remove("active");
    }
  });
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

const sliderChildren = Array.from(minuteContainer.childNodes);
let isDragging = false;
let animationID = null;
let startPos = 0;
let index = 2;

/* minuteContainer.addEventListener("dragstart", (e) => e.preventDefault());

// Touch events
minuteContainer.addEventListener("touchstart", touchStart(index));
minuteContainer.addEventListener("touchend", touchEnd);
minuteContainer.addEventListener("touchmove", touchMove);

// Mobile events
minuteContainer.addEventListener("mousedown", touchStart(index));
minuteContainer.addEventListener("mouseup", touchEnd);
minuteContainer.addEventListener("mouseleave", touchEnd);
minuteContainer.addEventListener("mousemove", touchMove); */

function touchStart(index) {
  return function (event) {
    isDragging = true;
    startPos = getPositionY(event);
    console.log(`start ${startPos}`);

    animationID = requestAnimationFrame(animation);
    minuteContainer.classList.add("grabbing");
  };
}

function touchEnd() {
  console.log("end");
  isDragging = false;
  cancelAnimationFrame(animationID);

  minuteContainer.classList.remove("grabbing");
}

function touchMove(event) {
  if (isDragging) {
    let actualPos = getPositionY(event);
    console.log(`move ${actualPos}`);
    let movedBy = startPos - actualPos;
    console.log(movedBy);
    if (startPos > actualPos) {
      if (Math.round(movedBy % 32) === 0) {
        sliderChildren[index].classList.remove("active");
        console.log(sliderChildren[index]);
        sliderChildren[++index].classList.add("active");
        console.log(sliderChildren[index]);
      }
    }
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

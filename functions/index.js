const place = document.querySelector(".place");

let windowWidth = window.innerWidth;
let j = 10; 

const moveRight = () => {
  if (j < windowWidth - 150) {
    j += 30;
  }
  place.style.marginLeft = j + "px";
  console.log(j);
  console.log(window.innerWidth);
};

const moveLeft = () => {
  if (j > 0) {
    j -= 30;
  }
  place.style.marginLeft = j + "px";
  console.log(j);
  console.log(window.innerWidth);
};

addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "ArrowLeft") {
    moveLeft();
  } else if (keyName === "ArrowRight") {
    moveRight();
  }
});

const place = document.querySelector(".place");

let windowWidth = window.innerWidth;
let j = 10;

const moveRight = () => {
  if (j < windowWidth - place.offsetWidth - 10) { // Ajuste para garantir que não ultrapasse a tela
    j += 30;
  } else {
    j = windowWidth - place.offsetWidth - 10; // Mantém dentro do limite da tela
  }
  place.style.left = j + "px";
  console.log("Right:", j);
};

const moveLeft = () => {
  if (j > 0) {
    j -= 30;
  } else {
    j = 0; // Mantém dentro do limite da tela
  }
  place.style.left = j + "px";
  console.log("Left:", j);
};

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
});

addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "ArrowLeft") {
    moveLeft();
  } else if (keyName === "ArrowRight") {
    moveRight();
  }
});

const place = document.querySelector(".place");
const bola = document.querySelector(".bola");

let windowWidth = window.innerWidth;
let j = (windowWidth - place.offsetWidth) / 2 + 60;
let bolaY = 0;
let speedY = 0;
let speedX = 0;
const gravity = 0.2;
const jumpPower = -22;
let isJumping = false;

let bolaX = bola.offsetLeft;
let leftWallX = 0;
let rightWallX = window.innerWidth;

const moveRight = () => {
  if (j < windowWidth - place.offsetWidth - 110) {
    j += 100;
  } else {
    j = windowWidth - place.offsetWidth + 130;
  }
  place.style.left = j + "px";
};

const moveLeft = () => {
  if (j > 0) {
    j -= 100;
  } else {
    j = 0;
  }
  place.style.left = j + "px";
};

const showGameOverMessage = () => {
  const gameOverMessage = document.createElement("div");
  gameOverMessage.textContent = "Você perdeu!";
  gameOverMessage.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    font-weight: bold;
    color: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 10;
  `;
  document.body.appendChild(gameOverMessage);
};

const isBallTouchingGround = () => {
  return bolaY === window.innerHeight - bola.offsetHeight;
};

const update = () => {
  const placeRect = place.getBoundingClientRect();
  const bolaRect = bola.getBoundingClientRect();

  if (isBallTouchingGround()) {
    showGameOverMessage();
    return;
  }

  if (
    bolaRect.bottom >= placeRect.top &&
    bolaRect.left >= placeRect.left &&
    bolaRect.right <= placeRect.right
  ) {
    isJumping = true;
    speedY = jumpPower;

    const placeCenterX = placeRect.left + placeRect.width / 2;
    const bolaCenterX = bolaRect.left + bolaRect.width / 2;

    if (bolaCenterX > placeCenterX + placeRect.width / 6) {
      speedX = 4; // Salto para a direita
    } else if (bolaCenterX < placeCenterX - placeRect.width / 6) {
      speedX = -4; // Salto para a esquerda
    } else {
      speedX = 1; // Salto para cima
    }
  } else {
    isJumping = false;
    speedY += gravity;
  }

  bolaX += speedX;

  if (bolaX < leftWallX) {
    bolaX = leftWallX;
    speedX *= -1;
  } else if (bolaX + bola.offsetWidth > rightWallX) {
    bolaX = rightWallX - bola.offsetWidth;
    speedX *= -1;
  }

  bolaY += speedY;

  if (bolaY < 0) {
    bolaY = 0;
    speedY = 0;
  }

  if (bolaY > window.innerHeight - bola.offsetHeight) {
    bolaY = window.innerHeight - bola.offsetHeight;
    speedY = 0;
  }

  bola.style.top = bolaY + "px";
  bola.style.left = bolaX + "px";

  requestAnimationFrame(update);
};

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  j = (windowWidth - place.offsetWidth) / 2;
  place.style.left = j + "px";
});

place.style.left = j + "px";
bola.style.left = `${j + place.offsetWidth / 2}px`;

update();

let touchStartX = 0;
let touchMoveX = 0;

place.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

place.addEventListener("touchmove", (event) => {
  touchMoveX = event.touches[0].clientX;
  const diffX = touchMoveX - touchStartX;
  j += diffX;
  place.style.left = j + "px";
  touchStartX = touchMoveX;
});

place.addEventListener("touchend", () => {
  // Lógica adicional após o término do toque, se necessário
});

addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "a" || keyName === "A" || keyName === "ArrowLeft") {
    moveLeft();
  } else if (keyName === "d" || keyName === "D" || keyName === "ArrowRight") {
    moveRight();
  }
});

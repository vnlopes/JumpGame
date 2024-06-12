const place = document.querySelector(".place");
const bola = document.querySelector(".bola");


let windowWidth = window.innerWidth;
let j = (windowWidth - place.offsetWidth) / 2 + 60; // Centraliza a posição inicial da div place
let bolaY = 0; // Inicial posição da bola no topo da tela
let speedY = 0;
let speedX = 0;
const gravity = 0.2;
const jumpPower = -22; // Potência negativa para pular para cima
let isJumping = false;

let bolaX = bola.offsetLeft; // Inicializar coordenada X da bola
let leftWallX = 0; // Inicializar coordenada X da parede esquerda
let rightWallX = window.innerWidth; // Inicializar coordenada X da parede direita

const moveRight = () => {
  if (j < windowWidth - place.offsetWidth - 110) {
    j += 100;
  } else {
    j = windowWidth - place.offsetWidth - 10;
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
  const gameOverMessage = document.createElement('div');
  gameOverMessage.textContent = 'Você perdeu!';
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
    z-index: 10; /* Ensure it's on top of other elements */
  `;
  document.body.appendChild(gameOverMessage);
};


const isBallTouchingGround = () => {
  return bolaY === window.innerHeight - bola.offsetHeight;
};



const update = () => {
  const placeRect = place.getBoundingClientRect();
  const bolaRect = bola.getBoundingClientRect();

   // Se a bola tocar no chão, faça algo
   if (isBallTouchingGround()) {
    // Faça algo aqui, como parar o jogo ou reiniciar
    showGameOverMessage ()

    return
  }

  if (bolaRect.bottom >= placeRect.top &&
    bolaRect.left >= placeRect.left &&
    bolaRect.right <= placeRect.right) {
    // Se a bola toca a place, fazer pular
    isJumping = true;
    speedY = jumpPower;

    // Aplicar salto lateral
    if (bolaX > j + place.offsetWidth / 2) {
      speedX = 4; // Salto para a direita
    } else {
      speedX = -4; // Salto para a esquerda
    }
  } else {
    // Se a bola não está mais sobre a place, continuar caindo
    isJumping = false;
    speedY += gravity;
  } 

  bolaX += speedX; // Atualizar a coordenada X da bola

  // Verificar colisão com paredes laterais
  if (bolaX < leftWallX) {
    bolaX = leftWallX; // Ajustar a posição X da bola na parede esquerda
    speedX *= -1; // Inverter a direção horizontal da velocidade
  } else if (bolaX + bola.offsetWidth > rightWallX) {
    bolaX = rightWallX - bola.offsetWidth; // Ajustar a posição X da bola na parede direita
    speedX *= -1; // Inverter a direção horizontal da velocidade
  }

  bolaY += speedY;

  // Evita que a bola passe do topo da tela
  if (bolaY < 0) {
    bolaY = 0;
    speedY = 0;
  }

  // Evita que a bola passe do chão
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
  j = (windowWidth - place.offsetWidth) / 2; // Atualiza a posição inicial da div place ao redimensionar a janela
  place.style.left = j + "px";
});

place.style.left = j + "px";
bola.style.left = `${j + place.offsetWidth / 2}px`;

update();

let touchStartX = 0;
let touchMoveX = 0;

place.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

place.addEventListener('touchmove', (event) => {
  touchMoveX = event.touches[0].clientX;
  const diffX = touchMoveX - touchStartX;
  j += diffX;
  place.style.left = j + "px";
  touchStartX = touchMoveX;
});

place.addEventListener('touchend', () => {
  // Lógica adicional após o término do toque, se necessário
});

addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "ArrowLeft") {
    moveLeft();
  } else if (keyName === "ArrowRight") {
    moveRight();
  }
});

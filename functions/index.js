const place = document.querySelector(".place");
    const bola = document.querySelector(".bola");

    let windowWidth = window.innerWidth;
    let j = (windowWidth - place.offsetWidth) / 2; // Centraliza a posição inicial da div place
    let bolaY = 0; // Inicial posição da bola no topo da tela
    let speedY = 0;
    const gravity = 0.5;
    const jumpPower = -15; // Potência negativa para pular para cima
    let isJumping = false;

    const moveRight = () => {
      if (j < windowWidth - place.offsetWidth - 10) {
        j += 30;
      } else {
        j = windowWidth - place.offsetWidth - 10; 
      }
      place.style.left = j + "px";
    };

    const moveLeft = () => {
      if (j > 0) {
        j -= 30;
      } else {
        j = 0; 
      }
      place.style.left = j + "px";
    };

    const update = () => {
      const placeRect = place.getBoundingClientRect();
      const bolaRect = bola.getBoundingClientRect();

      if (bolaRect.bottom >= placeRect.top &&
          bolaRect.left >= placeRect.left &&
          bolaRect.right <= placeRect.right) {
        // Se a bola toca a place, fazer pular
        isJumping = true;
        speedY = jumpPower;
      } else {
        // Se a bola não está mais sobre a place, continuar caindo
        isJumping = false;
        speedY += gravity;
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

      requestAnimationFrame(update);
    };

    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
      j = (windowWidth - place.offsetWidth) / 2; // Atualiza a posição inicial da div place ao redimensionar a janela
      place.style.left = j + "px";
    });

    addEventListener("keydown", (event) => {
      const keyName = event.key;

      if (keyName === "ArrowLeft") {
        moveLeft();
      } else if (keyName === "ArrowRight") {
        moveRight();
      }
    });

    // Inicializa a posição da div place
    place.style.left = j + "px";

    // Inicializa a posição da bola
    bola.style.left = `${j + place.offsetWidth / 2}px`;

    update();
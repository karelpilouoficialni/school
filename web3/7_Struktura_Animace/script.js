const animatedElement = document.getElementById("animatedElement");
const moveUpButton = document.getElementById("moveUpButton");
const moveDownButton = document.getElementById("moveDownButton");
const moveLeftButton = document.getElementById("moveLeftButton");
const moveRightButton = document.getElementById("moveRightButton");
const doubleSizeButton = document.getElementById("doubleSizeButton");
const halveSizeButton = document.getElementById("halveSizeButton");
const changeColorButton = document.getElementById("changeColorButton");
const rotateButton = document.getElementById("rotateButton");

//Funkce pro pohyb nahoru
function moveUp() {
  animatedElement.style.top = `${
    parseInt(animatedElement.style.top || 0) - 20
  }px`;
}

//Funkce pro pohyb dolů
function moveDown() {
  animatedElement.style.top = `${
    parseInt(animatedElement.style.top || 0) + 20
  }px`;
}

//Funkce pro pohyb doleva
function moveLeft() {
  animatedElement.style.left = `${
    parseInt(animatedElement.style.left || 0) - 20
  }px`;
}

//Funkce pro pohyb doprava
function moveRight() {
  animatedElement.style.left = `${
    parseInt(animatedElement.style.left || 0) + 20
  }px`;
}

//Funkce pro zvětšení objektu dvojnásobně
function doubleSize() {
  animatedElement.style.width = `${
    parseInt(animatedElement.style.width || 100) * 2
  }px`;
  animatedElement.style.height = `${
    parseInt(animatedElement.style.height || 100) * 2
  }px`;
}

//Funkce pro zmenšení objektu o polovinu
function halveSize() {
  animatedElement.style.width = `${
    parseInt(animatedElement.style.width || 100) / 2
  }px`;
  animatedElement.style.height = `${
    parseInt(animatedElement.style.height || 100) / 2
  }px`;
}

//Funkce pro změnení barvy objektu
function changeColor() {
  animatedElement.style.backgroundColor = getRandomColor();
}

//Funkce pro rotaci objektu o 45°
function rotate() {
  animatedElement.style.transform = `rotate(${
    parseInt(
      animatedElement.style.transform
        .replace("rotate(", "")
        .replace("deg)", "") || 0
    ) + 45
  }deg)`;
}

// Funkce pro vygenerování náhodné barvy
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

moveUpButton.addEventListener("click", moveUp);
moveDownButton.addEventListener("click", moveDown);
moveLeftButton.addEventListener("click", moveLeft);
moveRightButton.addEventListener("click", moveRight);
doubleSizeButton.addEventListener("click", doubleSize);
halveSizeButton.addEventListener("click", halveSize);
changeColorButton.addEventListener("click", changeColor);
rotateButton.addEventListener("click", rotate);

// Pohyb pomocí klávesnice
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
});

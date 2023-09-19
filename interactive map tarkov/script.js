const mapContainer = document.getElementById('map-container');
const arrow = document.getElementById('arrow');
let arrowX = window.innerWidth / 2;
let arrowY = window.innerHeight / 2;
let arrowRotation = 0;
const movementStep = 0.1; // Ajusta la velocidad de movimiento según tus preferencias
let currentDirection = null;

mapContainer.addEventListener('click', (event) => {
  const mapRect = mapContainer.getBoundingClientRect();
  const clickX = event.clientX - mapRect.left;
  const clickY = event.clientY - mapRect.top;

  arrowX = clickX;
  arrowY = clickY;
  updateArrowPosition();
});

function updateArrowPosition() {
  arrow.style.left = `${arrowX}px`;
  arrow.style.top = `${arrowY}px`;
  arrow.style.transform = `translate(-50%, -50%) rotate(${arrowRotation}deg)`;
}

function moveArrow() {
  if (currentDirection) {
    switch (currentDirection) {
      case 'w':
        arrowY -= movementStep;
        arrowRotation = 90;
        break;
      case 'a':
        arrowX -= movementStep;
        arrowRotation = 0;
        break;
      case 's':
        arrowY += movementStep;
        arrowRotation = -90;
        break;
      case 'd':
        arrowX += movementStep;
        arrowRotation = 180;
        break;
    }
    updateArrowPosition();
  }
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();

  if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
    currentDirection = key;
  }
}

function handleKeyUp(event) {
  const key = event.key.toLowerCase();

  if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
    currentDirection = null;
  }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function animate() {
  moveArrow();
  requestAnimationFrame(animate);
}

animate();

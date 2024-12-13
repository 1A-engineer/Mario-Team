const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas size
canvas.width = 1024;
canvas.height = 576;

// Player object
const player = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 100,
  height: 100,
  gravity: 1,
  sides: { bottom: 100 + 100 },

  draw: function() {
    c.fillStyle = 'grey';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
};

// Key event handling
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};

function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = -20; // Jump
      break;
    case 'a':
      keys.a.pressed = true; // Move left
      break;
    case 'd':
      keys.d.pressed = true; // Move right
      break;
  }
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'a':
      keys.a.pressed = false; // Stop moving left
      break;
    case 'd':
      keys.d.pressed = false; // Stop moving right
      break;
  }
}

function updatePlayerVelocity() {
  // Reset player horizontal velocity (idle)
  player.velocity.x = 0;

  // Check key presses and update horizontal velocity
  if (keys.d.pressed) {
    player.velocity.x = 5; // Move right
  } else if (keys.a.pressed) {
    player.velocity.x = -5; // Move left
  }
}

function clearCanvas() {
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

function animate() {
  window.requestAnimationFrame(animate); // Call animate recursively

  clearCanvas(); // Clear the canvas every frame

  updatePlayerVelocity(); // Update player horizontal movement

  player.draw(); // Draw the player
  player.update(); // Update player state (gravity, position)
}

// Initialize game
addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);

animate(); // Start animation
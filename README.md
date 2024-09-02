# Ball Physics Simulation

A mesmerizing interactive physics simulation using Matter.js to create a swarm of balls that respond to window movement.

## Description

This project creates a canvas full of bouncing balls that react to the movement of your computer window. As you move your window around the screen, the balls will shift in the opposite direction, creating an engaging visual effect. The simulation uses Matter.js for physics calculations and rendering.

## Features

- 1000 bouncing balls with realistic physics
- Responsive design that adapts to window resizing
- Balls react to window movement
- Smooth animations and collision handling

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/ball-physics-simulation.git
   ```
2. Navigate to the project directory:
   ```
   cd ball-physics-simulation
   ```
3. Open `index.html` in your web browser.

## Usage

1. Open the `index.html` file in a web browser.
2. Move your browser window around the screen to see the balls react to the movement.
3. Resize the window to see the simulation adapt to the new dimensions.

## Dependencies

- [Matter.js](https://brm.io/matter-js/): A 2D physics engine for the web.

## How it Works

1. The script creates a Matter.js engine and renderer.
2. It generates 1000 balls and adds them to the world.
3. Walls are created around the canvas to keep the balls contained.
4. An update function tracks window movement and applies forces to the balls accordingly.
5. The simulation continuously renders and updates the physics.

## Customization

You can adjust the following variables in the script to customize the simulation:

- `numBalls`: Change the number of balls in the simulation.
- `movementSpeedFactor`: Adjust how strongly the balls react to window movement.
- Ball properties: Modify `restitution` and `frictionAir` in the ball creation to change their bounciness and air resistance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

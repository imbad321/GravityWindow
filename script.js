const { Engine, Render, World, Bodies } = Matter;

const engine = Engine.create();
const render = Render.create({
    canvas: document.getElementById('ballCanvas'),
    engine: engine,
    options: {
        wireframes: false,
        background: '#fff',
        width: window.innerWidth,
        height: window.innerHeight 
    }
});

const canvas = document.getElementById('ballCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numBalls = 1000; // Adjusted for performance
const balls = [];
for (let i = 0; i < numBalls; i++) {
    const ball = Bodies.circle(
        Math.random() * window.innerWidth, 
        Math.random() * window.innerHeight, 
        6, 
        { restitution: 0.9, frictionAir: 0.01 } // Added frictionAir for damping
    );
    balls.push(ball);
    World.add(engine.world, ball);
}

function createWalls(width, height) {
    return [
        Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),
        Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }),
        Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
        Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true })
    ];
}
let walls = createWalls(window.innerWidth, window.innerHeight);
World.add(engine.world, walls);
let prevX = window.screenX;
let prevY = window.screenY;
let movementSpeedFactor = 0.02;

function update() {
    const deltaX = (window.screenX - prevX) * movementSpeedFactor;
    const deltaY = (window.screenY - prevY) * movementSpeedFactor;

    balls.forEach(ball => {
        Matter.Body.setVelocity(ball, { 
            x: ball.velocity.x + deltaX, 
            y: ball.velocity.y + deltaY 
        });
        
        // Clearer collision handling
        const { x, y } = ball.position;
        const radius = ball.circleRadius;

        if (x - radius < 0) { ball.position.x = radius; ball.velocity.x *= -1; }
        if (x + radius > render.options.width) { ball.position.x = render.options.width - radius; ball.velocity.x *= -1; }
        if (y - radius < 0) { ball.position.y = radius; ball.velocity.y *= -1; }
        if (y + radius > render.options.height) { ball.position.y = render.options.height - radius; ball.velocity.y *= -1; }
    });

    prevX = window.screenX;
    prevY = window.screenY; 
    requestAnimationFrame(update); 
}

update(); 

window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;

    World.remove(engine.world, walls); // Remove old walls
    walls = createWalls(window.innerWidth, window.innerHeight); // Create new walls
    World.add(engine.world, walls);
});
Engine.run(engine);
Render.run(render);

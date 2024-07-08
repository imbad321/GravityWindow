// Module alias Matter
const { Engine, Render, World, Bodies } = Matter;

// Create canvas and engine
const engine = Engine.create();
const render = Render.create({
    canvas: document.getElementById('ballCanvas'),
    engine: engine,
    options: {
        wireframes: false,
        background: '#fff'
    }
});

// CSS for full-screen canvas
const canvas = document.getElementById('ballCanvas'); 
canvas.style.width = '100%';
canvas.style.height = '100%';
document.body.style.margin = 0; // Remove default body margins

// Create balls
const balls = [];
for (let i = 0; i < 100; i++) {
    balls.push(Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        10,
        { restitution: 0.8 } 
    ));
}

// Function to dynamically create walls
function createWalls() {
    return [
        Bodies.rectangle(window.innerWidth / 2, -25, window.innerWidth, 50, { isStatic: true }),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true }),
        Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }),
        Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true })
    ];
}
World.add(engine.world, balls);
World.add(engine.world, createWalls()); // Initial walls

// Update and movement logic
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

        const radius = ball.circleRadius;
        if (ball.position.x - radius < 0) {
            Matter.Body.setPosition(ball, { x: radius, y: ball.position.y });
            Matter.Body.setVelocity(ball, {x: Math.abs(ball.velocity.x), y: ball.velocity.y}); 
        } else if (ball.position.x + radius > render.options.width) {
            Matter.Body.setPosition(ball, { x: render.options.width - radius, y: ball.position.y });
            Matter.Body.setVelocity(ball, {x: -Math.abs(ball.velocity.x), y: ball.velocity.y}); 
        }
        if (ball.position.y - radius < 0) {
            Matter.Body.setPosition(ball, { x: ball.position.x, y: radius });
            Matter.Body.setVelocity(ball, {x: ball.velocity.x, y: Math.abs(ball.velocity.y)}); 
        } else if (ball.position.y + radius > render.options.height) {
            Matter.Body.setPosition(ball, { x: ball.position.x, y: render.options.height - radius });
            Matter.Body.setVelocity(ball, {x: ball.velocity.x, y: -Math.abs(ball.velocity.y)}); 
        }
    });

    prevX = window.screenX;
    prevY = window.screenY;

    requestAnimationFrame(update);
}

update();

// Resize handling with wall updates
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;

    const walls = engine.world.bodies.filter(body => body.isStatic);
    World.remove(engine.world, walls);
    World.add(engine.world, createWalls());
});

Engine.run(engine);
Render.run(render);

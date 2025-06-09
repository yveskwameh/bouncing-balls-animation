// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log('Window loaded');
    const canvas = document.getElementById('bouncingCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    console.log('Canvas found:', canvas);

    // Array of pun jokes for the notification
    const speedPuns = [
        "I'm reading a book about anti-gravity, it's impossible to put down.",
        "Why don't scientists trust atoms? They make up everything.",
        "How does NASA organize a party? They planet.",
        "What do you call fake fettuccine? Impasta.",
        "As a scarecrow, I'm outstanding in my field.",
        "The tomato blushed because it saw the salad dressing.",
        "When a frog's car breaks down, it gets toad away.",
        "Why are crabs bad at sharing? They're shellfish.",
        "Tried to catch some fog, mist.",
        "When does a joke become a dad joke? When it becomes apparent.",
        "I stayed up all night wondering where the sun went, then it dawned on me.",
        "Where does the general keep his armies? In his sleevies.",
        "Difference between a poorly dressed man on a unicycle and a well-dressed man on a bicycle? Attire.",
        "Skeletons never fight, they don't have the guts.",
        "A magician who lost his magic is just Ian.",
        "Measure a snake in inches, because they don't have feet.",
        "I'm addicted to brake fluid, but I can stop any time.",
        "What do you call an alligator in a vest? An investigator.",
        "The hipster burned his mouth, he ate the pizza before it was cool.",
        "What's the difference between a hippo and a Zippo? One's heavy, the other's a little lighter.",
        "The golfer packed extra pants in case he got a hole-in-one.",
        "What's orange and sounds like a parrot? A carrot.",
        "New corduroy pillowcases are really making headlines.",
        "A broken can opener is a can't opener.",
        "The pony couldn't sing, he was a little hoarse.",
        "Make a tissue dance, put a little boogie in it.",
        "The 45-cent concert? 50 Cent featuring Nickelback.",
        "The banana skipped school, it wasn't peeling well.",
        "How do you find Will Smith in the snow? Look for fresh prints.",
        "Poured root beer in a square glass, now it's just beer.",
        "Told ten jokes to a friend, no pun in ten did.",
        "You can't hear a pterodactyl pee, the \"P\" is silent.",
        "Can February march? No, but April may.",
        "Bought the worst thesaurus, both its synonyms and antonyms were terrible.",
        "A parade of rabbits hopping backward is a receding hare-line.",
        "What's brown and sticky? A stick.",
        "Bear wants a grilled cheese, bartender asks, \"Why the big pause?\" Bear: \"Born with 'em.\"",
        "Two goldfish in a tank, one asks, \"Do you know how to drive this thing?\"",
        "Dentists call X-rays \"tooth pics.\"",
        "Janitor jumps out of the closet: \"Supplies!\"",
        "The belt was arrested for holding up a pair of pants.",
        "Why did the picture go to jail? It was framed.",
        "Snowmen get loans from snowbanks.",
        "Batman skipping work is Christian Bale.",
        "Scientists freshen breath with experi-mints.",
        "The can-crusher quit, too soda-pressing.",
        "A dog magician? That's a labracadabrador.",
        "Buffalo to his college-bound son: \"Bison.\"",
        "What did one ocean say to the other? Nothing, it just waved.",
        "Old McDonald turned his farm into a corporation, he's the E-I-CEO."
    ];

    // Function to get random pun
    function getRandomPun() {
        return speedPuns[Math.floor(Math.random() * speedPuns.length)];
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }
    console.log('Canvas context obtained');

    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.querySelector('.speed-value');

    if (!speedSlider || !speedValue) {
        console.error('Speed control elements not found');
        return;
    }
    console.log('Speed controls found');
    speedValue.textContent = `${speedMultiplier}x`;

    // Set canvas size based on its display size
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        console.log('Canvas size updated:', canvas.width, canvas.height);
    }

    // Initial resize
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Global speed multiplier
    let speedMultiplier = 10;

    // Add rate limiting variables at the top level
    let lastPunTime = 0;
    const PUN_COOLDOWN = 10000; // 10 seconds cooldown between puns

    // Ball class
    class Ball {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.baseDx = (Math.random() - 0.5) * 12; // Base horizontal velocity
            this.baseDy = (Math.random() - 0.5) * 12; // Base vertical velocity
            this.dx = this.baseDx;
            this.dy = this.baseDy;
            this.mass = radius; // Mass proportional to radius
            console.log('Ball created:', { x, y, color });
        }

        updateSpeed() {
            const speedRatio = speedMultiplier / 12;
            this.dx = this.baseDx * speedRatio;
            this.dy = this.baseDy * speedRatio;
        }

        draw() {
            try {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            } catch (error) {
                console.error('Error drawing ball:', error);
            }
        }

        update(balls) {
            // Bounce off walls with position correction
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.dx = -Math.abs(this.dx);
            }
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.dx = Math.abs(this.dx);
            }
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.dy = -Math.abs(this.dy);
            }
            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.dy = Math.abs(this.dy);
            }

            // Check collision with other balls
            for (let ball of balls) {
                if (ball === this) continue;

                // Calculate distance between balls
                const dx = ball.x - this.x;
                const dy = ball.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Check if balls are colliding
                if (distance < this.radius + ball.radius) {
                    // Collision resolution
                    const normalX = dx / distance;
                    const normalY = dy / distance;

                    // Relative velocity
                    const relativeVelocityX = this.dx - ball.dx;
                    const relativeVelocityY = this.dy - ball.dy;

                    // Calculate impulse
                    const speed = relativeVelocityX * normalX + relativeVelocityY * normalY;
                    if (speed < 0) continue; // Balls are moving apart

                    const impulse = 2 * speed / (this.mass + ball.mass);

                    // Update velocities
                    this.dx -= impulse * ball.mass * normalX;
                    this.dy -= impulse * ball.mass * normalY;
                    ball.dx += impulse * this.mass * normalX;
                    ball.dy += impulse * this.mass * normalY;

                    // Move balls apart to prevent sticking
                    const overlap = (this.radius + ball.radius - distance) / 2;
                    this.x -= overlap * normalX;
                    this.y -= overlap * normalY;
                    ball.x += overlap * normalX;
                    ball.y += overlap * normalY;
                }
            }

            // Update position
            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    // Create balls
    const balls = [
        new Ball(100, 100, 20, '#FF0000'),    // Bright red
        new Ball(200, 200, 20, '#00FF00'),    // Bright green
        new Ball(300, 300, 20, '#0000FF'),    // Bright blue
        new Ball(400, 150, 20, '#FFA500'),    // Orange
        new Ball(150, 400, 20, '#800080'),    // Purple
        new Ball(500, 300, 20, '#FF69B4'),    // Hot pink
        new Ball(250, 500, 20, '#00FFFF'),    // Cyan
        new Ball(600, 200, 20, '#FFD700'),    // Gold
        new Ball(350, 450, 20, '#4B0082'),    // Indigo
        new Ball(450, 100, 20, '#FF1493'),    // Deep pink
        new Ball(150, 250, 20, '#32CD32'),    // Lime green
        new Ball(550, 400, 20, '#FF4500'),    // Orange red
        new Ball(200, 350, 20, '#9370DB'),    // Medium purple
        new Ball(650, 300, 20, '#20B2AA'),    // Light sea green
        new Ball(300, 150, 20, '#FF8C00'),    // Dark orange
        new Ball(400, 500, 20, '#BA55D3'),    // Medium orchid
        new Ball(500, 200, 20, '#00CED1'),    // Dark turquoise
        new Ball(250, 450, 20, '#FF6347')     // Tomato
    ];
    console.log('Balls created:', balls.length);
    balls.forEach(ball => ball.updateSpeed());

    // Speed control event listener
    speedSlider.addEventListener('input', async (e) => {
        console.log('Speed slider changed:', e.target.value);
        speedMultiplier = parseInt(e.target.value);
        speedValue.textContent = `${speedMultiplier}x`;
        balls.forEach(ball => ball.updateSpeed());

        // Show notification when speed exceeds 15x
        const notification = document.getElementById('speedNotification');
        console.log('Notification element:', notification);
        console.log('Current speed:', speedMultiplier);
        
        if (speedMultiplier > 15) {
            console.log('Showing notification');
            const now = Date.now();
            
            // Check if we're still in cooldown period
            if (now - lastPunTime >= PUN_COOLDOWN) {
                const newPun = getRandomPun();
                notification.textContent = newPun;
                notification.classList.remove('hide');
                notification.classList.add('show');
                lastPunTime = now;
                
                // Hide notification after 10 seconds with fade out
                setTimeout(() => {
                    console.log('Hiding notification');
                    notification.classList.remove('show');
                    notification.classList.add('hide');
                }, 10000);
            }
        }
    });

    // Animation loop
    function animate() {
        try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            balls.forEach(ball => {
                ball.update(balls);
            });

            requestAnimationFrame(animate);
        } catch (error) {
            console.error('Error in animation loop:', error);
        }
    }

    // Start animation
    console.log('Starting animation');
    animate();
}); 
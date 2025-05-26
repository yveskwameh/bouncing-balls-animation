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
        "These balls really know how to have a ball.",
        "When life throws you curves, just bounce back.",
        "A basketball's favorite music? Hip hop.",
        "The soccer ball quit its job, it couldn't handle the kickbacks.",
        "Tennis balls love drama, they're always in a racket.",
        "The dodgeball's motto: \"If you can't dodge it, embrace it!\"",
        "Golf balls keep things in the short grass, no rough language allowed.",
        "Volleyballs never lie, they always come clean over the net.",
        "The beach ball got promoted, it rose through the ranks.",
        "Ping pong balls excel at multitasking, they're good at volley-ume control.",
        "The billiard ball became a philosopher, it pondered deep pockets.",
        "Why are rubber balls optimistic? They always rebound from mistakes.",
        "A football gave a pep talk: \"Let's tackle today head-on!\"",
        "The crystal ball tried stand-up, it couldn't see the punchline coming.",
        "A snowball's diary is riveting, each entry has a meltdown.",
        "Baseballs love being grounded, it keeps them in their field.",
        "The yoga ball teaches calm, just breathe and roll with it.",
        "A cue ball's hobby? Breaking into circles.",
        "The beach ball joined a band, it wanted to be a high note.",
        "The foam ball hosts a podcast, \"Soft Talks.\"",
        "Basketballs are great secret keepers, they never leak dribbles.",
        "A soccer ball majors in geography, it's always on goal maps.",
        "A tennis ball crashed the party, it heard there'd be serves.",
        "The dodgeball wrote a memoir, \"Missed Me Again.\"",
        "Golf balls avoid gossip, too many traps.",
        "Ping pong balls write haiku, short bouncy lines.",
        "The crystal ball reads nonfiction, it prefers real futures.",
        "A snowball asked for sunscreen, talk about over-chill.",
        "Footballs love math, they're into division lines.",
        "The yoga ball offered advice, \"Stay centered.\"",
        "The cue ball took a taxi, didn't want to scratch its ride.",
        "Beach balls take selfies, they're all about good reflections.",
        "Foam balls meditate, it's a soft-aware practice.",
        "Basketballs start every meeting with a bounce check.",
        "Soccer balls dream of retirement, somewhere goal den.",
        "Tennis balls believe in fairness, they like even sets.",
        "Dodgeballs enjoy mystery novels, lots of twists and ducks.",
        "Golf balls love puns, they're a real tee-hee.",
        "Ping pong balls prefer balanced diets, equal spins of fun.",
        "Crystal balls keep diaries, future-proof journals.",
        "Snowballs plan vacations, winter's already booked.",
        "Footballs stay humble, they know life has ups and downs.",
        "Yoga balls teach posture, they're firm believers.",
        "Cue balls never gossip, they avoid side pockets.",
        "Beach balls study meteorology, they're into high-pressure zones.",
        "Foam balls host silent discos, volume turned down to fluff.",
        "Basketballs keep tidy, they hate loose threads.",
        "Soccer balls take art classes, they appreciate fine lines.",
        "Tennis balls attend etiquette school, they mind their nets and volleys.",
        "Dodgeballs write thrillers, every chapter's a hit.",
        "Golf balls practice mindfulness, focus on the swing not the sting.",
        "Ping pong balls love word games, they're fond of short returns.",
        "Crystal balls are punctual, they always foresee delays.",
        "Snowballs send postcards, wish you were freeze.",
        "Footballs enjoy poetry, they're moved by meter.",
        "Yoga balls bake bread, lots of good rolls.",
        "Cue balls believe in karma, what goes around comes around.",
        "Beach balls join choirs, they're partial to high notes.",
        "Foam balls watch documentaries, soft science fascinates them.",
        "Basketballs study finance, they track every rebound.",
        "Soccer balls host talk shows, lots of kick off interviews.",
        "Tennis balls live simply, they don't court drama.",
        "Dodgeballs take dance lessons, perfecting the sidestep.",
        "Golf balls farm, big on their greens.",
        "Ping pong balls love quizzes, rapid-fire answers.",
        "Crystal balls throw parties, they always know who's coming.",
        "Snowballs knit scarves, short-term projects.",
        "Footballs do stand-up, they've got punch lines.",
        "Yoga balls start book clubs, focus on balance in literature.",
        "Cue balls paint abstract, they think outside the brush.",
        "Beach balls read travel blogs, always chasing new waves.",
        "Foam balls do improv, every scene's a soft landing.",
        "Basketballs volunteer, they're all about community rebound.",
        "Soccer balls hike, they love goal top views.",
        "Tennis balls learn coding, they enjoy clean returns.",
        "Dodgeballs garden, they raise snap peas.",
        "Golf balls teach philosophy, pondering causal tees.",
        "Ping pong balls collect stamps, enthusiasts of first returns.",
        "Crystal balls map the stars, big fans of projection.",
        "Snowballs play chess, every gambit chills.",
        "Footballs study history, epic field marches.",
        "Yoga balls knit sweaters, stretchy goals.",
        "Cue balls host game night, they're the center of cue riosities.",
        "Beach balls stargaze, they look up to rise.",
        "Foam balls do karaoke, soft rock only.",
        "Basketballs love coffee, they prefer a strong press.",
        "Soccer balls fly kites, they're drawn to lines.",
        "Tennis balls design gardens, love neat borders.",
        "Dodgeballs do magic tricks, now you see it now you duck.",
        "Golf balls write greeting cards, best wishes and swings.",
        "Ping pong balls juggle commitments, short cycles keep them moving.",
        "Crystal balls collect calendars, dates in advance.",
        "Snowballs play drums, best rolls in town.",
        "Footballs go camping, love open fields.",
        "Yoga balls ride roller coasters, they're in for the ups and flows.",
        "Cue balls host seminars, topic staying on cue.",
        "Beach balls open bakeries, swell croissants.",
        "Foam balls teach ethics, soft answers gentle questions.",
        "Basketballs dabble in fashion, they're big on hoop skirts.",
        "Soccer balls meditate on goals, they always find inner net."
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
    let speedMultiplier = 12;

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
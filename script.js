/* --- PART 1: THE BOOT SEQUENCE --- */
document.getElementById('math-trigger').addEventListener('click', () => {
    // 1. Hide the school layer
    document.getElementById('edu-layer').classList.add('hidden');
    // 2. Show the black boot screen
    document.getElementById('boot-screen').classList.remove('hidden');
    
    let progress = 0;
    const bar = document.getElementById('boot-progress');
    
    // This creates the 3-second loading bar effect
    const interval = setInterval(() => {
        progress += 2;
        bar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                // 3. Hide boot screen and show phantomOS
                document.getElementById('boot-screen').classList.add('hidden');
                document.getElementById('os-layer').classList.remove('hidden');
                startOS(); // Start the clock, battery, and particles
            }, 500);
        }
    }, 60); 
});

/* --- PART 2: THE OS LOGIC (Clock, Battery, Particles) --- */
function startOS() {
    // Update the clock every second
    setInterval(() => {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    // Get Battery Percentage
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const update = () => {
                document.getElementById('battery').innerText = `🔋 ${Math.round(battery.level * 100)}%`;
            };
            update();
            battery.addEventListener('levelchange', update);
        });
    }

    // Background Particles (White Glowing Dots)
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let parts = Array.from({length: 50}, () => ({
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height, 
        s: Math.random() * 2
    }));
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        parts.forEach(p => {
            ctx.beginPath(); 
            ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); 
            ctx.fill();
            p.y -= 0.5; // Make them float upwards
            if (p.y < 0) p.y = canvas.height;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* --- PART 3: NAVIGATION & GAMES --- */
function showCategory(cat) {
    // Hide the Home screen (Logo/Main Buttons)
    document.getElementById('os-home').classList.add('hidden');
    // Show the Games Grid
    document.getElementById('game-grid').classList.remove('hidden');
    console.log("Connecting to " + cat + " library...");
}

function showHome() {
    // Go back to the main phantomOS screen
    document.getElementById('os-home').classList.remove('hidden');
    document.getElementById('game-grid').classList.add('hidden');
}

function launchGame(url) {
    // Open the game iframe and show it
    const container = document.getElementById('game-frame-container');
    const iframe = document.getElementById('game-iframe');
    iframe.src = url;
    container.classList.remove('hidden');
}

function closeGame() {
    // Close the game and clear the source (stops music)
    const container = document.getElementById('game-frame-container');
    const iframe = document.getElementById('game-iframe');
    iframe.src = ""; 
    container.classList.add('hidden');
}

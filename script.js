document.getElementById('math-trigger').addEventListener('click', () => {
    document.getElementById('edu-layer').classList.add('hidden');
    document.getElementById('boot-screen').classList.remove('hidden');
    
    let progress = 0;
    const bar = document.getElementById('boot-progress');
    const interval = setInterval(() => {
        progress += 2;
        bar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('boot-screen').classList.add('hidden');
                document.getElementById('os-layer').classList.remove('hidden');
                startOS();
            }, 500);
        }
    }, 60); // Roughly 3 seconds total
});

function startOS() {
    // Time & Battery
    setInterval(() => {
        document.getElementById('time').innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    navigator.getBattery().then(battery => {
        const update = () => document.getElementById('battery').innerText = `🔋 ${Math.round(battery.level * 100)}%`;
        update();
        battery.addEventListener('levelchange', update);
    });

    // Particle background (simple white circles)
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let parts = Array.from({length: 50}, () => ({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*2}));
    
    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        parts.forEach(p => {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
            p.y -= 0.5; if (p.y < 0) p.y = canvas.height;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

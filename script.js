document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("pieCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawBtn = document.getElementById('drawBtn');
    const dataInput = document.getElementById('dataInput');
    const soundEnabled = document.getElementById('soundEnabled');

    drawBtn.addEventListener('click', () => {
        const input = dataInput ? dataInput.value : '';
        if (!input) return;

        const values = input.split(',').map(s => Number(s.trim())).filter(n => !Number.isNaN(n));
        if (values.length === 0) return;
        const total = values.reduce((a, b) => a + b, 0);

        let startAngle = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 2 - 10;

        values.forEach(value => {
            const sliceAngle = (value / total) * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.fillStyle = randomColor();
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            startAngle += sliceAngle;
        });

        
        if (soundEnabled && soundEnabled.checked) {
            const vol = 1.0;
            playBeep(0.16, 700, vol);
        }
    });
});

function randomColor() {
    return "hsl(" + Math.random() * 360 + ", 70%, 60%)";
}

function playBeep(duration = 0.15, frequency = 440, volume = 0.25) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            if (audioCtx.close) audioCtx.close();
        }, duration * 1000);
    } catch (err) {
        console.warn('Audio play failed or Web Audio API unsupported:', err);
    }
}

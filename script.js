const canvas = document.getElementById("pieCanvas");
const ctx = canvas.getContext("2d");

document.getElementById("drawBtn").addEventListener("click", () => {
    const input = document.getElementById("dataInput").value;
    if (!input) return;

    const values = input.split(",").map(Number);
    const total = values.reduce((a, b) => a + b, 0);

    let startAngle = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    values.forEach(value => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.fillStyle = randomColor();
        ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        startAngle += sliceAngle;
    });
});

function randomColor() {
    return "hsl(" + Math.random() * 360 + ", 70%, 60%)";
}

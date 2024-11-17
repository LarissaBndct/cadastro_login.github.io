const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const player = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    color: "#00c35d",
    dy: 0,
    gravity: 0.8,
    jumpForce: 15,
    ground: 350
};

const blocks = [];
const blockWidth = 30;
const blockHeight = 30;
const blockColor = "#436454";
let blockSpeed = 3;

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para desenhar os blocos
function drawBlocks() {
    blocks.forEach(block => {
        ctx.fillStyle = blockColor;
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
    });
}

// Função para atualizar a posição do jogador
function updatePlayer() {
    player.y += player.dy;
    if (player.y + player.height < player.ground) {
        player.dy += player.gravity;
    } else {
        player.dy = 0;
        player.y = player.ground - player.height;
    }
}

// Função para atualizar a posição dos blocos
function updateBlocks() {
    blocks.forEach(block => {
        block.x -= blockSpeed;
    });

    if (blocks.length > 0 && blocks[0].x < -blockWidth) {
        blocks.shift();
    }
}

// Função para detectar colisões
function detectCollision() {
    blocks.forEach(block => {
        if (
            player.x < block.x + blockWidth &&
            player.x + player.width > block.x &&
            player.y < block.y + blockHeight &&
            player.y + player.height > block.y
        ) {
            alert("Game Over!");
            document.location.reload();
        }
    });
}

// Função para gerar novos blocos
function generateBlock() {
    blocks.push({
        x: canvas.width,
        y: player.ground - blockHeight
    });

    setTimeout(generateBlock, 2000);
}

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função principal do jogo
function gameLoop() {
    clearCanvas();
    drawPlayer();
    drawBlocks();
    updatePlayer();
    updateBlocks();
    detectCollision();

    requestAnimationFrame(gameLoop);
}

// Evento de pular
document.addEventListener("keydown", event => {
    if (event.code === "Space" && player.y + player.height === player.ground) {
        player.dy = -player.jumpForce;
    }
});

// Inicialização do jogo
generateBlock();
gameLoop();

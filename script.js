const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score')
let isJumping = false;
let isGameOver = false;
let position = 0;
let pontos = 0;

function handleKeyUp(event) {
    if(event.keyCode === 38) {
        if (!isJumping) {
            jump();
        }
    }
    if (event.keyCode === 13) {
        reloadThePage()
    }
}


function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) { 
            clearInterval(upInterval);

            // Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 30);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1100;
    let randomTime = Math.random() * (3000 - 500)+ 500;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            pontos += 1;

        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {            
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = `<div class="game-over">
            <h1>Fim de jogo, você fez ${pontos} pontos</br></br>
            Aperte o Enter ou clique em Restart para reiniciar o jogo
            </h1><div>
            <div class="reload" onclick="reloadThePage()">Restart</div>
            <div ><a class="reload" href="file:///C:/Program%20Files/Git/Dino-Game/telaInical.html" style="text-decoration:none">Menu</a></div>
            </div></div>`;
        }else {
            if (!isGameOver) {
                score.innerHTML = "Score:  " + pontos
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px';
            }
        }
    }, 25);

    setTimeout(createCactus, randomTime);
}

function reloadThePage() {
    window.location.reload();
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

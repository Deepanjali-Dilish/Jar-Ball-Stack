document.getElementById('letsPlayBtn').addEventListener('click', function() {
    document.querySelector('.background-container').style.display = 'none';
    document.getElementById('instructionPage').style.display = 'block';
});

document.getElementById('startGameBtn').addEventListener('click', function() {
    
    document.body.style.backgroundColor = 'black';
    document.body.style.backgroundImage = 'none'; 

    document.getElementById('instructionPage').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.icon-container').style.display = 'block';

    const ballContainer = document.getElementById('ball-container');
    const ballColors = getRandomColors(10);

    for (let i = 1; i <= 10; i++) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.id = `balls${i}`;
        ball.textContent = i;
        ball.style.backgroundColor = ballColors[i - 1];
        ball.onclick = () => selectBall(i);
        ballContainer.appendChild(ball);
    }
});

document.getElementById('instructionIcon').addEventListener('click', function() {

    const overlayContent = document.querySelector('.overlay-instruction-content');

    overlayContent.innerHTML = '';

    const heading = document.createElement('h1');
    heading.textContent = 'Game Instructions';

    const paragraph = document.createElement('p');

    paragraph.textContent = `1)Ball to Jar: Click a ball, then select a jar to move it there.<br><br>2)Jar to Jar: Click a jar, then click another jar to move the top ball.<br><br>3)Remove Ball: Click any ball in a jar to remove it.`;
    paragraph.innerHTML = paragraph.textContent; 

    overlayContent.appendChild(heading);
    overlayContent.appendChild(paragraph);

    document.getElementById('overlayInstructionPage').style.display = 'flex';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('btn'); 
    overlayContent.appendChild(closeButton);

    closeButton.addEventListener('click', function() {
        document.getElementById('overlayInstructionPage').style.display = 'none';
    });
});

let selectedJar = null;
let selectedBall = null;
const jars = { 1: [], 2: [], 3: [] };
const maxBall = 5;

function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(randomColors());
    }
    return colors;
}      

function randomColors() {
    const codes = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += codes[Math.floor(Math.random() * 16)];
    }
    return color;
}       

function selectBall(ballNumber) {
    if (ballInJar(ballNumber)) {
        removeBall(ballNumber);
        return;
    }

    selectedBall = ballNumber;
}      

function ballInJar(ballNumber) {
    return Object.values(jars).some(jar => jar.includes(ballNumber));
}
function selectJar(jarNumber) {
    if (selectedBall !== null) {
        
        if (jars[jarNumber].length >= maxBall) {
            alert("You cannot add more than 5 balls to a jar!");
            return; 
        }

        jars[jarNumber].push(selectedBall);
        arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber);
        console.log(`Ball ${selectedBall} stored in Jar ${jarNumber}`);
        selectedBall = null;
        return;
    }

    if (selectedJar === null) {
        if (jars[jarNumber].length === 0) {
            return;
        }
        selectedJar = jarNumber;
        console.log(`Selected Jar ${selectedJar}`);
        return;
    }

    moveBall(selectedJar, jarNumber);
    selectedJar = null;
}


function arrangeBalls(jarElement, jarNumber) {
    jars[jarNumber].forEach((ballNumber, index) => {
        const ballElement = document.getElementById(`balls${ballNumber}`);
        jarElement.appendChild(ballElement);
        ballElement.style.margin = "0";
        ballElement.style.position = "absolute";
        ballElement.style.height = "40px";
        ballElement.style.width = "40px";
        ballElement.style.left = "50%";
        ballElement.style.transform = "translateX(-50%)";
        ballElement.style.bottom = `${index * 45}px`;
    });
}

function moveBall(fromJar, toJar) {

    if (jars[toJar].length >= maxBall) {
        alert("The jar is already full. To add more balls to it, remove a ball from the jar and then add the new ball.");
        return;
    }

    const move = jars[fromJar].pop();
    if (!move) {
        return;
    }

    jars[toJar].push(move);
    arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar);
    arrangeBalls(document.getElementById(`jar${toJar}`), toJar);
    console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${toJar}`);
}

function removeBall(ballNumber) {
    for (const jarNumber in jars) {
        const jarIndex = jars[jarNumber].indexOf(ballNumber);

        if (jarIndex !== -1) {
        
            jars[jarNumber].splice(jarIndex, 1);

    
            arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber);

            const ballElement = document.getElementById(`balls${ballNumber}`);
            ballElement.style.margin = "5px";
            ballElement.style.position = "static";
            ballElement.style.height = "50px";
            ballElement.style.width = "50px";
            ballElement.style.transform = "none";

            const ballContainer = document.getElementById('ball-container');
            const balls = Array.from(ballContainer.children);

            let inserted = false;
            for (let i = 0; i < balls.length; i++) {
                if (parseInt(balls[i].textContent) > ballNumber) {
                    ballContainer.insertBefore(ballElement, balls[i]);
                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                ballContainer.appendChild(ballElement);
            }

            console.log(`Ball ${ballNumber} removed from Jar ${jarNumber} and added back to the container`);
            break;
        }
    }
}
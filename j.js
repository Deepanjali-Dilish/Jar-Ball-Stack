const ballContainer = document.getElementById('ball-container');
const ballColors = getRandomColors(15);
let selectedJar = null;
let selectedBall = null;
const jars = { 1: [], 2: [], 3: [] };
const maxBalls = 5;
// Generate balls dynamically and append them to the bottom container
for (let i = 1; i <= 15; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.id = `balls${i}`;
    ball.textContent = i;
    ball.style.backgroundColor = ballColors[i - 1];
    ball.onclick = () => selectBall(i);
    ballContainer.appendChild(ball);
}
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
        // Remove the ball from the jar and place it back
        removeBall(ballNumber);
        return;
    }
    selectedBall = ballNumber;
}
function ballInJar(ballNumber) {
    return Object.values(jars).some(jar => jar.includes(ballNumber));
}
function selectJar(jarNumber) {
    if (ballInJar(selectedBall)) {
        return;
    }
    if (selectedBall !== null) {
        if (jars[jarNumber].length >= maxBalls) {
            console.log(`Jar ${jarNumber} is full`);
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
        console.log(`Selected Jar: ${selectedJar}`);
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
    const move = jars[fromJar].pop();
    if (!move) {
        return;
    }
    if (jars[toJar].length >= maxBalls) {
        console.log(`Jar ${toJar} is full`);
        jars[fromJar].push(move); // Return ball to original jar
        return;
    }
    jars[toJar].push(move);
    arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar);
    arrangeBalls(document.getElementById(`jar${toJar}`), toJar);
    console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${toJar}`);
}
// Function to remove a ball from a jar and place it back in the bottom container
function removeBall(ballNumber) {
    // Find the jar that contains the ball
    for (const jarNumber in jars) {
        const jarIndex = jars[jarNumber].indexOf(ballNumber);
        if (jarIndex !== -1) {
            // Remove the ball from the jar
            jars[jarNumber].splice(jarIndex, 1);
            // Update the jar's ball arrangement
            arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber);
            // Move the ball back to the bottom container in ascending order
            const ballElement = document.getElementById(`balls${ballNumber}`);
            ballElement.style.margin = "5px";
            ballElement.style.position = "static";
            ballElement.style.height = "50px";
            ballElement.style.width = "50px";
            ballElement.style.transform = "none";
            // Add the ball back to the container in sorted order
            appendBallInOrder(ballElement);
            console.log(`Ball ${ballNumber} removed from Jar ${jarNumber}`);
            break;
        }
    }
}
// Function to append a ball to the bottom container in ascending order
function appendBallInOrder(ballElement) {
    const ballNumber = parseInt(ballElement.textContent);
    const balls = Array.from(ballContainer.children);
    // Find the correct position to insert the ball
    let inserted = false;
    for (let i = 0; i < balls.length; i++) {
        if (parseInt(balls[i].textContent) > ballNumber) {
            ballContainer.insertBefore(ballElement, balls[i]);
            inserted = true;
            break;
        }
    }
    // If the ball is the largest, append it to the end
    if (!inserted) {
        ballContainer.appendChild(ballElement);
    }
}
    





// const ballContainer = document.getElementById('ball-container')
// const ballColors = getRandomColors(15)

// let selectedJar = null
// let selectedBall = null

// const jars = { 1:[], 2:[], 3:[] }
// const maxBalls = 5

// for (let i=1; i<=10; i++){
//     const ball = document.createElement("div")
//     ball.classList.add("ball")
//     ball.id = `balls${i}`
//     ball.textContent = i
//     ball.style.backgroundColor = ballColors[i - 1]

   
//     ball.onclick = () => selectBall(i)
//     ballContainer.appendChild(ball)
// }

// function getRandomColors(count){
//     const colors = []
//     for (let i=0; i<count; i++){
//         colors.push(randomColors())
//     }
//     return colors
// }

// function randomColors(){

//     const codes = "0123456789ABCDEF"
//     let color = "#"
//     for (let i=0; i<6; i++){
//         color += codes[Math.floor(Math.random() * 16)]
//     }

//     return color
// }

// function selectBall(ballNumber){
//     if(ballInJar(ballNumber)){
//         return
//     }

//     selectedBall = ballNumber
// }

// function ballInJar(ballNumber){
//     return Object.values(jars).some(jar => jar.includes(ballNumber))
// }

// function selectJar(jarNumber){

//     if(ballInJar(selectedBall)){
//         return
//     }

//     if(selectedBall !== null){


//         jars[jarNumber].push(selectedBall)
//         arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber)

//         console.log(`Ball ${selectedBall} stored in jar ${jarNumber}`)
//         selectedBall = null
//         return
//     }

//     if(selectedJar === null){
//         if (jars[jarNumber].length === 0){
//             return
//         }
//         selectedJar = jarNumber
//         console.log(`Selected Jar: ${selectedJar}`)
//         return
//     }

//     moveBall(selectedJar, jarNumber)
//     selectedJar = null
// }

// function arrangeBalls(jarElement, jarNumber){
//     jars[jarNumber].forEach((ballNumber, index) => {
//         const ballElement = document.getElementById(`balls${ballNumber}`)

//         jarElement.appendChild(ballElement)

//         ballElement.style.margin = "0"
//         ballElement.style.position = "absolute"
//         ballElement.style.height = "40px"
//         ballElement.style.width = "40px"
//         ballElement.style.left = "50%"
//         ballElement.style.transform = "translateX(-50%)"
//         ballElement.style.bottom = `${index * 45}px`
//     })
// }


// function moveBall(fromJar, toJar){

//     const move = jars[fromJar].pop()
//     if(!move){
//         return
//     }

//     jars[toJar].push(move)

//     arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar)
//     arrangeBalls(document.getElementById(`jar${toJar}`), toJar)

//     console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${toJar}`)
// }

function arrangeBalls(jarElement, jarNumber) {
    const ballHeight = 45; // Height of each ball plus margin (adjust if needed)
    const initialJarHeight = 232; // Initial jar height
    const maxBalls = 5; // Balls before jar grows
    
    // Calculate the new height
    const numBalls = jars[jarNumber].length;
    const newHeight = Math.max(initialJarHeight, ballHeight * numBalls + 20); // Adding 20px for padding
    
    // Update the jar height
    jarElement.style.height = `${newHeight}px`;
    
    // Arrange the balls inside the jar
    jars[jarNumber].forEach((ballNumber, index) => {
        const ballElement = document.getElementById(`balls${ballNumber}`);
        jarElement.appendChild(ballElement);
        ballElement.style.margin = "0";
        ballElement.style.position = "absolute";
        ballElement.style.height = "40px";
        ballElement.style.width = "40px";
        ballElement.style.left = "50%";
        ballElement.style.transform = "translateX(-50%)";
        ballElement.style.bottom = `${index * ballHeight}px`;
    });
}


function moveBall(fromJar, toJar) {
    const move = jars[fromJar].pop(); // Remove the top ball from the source jar
    if (!move) {
        return; // No ball to move
    }

    jars[toJar].push(move); // Add the ball to the destination jar
    arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar); // Rearrange source jar
    arrangeBalls(document.getElementById(`jar${toJar}`), toJar);     // Rearrange destination jar
    console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${toJar}`);
}


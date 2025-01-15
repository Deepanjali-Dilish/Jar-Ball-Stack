// function selectJar(jarNumber) {
//     if (selectedBall !== null) {
//         // Skip adding the ball if the jar is full
//         if (jars[jarNumber].length >= maxBalls) {
//             return;
//         }

//         // Add the selected ball to the jar
//         jars[jarNumber].push(selectedBall);
//         arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber);
//         console.log(`Ball ${selectedBall} stored in jar ${jarNumber}`);
//         selectedBall = null; // Reset the selected ball
//         return;
//     }

//     if (selectedJar === null) {
//         // Select the source jar for moving balls
//         if (jars[jarNumber].length === 0) {
//             return; // Do nothing if the jar is empty
//         }
//         selectedJar = jarNumber;
//         console.log(`Selected Jar: ${selectedJar}`);
//         return;
//     }

//     if (selectedJar === jarNumber) {
//         // Deselect the jar if the same jar is clicked again
//         selectedJar = null;
//         console.log(`Deselected Jar: ${jarNumber}`);
//         return;
//     }

//     // Move the top ball from the selected jar to the target jar
//     moveBallToJar(selectedJar, jarNumber);
//     selectedJar = null; // Reset the selected jar
// }

// function moveBallToJar(fromJar, toJar) {
//     // Skip moving the ball if the target jar is full
//     if (jars[toJar].length >= maxBalls) {
//         return;
//     }

//     const movingBall = jars[fromJar].pop(); // Remove the top ball from the source jar
//     if (!movingBall) {
//         return; // Do nothing if the source jar is empty
//     }

//     jars[toJar].push(movingBall); // Add the ball to the target jar

//     // Rearrange the balls in both jars
//     arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar);
//     arrangeBalls(document.getElementById(`jar${toJar}`), toJar);

//     console.log(`Moved Ball ${movingBall} from Jar ${fromJar} to Jar ${toJar}`);
// }

const ballContainer = document.getElementById('ball-container')
const ballColors = getRandomColors(15)

let selectedJar = null
let selectedBall = null

const jars = { 1: [], 2:[], 3:[] }
const maxBalls = 5

for (let i=1; i<= 15; i++){
    const ball = document.createElement("div")
    ball.classList.add("ball")
    ball.id = `balls${i}`
    ball.textContent = i
    ball.style.backgroundColor = ballColors[i - 1]

    ball.onclick = () => selectBall(i)
    ballContainer.appendChild(ball)
}

function getRandomColors(count){

    const colors = []
    for (let i=0; i<count; i++){
        colors.push(randomColors())
    }

    return colors
}

function randomColors(){

    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i=0; i<6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }

    return color
}

// function selectBall(ballNumber){
//     selectedBall = ballNumber
// }
function selectBall(ballNumber) {
    // Check if the ball is already inside a jar
    if (isBallInJar(ballNumber)) {
        return;  // Don't select the ball if it's already in a jar
    }

    selectedBall = ballNumber;
}

function isBallInJar(ballNumber) {
    // Check if the ball is present in any jar
    return Object.values(jars).some(jar => jar.includes(ballNumber));
}


function selectJar(jarNumber){

    // if(selectedBall === null){
    //     alert("Please select a ball first")
    //     return
    // }
    if (isBallInJar(selectedBall)) {
        // Prevent the movement if the selected ball is already in the jar
        return;
    }
    

    if(selectedBall !== null){
        if (jars[jarNumber].length >= maxBalls){
            return
        }

        jars[jarNumber].push(selectedBall)
        arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber)
        console.log(`Ball ${selectedBall} stored in jar ${jarNumber}`)
        selectedBall = null
        return
    }

    if(selectedJar === null) {
        if (jars[jarNumber].length === 0){
            return
        }
        selectedJar = jarNumber
        console.log(`Selected Jar: ${selectedJar}`)
        return
    }

    if (selectedJar === jarNumber){
        selectedJar = null
        console.log(`Deselected Jar: ${jarNumber}`)
        return

    }

    moveBall(selectedJar, jarNumber)
    selectedJar = null
}


function arrangeBalls(jarElement, jarNumber){
    jars[jarNumber].forEach((ballNumber, index) => {
        const ballElement = document.getElementById(`balls${ballNumber}`)

        // ballElement.classList.remove('arranged-ball')

        jarElement.appendChild(ballElement)

        // ballElement.classList.add('arranged-ball')

        ballElement.style.margin = "0"
        ballElement.style.position = "absolute"
        ballElement.style.width = "40px"
        ballElement.style.height = "40px"
        ballElement.style.left = "50%"
        ballElement.style.transform ="translateX(-50%)"
        ballElement.style.bottom = `${index * 45}px`
    })
}
// function arrangeBalls(jarElement, jarNumber) {
//     jars[jarNumber].forEach((ballNumber, index) => {
//         const ballElement = document.getElementById(`balls${ballNumber}`);
//         ballElement.classList.remove('arranged-ball');

//         jarElement.appendChild(ballElement);
//         ballElement.classList.add('arranged-ball');

//         // Calculate the translateY value based on index and ball height
//         const translateY = index * 45; 
//         // ballElement.style.transform = `translateY(${translateY}px)`;
//     });
// }
function moveBall(fromJar, toJar){

    if (jars[toJar].length >= maxBalls){
        return
    }

    const move = jars[fromJar].pop()
    if(!move){
        return
    }

    jars[toJar].push(move)

    arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar)
    arrangeBalls(document.getElementById(`jar${toJar}`), toJar)

    console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${toJar}`)
}


    
const ballContainer = document.getElementById('ball-container')
const ballColors = getRandomColors(15)

let selectedJar = null
let selectedBall = null

const jars = { 1:[], 2:[], 3:[] }
const maxBalls = 5

for (let i=1; i<=15; i++){
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

    const codes = "0123456789ABCDEF"
    let color = "#"
    for (let i=0; i<6; i++){
        color += codes[Math.floor(Math.random() * 16)]
    }

    return color
}

function selectBall(ballNumber){
    if(ballInJar(ballNumber)){
        return
    }

    selectedBall = ballNumber
}

function ballInJar(ballNumber){
    return Object.values(jars).some(jar => jar.includes(ballNumber))
}

function selectJar(jarNumber){

    if(ballInJar(selectedBall)){
        return
    }

    if(selectedBall !== null){

        if(jars[jarNumber].length >= maxBalls){
            alert(`jar ${jarNumber} is full cannot add more balls`)
            return
        }   

        jars[jarNumber].push(selectedBall)
        arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber)

        console.log(`Ball ${selectedBall} stored in jar ${jarNumber}`)
        selectedBall = null
        return
    }

    if(selectedJar === null){
        if (jars[jarNumber].length === 0){
            return
        }
        selectedJar = jarNumber
        console.log(`Selected Jar: ${selectedJar}`)
        return
    }

    moveBall(selectedJar, jarNumber)
    selectedJar = null
}

function arrangeBalls(jarElement, jarNumber){
    jars[jarNumber].forEach((ballNumber, index) => {
        const ballElement = document.getElementById(`balls${ballNumber}`)

        jarElement.appendChild(ballElement)

        ballElement.style.margin = "0"
        ballElement.style.position = "absolute"
        ballElement.style.height = "40px"
        ballElement.style.width = "40px"
        ballElement.style.left = "50%"
        ballElement.style.transform = "translateX(-50%)"
        ballElement.style.bottom = `${index * 45}px`
    })
}

function moveBall(fromJar, toJar){

    if(jars[toJar].length >= maxBalls){
        alert(`Jar ${toJar} is full cannot move balls into it`)
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
// const ballContainer = document.getElementById('ball-container')
// const ballColors = getRandomColors(15)

// let selectedJar = null
// let selectedBall = null
// const jars = { 1: [], 2: [], 3: []}
// const maxBall = 5



// for (let i=1; i<= 15; i++){
//     const ball = document.createElement('div')
//     ball.classList.add('ball')
//     ball.id = `balls${i}`
//     ball.textContent = i
//     ball.style.backgroundColor = ballColors[i - 1]

//     ball.onclick = () => selectBall(i)
//     ballContainer.appendChild(ball)
// }

// function getRandomColors(count){
//     const colors = []
//     for(let i=0; i<count; i++){
//         colors.push(randomColors())
//     }
//     return colors
// }

// function randomColors(){
//     const codes = "0123456789ABCDEF"
//     let color = "#"
//     for(let i=0; i<6; i++){
//         color += codes[Math.floor(Math.random() * 16)]
//     }
//     return color
// }

// function selectBall(ballNumber){
//     if(ballInJar(ballNumber)) {

//         removeBall(ballNumber)
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

//     if(selectedBall != null){
    
//         jars[jarNumber].push(selectedBall)
//         arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber)
//         console.log(`Ball ${selectedBall} stored in Jar ${jarNumber}`)
//         selectedBall = null
//         return
//     }

//     if(selectedJar === null){
//         if(jars[jarNumber].length === 0){
//             return
//         }
//         selectedJar = jarNumber
//         console.log(`Selected Jar ${selectedJar}`)
//         return
//     }
//     moveBall(selectedJar, jarNumber)
//     selectedJar = null
// }

// function arrangeBalls(jarElement, jarNumber){

//     const ballHeight = 45
//     const jarHeight = 232


//     const numBalls = jars[jarNumber].length
//     const newHeight = Math.max(jarHeight, ballHeight * numBalls + 20)

//     jarElement.style.height = `${newHeight}px`

//     jars[jarNumber].forEach((ballNumber, index) => {
//         const ballElement = document.getElementById(`balls${ballNumber}`)
//         jarElement.appendChild(ballElement)
//         ballElement.style.margin = "0"
//         ballElement.style.position = "absolute"
//         ballElement.style.height = "40px"
//         ballElement.style.width = "40px"
//         ballElement.style.left = "50%"
//         ballElement.style.transform = "translateX(-50%)"
//         ballElement.style.bottom = `${index * ballHeight}px`
//     })
// }

// function moveBall(fromJar, tojar){
//     const move = jars[fromJar].pop()
//     if (!move){
//         return
//     }

//     jars[tojar].push(move)
//     arrangeBalls(document.getElementById(`jar${fromJar}`), fromJar)
//     arrangeBalls(document.getElementById(`jar${tojar}`), tojar)
//     console.log(`Moved Ball ${move} from Jar ${fromJar} to Jar ${tojar}` )
// }

// function removeBall(ballNumber){
//     for(const jarNumber in jars){
//         const jarIndex = jars[jarNumber].indexOf(ballNumber)

//         if(jarIndex !== -1){
//             jars[jarNumber].splice(jarIndex, 1)

//             arrangeBalls(document.getElementById(`jar${jarNumber}`), jarNumber)

//             const ballElement = document.getElementById(`balls${ballNumber}`)
//             ballElement.style.margin = "5px"
//             ballElement.style.position = "static"
//             ballElement.style.height = "50px"
//             ballElement.style.width = "50px"
//             ballElement.style.transform = "none"

//             ballOrder(ballElement)
//             console.log(`Ball ${ballNumber} removed from Jar ${jarNumber}`)
//             break
//         }
//     }
// }

// function ballOrder(ballElement){
//     const ballNumber = parseInt(ballElement.textContent)
//     const balls = Array.from(ballContainer.children)

//     let inserted = false
//     for(let i=0; i<balls.length;i++){
//         if(parseInt(balls[i].textContent) > ballNumber){
//             ballContainer.insertBefore(ballElement, balls[i])
//             inserted = true
//             break
//         }
//     }

//     if (!inserted){
//         ballContainer.appendChild(ballElement)
//     }
// }



const ballContainer = document.getElementById('ball-container');
 const ballColors = getRandomColors(15);

        let selectedJar = null;
        let selectedBall = null;
        const jars = { 1: [], 2: [], 3: [] };
        const maxBall = 5;

        // Generate balls
        for (let i = 1; i <= 15; i++) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
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
                removeBall(ballNumber);
                return;
            }

            selectedBall = ballNumber;
        }

        

        function ballInJar(ballNumber) {
            return Object.values(jars).some(jar => jar.includes(ballNumber));
        }

        function selectJar(jarNumber) {
            if (selectedBall != null) {
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
            // Prevent moving if the destination jar already has 5 balls
            if (jars[toJar].length >= maxBall) {
                alert("The destination jar already has 5 balls! Movement not allowed.");
                return;
            }
        
            // Move the ball from the source jar to the destination jar
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

                    ballOrder(ballElement);
                    console.log(`Ball ${ballNumber} removed from Jar ${jarNumber}`);
                    break;
                }
            }
        }

        function ballOrder(ballElement) {
            const ballNumber = parseInt(ballElement.textContent);
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
        }




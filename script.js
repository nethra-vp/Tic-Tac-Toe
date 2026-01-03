let boxes = document.querySelectorAll(".boxes")
let turn1 = document.querySelector(".turn1")
let turn2 = document.querySelector(".turn2")
let winner = document.querySelector(".winner")
let span = document.querySelector("#result")
let reset = document.getElementById("reset")
let ng = document.getElementById("ng")
let clickSound = new Audio("click_sound.mp3")
let winnerSound = new Audio("winner_sound.mp3")
let turnX = true;

// All possible winning combinations (index-based)
let WinnerCondition = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Reset the current game state
reset.addEventListener('click', () => {
    boxes.forEach(box => {
        clickSound.play();
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover")
        winner.classList.add("hide")
        box.classList.remove("b-s")
    })
})

// Start a new game (same as reset)
ng.addEventListener('click', () => {
    boxes.forEach(box => {
        clickSound.play();
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover")
        winner.classList.add("hide")
        box.classList.remove("b-s")
    })
})

boxes.forEach(box => {
    box.addEventListener('click', () => {
        clickSound.play();
        // Place X or O based on turn
        if(turnX) {
            box.innerText = "X"
            box.style.color = "rgb(169, 53, 95)";
            turn2.classList.add("b-s");
            turn1.classList.remove("b-s");
            turnX = false
        }
        else {
            box.innerText = "O"
            box.style.color = "rgba(54, 79, 172, 1)";
            turn1.classList.add("b-s");
            turn2.classList.remove("b-s");
            turnX = true
        }
        checkWinner();
    })
})

function checkWinner() {
    for(let condition of WinnerCondition) {
       let box1 = boxes[condition[0]].innerText;
       let box2 = boxes[condition[1]].innerText;
       let box3 = boxes[condition[2]].innerText;
       // Validate non-empty and equal values    
       if(box1 !== "" && box2 !== "" && box3 !== "") {
            if(box1 === box2 && box2 === box3) {
                console.log("Winner: " + box1)
                showResult(box1);
                winnerSound.play();
                // Dim all boxes
                boxes.forEach(box => {
                    box.classList.add("b-s");
                })
                // Highlight only winning boxes
                boxes[condition[0]].classList.remove("b-s")
                boxes[condition[1]].classList.remove("b-s")
                boxes[condition[2]].classList.remove("b-s")
            }
        }
    }
}

function showResult(result) {
    // Disable further moves after a win
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.remove("hover")
    })
    winner.classList.remove("hide")
    span.innerText = result
    if(result === "X") {
        span.style.color = "rgb(169, 53, 95)";
    }
    else {
        span.style.color = "rgba(54, 79, 172, 1)";
    }
}
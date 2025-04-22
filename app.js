let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turn = true; //p1X, p2O

let count = 0;

let winningPattens = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6 ],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box clicked");
    if (turn) {
      box.innerText = "O";
      box.classList.add("OOs");
      turn = false;
    } else {
      box.innerText = "X";
      box.classList.remove("OOs")
      turn = true;
    }
    box.disabled = true;
    checkWinner();
    count++;

    let iswin = checkWinner();
    if (count === 9 && !iswin) {
      setTimeout(() => {
        gameDraw();
      }, 2000);
    }
  });
});


const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBox();
}

const disableBox = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}
const enableBox = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}.`
  msgContainer.classList.remove("hide");
  disableBox();
}


const checkWinner = () => {
  for (const patten of winningPattens) {
      let p1 = boxes[patten[0]].innerText;
      let p2 = boxes[patten[1]].innerText;
      let p3 = boxes[patten[2]].innerText;

      if (p1 != "" && p2 != "" && p3 != "") {
        if (p1 === p2 && p2 === p3 ) {
          // console.log("winner!!!", p1);
          showWinner(p1);
        }
      }
  }
};


const resetGame = () => {
  count = 0;
  turn = true; //p1X, p2O
  enableBox();
  msgContainer.classList.add("hide");
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
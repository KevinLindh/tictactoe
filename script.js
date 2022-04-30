class Game {
  constructor(playerOne, playerTwo, board) {
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.isPlayerOneTurn = true
    this.isGameOver = false
    this.board = board
    this.count = 1
    this.dark = false
    this.score1 = localStorage.getItem("player1Score")
    this.score2 = localStorage.getItem("player2Score")
  } 
    
  nextTurn() {
    this.checkWinningConditions();
    this.isPlayerOneTurn = !this.isPlayerOneTurn;
  }
  checkWinningConditions(){
    for(let i=0; i < this.board.length; i++){
      //horizontal winning conditions
      if(this.board[i].reduce((acc, val)=> acc + val) === "xxx" || this.board[i].reduce((acc, val)=> acc + val) === "ooo"){
        this.isGameOver = true;
      }
   //vertical winning conditions
      let winning = ""
      for(let j = 0; j < this.board.length; j++){
        winning += this.board[j][i];
        if(winning === "xxx" || winning === "ooo"){
           this.isGameOver = true;
        }
       }
    }
    //diagonal hard coded  
    if(this.board[0][0]+this.board[1][1]+this.board[2][2] === "ooo" || this.board[0][0]+this.board[1][1]+this.board[2][2] === "xxx"){
      this.isGameOver = true;
    }
    if(this.board[0][2]+this.board[1][1]+this.board[2][0] === "ooo" || this.board[0][2]+this.board[1][1]+this.board[2][0] === "xxx"){
      this.isGameOver = true;
    }
    //get winning player
    if(this.isGameOver){
      alert(this.isPlayerOneTurn ? "Player 1 Won!" : "Player 2 Won!")
      if(this.isPlayerOneTurn){
        let added = Number(localStorage.getItem("player1Score")) + 1;
        localStorage.setItem("player1Score", added);
        document.querySelector("#player1Score").textContent = `Player 1 score: ${localStorage.getItem("player1Score")}`;
      } else {
        let added = Number(localStorage.getItem("player2Score")) + 1;
        localStorage.setItem("player2Score", added);
        document.querySelector("#player2Score").textContent = `Player 2 score: ${localStorage.getItem("player2Score")}`;
      }
      this.refresh();
    } else if(this.count > 8){
      alert("TIE!");
      this.refresh();
    }
      
    }
  
  render(el){
    let value = el.dataset.val;
    let inputVal = ""
    if(this.isPlayerOneTurn === true){
      inputVal = this.playerOne;
      el.style.backgroundColor = 'black'
      el.textContent = inputVal;
      el.style.color = "white";
    } else {
      inputVal = this.playerTwo;
      el.style.backgroundColor = 'white'
      el.textContent = inputVal;
    }

    let newArr = value.split("-");
    this.board[Number(newArr[0])][Number(newArr[1])] = inputVal;
    this.nextTurn();
    this.count++;
  }

  refresh(){
    window.location.reload();
  }

  mode(){
    if(!this.dark){
      this.dark = true;
    document.querySelector("body").style.backgroundColor = "grey"
    } else {
      document.querySelector("body").style.backgroundColor = "white"
      this.dark = false;
    }
  }
}

window.addEventListener("load", () => {
  if (player1Score === null || player2Score === null) {
    localStorage.setItem("player1Score", "0");
    localStorage.setItem("player2Score", "0");
  }
});

resetScores = function(){
  localStorage.setItem("player1Score", "0");
  localStorage.setItem("player2Score", "0");
  document.querySelector("#player1Score").textContent = `Player 1 score: ${localStorage.getItem("player1Score")}`;
  document.querySelector("#player2Score").textContent = `Player 2 score: ${localStorage.getItem("player2Score")}`;
}


const board = [["","",""], ["","",""], ["","",""]]

const game = new Game("x","o", board)

const buttons = Array.from(document.querySelectorAll('.button'))

buttons.forEach((el) => el.addEventListener('click', (elem) => {
  game.render(el)
}, {once:true}))

document.querySelector(".reset-button").addEventListener("click", game.refresh)

document.querySelector(".mode").addEventListener("click", game.mode)

document.querySelector(".resetScores").addEventListener("click", resetScores)

document.querySelector("#player1Score").textContent = `Player 1 score: ${localStorage.getItem("player1Score")}`;
document.querySelector("#player2Score").textContent = `Player 2 score: ${localStorage.getItem("player2Score")}`;
// add localStorage to keep score and set reset to delete localStorage
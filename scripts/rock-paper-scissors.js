function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.Wins}  Losses: ${score.Losses}  Ties: ${score.Ties}`;
}

let score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Ties: 0,
};

let isAutoPlaying = false;
let interValid;

function autoPlay() {
  if (!isAutoPlaying) {
    interValid = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(interValid);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Loose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Loose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Loose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You Win") {
    score.Wins += 1;
  } else if (result === "You Loose") {
    score.Losses += 1;
  } else if (result === "Tie") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="/img/${playerMove}.png" class="move-icon" />
<img src="/img/${computerMove}.png" class="move-icon" /> Computer`;

  document.querySelector(".js-result").innerHTML = result;
}
document.querySelector(
  ".js-score"
).innerHTML = `Wins: ${score.Wins}  Losses: ${score.Losses}  Ties: ${score.Ties}`;

// A simple JS connect 4 game

var player = "red"; // Player starts with read
const players = { red: "yellow", yellow: "red" }, // Player states
  tbody = document.querySelector("tbody"), 
  rows = tbody.querySelectorAll("tr"),
  prepArray = n => {
    return Array(n).fill("");
  },
  checkWinner = (strip, player) => {
    const result = /(?:(red){4}|(yellow){4})/.exec(strip); // check for four red or four yellow depending on strip
    if (!!result) {
      alert(player + " has won");
      tbody.querySelectorAll("td").forEach(cell => { // reset board if win
        cell.removeAttribute("class");
      });
      return true;
    }
    return false;
  },
  checkWinnerHelper = player => {
    var strips = {
        horizontal: [], 
        vertical: prepArray(7), // seven columns
        frontDiagonal: prepArray(12), // twelve possible diagonals 
        backDiagonal: prepArray(12)
      },
      strip, // know what color to check for
      color,
      winner,
      dir;
    rows.forEach((row, ri) => {
      strip = "";
      row.querySelectorAll("td").forEach((cell, ci) => {
        color = cell.getAttribute("class") || " ";
        strips.backDiagonal[ci - ri + rows.length - 1] += color;
        strips.frontDiagonal[ci + ri] += color;
        strips.vertical[ci] += color;
        strip += color;
      });
      strips.horizontal.push(strip);
      winner = winner || checkWinner(strip, player);
    });

    for (dir in strips) {
      if (!winner && strips.hasOwnProperty(dir)) { // check for duds
        strips[dir].forEach(strip => {
          winner = winner || checkWinner(strip, player);
        });
      }
    }
  },
  dropCounter = ci => {
    var cell, pc;
    rows.forEach(row => {
      pc = row.childNodes[ci];
      if (!pc.getAttribute("class")) {
        cell = pc;
      }
    });
    if (cell) {
      cell.classList.add((player = players[player]));
      if (player === "red") document.body.style.background = "yellow";
      else document.body.style.background = "red";
      checkWinnerHelper(player);
    }
  };
tbody.addEventListener(
  "click",
  evt => {
    const trg = evt.target;
    if (trg.tagName.toLowerCase() === "td") {
      dropCounter(trg.cellIndex);
    }
  },
  false
);

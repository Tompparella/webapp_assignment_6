
var board = document.getElementById("board");
var boxes = document.getElementsByClassName("box");
var playerTurn = document.getElementById("playerTurn");
var table;
var gameOver = false;
var h = " ";

document.getElementById("reset").addEventListener("click", reset_game);

var turn = 1;

function find_table(){

  fetch("/games/find", {
    method: "GET"
  }).then((response) => {
    response.json().then((data) => {

      console.log(data);
  
      if (data == null) {
        create_table();
        return;
      }
      table = data.gameboard;
      turn = data.turns;
      console.log("Tässä 2" + table);
      var count = 0;
      for (i = 0; i < 5; i++) {
        var newrow = board.insertRow(i);
        newrow.id = i;
        for (var j = 0; j < 5; j++) {
          //table[i][j] = h;
          var newbox = newrow.insertCell(j);
          //if (table != undefined) {
          newbox.innerHTML = table[i][j];
          //} else { 
          //  newbox.innerHTML = h;
          //}
          newbox.id = count;
          newbox.setAttribute("class", "box");
          count++;
        }
        set_click_listeners();
      }

    });
  });
}

function create_table() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  turn = 1;
  table = new Array(5);

  for (var i = 0; i < table.length; i++) {
    table[i] = new Array(5);
  }
  var count = 0;

  for (i = 0; i < 5; i++) {
    var newrow = board.insertRow(i);
    newrow.id = i;
    for (var j = 0; j < 5; j++) {
      table[i][j] = h;
      var newbox = newrow.insertCell(j);
      newbox.innerHTML = h;
      newbox.id = count;
      newbox.setAttribute("class", "box");
      count++;
    }
    set_click_listeners();
  }
  let post = {
    gameboard: table,
    turns: turn
  };
  console.log(JSON.stringify(post));

  fetch("/games/create", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(post)
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
}
function set_click_listeners() {
  boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      mark_box(this.id);
    });
  }
}
function mark_box(id) {
  if (!gameOver) {
    var curr_row = boxes[id].parentNode.id;
    var curr_col = id - curr_row * 5;
    if (boxes[id].textContent.includes(" ")) {
      if (turn % 2 !== 0) {
        boxes[id].innerHTML = "X";
        table[curr_row][curr_col] = "X";
        playerTurn.textContent = "Turn: Player 2";
      } else {
        boxes[id].innerHTML = "O";
        table[curr_row][curr_col] = "O";
        playerTurn.textContent = "Turn: Player 1";
      }
      check_win(boxes[id]);
    }
  }
}

function delete_game() {
  let post = {
    gameboard: table,
    turns: turn
  };
  fetch("/games/delete", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(post)
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
}

function reset_game() {
  delete_game();
  create_table();
  playerTurn.textContent = "Turn: Player 1";
  /*
  var table_length = table[0].length;
  for (var i = 0; i < table_length; i++) {
    for (var j = 0; j < table_length; j++) {
      table[i][j] = h;
    }
  }
  */
  gameOver = false;
  for (i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = " ";
  }
}
function check_win(box) {
  var player;
  if (turn % 2 !== 0) {
    player = "X";
  } else {
    player = "O";
  }
  turn++;
  var row_count = 0;
  var curr_row = box.parentNode.id;
  var curr_col = box.id - curr_row * 5;

  /* Checking vertical victory */
  for (var i = 0; i < table[curr_row].length; i++) {
    if (table[curr_row][i] === player) {
      row_count++;
    } else {
      row_count = 0;
      break;
    }
  }

  /* Checking horizontal win */
  if (row_count === 0) {
    for (i = 0; i < table[curr_row].length; i++) {
      if (table[i][curr_col] === player) {
        row_count++;
      } else {
        row_count = 0;
        break;
      }
    }
  }

  /* Checking diagonal win */
  if (row_count === 0) {
    for (i = 0; i < table[curr_row].length; i++) {
      if (table[i][i] === player) {
        row_count++;
      } else {
        row_count = 0;
        break;
      }
    }
    if (row_count === 0) {
      var j = 0;
      for (i = table[curr_row].length - 1; i >= 0; i--) {
        if (table[j][i] === player) {
          row_count++;
          j++;
        } else {
          row_count = 0;
          break;
        }
      }
    }
  }

  if (row_count === 5) {
    playerTurn.textContent = "Game Over!";
    var p_no;
    if (player === "X") {
      p_no = "1";
    } else {
      p_no = "2";
    }
    alert("Player " + p_no + " won!");
    gameOver = true;
    delete_game();
    return;
  }
  if (turn === 26) {
    alert("The board is full, it's a tie!");
    delete_game();
    gameOver = true;
  }

  let post = {
    gameboard: table,
    turns: turn
  };
  fetch("/games/update", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(post)
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });

}
find_table();
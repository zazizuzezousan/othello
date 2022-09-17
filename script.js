const $othelloBoard = document.getElementById("OthelloBoard");
const $guide = document.getElementById("guide");
const $result = document.getElementById("result");
const $winner = document.getElementById("winner");
const $whiteTilesNumber = document.getElementById("whiteTilesNumber");
const $blackTilesNumber = document.getElementById("blackTilesNumber");
const $settingInput = document.getElementById("settingInput");
const $gameStartButton = document.getElementById("gameStartButton");
const $showMark = document.getElementById("showMark");
const $missLimitSet = document.getElementById("missLimitSet");
const $tiles = document.getElementsByClassName("tiles");
const $tile = [].slice.call($tiles);
const $showTurn = document.getElementById("showTurn");
const $showBlackTilesNumber = document.getElementById("showBlackTilesNumber");
const $showWhiteTilesNumber = document.getElementById("showWhiteTilesNumber");
const $historyMenu = document.getElementById("historyMenu");
const $setPlayerName = document.getElementById("setPlayerName");
const $blackPlayerName = document.getElementById("blackPlayerName");
const $whitePlayerName = document.getElementById("whitePlayerName");
const $historyTitle = document.getElementById("historyTitle");
let cell = new Array(64);
let installation = new Array(64);
let flipOver = new Array(64);
let turn = 0;
let thin;
let del;
let missLimitNumber = 0;
let blackMiss = 0;
let whiteMiss = 0;
let showMark = false;
let histories = new Array();

function start(){
    for(let i = 0; i < 64; i++){
        putTile(i, 0);
        flipOver[i] = new Array();
        flipOver[i].length = 0;
        installation[i] = false;
    }
    blackMiss = 0;
    whiteMiss = 0;
    $result.style.top = "-150px";
    putTile(27, -1);
    putTile(28, 1);
    putTile(35, 1);
    putTile(36, -1);
    turn = -1;
    for(let i = 0; i < 64; i++) judge(i, turn);
    showMessage("黒のターン", "black", 2000);
    showGameInfo();
}
function putTile(place, color){
    cell[place] = color;
    switch (cell[place]){
        case 0:
            $tile[place].style.backgroundColor = "";
            break;
        case -1:
            $tile[place].style.backgroundColor = "black";
            break;
        case 1:
            $tile[place].style.backgroundColor = "white";
            break;
    }
}
function judge(place, color){
    installation[place] = false;
    flipOver[place].length = 0;
    deleteMark(place);
    if(cell[place] == 0){
        let i = place + 1;
        let j = 0;
        let k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place + 1) || i % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i > place + 1 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i++;
                j++;
                k++;
            }
        }
        i = place + 9;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place + 9) || i % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i > place + 9 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i += 9;
                j++;
                k++;
            }
        }
        i = place + 8;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place + 8)){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i > place + 8 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i += 8;
                j++;
                k++;
            }
        }
        i = place + 7;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place + 7) || (i + 1) % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i > place + 7 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i += 7;
                j++;
                k++;
            }
        }
        i = place - 1;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place - 1) || (i + 1) % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i < place - 1 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i--;
                j++;
                k++;
            }
        }
        i = place - 9;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place - 9) || (i + 1) % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i < place - 9 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i -= 9;
                j++;
                k++;
            }
        }
        i = place - 8;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place - 8)){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i < place - 8 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i -= 8;
                j++;
                k++;
            }
        }
        i = place - 7;
        k = 0;
        while(true){
            if(i < 1 || i > 64 || cell[i] == 0 || (cell[i] == color && i == place - 7) || i % 8 == 0){
                for(let l = 1; l <= k; l++){
                    flipOver[place].splice(j - l, 1);
                }
                j -= k; 
                break;
            }else if(i < place - 7 && cell[i] == color){
                installation[place] = true;
                break;
            }else{
                flipOver[place][j] = i;
                i -= 7;
                j++;
                k++;
            }
        }
    }
    if(showMark) setMark(place);
}
function setMark(place){
    if(installation[place]){
        $tile[place].innerHTML = '<div class="marks"></div>';
    }
}
function deleteMark(place){
    $tile[place].innerHTML = "";
}
function turnTiles(place){
    for(let i = 0; i < flipOver[place].length; i++){
        putTile(flipOver[place][i], cell[flipOver[place][i]] *= -1);
    }
}
function showMessage(message, color, time){
    clearTimeout(thin);
    clearTimeout(del);
    $guide.innerText = message;
    $guide.style.color = color;
    $guide.style.opacity = 1;
    $guide.style.display = "block";
    thin = setTimeout(function(){
        $guide.style.opacity = 0;
    }, time - 1000);
    del = setTimeout(function(){
        $guide.style.display = "none";
    }, time);
}
function endMotion(fail){
    if(fail) for(let i = 0; i < 64; i++) putTile(i, -fail);
    turn = 0;
    const blackTiles = cell.filter(function(color){
        if(color == -1) return true;
        return false;
    }).length;
    const whiteTiles = cell.filter(function(color){
        if(color == 1) return true;
        return false;
    }).length;
    if(blackTiles < whiteTiles){
        showMessage("白の勝ち", "white", 3000);
        $winner.innerText = "白の勝ち";
        $result.style.backgroundColor = "white";
        $result.style.borderColor = "black";
        $result.style.color = "black";
    }else if(blackTiles > whiteTiles){
        showMessage("黒の勝ち", "black", 3000);
        $winner.innerText = "黒の勝ち";
        $result.style.backgroundColor = "black";
        $result.style.borderColor = "white";
        $result.style.color = "white";
    }else{
        showMessage("引き分け", "gray", 3000);
        $winner.innerText = "引き分け";
        $result.style.backgroundColor = "lightgray";
        $result.style.borderColor = "darkgray";
        $result.style.color = "black";
    }
    $whiteTilesNumber.innerText = whiteTiles;
    $blackTilesNumber.innerText = blackTiles;
    setTimeout(function(){
        $result.style.top = "50%";
    },3000);
    showGameInfo();
    setHistory(blackTiles, whiteTiles);
}
function play(place){
    if(installation[place] == true){
        if(turn == 1){
            putTile(place, 1);
            turnTiles(place);
        }else if(turn == -1){
            putTile(place, -1);
            turnTiles(place);
        }
        if(!cell.includes(0)){
            endMotion();
        }else{
            turn *= -1;
            switch(turn){
                case 1:
                    showMessage("白のターン", "white", 2000);
                    break;
                case -1:
                    showMessage("黒のターン", "black", 2000);
                    break;
            }
            for(let m = 0; m < 64; m++) judge(m, turn);
            if(!installation.includes(true)){
                setTimeout('showMessage("パス", "white", 2000)', 2000);
                turn *= -1;
                setTimeout(function(){
                    switch(turn){
                        case 1:
                            showMessage("白のターン", "white", 2000);
                            break;
                        case -1:
                            showMessage("黒のターン", "black", 2000);
                            break;
                    }
                }, 4000)
                for(let m = 0; m < 64; m++) judge(m, turn);
                if(!installation.includes(true)){
                    setTimeout('showMessage("パス", "white", 2000)', 6000);
                    setTimeout(endMotion(),8000);
                }
            }
            showGameInfo();
        }
    }else if(missLimitNumber > 0){
        if(turn == 1){
            blackMiss++;
            if(blackMiss > missLimitNumber) endMotion(1);
        }
        if(turn == -1){
            whiteMiss++;
            if(whiteMiss > missLimitNumber) endMotion(-1);
        }
    }
}
function showMarkSet(check){
    showMark = check;
    if(check){
        for(let i = 0; i < 64; i++) setMark(i);
        missLimitNumber = 0;
        $missLimitSet.parentElement.style.display = "none";
    }else{
        for(let i = 0; i < 64; i++) deleteMark(i);
        $missLimitSet.parentElement.style.display = "block";
        if($missLimitSet.value) missLimitNumber = $missLimitSet.value;
    }
}
function changeColor(color){
    if(!(color == "#ffffff" || color == "#000000")){
        $othelloBoard.style.backgroundColor = color;
    }
}
function missLimit(element, number){
    if(number == 0){
        element.value = "";
    }
    missLimitNumber = number;
}
function showGameInfo(){
    if(turn == -1){
        $showTurn.innerText = "黒のターン";
    }else if(turn == 1){
        $showTurn.innerText = "白のターン";
    }
    const blackTiles = cell.filter(function(color){
        if(color == -1) return true;
        return false;
    }).length;
    const whiteTiles = cell.filter(function(color){
        if(color == 1) return true;
        return false;
    }).length;
    $showBlackTilesNumber.innerText = blackTiles;
    $showWhiteTilesNumber.innerText = whiteTiles;
}
function setHistory(black, white){
    let history = new Object();
    const createShowHistory = document.createElement("div");
    createShowHistory.classList.add("showHistory");
    let winner;
    if(black > white){
        winner = "黒の勝ち";
    }else if(black == white){
        winner = "引き分け";
    }else{
        winner = "白の勝ち"; 
    }
    const createShowHistoryWinner = document.createElement("p");
    createShowHistoryWinner.classList.add("historyWinner");
    createShowHistoryWinner.innerText = winner;
    createShowHistory.appendChild(createShowHistoryWinner);
    history.winner = winner;
    if($blackPlayerName.value == ""){
        $blackPlayerName.value = "player1";
    }
    if($whitePlayerName.value == ""){
        $whitePlayerName.value = "player2";
    }
    const playerNames = $blackPlayerName.value + " VS " + $whitePlayerName.value;
    const createShowHistoryNames = document.createElement("p");
    createShowHistoryNames.classList.add("historyNames");
    createShowHistoryNames.innerText = playerNames;
    if($setPlayerName.checked){
        createShowHistory.appendChild(createShowHistoryNames);
        history.names = playerNames;
    }
    const createShowHistoryColor = document.createElement("p");
    createShowHistoryColor.classList.add("historyColor");
    createShowHistoryColor.innerText = "黒 : 白";
    createShowHistory.appendChild(createShowHistoryColor);
    const tiles = black + " : " + white;
    const createShowHistoryTiles = document.createElement("p");
    createShowHistoryTiles.classList.add("historyTiles");
    createShowHistoryTiles.innerText = tiles;
    createShowHistory.appendChild(createShowHistoryTiles);
    history.tiles = tiles;
    const date = new Date();
    const now = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const createShowHistoryDate = document.createElement("p");
    createShowHistoryDate.classList.add("historyDate");
    createShowHistoryDate.innerText = now;
    createShowHistory.appendChild(createShowHistoryDate);
    history.date = now;
    $historyMenu.insertBefore(createShowHistory, $historyTitle.nextSibling);
    histories.push(history);
    if(window.localStorage){
        localStorage.removeItem("othelloHistory");
        let historiesJson = JSON.stringify(histories, undefined, 1);
        localStorage.setItem("othelloHistory", historiesJson);
    }
}
function readAndSetHistories(){
    if(window.localStorage && !(localStorage.getItem("othelloHistory") === null)){
        let historiesJson = localStorage.getItem("othelloHistory");
        histories = JSON.parse(historiesJson);
        for(let i = 0; i < histories.length; i++){
            const createShowHistory = document.createElement("div");
            createShowHistory.classList.add("showHistory");
            const createShowHistoryWinner = document.createElement("p");
            createShowHistoryWinner.classList.add("historyWinner");
            createShowHistoryWinner.innerText = histories[i].winner;
            createShowHistory.appendChild(createShowHistoryWinner);
            if(histories[i].names){
                const createShowHistoryNames = document.createElement("p");
                createShowHistoryNames.classList.add("historyNames");
                createShowHistoryNames.innerText = histories[i].names;
                createShowHistory.appendChild(createShowHistoryNames);
            }
            const createShowHistoryColor = document.createElement("p");
            createShowHistoryColor.classList.add("historyColor");
            createShowHistoryColor.innerText = "黒 : 白";
            createShowHistory.appendChild(createShowHistoryColor);
            const createShowHistoryTiles = document.createElement("p");
            createShowHistoryTiles.classList.add("historyTiles");
            createShowHistoryTiles.innerText = histories[i].tiles;
            createShowHistory.appendChild(createShowHistoryTiles);
            const createShowHistoryDate = document.createElement("p");
            createShowHistoryDate.classList.add("historyDate");
            createShowHistoryDate.innerText = histories[i].date;
            createShowHistory.appendChild(createShowHistoryDate);
            $historyMenu.insertBefore(createShowHistory, $historyTitle.nextSibling);
        }
    }
}
function deleteHistories(){
    localStorage.removeItem("othelloHistory");
    const $histories = document.getElementsByClassName("showHistory");
    console.log($histories.length);
    let i = 0;
    while(i < $histories.length){
        $histories[i].remove();
        console.log("delete");
    }
}

window.onload = function(){
    for(let j = 0; j < 64; j++){
        $tile[j].addEventListener("click", function(){
            play($tile.indexOf(this));
        });
    }
    readAndSetHistories();
    $gameStartButton.addEventListener("click", function(){
        start();
        $settingInput.checked = false;
        this.innerText = "最初からやり直す";
    });
}
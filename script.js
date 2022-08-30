const $othelloBoard = document.getElementById("OthelloBoard");
const $guide = document.getElementById("guide");
const $result = document.getElementById("result");
const $winner = document.getElementById("winner");
const $whiteTilesNumber = document.getElementById("whiteTilesNumber");
const $blackTilesNumber = document.getElementById("blackTilesNumber");
const $settingInput = document.getElementById("settingInput");
const $gameStartButton = document.getElementById("gameStartButton");
const $tiles = document.getElementsByClassName("tiles");
const $tile = [].slice.call($tiles);
let cell = new Array(64);
let installation = new Array(64);
let flipOver = new Array(64);
let turn = 0;
let thin;
let del;

function start(){
    for(let i = 0; i < 64; i++){
        putTile(i, 0);
        flipOver[i] = new Array();
        flipOver[i].length = 0;
        installation[i] = false;
    }
    $result.style.top = "-150px";
    putTile(27, -1);
    putTile(28, 1);
    putTile(35, 1);
    putTile(36, -1);
    turn = 1;
    for(let i = 0; i < 64; i++) judge(i, turn);
    showMessage("白のターン", "white", 2000);
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
function endMotion(){
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
            for(let m = 0; m < 64; m++) judge(m, turn);
            if(!installation.includes(true)){
                showMessage("パス", "white", 2000);
                turn *= -1;
                for(let m = 0; m < 64; m++) judge(m, turn);
                if(!installation.includes(true)){
                    showMessage("パス", "white", 2000);
                    setTimeout(endMotion(),2000);
                }
            }
            switch(turn){
                case 1:
                    showMessage("白のターン", "white", 2000);
                    break;
                case -1:
                    showMessage("黒のターン", "black", 2000);
                    break;
            }
        }
    }
}

window.onload = function(){
    for(let j = 0; j < 64; j++){
        $tile[j].addEventListener("click", function(){
            play($tile.indexOf(this));
        });
    }
    $gameStartButton.addEventListener("click", function(){
        start();
        $settingInput.checked = false;
        this.innerText = "最初からやり直す";
    });
}
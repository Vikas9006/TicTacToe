// Variables and constants
let player1Arr = [];
let player2Arr = [];
let IsTurnOfPlayer1 = true;
const winArr = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let winningElements = [];
const player1Music = new Audio('music/Ding.mp3');
const player2Music = new Audio('music/Gun cockback.mp3');

// Functions

function IsContain(subArr,Arr){
    let result = subArr.every(function(val) {
        return Arr.indexOf(val) >= 0;
    });
    return result;
}

function IsContainArr(arrOfSubArr,Arr){
    let resultArr = [];
    for (let i = 0; i < 8 ; i++) {
        resultArr.push(IsContain(arrOfSubArr[i],Arr)); 
    }
    let j = 0;
    let myBool = false;
    while (j < 8) {
        if (resultArr[j]) {
           myBool = true;
           winningElements = arrOfSubArr[j];
           console.log(winningElements);
           break;
        }
        j++;
    }
    return myBool;
}

function isDraw(arr){
    let check = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].innerHTML == "") {
            check = false;
            break;
        }
    }
    return check;
}

let board = document.getElementById('board');
let term = document.getElementById('term');
let cellArr = document.getElementsByClassName('cell');
for (let i = 0; i < cellArr.length; i++) {
    cellArr[i].addEventListener('click',function run(){
        if (cellArr[i].innerHTML == "") {
            if (IsTurnOfPlayer1) {
                cellArr[i].innerHTML = "X";
                // console.log("X Printed");
                player1Arr.push(i+1);
                player1Arr = player1Arr.sort(function(a, b){return a - b});
                player1Music.play();
                IsTurnOfPlayer1 = false;
                term.innerHTML = "Player 2, This is your turn";
                if (player1Arr.length >= 3) {
                    if (IsContainArr(winArr,player1Arr)) {
                        setTimeout(() => {
                            alert("Player 1 won the match");
                            for (let i = 0; i < cellArr.length; i++) {
                                cellArr[i].innerHTML = "";
                            }
                        }, 100);
                        let winLine = document.createElement('div');
                        winLine.classList.add('winningLine');
                        player1Arr = [];
                        player2Arr = [];
                        IsTurnOfPlayer1 = true;
                        term.innerHTML = "Player 1, This is your turn";
                    }
                }
                if (isDraw(cellArr)) {
                    setTimeout(() => {
                        alert("Match is Drawn");
                        for (let i = 0; i < cellArr.length; i++) {
                            cellArr[i].innerHTML = "";
                        }
                    }, 100);
                    player1Arr = [];
                    player2Arr = [];
                    IsTurnOfPlayer1 = true;
                    term.innerHTML = "Player 1, This is your turn";
                }
            } else {
                cellArr[i].innerHTML = "O";
                player2Arr.push(i+1);
                player2Arr = player2Arr.sort(function(a, b){return a - b});
                player2Music.play();
                IsTurnOfPlayer1 = true;
                term.innerHTML = "Player 1, This is your turn";
                if (player2Arr.length >= 3) {
                    if (IsContainArr(winArr,player2Arr)) {

                        setTimeout(() => {
                            alert("Player 2 won the match");
                            for (let i = 0; i < cellArr.length; i++) {
                                cellArr[i].innerHTML = "";
                            }
                        }, 100);
                        player1Arr = [];
                        player2Arr = [];
                        IsTurnOfPlayer1 = true;
                        term.innerHTML = "Player 1, This is your turn";
                    }
                }
            }
        }
    });
}
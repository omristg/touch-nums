'use strict'

var gRowNum;
var gNums = [];
var gCorrectNums = [];
var gIntervalId;
var gDeciSeconds;
var gSeconds;
var gMinutes;
var gElTimer = document.querySelector('.timer');


function init(rowNum = 4) {
    gRowNum = rowNum;
    createNums();
    renderBoard();
    document.querySelector('.reset-menu').style.display = 'none';
    gDeciSeconds = 0;
    gSeconds = 0;
    gMinutes = 0;
}


function createNums() {
    for (var i = 1; i <= (gRowNum * gRowNum); i++) {
        gNums.push(i);
    }
    gCorrectNums = gNums.slice();
}


function renderBoard() {
    var strHTML = '';
    
    for (var i = 0; i < gRowNum; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gRowNum; j++) {
            var currRandNum = drawNum();
            strHTML += `<td onclick="cellClicked(this,${currRandNum})"
            >${currRandNum}</td>`
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML;
}


function cellClicked(elClickedCell, elClickedNum) {
    
    var correctNum = gCorrectNums[0];
    console.log(elClickedCell);
    if (elClickedNum === correctNum && correctNum === 1) {
        gIntervalId = setInterval(runTimer, 10);
        document.querySelector('.timer').style.display = 'block';
    }
    if (elClickedNum === correctNum) {
        gCorrectNums.shift();
        elClickedCell.style.backgroundColor = 'orange';
        elClickedCell.style.color = 'white';
    }
    if (gCorrectNums.length === 0) {
        victory();
    }
}


function runTimer() {
    
    if (!(gMinutes > 0)) gElTimer.innerHTML = `${gSeconds}:${gDeciSeconds}`;
    else gElTimer.innerHTML = `${gMinutes}:${gSeconds}:${gDeciSeconds}`
    
    if (gDeciSeconds >= 99) {
        gDeciSeconds = 0;
        gSeconds++;
    } else {
        gDeciSeconds++;
    }
    if (gSeconds > 59) {
        gMinutes++;
        gSeconds = 0;
        console.log('hi');
    }
}


function victory() {
    var elResetMenu = document.querySelector('.reset-menu');
    elResetMenu.innerHTML += `Your timing score is ${gElTimer.innerText}`
    clearInterval(gIntervalId);
    elResetMenu.style.display = '';
    gElTimer.style.display = 'none'
}




// Utilities///////////////////////////////////////////////////////////

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1);
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

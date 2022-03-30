document.querySelector('#together').addEventListener('click',gameTogether);
document.querySelector('#computer').addEventListener('click',function (){
    computerPlays();
    gameTogether();
});

let vis = 'visible';
let clone = null;
let player = 'X';
let count = 0;
let playComp = false;
const victory = document.querySelector('#victory');

function computerPlays(){
    playComp = !playComp;
}

function gameTogether() {
    visibleHiddenMenu();
    clone = document.querySelector('#field').cloneNode(true);
    victory.textContent = 'Ходит X';
    let cells = document.querySelectorAll('#field td');
    for (let cell of cells){
        cell.addEventListener('click',function game() {

            cell.textContent = player;
            if (isVictory(cells)){
                if (player === 'X'){
                    victory.textContent = 'Победил первый игрок';
                    clearCell(cells);
                    visibleHiddenMenu();
                }
                else {
                    victory.textContent = 'Победил второй игрок';
                    clearCell(cells);
                    visibleHiddenMenu();
                }
            }
            if (count === 8){
                victory.textContent = 'Ничья';
                clearCell(cells);
                visibleHiddenMenu();
            }
            count++;
            changePlayer();

            if (player === 'O' && playComp){
                computerRunning(cells);
            }
            cell.removeEventListener('click',game);
        })
    }
}

function computerRunning(cells){
    let randClick = randCell(cells);
    cells[randClick].click();
}

function randCell(cells){
    let rand = 0;
    for (let i = 0; i < 8; i++){
        rand = Math.floor(Math.random() * cells.length);
        if (cells[rand].textContent === ''){
            return rand;
        }
    }
}
function changePlayer(){
    if (count > 0){
        player = player === 'X' ? 'O' : 'X';
        victory.textContent = 'Ходит ' + player;
    }
}

function clearCell(){
    player = 'X';
    count = -1;
    playComp = false;
    document.querySelector('#field').replaceWith(clone);
}

function isVictory(cells) {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let comb of combs) {
        if (
            cells[comb[0]].innerHTML === cells[comb[1]].innerHTML &&
            cells[comb[1]].innerHTML === cells[comb[2]].innerHTML &&
            cells[comb[0]].innerHTML !== ''
        ) {
            return true;
        }
    }
    return false;
}

function visibleHiddenMenu(){
    let menu = document.querySelector('.menu');
    let field = document.querySelector('.field');

    if (vis === 'visible') {
        menu.style.visibility = 'hidden';
        field.style.visibility = 'visible';
        vis = 'hidden';
    }   else {
        menu.style.visibility = 'visible';
        field.style.visibility = 'hidden';
        vis = 'visible'
    }


}
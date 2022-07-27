let circle;
const winCombination=[
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    ["3","5","7"],
    ["1","5","9"],
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"]
];
function draw(turn){
    let resalt;
    let OandX = ["O","X"];
    return resalt = (turn === circle? OandX[0]:OandX[1]);
}

function handleClick(e){
    const cell = e.target;
    const turn = !circle? circle:!circle;
    const currentTurn = draw(turn)
    placeMark(cell,currentTurn);
    circle = !circle;
    checkWinner(cell,currentTurn);
    console.log(checkWinner(cell,currentTurn));
}

function placeMark(cell,resalt){
    cell.innerHTML = resalt;
}

function checkWinner(cell,currentTurn){
    const combination =[];
    const arr = Array.from(winCombination);
    const wrapCells = cell.parentNode.children;
    for(let i = 0; i < 8; i++){
        if(wrapCells[i].innerHTML === currentTurn){
            let found = wrapCells[i].dataset.item;
            combination.push(found);
        }
    }
    console.log(combination.every());

    return check(winCombination,["1","2","3"]);
}
function check(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal;
    });
}
function checkWin(){
    return winCombination.some(combination =>{
        return combination.every
    })
}

const blockElement = document.querySelectorAll(".block");
//main event listener
const main=(()=>{
    const wrapDiv = document.getElementById("wrap");
    
    for(let i = 0; i < wrapDiv.childElementCount; i++){
        var id = wrapDiv.children[i].getAttribute("id");
        wrapDiv.children[i].style = "grid-area : "+id;
        wrapDiv.children[i].addEventListener("click",handleClick,{ once:true});
    };
})();

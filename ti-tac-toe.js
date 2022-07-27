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
    if(checkWinner(cell,currentTurn)) console.log(`${currentTurn} win!!!`);
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
    return arrayEquals(combination,winCombination);

}
function arrayEquals(a, b) {
    for(let i = 0; i < b.length; i++){
        if(Array.isArray(a) && Array.isArray(b[i]) && a.length === b[i].length){
           if(a.every((val, index) => val === b[i][index])) return true;
        }      
    }
    return false;
  };

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

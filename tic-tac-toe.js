let circle;

function draw(turn){
    let OandX = ["O","X"];
    return resalt = (turn === circle? OandX[0]:OandX[1]);
}
function swapTurn(){
    return circle = !circle;
}
function CurrentTurn(){
    const turn = !circle? circle:!circle;
    return draw(turn);
}
//basic AI
function basicAi(cell,currentTurn){
    const emptyCell = [...cell.parentNode.children].filter(cell=>{
        return cell.innerHTML === "";
    })
    console.log(emptyCell[0]);
    const rand = Math.floor(Math.random()*emptyCell.length);
    let next = emptyCell[rand];
    placeMark(next,currentTurn);
    swapTurn();
}
//best AI
function bestAi(cell,currentTurn){
    const emptyCell = [...cell.parentNode.children].filter(cell=>{
        return cell.innerHTML === "";
    })
    const allCell = [...cell.parentNode.children];
    let nextIndex = bestspot(cell,currentTurn);
    let next = allCell[nextIndex];
    placeMark(next,currentTurn);
    swapTurn();
}
function bestspot(cell,currentTurn){
    let arr = [...cell.parentNode.children].map(cell=>{return cell.innerHTML;})
    return minmax(arr,currentTurn).index;
}
function minmax(cell,player){
    let huPlayer = "X";
    let aiPlayer = "O";
    let emptyIndex = cell.map((cell,index)=>cell===""?index:"").filter(String);
    if(combiCheckForAi(cell,aiPlayer)) {
      return{ score: 10 };
    }; 
    if(combiCheckForAi(cell,huPlayer))  { 
      return{ score: -10 }; 
    };
    if(emptyIndex.length === 0)  { 
      return{ score: 0 };  
    };
    var moves = [];
    for(let i = 0; i < emptyIndex.length; i++){
        let move = {};
        move.index = emptyIndex[i];
        cell[emptyIndex[i]] = player;
        if(player === aiPlayer){
            let result = minmax(cell,huPlayer);
            move.score = result.score;
        }
        else{
            let result = minmax(cell,aiPlayer);
            move.score = result.score;
        }
        cell[emptyIndex[i]] = "";
        moves.push(move);
    }
    var bestMove;
      if(player === aiPlayer) {
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
    return moves[bestMove];
}
function combiCheckForAi(arr,currentTurn) {
    const array = arr.map((cell,index)=>cell===currentTurn?(index+1).toString():"").filter(String);
    //check diagonal
    if((array.includes("1")&&array.includes("5")&&array.includes("9"))
       ||(array.includes("3")&&array.includes("5")&&array.includes("7"))) return true;
    //check row
    if((array.includes("1")&&array.includes("2")&&array.includes("3"))
    ||(array.includes("4")&&array.includes("5")&&array.includes("6"))
    ||(array.includes("7")&&array.includes("8")&&array.includes("9"))) return true;
    //check column
    if((array.includes("1")&&array.includes("4")&&array.includes("7"))
    ||(array.includes("2")&&array.includes("5")&&array.includes("8"))
    ||(array.includes("3")&&array.includes("6")&&array.includes("9"))) return true;
    //none
    return false;
};
// handle
function handleClick(e){
    const cell = e.target;
    let currentTurn = CurrentTurn();
    const winDiv = document.getElementById("winner");
    if(cell.innerHTML != "") return;
    placeMark(cell,currentTurn);

    swapTurn();
    //console.log( [...document.getElementById("wrap").children].map( cell =>{return cell.innerHTML;}));
    if(!isDraw(cell) && !checkWinner(cell,currentTurn)){
        currentTurn = CurrentTurn();  
        if(active['Basic']) basicAi(cell,currentTurn);
        if(active['Best']) bestAi(cell,currentTurn);
    } 
    
    if(isDraw(cell) || checkWinner(cell,currentTurn)) {
        if(isDraw(cell)) winDiv.children[0].innerHTML = `Draw !!!`;
        if(checkWinner(cell,currentTurn)) winDiv.children[0].innerHTML = `${currentTurn} win !!!`;
        winDiv.style.display = "flex";
        winDiv.addEventListener("click",()=> window.location.reload());
    }
}
function placeMark(cell,currentTurn){
    cell.innerHTML = currentTurn;
}
function checkWinner(cell,currentTurn){
    const combination =[];
    const wrapCells = cell.parentNode.children;
    for(let i = 0; i < 9; i++){
        if(wrapCells[i].innerHTML === currentTurn){
            let found = wrapCells[i].dataset.item;
            combination.push(found);
        }
    }
    return combiCheck(combination);
}
function combiCheck(arr) {
    const array = arr;
    //check diagonal
    if((array.includes("1")&&array.includes("5")&&array.includes("9"))
       ||(array.includes("3")&&array.includes("5")&&array.includes("7"))) return true;
    //check row
    if((array.includes("1")&&array.includes("2")&&array.includes("3"))
    ||(array.includes("4")&&array.includes("5")&&array.includes("6"))
    ||(array.includes("7")&&array.includes("8")&&array.includes("9"))) return true;
    //check column
    if((array.includes("1")&&array.includes("4")&&array.includes("7"))
    ||(array.includes("2")&&array.includes("5")&&array.includes("8"))
    ||(array.includes("3")&&array.includes("6")&&array.includes("9"))) return true;
    //none
    return false;
};

function isDraw(cell){
    return [...cell.parentNode.children].every(cell =>{
        return cell.innerHTML !="";
    });
}
let active = {
    Player:false,
    Basic:false,
    Best:false
};
// ai select
function aihandle(e){
    const btn = e.target;
    const liBtn = btn.parentNode.querySelectorAll("li");
    if(btn.nodeName.match("LI")) {
        for(let el in blockElement){
            if(el.match(/\d/)){
                console.log(blockElement[el]);
                blockElement[el].innerHTML = "";
            }
        }

        const select = btn.id;
        active = {
            Player:false,
            Basic:false,
            Best:false
        };
        for(let i = 0; i < liBtn.length; i++){
            liBtn[i].classList.remove("active");
        }
        if(select === "Player"){
            btn.classList.add("active");
            active.Player = true;
            return active;
        } 
        if(select === "Basic"){
            btn.classList.add("active");
            active.Basic = true;
            return active;
        } 
        if(select === "Best"){
            btn.classList.add("active");
            active.Best = true;
            return active;
        } 
    };
}
const blockElement = document.querySelectorAll(".block");
//main event listener
const main=(()=>{
    const wrapDiv = document.getElementById("wrap");
    const aiSelectBtn = document.getElementById("aiSelect");
    for(let i = 0; i < wrapDiv.childElementCount; i++){
        var id = wrapDiv.children[i].getAttribute("id");
        wrapDiv.children[i].style = "grid-area : "+id;
        wrapDiv.children[i].addEventListener("click",handleClick);
    };
    aiSelectBtn.addEventListener("click",aihandle)
})();
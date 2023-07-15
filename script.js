const getCells = document.getElementsByClassName("inner-box");
const restart = document.getElementById("reload");
const playerTurn=document.getElementById('turn');
const blackBg=document.getElementsByClassName('black-bg');
let turn='x';
let steps=0;
let board=[
    [0,1,2],
    [3,4,5],
    [6,7,8]
]
let xCount = 0;
let oCount = 0;
let tieCount = 0;
const scores=document.getElementsByClassName('sub-score');
const winningScreen=document.getElementById('winning-screen');
const quitButton=document.getElementsByClassName('quit');
const NextRoundButton=document.getElementsByClassName('next-round');
const text=document.getElementsByClassName('text');
const roundWinner=document.getElementsByClassName('round-winner');
let rowIndex,colIndex;
quitButton[0].onclick=function(){
    window.location.reload();
}
function NextRound(){
    board=[
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ]
    steps=0;
    turn='x';
    for(let m of getCells){
        m.innerHTML="";
        m.style.backgroundColor="#2c5364";
    }
    blackBg[0].style.display='none';
    winningScreen.classList.add("animate__rollOut")
    setTimeout(function(){
        winningScreen.classList.remove("animate__rollOut");
        winningScreen.style.display="none";
    },1000);
}

function MatchResult(arr){
    blackBg[0].style.display='block';
    if(arr.length==0){
        tieCount++;
        text[0].innerHTML="match tied!";
        roundWinner[0].innerHTML="";
    }
    else if(turn=='x'){
        xCount++;
        text[0].innerHTML="you won!";
        roundWinner[0].style.color="#31C3BD";
        roundWinner[0].innerHTML='<img src="./images/icon-x.svg"> <span> takes the round</span>';
    }
    else if(turn=='o'){
        oCount++;
        text[0].innerHTML="you lost!";
        roundWinner[0].innerHTML='<img src="./images/icon-o.svg"> <span> takes the round</span>';
        roundWinner[0].style.color="#F2B137";
    }
    for(let m of arr){
        if(turn=='x'){
            getCells[m].innerHTML='<img class="fa-beat-fade" src="./images/icon-x-transparent.svg">';
            getCells[m].style.backgroundColor="#31C3BD";
        }
        else{    
            getCells[m].innerHTML='<img class="fa-beat-fade" src="./images/icon-o-transparent.svg">';
            getCells[m].style.backgroundColor="#F2B137";
        }
    }    
    scores[0].innerHTML=xCount;
    scores[1].innerHTML=tieCount;
    scores[2].innerHTML=oCount;
    winningScreen.style.display="flex";
    NextRoundButton[0].onclick=NextRound;
}

function checkWin(){
    for(k=0;k<3;k++){
        let tempCheck=true;
        for(l=0;l<2;l++){
            if(board[k][l]!=board[k][l+1]){
                tempCheck=false;
            }
        }
        if(tempCheck==true){
            let arr=[(3*k),(3*k)+1,(3*k)+2 ];
            MatchResult(arr);         
            return true;
        }
    }
    for(l=0;l<3;l++){
        let tempCheck=true;
        for(k=0;k<2;k++){
            if(board[k+1][l]!=board[k][l]){
                tempCheck=false;
            }
        }
        if(tempCheck==true){
            let arr=[(l),(3+l),(6+l)];
            MatchResult(arr);         
            return true;
        }
    }
    if(board[0][0]==board[1][1] && board[1][1]==board[2][2]){
        let arr=[0,4,8];
        MatchResult(arr);
        return true;
    }
    if(board[2][0]==board[1][1] && board[1][1]==board[0][2]){
        let arr=[2,4,6];
        MatchResult(arr);
        return true;
    }
    if(steps==9){
        let arr=[];
        MatchResult(arr);
    }
    return false;

}

restart.onclick=function(){
    window.location.reload();
};
for(let i of getCells){
    let row=i.getAttribute('row');
    let col=i.getAttribute('col');
    i.addEventListener('mouseenter', function(){
        if(board[row][col]!='x' && board[row][col]!='o'){
            if(turn=='x'){
                i.innerHTML='<img class="fa-beat-fade" src="./images/icon-x-outline.svg">';
            }
            else{
                i.innerHTML='<img class="fa-beat-fade" src="./images/icon-o-outline.svg">';
            }
        }
    });
    i.addEventListener('mouseleave',function(){
        if(board[row][col]!='x' && board[row][col]!='o'){
            i.innerHTML="";
        }
    })

    let gameOver=false;
    i.addEventListener('click',function(){
        if(turn=='x'){
            steps++;
            if(board[row][col]!='x' && board[row][col]!='o'){
                i.innerHTML='<img class="animate__animated animate__bounceIn" src="./images/icon-x.svg">';
                board[row][col]='x';
                if(steps>3){
                    gameOver=checkWin();
                }
                playerTurn.innerHTML='<img class="animate__animated animate__headShake" src="./images/icon-o.svg" height=24px> Turn';
            }
            turn='o';
            steps++;
            if(gameOver==false){
                let delayedPlacement=setTimeout(function(){
                    rowIndex=Math.floor(Math.random()*3);
                    colIndex=Math.floor(Math.random()*3);
                    while((board[rowIndex][colIndex]=='x' || board[rowIndex][colIndex]=='o') && steps<9){
                        rowIndex=Math.floor(Math.random()*3);
                        colIndex=Math.floor(Math.random()*3);
                    }
                    console.log(rowIndex,colIndex,steps);
                    getCells[(3*rowIndex)+colIndex].innerHTML='<img class="animate__animated animate__bounceIn" src="./images/icon-o.svg">';
                    // i.innerHTML='<img class="animate__animated animate__bounceIn" src="./images/icon-o.svg">';
                    board[rowIndex][colIndex]='o';
                    if(steps>3){
                        checkWin();
                    }
                    playerTurn.innerHTML='<img class="animate__animated animate__headShake" src="./images/icon-x.svg" height=24px> Turn';
                    turn='x';
                },700);
            }
        }

    });
}








// const getCells = document.getElementsByClassName("inner-box");
// const restart = document.getElementById("reload");
// const playerTurn=document.getElementById('turn');
// // playerTurn.innerHTML='<i id="o" class="fa-solid fa-o fa-beat-fade"></i>'+"turn";
// let turn='x';
// let steps=0;
// let board=[
//     [0,1,2],
//     [3,4,5],
//     [6,7,8]
// ]
// const winningScreen=document.getElementById('winning-screen');
// const quitButton=document.getElementsByClassName('quit');
// const NextRoundButton=document.getElementsByClassName('next-round');
// const text=document.getElementsByClassName('text');
// const roundWinner=document.getElementsByClassName('round-winner');
// quitButton[0].onclick=function(){
//     window.location.reload();
// }
// function NextRound(){
//     board=[
//         [0,1,2],
//         [3,4,5],
//         [6,7,8]
//     ]
//     steps=0;
//     turn='x';
//     for(let m of getCells){
//         m.innerHTML="";
//         m.style.backgroundColor="#2c5364";
//     }
//     winningScreen.classList.add("animate__rollOut")
//     setTimeout(function(){
//         winningScreen.classList.remove("animate__rollOut");
//         winningScreen.style.display="none";
//     },1000);
// }

// function MatchResult(arr){
//     if(arr.length==0){
//         text[0].innerHTML="match tied!";
//         roundWinner[0].innerHTML="";
//     }
//     if(turn=='x'){
//         text[0].innerHTML="you won!";
//         roundWinner[0].style.color="#31C3BD";
//         roundWinner[0].innerHTML='<img src="./images/icon-x.svg"> <span> takes the round</span>';
//     }
//     if(turn=='o'){
//         text[0].innerHTML="you won!";
//         roundWinner[0].innerHTML='<img src="./images/icon-o.svg"> <span> takes the round</span>';
//         roundWinner[0].style.color="#F2B137";
//     }
//     for(let m of arr){
//         if(turn=='x'){
//             getCells[m].innerHTML='<img class="fa-beat-fade" src="./images/icon-x-transparent.svg">';
//             getCells[m].style.backgroundColor="#31C3BD";
//         }
//         else{    
//             getCells[m].innerHTML='<img class="fa-beat-fade" src="./images/icon-o-transparent.svg">';
//             getCells[m].style.backgroundColor="#F2B137";
//         }
//     }    
//     winningScreen.style.display="flex";
//     NextRoundButton[0].onclick=NextRound;
// }

// function checkWin(){
//     for(k=0;k<3;k++){
//         let tempCheck=true;
//         for(l=0;l<2;l++){
//             if(board[k][l]!=board[k][l+1]){
//                 tempCheck=false;
//             }
//         }
//         if(tempCheck==true){
//             let arr=[(3*k),(3*k)+1,(3*k)+2 ];
//             MatchResult(arr);         
//             return true;
//         }
//     }
//     for(l=0;l<3;l++){
//         let tempCheck=true;
//         for(k=0;k<2;k++){
//             if(board[k+1][l]!=board[k][l]){
//                 tempCheck=false;
//             }
//         }
//         if(tempCheck==true){
//             let arr=[(l),(3+l),(6+l)];
//             MatchResult(arr);         
//             return true;
//         }
//     }
//     if(board[0][0]==board[1][1] && board[1][1]==board[2][2]){
//         let arr=[0,4,8];
//         MatchResult(arr);
//         return true;
//     }
//     if(board[2][0]==board[1][1] && board[1][1]==board[0][2]){
//         let arr=[2,4,6];
//         MatchResult(arr);
//         return true;
//     }
//     // if(steps==8){
//     //     MatchResult([]);
//     // }
//     return false;

// }

// restart.onclick=function(){
//     window.location.reload();
// };
// for(let i of getCells){
//     let row=i.getAttribute('row');
//     let col=i.getAttribute('col');
//     i.addEventListener('mouseenter', function(){
//         if(board[row][col]!='x' && board[row][col]!='o'){
//             if(turn=='x'){
//                 i.innerHTML='<img class="fa-beat-fade" src="./images/icon-x-outline.svg">';
//             }
//             else{
//                 i.innerHTML='<img class="fa-beat-fade" src="./images/icon-o-outline.svg">';
//             }
//         }
//     });
//     i.addEventListener('mouseleave',function(){
//         if(board[row][col]!='x' && board[row][col]!='o'){
//             i.innerHTML="";
//         }
//     })

//     i.addEventListener('click',function(){
//         steps++;
//         // let row=i.getAttribute('row');
//         // let col=i.getAttribute('col');
//         console.log(row," ",col," ",board[row][col]);
//         if(turn=='x'){
//             // playerTurn.innerHTML='<i class="fa-solid fa-o fa-beat-fade"></i> Turn';
//             if(board[row][col]!='x' && board[row][col]!='o'){
//                 // playerTurn.innerHTML='<img class="fa-beat-fade" src="./images/icon-o.svg" height=24px> Turn';
//                 playerTurn.innerHTML='<img class="animate__animated animate__headShake" src="./images/icon-o.svg" height=24px> Turn';
//                 // playerTurn.innerHTML='<img class="animate__animated animate__heartBeat" src="./images/icon-o.svg" height=24px> Turn';
//                 // playerTurn.innerHTML='<img class="animate__animated animate__tada" src="./images/icon-o.svg" height=24px> Turn';
//                 // i.innerHTML='<img class="fa-beat-fade" src="./images/icon-x.svg">';
//                 i.innerHTML='<img class="animate__animated animate__bounceIn" src="./images/icon-x.svg">';
//                 board[row][col]='x';
//                 // i.innerHTML='<i class="fa-solid fa-x fa-beat-fade"></i>';
//                 // i.innerHTML='X';
//                 // i.style.backgroundColor="#6dd5ed";
//                 steps++;
//                 if(steps>4){
//                     console.log(checkWin());
//                 }
//                 turn='o';
//             }
//         }
//         else{
//             // playerTurn.innerHTML='<i class="fa-solid fa-x fa-beat-fade"></i> Turn';
//             if(board[row][col]!='x' && board[row][col]!='o'){
//                 // playerTurn.innerHTML='<img class="fa-beat-fade" src="./images/icon-x.svg" height=24px> Turn';
//                 playerTurn.innerHTML='<img class="animate__animated animate__headShake" src="./images/icon-x.svg" height=24px> Turn';
//                 // playerTurn.innerHTML='<img class="animate__animated animate__heartBeat" src="./images/icon-x.svg" height=24px> Turn';
//                 // playerTurn.innerHTML='<img class="animate__animated animate__tada" src="./images/icon-x.svg" height=24px> Turn';
//                 board[row][col]='o';
//                 // i.innerHTML='<i class="fa-solid fa-o fa-beat-fade" style="color:#f5af19;" ></i>';
//                 i.innerHTML='<img class="animate__animated animate__bounceIn" src="./images/icon-o.svg">';
//                 steps++;
//                 if(steps>4){
//                     console.log(checkWin());
//                 }
//                 turn='x';
//             }
//         }
//     });
// }
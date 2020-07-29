/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

db*/

var scores, roundScore ,activeplayer,gameplaying;
init();
 document.querySelector('.btn-roll').addEventListener('click',function(){
  
  if(gameplaying){
   //1 Generate Random number
    var dice = Math.floor(Math.random() * 6) +1;
    console.log(dice);
   //2 display result
       var dom = document.querySelector('.dice');
      dom.style.display = 'block';
      dom.src = 'dice-' + dice + '.png';
   //3 update the score 
   if(dice!==1){
   //add score
   roundScore += dice;
   document.querySelector('#current-' +activeplayer).textContent = roundScore;
   }
   else{
      //next player turn
      setTimeout(() => { nextplayer(); }, 900);
   }
  }
});

//hold button:
document.querySelector('.btn-hold').addEventListener('click', function() {
if(gameplaying){
   //add current score to global score
scores[activeplayer] = scores[activeplayer] + roundScore;
//update the UI
document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];

//check if the player won the game
if(scores[activeplayer] >=20){
   document.querySelector('#name-' + activeplayer).textContent = 'Winner';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
  gameplaying = false;
}else{
   nextplayer();
   }

}

});

function nextplayer(){
   activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
   roundScore = 0;
   
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
     
   document.querySelector('.dice').style.display='none';
   
   if(activeplayer == 1){                                     //CPU's turn automatically played
      var dice = Math.floor(Math.random() * 6) +1;
      console.log(dice);
   
      var dom = document.querySelector('.dice');
      dom.style.display = 'block';
      dom.src = 'dice-' + dice + '.png';
   
      if(dice!==1){
        roundScore += dice;
        document.querySelector('#current-' +activeplayer).textContent = roundScore;
        scores[1] = scores[1] + roundScore;
        document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
        setTimeout(() => { checkCPU(1); }, 1500);                  //Display CPU's result and switch to player after 1.5 seconds
      }
      else{
        setTimeout(() => { nextplayer(); }, 900);
      }
      
    }
}

function checkCPU(activeplayer){                                 //check if the CPU won the game
   if(scores[activeplayer] >=20){
      document.querySelector('#name-' + activeplayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
      gameplaying = false;
   }
   else{
      nextplayer();
   }
}

document.querySelector('.btn-new').addEventListener('click',init);



function init(){
   scores = [0,0];
   roundScore = 0;
   activeplayer = 0;
   gameplaying = true;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent ='0'; 
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0' ).textContent = 'Player';
document.getElementById('name-1' ).textContent = 'CPU';   
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}

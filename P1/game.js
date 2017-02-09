//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "white";
ctx.font = GAME_FONTS;
//Konami code variables
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};
//various in-house variables necessary for game
var pos = 0;
var limit = 2;
var slain = 0;
var facing = "W";
var spawner = 2;
var inAir = "N";
//---------------
//Preloading ...
//---------------
//Preload Art Assets

var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR; 

var playerImage = new Image();
playerImage.ready = false;
playerImage.onload = setAssetReady;
playerImage.src = PATH_CHAR2;

var bossImage = new Image();
bossImage.ready = false;
bossImage.onload = setAssetReady;
bossImage.src = PATH_CHAR3;

//var wave = 1;
var roundStart = true;
function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop, currX, currY, currX2, currY2;
//var audio = new Audio('sounds/spooky.mp3');
//audio.play();

function preloading()
{	
	if (charImage.ready)
	{
		clearInterval(preloader);		
		gameloop = setInterval(update, TIME_PER_FRAME);	
		document.addEventListener("keydown",keyDownHandler, false);	
		//document.addEventListener("keyup",keyUpHandler, false);
		//document.addEventListener('keydown', konami, false);
			
	}
}

//------------
//Game Loop
//------------
//currX, currY is a reference to  the image in sprite sheet
currX = IMAGE_START_X;
currY = IMAGE_START_Y;

currX2 = IMAGE_START_X2;
currY2 = IMAGE_START_Y2;

currX3 = IMAGE_START_X3;
currY3 = IMAGE_START_Y3;

function update()
{		
	//Clear Canvas
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//Draw Image
	// sprite sheet building site:
	// 	http://charas-project.net/charas2/index.php
	updatePlayer();
	if(secret == "off"){
		drawSkeletons();	
	}
	else{
		secretBoss();
		if(bossHP <= 200){
			drawSkeletons();
		}
	}
}
//Draws the skeletons
function drawSkeletons(){
	//Skeleton spawner
	var spooky = skeleton.create();
	//Displays amount of skeletons killed
	ctx.fillStyle = "red";
	ctx.font = "30px Corsiva";
	ctx.fillText("Slain: ",10,80);
	ctx.fillText(slain,100,80);
	
	//checks to see if skeletons killed sufficent to summon boss
	if(slain >= 50 && secret == "off"){
		startBossFight();
		limit = 0;
	}
	//Populate the array with skeleton objects
	if(army.length < limit){
		army.push(spooky);
	}
	var armySize = army.length;
	for(var i = 0; i < armySize; i++){
		if(i <= armySize && army[i] != 'undefined' && bossHP > 0){
			//checks to see if skeleton is alive and which end the skeleton should spawn
			if(i % spawner == 0 && army[i].alive == '1')
				//draws skeleton
				ctx.drawImage(charImage,
							army[i].currX, army[i].currY,            // sprite upper left positino	
							army[i].CHAR_WIDTH, army[i].CHAR_HEIGHT, // size of a sprite 64 x 64
							army[i].CHAR_START_X, army[i].CHAR_START_Y,  // canvas position
							army[i].CHAR_WIDTH*1, army[i].CHAR_HEIGHT*1      // sprite size shrinkage
							);
			//checks to see if skeleton is alive and which end the skeleton should spawn						
			else if(i % spawner == 1 && army[i].alive == '1'){
				
				if(army[i].spawned == 0){
					army[i].CHAR_START_X = 0;
					army[i].currY = 704;
					army[i].direction = 1;
					army[i].spawned = 1;
				}	
				
				ctx.drawImage(charImage,
							army[i].currX, army[i].currY,            // sprite upper left positino	
							army[i].CHAR_WIDTH, army[i].CHAR_HEIGHT, // size of a sprite 64 x 64
							army[i].CHAR_START_X, army[i].CHAR_START_Y,  // canvas position
							army[i].CHAR_WIDTH*1, army[i].CHAR_HEIGHT*1      // sprite size shrinkage
							);
			}
				army[i].currX += army[i].CHAR_WIDTH;
				//Skeleton movement mechanics
				if (army[i].currX >= army[i].SPRITE_WIDTH*2)
					army[i].currX = 0;
					
				if (army[i].CHAR_START_X > 0 && army[i].direction == 0)
					army[i].CHAR_START_X -= 10;
				
				else if (army[i].CHAR_START_X < STAGE_WIDTH-64 && army[i].direction == 1)
					army[i].CHAR_START_X += 10;
				
				if (army[i].CHAR_START_X <= 0 && army[i].direction == 0){
					army[i].direction = 1;
					army[i].currY = 704;
				}
				
				if (army[i].CHAR_START_X >= STAGE_WIDTH-64 && army[i].direction == 1){
					army[i].direction = 0;
					army[i].currY = 576;
				}
			//Skeleton collision checker
			if(army[i].CHAR_START_X >= CHAR_START_X && army[i].CHAR_START_X <= CHAR_START_X + 32 && army[i].alive == 1
				&& army[i].CHAR_START_Y <= CHAR_START_Y + 34){
					HP -= 1;
				
			}
			
		}
	
	}
	
}
//update the player character/animate the player
function updatePlayer(){
	ctx.fillStyle = "red";
	ctx.font = "30px Corsiva";
	ctx.fillText("HP: ",10,50);
	if(HP > 0)
		ctx.fillText(HP,70,50);
	else	
		ctx.fillText("DEAD",70,50);

	if(HP > 0){
		ctx.drawImage(playerImage,
			currX, currY,            // sprite upper left positino	
			CHAR_WIDTH, CHAR_HEIGHT, // size of a sprite 64 x 64
			CHAR_START_X, CHAR_START_Y,  // canvas position
			CHAR_WIDTH*1, CHAR_HEIGHT*1      // sprite size shrinkage
		);
		currX += CHAR_WIDTH;
					
		if (currX >= SPRITE_WIDTH*2)
			currX = 0;
		
		//Jump mechanics/physics
		if (inAir == "Y" && facing == "E"){
			CHAR_START_Y -= 25;
			CHAR_START_X += 25;
		}
		
		if (inAir == "Y" && facing == "W"){
			CHAR_START_X -= 25;
			CHAR_START_Y -= 25;	
		}
		
		if (CHAR_START_Y < STAGE_HEIGHT-145 && inAir == "Y"){
			inAir = "N";
		}
		else if (inAir == "N" && CHAR_START_Y != STAGE_HEIGHT-64 && facing == "E"){
			CHAR_START_Y += 25;
			CHAR_START_X += 25;
		}
		
		else if (inAir == "N" && CHAR_START_Y != STAGE_HEIGHT-64 && facing == "W"){
			CHAR_START_Y += 25;
			CHAR_START_X -= 25;
		}
	}
}

//Player attack method to call other methods related
function playerAttack(){
	//Clear Canvas
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//re-draw skeletons
	
		attackAnime();
		swordDetect();
}

//Controls and draws the animation for the sword swipes
function attackAnime(){
	if(HP > 0){
		var j = 10;
		
		if(facing == "W"){
			currX2 = 781;
			currY2 = 1601;
			while (j != 0){
				ctx.drawImage(playerImage,
					currX2, currY2,            // sprite upper left positino	
					CHAR_WIDTH2, CHAR_HEIGHT2, // size of a sprite 64 x 64
					CHAR_START_X-64, CHAR_START_Y,  // canvas position
					CHAR_WIDTH2*1, CHAR_HEIGHT2*1      // sprite size shrinkage
				);
				//currX2 += 188;
				j--;
			}
		}
		
		else if(facing == "E"){
			currX2 = 841;
			currY2 = 1986;
			while (j != 0){
				ctx.drawImage(playerImage,
					currX2, currY2,            // sprite upper left positino	
					CHAR_WIDTH2, CHAR_HEIGHT2, // size of a sprite 64 x 64
					CHAR_START_X + 4, CHAR_START_Y,  // canvas position
					CHAR_WIDTH2*1, CHAR_HEIGHT2*1      // sprite size shrinkage
				);
				//currX2 += 188;
				j--;
			}
			
		}
		j = 5;
		//currX2 = 593;
		//Plays the sound for the sword attack
		var sword = new Audio('sounds/Drop Sword-SoundBible.com-768774345.mp3');
		sword.play();
	}
}

//controls the actions of the keys
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	//Jump
	if (keyPressed == "W"){		
		inAir = "Y";
		isMoving = true;
		//jump();
	}
	//Move left
	if (keyPressed == "D"){	
		facing = "E";
		isMoving = true;
		CHAR_START_X += 10;
		currY = 704;
		//updatePlayer();
	}
	
	//Move Right
	else if (keyPressed == "A"){	
		facing = "W";
		isMoving = true;
		CHAR_START_X -= 10;
		currY = 576;
		//updatePlayer();
	}
	
	//Attack/Slash with sword
	else if (keyPressed == String.fromCharCode(32)){
		if(HP > 0)
			playerAttack();
	}
	
	//Konami code input checker
	var key = allowedKeys[event.keyCode];
	var requiredKey = konamiCode[pos];
	if (key == requiredKey){
		pos += 1;
	}
	else{
		pos = 0;
	}
	//Activate the boss fight
	if(pos == konamiCode.length){
		//audio.stop();
		startBossFight();
	}
}

//Activates the boss fight
function startBossFight(){
	if(secret == "off"){	
		var audio = new Audio('sounds/secret.mp3');
			audio.play();
			secret = "on";
			HP = 100;
			//slain = 0;
			//limit = 2;
	}
}

//Collision detector for the sword/animation
function swordDetect(){
	//var armySize = army.length;
	
	//Used to attack and kill skeletons
	if(secret == "off" || bossHP < 200){
		var tempLimit = limit;
		if(army[i] != 'undefined' && CHAR_START_X != 'undefined'){
			for(var i = 0; i < tempLimit; i++){
				if(facing == "W" && army[i].CHAR_START_X > CHAR_START_X - 84 && army[i].CHAR_START_X < CHAR_START_X && army[i].alive == 1){
						army[i].alive = 0;
						slain++;
						limit += 2;
						break;
						}
				
				
				else if(facing == "E" && army[i].CHAR_START_X < CHAR_START_X + 84 && army[i].CHAR_START_X > CHAR_START_X + 9 && army[i].alive == 1){
						army[i].alive = 0;
						slain++;
						limit += 2;
						break;
				}
				
			}
		}
	}
	//Activates the ability to attack the boss 
	if(secret == "on"){
		if(facing == "W" && CHAR_START_X3 > CHAR_START_X - 84 && CHAR_START_X3 < CHAR_START_X && bossHP > 0){
					bossHP -= 10;
					}
			
			
			else if(facing == "E" && CHAR_START_X3 < CHAR_START_X + 84 && CHAR_START_X3 > CHAR_START_X + 9 && bossHP > 0){
					bossHP -= 10;
			}
	}
}

//The entire method used to animate the boss
function secretBoss(){
	//Display boss HP
	ctx.fillStyle = "blue";
	ctx.font = "30px Corsiva";
	ctx.fillText("Boss HP: ",700,50);
	if(bossHP > 0){
		ctx.fillText(bossHP,840,50);
		
		//draw boss
		ctx.drawImage(bossImage,
				currX3, currY3,            // sprite upper left positino	
				CHAR_WIDTH3, CHAR_HEIGHT3, // size of a sprite 64 x 64
				CHAR_START_X3, CHAR_START_Y3,  // canvas position
				CHAR_WIDTH3*1, CHAR_HEIGHT3*1      // sprite size shrinkage
			);
		//Animate the boss
		currX3 += CHAR_WIDTH;
					
		if (currX3 >= SPRITE_WIDTH*2)
			currX3 = 0;
		//move the boss				
		if (CHAR_START_X3 > 0 && direction == 0)
			CHAR_START_X3 -= 25;
					
		else if (CHAR_START_X3 < STAGE_WIDTH-64 && direction == 1)
			CHAR_START_X3 += 25;
				
		if ((CHAR_START_X3 <= 0 && direction == 0) || CHAR_START_X3 <= CHAR_START_X - 140 ){
			direction = 1;
			currY3 = 704;
		}
					
		if ((CHAR_START_X3 >= STAGE_WIDTH-64 && direction == 1) || CHAR_START_X3 >= CHAR_START_X + 170 ){
			direction = 0;
			currY3 = 576;
		}
		
		//Causes the boss to jump when the player does in attempt to persue
		if (CHAR_START_Y < STAGE_HEIGHT ){
			if(inAir == "Y"){
				inAirBoss = "Y";
			}
			if (inAirBoss == "Y" && direction == 0){
				CHAR_START_Y3 -= 25;
				CHAR_START_X3 += 25;
			}
			
			if (inAirBoss == "Y" && direction == 1){
				CHAR_START_X3 -= 25;
				CHAR_START_Y3 -= 25;	
			}
			
			if (CHAR_START_Y3 < STAGE_HEIGHT-145 && inAirBoss == "Y"){
				inAirBoss = "N";
			}
			else if (inAirBoss == "N" && CHAR_START_Y3 != STAGE_HEIGHT-64 && direction == 1){
				CHAR_START_Y3 += 25;
				CHAR_START_X3 += 25;
			}
			
			else if (inAirBoss == "N" && CHAR_START_Y3 != STAGE_HEIGHT-64 && direction == 0){
				CHAR_START_Y3 += 25;
				CHAR_START_X3 -= 25;
			}
			
		}
		//Boss and player collision checker			
		if(CHAR_START_X3 >= CHAR_START_X && CHAR_START_X3 <= CHAR_START_X + 32
			&& CHAR_START_Y3 <= CHAR_START_Y + 24){
				HP -= 2;
					
		}
		

	}
	else{
		//Boss defeat event/game over display
		ctx.fillText("Slain",820,50);
		ctx.fillText("Skeleton King Defeated! You win!",250,150);
		
	}
}


	
	
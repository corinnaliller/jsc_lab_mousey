// JavaScript Document
var g, gc;
var cheese = new Image();
var bug = new Image();
var mousey = new Image();
var cage = new Image();
var x, y;
var punkte = 0;
var cheeses = [];
var bugs = [];
var spielLaeuft;
var speed = 5;
var gameLoopInterval;
var disease;
window.addEventListener("keydown", welcheTaste, true);

// IE
if(document.all && !window.opera) {
	window.onload = function(){
		drawMouse();
		//randomCheese();
		initializeCheese();	
		drawCheese();
		drawBug();
	};
}
// Sonstige
else {
	mousey.onload = function(){
		init();
		initializeCheese();
		initializeBugs();
	};
	cheese.onload = function() { 
		drawCheese();
	};
	bug.onload = function() {
		drawBug();
	};
	cage.onload = function() {
		drawCage();
	};
}

mousey.src = "../images/laboratory-mouse.png";
cheese.src = "../images/cheese.png";
bug.src = "../images/laboratory-cell.png";
cage.src = "../images/cage.png";

function newGame() {
	document.getElementById("newGame").style.display = "none";
	cheeses = [];
	bugs = [];
	spielLaeuft = true;
	punkte = 0;
	x = g.width-40;
	y = g.height-40;
	initializeCheese();
	initializeBugs();
	gc.clearRect(0,0,g.width,g.height);
	drawAll();
}
function initializeCheese() {
	for (var i = 0; i < 20; i++) {
		var newX = Math.floor((Math.random()*((g.width-180)/20))+1);
		var newY = Math.floor((Math.random()*((g.height-180)/20))+1);
		cheeses.push([newX*20, newY*20]);
	}
}
function initializeBugs() {
	for (var i = 0; i < 5; i++) {
		var newX = Math.floor((Math.random()*(g.width-180))+1);
		var newY = Math.floor((Math.random()*(g.height-180))+1);
		bugs.push([newX, newY]);
	}
	gameLoopInterval = setInterval(gameLoop, 50);
}
function bugMove() {
	if (spielLaeuft) {
		for (var i = 0; i < bugs.length; i++) {
			var moveX = Math.floor((Math.random()*11)-5);
			var moveY = Math.floor((Math.random()*11)-5);
			if ((bugs[i][0]-moveX) > 0 && (bugs[i][0]+moveX) < (g.width-30) && (bugs[i][1]-moveY) > 0 && (bugs[i][1]+moveY) < (g.height-30)) {
				bugs[i][0] += moveX;
				bugs[i][1] += moveY;
			}
		}
	}
}
function gameLoop() {
	bugMove();
	drawAll();
	checkCollision();
}

function init(){
	spielLaeuft = true;
	document.getElementById("newGame").style.display = "none";
	g = document.getElementById("game");
	x = g.width-40;
	y = g.height-40;
  // Falls das Objekt unterstützt wird
	if(g.getContext){
    // Kontext
    	gc = g.getContext('2d');

    	// Bild in Kontext zeichnen
		gc.drawImage(mousey, x, y);

  	}
	else{
    // Sonstiger Code
  	}
}
function drawCheese() {
  if(g.getContext){

	  for (var i = 0; i < cheeses.length; i++) {
		  if (cheeses[i][0] > 0 && cheeses[i][1] > 0) {
			  gc.drawImage(cheese, cheeses[i][0], cheeses[i][1]);
		  }  
	  }
    
  }else{
    alert("Fehler!");
  }
}
function drawCage() {
	if(g.getContext) {
		gc.drawImage(cage,g.width-128,g.height-128);
	}
}
function drawBug() {
	if(g.getContext) {
		for(var i = 0; i < bugs.length; i++) {
			gc.drawImage(bug, bugs[i][0],bugs[i][1]);
		}
		
	}
	else {
		alert("Fehler!");
	}
}

function drawMouse() {
	if (g.getContext) {
		gc.drawImage(mousey,x,y);
	}
}

function mouseyUp() {
	if (spielLaeuft) {
		if (y > 0) {
		y -= speed;
		}
		moveMousey();
	}	
}
function mouseyDown() {
	if (spielLaeuft) {
		if (y < (g.height-32)) {
		y += speed;
		}
		moveMousey();
	}	
}
function mouseyLeft() {
	if (spielLaeuft) {
		if (x > 0) {
		x -= speed;
		}
		moveMousey();
	}
}
function mouseyRight() {
	if (spielLaeuft) {
		if (x < (g.width-32)) {
		x += speed;
		}
		moveMousey();
	}
}

function drawAll() {
	gc.clearRect(0,0,g.width,g.height);
	drawCage();
	drawCheese();
	drawBug();
	showScore();
	drawMouse();
	
}

function moveMousey() {
  if(g.getContext){
	  drawAll();	  
  }else{
    // Sonstiger Code
  }
}
function showScore() {
	gc.font = "30px Comic Sans MS";
	gc.fillStyle = "blue";
	gc.textAlign = "center";
	gc.fillText(punkte, g.width-30, 25);
}

function checkCollision() {
	for(var i = 0; i < cheeses.length; i++) {
		if (x >= (cheeses[i][0]-30) && x <= (cheeses[i][0]+20) && y >= (cheeses[i][1]-30) && y <= (cheeses[i][1]+30)) {
			cheeses[i][0] = -20;
			cheeses[i][1] = -20;
			punkte += 10;
		}
		if (i < bugs.length && x >= (bugs[i][0]-20) && x <= (bugs[i][0]+25) && y >= (bugs[i][1]-20) && y <= (bugs[i][1]+20)) {
			//alert("You ded.");
			spielLaeuft = false;
			clearInterval(gameLoopInterval);
			gameOver();
			document.getElementById("newGame").style.display = "block";
		}
	}
}
function gameOver() {
	gc.font = "60px Comic Sans MS";
	gc.fillStyle = "red";
	gc.textAlign = "center";
	gc.fillText("Game Over!", g.width/2, g.height/2);
}

function welcheTaste(evt){
	//alert(evt.keyCode);	
	
	switch (evt.keyCode){
		case 37: mouseyLeft();break;
		case 38: mouseyUp();break;
		case 39: mouseyRight();break;
		case 40: mouseyDown();break;
	}
	
}
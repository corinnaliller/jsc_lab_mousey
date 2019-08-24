// JavaScript Document
// Corinna Liller, BBM2H17M
/**
* Variablen
*/
var g, gc;
var cheese = new Image();
var greenCheese = new Image();
var bug = new Image();
var mousey = new Image();
var mouseyR = new Image();
var cage = new Image();
var med = new Image();
var taco = new Image();
var punkte, level, speed, maxBugs,maxCheese;
var cheeses = [];
var contCheese = [];
var bugs = [];
var medicine = [];
var sick, right, spielLaeuft, speedy,cheeseCollected;
var gameLoopInterval, diseaseInterval;
var myMouse, speedUp;
window.addEventListener("keydown", welcheTaste, true);

// IE
if(document.all && !window.opera) {
	window.onload = function(){
		init();
	};
}
// Sonstige
else {
	onload = function(){
		init();
	};
}
function init(){
	spielLaeuft = true;
	document.getElementById("newGame").style.display = "none";
	g = document.getElementById("game");
	cheeseCollected = 0;
	punkte = 0;
	level = 1;
	speed = 5;
	speedy = false;
	sick = false;
	maxBugs = level*level;
	maxCheese = level*5+15;
	document.getElementById("level").innerHTML=level;
	var x = g.width-40;
	var y = g.height-40;
	myMouse = new gameComponent(32,15,mousey,x,y);
	var rX = Math.floor((Math.random()*(g.width-32))+1);
	var rY = Math.floor((Math.random()*(g.height-32))+1);
	speedUp = new gameComponent(32,32,taco,rX,rY);
	if(g.getContext){
    	gc = g.getContext('2d');
  	}
	gameLoopInterval = setInterval(gameLoop, 50);
	initializeCheese();
	initializeBugs();
	drawCheese();
	drawBug();
	drawCage();
}
/*
* Bilder
*/
mousey.src = "../images/laboratory-mouse.png";
mouseyR.src = "../images/laboratory-mouse-right.png";
cheese.src = "../images/cheese.png";
bug.src = "../images/bacteria.png";
cage.src = "../images/cage.png";
greenCheese.src = "../images/cheese_green.png";
med.src = "../images/lab-flask.png";
taco.src = "../images/taco.png";

function newGame() {
	clearInterval(gameLoopInterval);
	clearInterval(diseaseInterval);
	document.getElementById("newGame").style.display = "none";
	cheeses = [];
	bugs = [];
	medicine = [];
	contCheese = [];
	sick = false;
	spielLaeuft = true;
	right = false;
	speedy = false;
	punkte = 0;
	document.getElementById("score").innerHTML = punkte;
	level = 1;
	document.getElementById("level").innerHTML = level;
	speed = 5;
	cheeseCollected = 0;
	gameLoopInterval = setInterval(gameLoop, 50);
	maxBugs = level*level;
	maxCheese = level*5+20;
	myMouse.x = g.width-40;
	myMouse.y = g.height-40;
	var rX = Math.floor((Math.random()*(g.width-32))+1);
	var rY = Math.floor((Math.random()*(g.height-32))+1);
	speedUp = new gameComponent(32,32,taco,rX,rY);
	initializeCheese();
	initializeBugs();
	gc.clearRect(0,0,g.width,g.height);
	drawAll();
}
function initializeCheese() {
	for (var i = 0; i < maxCheese; i++) {
		var there = false;
		var newX = Math.floor(Math.random()*(g.width-32));
		var newY = Math.floor(Math.random()*(g.height-32));
		for (var j = 0; j < cheeses.length; j++) {
			if (newX === cheeses[j].x && newY === cheeses[j].y) {
				there = true;
			}
		}
		if ((newX > (g.width-180) && newY > (g.height-180))|| there) {
			i--;
		}
		else {
			var cheddar = new gameComponent(32,32,cheese,newX,newY);
			cheeses.push(cheddar);
		}
		
	}
}
function initializeBugs() {
	for (var i = 0; i < maxBugs; i++) {
		var newX = Math.floor(Math.random()*(g.width-180));
		var newY = Math.floor(Math.random()*(g.height-180));
		if (newX > (g.width-180) && newY > (g.height-180)) {
			i--;
		}
		else {
			var labBug = new gameComponent(32,32,bug,newX,newY);
			bugs.push(labBug);
		}
		
	}
}
function bugMove() {
	if (spielLaeuft) {
		for (var i = 0; i < bugs.length; i++) {
			var moveLeft = Math.floor(Math.random()*2);
			var moveUp = Math.floor(Math.random()*2);
			var moveX = Math.floor((Math.random()*5)+1);
			var moveY = Math.floor((Math.random()*5)+1);
			if(moveLeft === 0) {
				if(bugs[i].x <= (g.width-moveX)) {
					bugs[i].x += moveX;
				}
			}
			else {
				if(bugs[i].x >= moveX ) {
					bugs[i].x -= moveX;
				}
			}
			if (moveUp === 0) {
				if (bugs[i].y <= (g.height-moveY)) {
					bugs[i].y += moveY;
				}
			}
			else {
				if (bugs[i].y >= moveY) {
					bugs[i].y -= moveY;
				}
			}
		}
	}
}
function gameLoop() {
	bugMove();
	drawAll();
	checkCollision();
	checkCheese();
}

function drawCheese() {
  if(g.getContext){
	  for (var i = 0; i < cheeses.length; i++) {
		  if (cheeses[i].x > 0 && cheeses[i].y > 0) {
			  gc.drawImage(cheeses[i].image, cheeses[i].x, cheeses[i].y);
		  }  
	  }
	  for (var j = 0; j < contCheese.length; j++) {
		  if (contCheese[j].x > 0 && contCheese[j].y > 0) {
			  gc.drawImage(contCheese[j].image,contCheese[j].x, contCheese[j].y);
		  }  
	  }
}
}
function drawCage() {
	if(g.getContext) {
		gc.drawImage(cage,g.width-128,g.height-128);
	}
}
function drawTaco() {
	if (speedUp.x > 0 && speedUp.y > 0) {
		gc.drawImage(taco,speedUp.x, speedUp.y);
	}
}
function drawBug() {
	if(g.getContext) {
		for(var i = 0; i < bugs.length; i++) {
			gc.drawImage(bug, bugs[i].x,bugs[i].y);
		}	
	}
	else {
		alert("Fehler!");
	}
}
function drawMeds() {
	for (var i = 0; i < medicine.length; i++) {
		if (medicine[i].x > 0 || medicine[i].y > 0) {
			gc.drawImage(medicine[i].image,medicine[i].x, medicine[i].y);
		}	
	}
 }
function drawMouse() {
	if (g.getContext) {
		if (right) {
			gc.drawImage(mouseyR,myMouse.x,myMouse.y);
		}
		else {
			gc.drawImage(myMouse.image,myMouse.x,myMouse.y);
		}
		
	}
}
function showSick() {
	gc.font = "25px Comic Sans MS";
	gc.strokeText("sick",20,20);
}
function showSpeed() {
	document.getElementById('speed').innerHTML = speed;
}
function showCheeseLeft() {
	var cheeseThere = checkCheese();
	document.getElementById('cleft').innerHTML = cheeseThere;
}
function drawAll() {
	gc.clearRect(0,0,g.width,g.height);
	drawCage();
	drawTaco();
	drawCheese();
	drawBug();
	showScore();
	drawMeds();
	drawMouse();
	showSpeed();
	showCheeseLeft();
	if (sick) {
		showSick();
	}
	if (speedy) {
		speedyGonzales();
	}
}

function mouseyUp() {
	if (spielLaeuft) {
		if (myMouse.y > 0) {
		myMouse.y -= speed;
		}
		drawAll();
	}	
}
function mouseyDown() {
	if (spielLaeuft) {
		if (myMouse.y < (g.height-32)) {
		myMouse.y += speed;
		}
		drawAll();
	}	
}
function mouseyLeft() {
	if (spielLaeuft) {
		right = false;
		if (myMouse.x > 0) {
		myMouse.x -= speed;
		}
		drawAll();
	}
}
function mouseyRight() {
	if (spielLaeuft) {
		right = true;
		if (myMouse.x < (g.width-32)) {
		myMouse.x += speed;
		}
		drawAll();
	}
}
function showRules() {
	var sender = document.getElementById('ruleButton');
	if (sender.value === "Show rules") {
		document.getElementById("rule-container").style.display = "block";
		sender.value = "Hide rules";
	}
	else {
		document.getElementById("rule-container").style.display = "none";
		sender.value = "Show rules";
	}
	
}

function speedyGonzales() {
	gc.font = "20px Comic Sans MS";
	gc.strokeText("Speedy Gonzales",100,g.height-20);
}

function showScore() {
	document.getElementById('score').innerHTML=punkte;
}

function checkCollision() {
	if (myMouse.collide(speedUp,true)) {
		speed += 2;
		speedy = true;
		speedUp.x = -20;
		speedUp.y = -20;
	}
	for(var i = 0; i < cheeses.length; i++) {
		if (myMouse.collide(cheeses[i],true)) {
			cheeses[i].x = -20;
			cheeses[i].y = -20;
			punkte += 10;
			cheeseCollected +=1;
		}
		if (i < contCheese.length && myMouse.collide(contCheese[i],true)) {
			sick = true;
			contCheese[i].x = -20;
			contCheese[i].y = -20;
			punkte += 5;
			cheeseCollected += 1;
			diseaseInterval = setInterval(sickMouse, 2500);
		}
		if (i < bugs.length && myMouse.collide(bugs[i],true)) {
			clearInterval(gameLoopInterval);
			clearInterval(diseaseInterval);
			gameOver();
			
		}
		if (i < medicine.length && myMouse.collide(medicine[i],true)) {
			sick = false;
			medicine[i].x = -20;
			medicine[i].y = -20;
			clearInterval(diseaseInterval);
		}
		for (var j = 0; j < bugs.length; j++) {
			if(cheeses[i].collide(bugs[j],false)) {
				var diseased = new gameComponent(32,32,greenCheese,cheeses[i].x,cheeses[i].y);
				cheeses[i].x = -20;
				cheeses[i].y = -20;
				var newX = Math.floor((Math.random()*((g.width-180)/30))+1);
				var newY = Math.floor((Math.random()*((g.height-180)/30))+1);
				var medi = new gameComponent(32,32, med, newX*30, newY*30);
				medicine.push(medi);
				contCheese.push(diseased);
			}
		}
	}
}
function sickMouse() {
	if (speed > 0 && sick) {
		speed -= 1;
		if (speed === 0) {
			gameOver();
			clearInterval(gameLoopInterval);
			clearInterval(diseaseInterval);
		}
	}
	else if (speed === 0 && sick) {
		clearInterval(gameLoopInterval);
		clearInterval(diseaseInterval);
		gameOver();
	}
}
function checkCheese() {
	var cheesesLeft = 0;
	for (var i = 0; i < cheeses.length; i++) {
		if (cheeses[i].x > 0 || cheeses[i].y > 0) {
			cheesesLeft += 1;
		}
	}
	if (cheesesLeft === 0) {
		if (cheeseCollected === 0) {
			gameOver();
		}
		else {
			nextLevel();
		}
	}
	return cheesesLeft;
}
function nextLevel() {
	level += 1;
	document.getElementById("level").innerHTML=level;
	maxBugs = level*level;
	maxCheese = level*5+20;
	clearInterval(diseaseInterval);
	cheeses = [];
	bugs = [];
	medicine = [];
	contCheese = [];
	sick = false;
	spielLaeuft = true;
	right = false;
	cheeseCollected = 0;
	if (speed < 5) {
		speed = 5;
	}
	var rX = Math.floor((Math.random()*(g.width-32))+1);
	var rY = Math.floor((Math.random()*(g.height-32))+1);
	speedUp = new gameComponent(32,32,taco,rX,rY);
	myMouse.x = g.width-40;
	myMouse.y = g.height-40;
	initializeCheese();
	initializeBugs();
	gc.clearRect(0,0,g.width,g.height);
	drawAll();
}
function gameOver() {
	spielLaeuft = false;
	clearInterval(gameLoopInterval);
	clearInterval(diseaseInterval);
	document.getElementById("newGame").style.display = "block";
	gc.fillStyle = "orange";
	gc.fillRect((g.width/2-200),(g.height/2-100),400,150);
	gc.font = "60px Comic Sans MS";
	gc.fillStyle = "darkred";
	gc.textAlign = "center";
	gc.fillText("Game Over!", g.width/2, g.height/2);
}

function welcheTaste(evt){
	switch (evt.keyCode){
		case 37: mouseyLeft();break;
		case 38: mouseyUp();break;
		case 39: mouseyRight();break;
		case 40: mouseyDown();break;
	}	
}
// Objekt GameComponent
function gameComponent(width, height, image, x, y) {
	this.width = width;
	this.height = height;
	this.image = image;
	this.x = x;
	this.y = y;
	
	this.collide = function(otherObj, ismouse) {
		var myLeft = this.x;
		var myRight = this.x+(this.width);
		var myBottom = this.y+(this.height);
		var myTop;
		if (ismouse) {
			myTop = this.y+15;
		}
		else {
			myTop = this.y;
		}
		var otherLeft = otherObj.x;
		var otherRight = otherObj.x+(otherObj.width);
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y+(otherObj.height);
		var collision = true;
		if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
			collision = false;
		}
		return collision;
	};
	
}
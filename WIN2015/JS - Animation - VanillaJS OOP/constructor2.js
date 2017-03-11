/*
function: anonymous
purpose: Constructor & Objects JS
parameters: none
return value: none
Author: Steven Sp
 */

function Character (name){
	
	//Properties=================
	this.name = name;
	this.appearance = "Red";
	this.skills = "Killer";
	this.speed = 1;
	this.lives = 3;
	
	//Methods====================
		
	this.behaviour = function(a){
		x = this.physics() + "and " + a();
		return x;
	};
	this.physics = function(){
		x = this.name + " flies ";
		return x;
	};
};

//Callback function
var finalFunc = function(){
	x = "transforms into a Diablo";
	return x;
}

var newChar = new Character ("Angel");

//Properties
document.title = "Main Character - Angel";

//Methods

var title = document.createElement('h1');
var text = document.createTextNode(newChar.name);
title.appendChild(text);

var para = document.createElement('p');
var mov = document.createTextNode("Special move: " + newChar.behaviour(finalFunc));
para.appendChild(mov);

var position = document.getElementsByTagName('body')[0];
position.appendChild(title);
position.appendChild(para);

//Adding style element
var style = document.createElement('style');
style.innerHTML = 'body{background:#66CCFF; margin:150px auto;} h1, p, div {font-weight:bold; color:white; text-align:center;}.frame { margin: 0 auto 50px; background: url(ad2.png); width: 200px; height: 200px; -webkit-animation: play '+ newChar.speed +'s steps(16) infinite; animation: play '+ newChar.speed +'s steps(16) infinite;} @-webkit-keyframes play {100% { background-position: -3200px;} @keyframes play {100% { background-position: -3200px;}';

document.querySelector('head').appendChild(style);
//document.getElementsByTagName("body")[0].appendChild(title);

var divA = document.createElement('div');
divA.className = 'frame';

//Div for the buttons
var div = document.createElement('div');


//Method for changing property values
//CSS animation property is not animatable according to w3schools, unfortunately.
var spmin = function(){
	
	newChar.speed = newChar.speed+0.1;
	
	style.innerHTML = 'body{background:#66CCFF; margin:150px auto;} h1, p, div {font-weight:bold; color:yellow; text-align:center;}.frame { margin: 0 auto 50px; background: url(ad2.png); width: 200px; height: 200px; -webkit-animation: play '+ newChar.speed +'s steps(16) infinite; animation: play '+ newChar.speed +'s steps(16) infinite;} @-webkit-keyframes play {100% { background-position: -3200px;} @keyframes play {100% { background-position: -3200px;}';
	
	document.querySelector('p:last-of-type').innerHTML = "Speed: "+ newChar.speed + " (1=faster, 5=slower)";
	
	return style.innerHTML;
}

var spmor = function(){
	
	newChar.speed = newChar.speed-0.1;
	
	style.innerHTML = 'body{background:#66CCFF; margin:150px auto;} h1, p, div {font-weight:bold; color:white; text-align:center;}.frame { margin: 0 auto 50px; background: url(ad2.png); width: 200px; height: 200px; -webkit-animation: play '+ newChar.speed +'s steps(16) infinite; animation: play '+ newChar.speed +'s steps(16) infinite;} @-webkit-keyframes play {100% { background-position: -3200px;} @keyframes play {100% { background-position: -3200px;}';
	
	document.querySelector('p:last-of-type').innerHTML = "Speed: "+ newChar.speed + " (1=faster, 5=slower)";
	
	return style.innerHTML;
}

var pause = function(){
	
	style.innerHTML = 'body{background:#66CCFF; margin:150px auto;} h1, p, div {font-weight:bold; color:red; text-align:center;}.frame { margin: 0 auto 50px; background: url(ad2.png); width: 200px; height: 200px; -webkit-animation: paused '+ newChar.speed +'s steps(16); animation: paused '+ newChar.speed +'s steps(16) ;} @-webkit-keyframes play {100% { background-position: -3200px;} @keyframes play {100% { background-position: -3200px;}';
	
	document.querySelector('p:last-of-type').innerHTML = "Speed: "+ newChar.speed + " (1=faster, 5=slower)";
	
	return style.innerHTML;
}


//Buttons from: http://en.wikibooks.org/wiki/JavaScript/Adding_Elements
myButton = document.createElement("input");
myButton.type = "button";
myButton.value = "-Speed";
myButton.addEventListener("click", spmin);
placeHolder = document.getElementsByTagName('body')[0];
placeHolder.appendChild(myButton);

myButtonP = document.createElement("input");
myButtonP.type = "button";
myButtonP.value = "Pause";
myButtonP.addEventListener("click", pause);
placeHolderP = document.getElementsByTagName('body')[0];
placeHolderP.appendChild(myButtonP);

myButton2 = document.createElement("input");
myButton2.type = "button";
myButton2.value = "+Speed";
myButton2.addEventListener("click", spmor);
placeHolder2 = document.getElementsByTagName('body')[0];
placeHolder2.appendChild(myButton2);

var notice = document.createElement('p');
var notp = document.createTextNode("Unfortunately you have to press the pause button, then increase/decrease the speed: ");
notice.appendChild(notp);


//Append all the elements created
position.appendChild(divA);
position.appendChild(notice);
div.appendChild(myButton);
div.appendChild(myButtonP);
div.appendChild(myButton2);
position.appendChild(div);


//Words object

var words = ["Diablo?", "Angel?", "Human?", "Monster?", "Chucky?", "Etcetera?"];


//Function to set the title per one second
//setTime function from:http://brackets.clementng.me/post/24150213014/example-of-a-javascript-closure-settimeout-inside

for (var i = 0; i <= 100000; i++) {
		
     setTimeout(function() { 
		return function() { 
			ranNum(0,3);
			var newName = words[Math.floor(Math.random() * words.length)];
			newChar.name = newName;	
			document.querySelector('h1').innerHTML = newChar.name + " " + msg;
			console.log(newChar.name);
			
		}; 
	}(i), 2000*i);		
}


function ranNum(min, max) {
	var prob = Math.floor(Math.random() * (max - min)) + min;
	switch (prob){
		case 0:
			lost();				
			break;
		case 1:
			msg = "";				
			break;
		case 2:
			win();
			break;				
		};
	return ;
};


function lost(){
	newChar.lives = 0;
	msg = "You" + " <u>" + "lost," + "</u> " + newChar.lives +" lives";
} 

function win(){
	newChar.lives = 3;
	msg = "You" + " <u>" + "won," + "</u> "  + newChar.lives +" lives";
} 
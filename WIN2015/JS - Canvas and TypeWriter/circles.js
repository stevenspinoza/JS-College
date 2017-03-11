var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = [];
var rint = 5; //radius

$(document).ready(function(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	//$('#container').width(WIDTH).height(HEIGHT);
	canvas = document.getElementById('particles');
	$(canvas).attr('width', WIDTH).attr('height',HEIGHT);
	con = canvas.getContext('2d');
	//Number of circles
	for(var i = 0; i < 60; i++) {
		pxs[i] = new Circle();
		pxs[i].reset();
	}
	setInterval(draw,rint);
});

//Function for making responsive the canvas
function resize() {
	// Our canvas must cover full height of screen
	// regardless of the resolution
	//var height = window.innerHeight;
	
	// So we need to calculate the proper scaled width
	// that should work well with every resolution
	//var ratio = canvas.width/canvas.height;
	//var width = height * ratio;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize, false);

function draw() {
	con.clearRect(0,0,WIDTH,HEIGHT);
	for(var i = 0; i < pxs.length; i++) {
		pxs[i].fade();
		pxs[i].move();
		pxs[i].draw();
	}
}

function Circle() {
	//ttl is size and speed related
	this.s = {ttl:10, xmax:2, ymax:1, rmax:100, rt:2, xdef:960, ydef:540, xdrift:6, ydrift: 2, random:true, blink:true};

	// fill vars
	var crFill = [
					['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
				];

	// opacity var
	//var opacityFill = "." + Math.floor(Math.random() * 10) + 1;
	
	var opacityFill = .6;

	this.reset = function() {
		this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
		this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
		//this.r = ((this.s.rmax-1)*Math.random()) + 1;
		this.r = 200;

	//	Movemement of every object
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);
				
		this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
	
	//	Size of the objects: Same all or different each
	//	this.rt = Math.random()*this.hl;
	//	this.rt = this.hl;
		this.rt = 0.5;
		
	//	this.s.rt = Math.random()+1;
		this.s.rt = 0;
		
	//	this.stop = Math.random()*0.2+0.4;
		this.stop = 0;
		
	//	this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
		this.s.xdrift *= 0;
		
	//	this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
		this.s.ydrift *= 0;
		
		this.opacityFill = opacityFill;

		this.currentColor = Math.floor(Math.random()*crFill.length);
	};

	// Not used
	this.fade = function() {
		//Getting bigger or slower with rebounds
		this.rt += this.s.rt;
		//this.rt += -0.01;
	};

	this.draw = function() {
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)){
			this.s.rt = this.s.rt*-1;
		}
		else if(this.rt >= this.hl){
			this.reset();
		}
		con.beginPath();
		con.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		con.globalAlpha = opacityFill;
		var newo = 1-(this.rt/this.hl);
		var cr = this.r*newo;
    
		gradient = con.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
	//	gradient.addColorStop(0.0, crFill[(this.currentColor)][1]);
		gradient.addColorStop(0.3, crFill[(this.currentColor)][1]);
		gradient.addColorStop(0.9, crFill[(this.currentColor)][0]);

		con.fillStyle = gradient;
		con.fill();

		con.closePath();
	};

	this.move = function() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
	//Movement inside screen area or outside
		if(this.x > WIDTH || this.x < 0){
			this.dx *= -1;
		} 
		if(this.y > HEIGHT || this.y < 0){
			this.dy *= -1;
		} 
	};

	this.getX = function() { return this.x; };
	this.getY = function() { return this.y; };
}
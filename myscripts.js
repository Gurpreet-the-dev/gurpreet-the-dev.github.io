var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");

var trailCanvas = document.getElementById("trailCanvas");
var trailContext = trailCanvas.getContext("2d");

var earthRadius = 6371000;  // metres
var mountainHeight = earthRadius * 0.180;
var x=0 ,y= earthRadius + mountainHeight, vx, vy;
var dt = 5;
const newtonG = 6.67e-11;  //Universal gravitational constant
const massEarth = 5.97e24;         //Mass of Earth
const metresPerPixel = earthRadius /(0.355 * theCanvas.width);

var initX = theCanvas.width/2 + x/metresPerPixel;
var initY = theCanvas.height/2-y/metresPerPixel;
theContext.beginPath();
theContext.arc(initX,initY,5,0,2*Math.PI);
var theGradient =theContext.createRadialGradient(
				initX-1,initY-2,1,initX,initY,5);
	theGradient.addColorStop(0,"#ffd0d0");
	theGradient.addColorStop(1,"#ff0000");
theContext.fillStyle = theGradient;
theContext.fill();
var timer;
var speedSlider = document.getElementById("speedSlider");
var speedReadout = document.getElementById("speedReadout");
var currentVx = document.getElementById("currentVx");
var currentVy = document.getElementById("currentVy");

function showSpeed() {
	speedReadout.innerHTML = speedSlider.value;
}

function fireProjectile(){
	window.clearTimeout(timer);
	x = 0;
	y = earthRadius + mountainHeight;
	vx = Number(speedSlider.value);
	vy = 0;
	moveProjectile();
}
function drawProjectile() {
	var pixelX = theCanvas.width/2 + x/metresPerPixel;
	var pixelY = theCanvas.height/2-y/metresPerPixel;
	theContext.clearRect(0,0,theCanvas.width,theCanvas.height);
theContext.beginPath();
theContext.arc(pixelX,pixelY,5,0,2*Math.PI);
var theGradient =theContext.createRadialGradient(
				pixelX-1,pixelY-2,1,pixelX,pixelY,5);
	theGradient.addColorStop(0,"#ffd0d0");
	theGradient.addColorStop(1,"#ff0000");
theContext.fillStyle = theGradient;
theContext.fill();
trailContext.fillRect(pixelX - 0.5,pixelY - 0.5,1,1);
trailContext.fillStyle = "red";
}
var i = 0;
function moveProjectile() {
	drawProjectile();
	var r = Math.sqrt(x*x+y*y);
	if (r > earthRadius){
	var g = newtonG*massEarth/(r*r);
	var ax = -(x/r)*g;
	var ay = -(y/r)*g;
	vx += ax*dt;
	vy += ay*dt;
	
	i+= 1;
	if (i == 1){
	currentVx.innerHTML = Math.round(vx);
	currentVy.innerHTML = Math.round(vy);
	i = -1;
	}
	var lastx = x;
	x += vx*dt;
	y += vy*dt;
	if(!((lastx * x) <0 && y > earthRadius)){
timer =	window.setTimeout(moveProjectile,100/3);}
else{
	currentVx.innerHTML = 0;
	currentVy.innerHTML = 0;
	console.log("Entered");
}
}
else{
	currentVx.innerHTML = 0;
	currentVy.innerHTML = 0;
	console.log("Entered");
}
}


console.log("hi");
function clearTrails() {
	trailContext.clearRect(0,0,trailCanvas.width,trailCanvas.height);
}
/*function test() {
	theContext.clearRect(0,0,theCanvas.width,theCanvas.height);
theContext.beginPath();
theContext.arc((theCanvas.width)/2,(theCanvas.height)/2,178,0,2*Math.PI);
theContext.fillStyle = "blue";
theContext.fill();
window.setTimeout(test1,100);
}
*/function test1() {
	theContext.clearRect(0,0,theCanvas.width,theCanvas.height);	
theContext.beginPath();
theContext.arc(theCanvas.width/2,theCanvas.height/2,178,0,2*Math.PI);
//theContext.arc(250,70+(0.355*theCanvas.width*2),5,0,2*Math.PI);
var newStyle = theContext.createRadialGradient(theCanvas.width/2-20,
theCanvas.height/2-40,80,theCanvas.width/2,theCanvas.height/2,178);
newStyle.addColorStop(0,"#ffa0a0");
newStyle.addColorStop(1,"#ff0000");
theContext.fillStyle = newStyle;
theContext.fill();
//window.setTimeout(test,100);
}
//test1();


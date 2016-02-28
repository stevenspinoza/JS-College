//This returns 'undefined' in console
var a='text'; 

if(!isNaN(a)){
	console.log(a);
}
else{
	console.log(a + " is not a number");
}

//This does not

var a='text'; 

if(!isNaN(a)){
	a + " is a number";
}
else{
	a + " is not a number";
}
"text is not a number"

//Reverse an array
var arrayToSort = new Array("A", "B", "C","D","E");
var sortedArray = arrayToSort.sort();
var reverseArray = sortedArray.reverse();
i = 0;
while (i < arrayToSort.length) {
	document.write(reverseArray[i++] + "<br />");
}

//A Shorter way
var arrayToSort = new Array("A","B","C","D","E");
i = arrayToSort.length;
while (i) {
	document.write(arrayToSort[--i] + "<br />");
}

//Without printing it out
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.reverse(); // [9, 8, 7,...]


//Scope
var demoVar=1 // global variable
alert('Before withVar demoVar is' +demoVar);
function withVar(){
  var demoVar=3;
}
withVar();
alert('After withVar demoVar is' +demoVar);
function withoutVar(){
  demoVar=3;
}
withoutVar();
alert('After withoutVar demoVar is' +demoVar);


var a = 1;
function f() {
	var b = 1;
	return a;
}
f();

//Closure #1
var a = "global variable";
var F = function () {
	var b = "local variable";
		var N = function () {
			var c = "inner local";
			return b; //Option #1 to have access to c, return [b,c]
		};
	return N;
};
F(); //F has to run before inner could have access to N
//F(); || F; return function definition
(F()); //returns N definition
(F())(); //runs N, returns "local variable"
//var inner = F(); returns "local variable"
//I can have access to "inner local" unless is returned in the function, otherwise not.


//Closure 1.1

var a = "global variable";
var inner;
var F = function () {
	var b = "local variable";
		var N = function () {
			var c = "inner local";
			return b;
		};
	inner = N;
};
F();//F has to run before inner could have access to N
inner();//


//Closure 1.2

var inner; // placeholder
var F = function () {
	var b = "local variable";
		var N = function () {
			var c='inner local'; 
			return [b,c];
		};
	inner = N;
};
F();//F has to run before inner could have access to N
inner(); //["local variable","inner local"]


//Closure #2
var inner; // placeholder
var F = function () {
	var b = "local variable";
		var N = function () {
			return b;
		};
	inner = N;
};

F(); //F has to run before inner could have access to N
inner(); //"local variable"


//Closure #3

function F(param) {
		var N = function () {
			return param;
		};
	param++;
return N;
}
(F(123))(); //The tough programmer version
var num = F(123); //The general programmer version
num();
//Both same answer give
//124


//Closures in a loop

function F() {
	var arr = [], i;
	for (i = 0; i < 3; i++) {
		arr[i] = function () {
			return i;
		};
	}
return arr;
}

var arr = F();
arr[0](); //Outputs arr[1](); 3, wrong
		  //Should be arr[1](); 1

//Solution

function F() {
	var arr = [], i;
	for (i = 0; i < 3; i++) {
	//arr[i] = (function (x)(i));
		arr[i] = (function (x) {
			return function () {
				return x;
			};
		}(i));
	}
	return arr;
}

var arr = F();
arr[0](); //Outputs arr[1](); 1
	
//Example for deep understanding of Closure
	
function F() {
	var arr = [], i;
	for (i = 0; i < 3; i++) {
	//arr[i] = (function (x)(i));
		arr[i] = (function (x) {
			//console.log('this text repeat '+i+' times')
			return function () {
				//This returns once even inside a loop
				for (i = 0; i < 5; i++){
					x='this text repeat once '+i+' times';
				}
				return x;
			};
		}(i));
		//This returns per every loop 
		//console.log('this text repeat '+i+' times');
	}
	return arr;
}

var arr = F();
arr[0]();

//Output
// this text repeat 0 times
// this text repeat 1 times
// this text repeat 2 times
// "this text repeat once"


//Normal version calling another function
//Same behaviour, obtaining the array index

function F() {
	function binder(x) {
		return function () {
			return x;
		};
	}
	
	var arr = [], i;
		for (i = 0; i < 3; i++) {
			arr[i] = binder(i);
		}
	return arr;
}

var arr = F();
arr[0]();


//From JS Ninja - JResig
var outerValue = 'ninja';
var later;
function outerFunction() {
	var innerValue = 'samurai';
	function innerFunction() {
		console.log(outerValue,"I can see the ninja.");
		console.log(innerValue,"I can see the samurai.");
	}
	later = innerFunction;
}
outerFunction();
later();

//Closure from MDN - modified

function makeAdder(x) {
	return function(y){
		return function(z){
			return x+y+z;
		};
	};
}

makeAdder(10)(10)(10); //Output 30

var add3nums = makeAdder(10);
add3nums(10)(10); ////Output 30

var add3nums = makeAdder();
add3nums(10)(10)(10); ////Output 30, wrong.

add3nums();// returns function(y) definition
add3nums(10)(10)(10);//Nan = x+10+20

//Solution, Add a new function
function makeAdder() {
	return function(x) {
		try{console.log(x+y+z);}
		catch (e) {console.log(e);} //y is not defined
		finally{
			return function(y){
				try{console.log(x+y+z);} //z is not defined
				catch (e) {console.log(e);}
				finally{
					return function(z){
						return x+y+z;
					};
				}
			};
		}
	};
};

var add3nums = makeAdder();
add3nums(10)(10)(10); //Output 30, right
makeAdder()(10)(10)(10); //Output 30, right


//Another example from MDN - Object with private methods
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1


//OR || operator
a=1, b=3;
var v = a||b;
3 //results

a=a||c, b=3, c=a||b;
var v = a||b||c;
false //returns



//AND && operator
a=1, b=3;
var v = a&&b;
3


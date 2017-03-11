/*
	WEB 230
	Starting file for Assignment 11 (Lab 19 Solution)
	{Steven Sp}
	
	http://jsfiddle.net/rtoal/ThPEH/
	http://www.webdevplayground.com/demos/tic_tac_toe/tic_tac_toe.html
*/

$(document).ready(function(){
	$('#X').addClass('current-player');

	function switchPlayer() {
		var player = $('.current-player').attr('id');
		$('#players div').removeClass('current-player');
		if(player === 'X') {
			$('#O').addClass('current-player');
		} else {
			$('#X').addClass('current-player');
		}
	}

	$('table').on('click', squareClicked);
	
	function squareClicked(e) {
		var $sqr = $(e.target);
		var player = $('.current-player').attr('id');
		if(!$sqr.attr('class')) {
			$sqr.addClass(player + '-marker');
			switchPlayer();
		}		
		// Step 2: Your code here
		var winInfo = checkWin();
		if(winInfo.win) {
			// Step 1			
				 $('.'+winInfo.winner+'-marker').addClass("win");			
				$('table').unbind('click');
			// Step 3
			var winnerName = $('#'+winInfo.winner).text();
			alert(winnerName + ' Wins!');
			//
		}
	}
	
	$('#newGame').on('click',newGame);
	
	function newGame() {
		$('td').removeAttr('class');
		$('#O').removeClass('current-player');
		$('#X').addClass('current-player');
		$('table').on('click', squareClicked);
	}
	
	// Get an array of markers on each square
	function getBoard() {
		var board = [];
		//var ids = [];
		// Step 1: Your code here
		$('td').each(function(){
			//ids.push(this.id);
			//board.push(this.id.substr(1, 2));
			board.push(this.className.substr(0, 1));		
		});
		
		return board;
	}
	
	// This function is provided. You don't need to change it.
	// Check for winner
	function checkWin() {
		var board = getBoard();
		// array of possible win sets
		var winArray = [
			[0,1,2], [3,4,5], [6,7,8],
			[0,3,6], [1,4,7], [2,5,8],
			[0,4,8], [2,4,6] ];
			var winInfo = {win: false};
		// loop through the possible win sets
		for(var i=0; i<winArray.length; i++) {
			// get the marks at the three win locations
			a = board[winArray[i][0]];
			b = board[winArray[i][1]];
			c = board[winArray[i][2]];
			// see if the same marker is at each location
			if(a && a === b && b === c) {
				winInfo.win = true;
				winInfo.play = winArray[i];
				winInfo.winner = a;
				return winInfo;
			}
		}
		return winInfo;
	}
	
});

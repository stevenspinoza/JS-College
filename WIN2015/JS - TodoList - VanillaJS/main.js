/* 
	As 10 
	Start with your Lab 18 solution or this file
	WEB230 Events
	{Steven Sp}
	
	http://www.javascripter.net/faq/canceleventbubbling.htm
*/

window.addEventListener('load', function(){
	
	var todos = document.getElementsByClassName('todo-item');
	var removes = document.getElementsByClassName('remove');
	document.getElementById('add-item').addEventListener('click', addItem, false);
	//Add event to clear input area
	document.getElementById('add-item').addEventListener('click', clear, false);
	document.querySelector('.todo-list').addEventListener('click', toggleCompleted, false);
	document.querySelector('.todo-list').addEventListener('click', removeItem, false);
	//Add event to the input area when enter key
	document.getElementById('new-item-text').addEventListener('keydown', enterK, false);
	//Add event to check text with list
	//document.getElementById('add-item').addEventListener('click', checkList, true);	
	//Add event to the title
	document.getElementsByTagName('h1')[0].addEventListener('click', changeT, false);
	
	
	function toggleCompleted(e) {
		console.log('=' + e.target.className);
		if(e.target.className.indexOf('todo-item') < 0) {
			return;
		}
		console.log(e.target.className.indexOf('completed'));
		if(e.target.className.indexOf('completed') > -1) {
			console.log(' ' + e.target.className);
			e.target.className = e.target.className.replace(' completed', '');
		} else {
			console.log('-' + e.target.className);
			e.target.className += ' completed';			
		}
	}
	
	function addItem() {
		var list = document.querySelector('ul.todo-list');
		var newItem = document.getElementById('new-item-text').value;
		checkList(newItem);
		var newListItem = document.createElement('li');
		newListItem.className = 'todo-item';
		newListItem.innerHTML = newItem + '<span class="remove"></span>';
		list.insertBefore(newListItem, document.querySelector('.todo-new'));
		
		//clear();
	}
	
	function clear(){
		textarea = document.getElementById('new-item-text');
		textarea.value = "";	
	}
	
	function enterK(e){
		if(e.keyCode == 13) {
			e.preventDefault();
			addItem(e);
			clear();
		}
	}
	
	function checkList(e){
		//var td = document.querySelector('.todo-list');
		var td = document.getElementsByTagName('li');
		
		for(var i=0; i<td.length; i++){
			var textCont = td[i].textContent.replace(/^\s+|\s+$/g,'');
			if (e == textCont || e == ''){
				alert("It's in the list");
				e.stopPropagation();
			}
		}		
	}
	
	function changeT(e){
		while (!banner){
			var banner = prompt('Banner Title?');		
		}
		//e.target.parentNode.removeChild(e);
		e.target.textContent = banner;
	}
	
	function removeItem(e) {
		if(e.target.className.indexOf('remove') < 0) {
			return;
		}
		var el = e.target.parentNode;
		el.parentNode.removeChild(el);
	}
	
	
	
});

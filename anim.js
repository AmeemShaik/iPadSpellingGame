/*this function is called when the DOM is loaded*/
$("document").ready(function(){
	
	//this is our array of words that we will spell	
	var wordArray = ["giraffe","phone","computer","airplane","holiday","dangerous","rocket","baseball","elephant", "hippopotamus","racecar"];
	//and index for the current word
	var wordIndex = 0;
	//the current word to spell
	var word = wordArray[wordIndex];
	
	//this is where the user will drop the letters of the word
	var droppableDiv = "<div id= droppable>"+word+"</div>"
	
	//add the droppable div to the container div
	$("#container").append(droppableDiv);
	
	//this is an index for the letters in the word
	var letterIndex = 0;
	// the corresponding letter of the word. 
	//This is basically the next expected letter in the word. 
	var expectedLetter = word[letterIndex];
	
	/*The renderLetters function takes a word, and randomly
	places the letters of the word on the screen. It then returns 
	an array containing the ids of the letters in the word.*/
	var letterArray = renderLetters(word);
	
	//makes the droppable div actually "droppable". 
	//Using jQuery UI's droppable() function.
	$("#droppable").droppable({
		//when a letter is dragged and dropped onto the droppable
		drop: function(event, ui){
			//get the current letter
			var el =event.srcElement;
			//if the letter matches the next expected letter,
			//remove it from the screen, and change expectedLetter to
			//the next letter in the word.
			if($(el).text() == expectedLetter){
				$(el).remove();
				letterIndex++;
				expectedLetter = word[letterIndex];
			}
			//if all of the letters have been dropped,
			//and the word has been spelled, go to the next word.
			if(letterIndex == word.length){
				wordIndex++;
				//if all the words have been spelled, start again
				if(wordIndex == wordArray.length){
					wordIndex = 0;
				}
				
				word = wordArray[wordIndex];
				
				//start from the first letter of the word.
				letterIndex = 0;
				expectedLetter = word[letterIndex];
				
				//put all of the letters in the word on the screen again.
				letterArray = renderLetters(word);
				$("#droppable").text(word);
				
				//start the animation again
				start(letterArray);
			}
		}
	});
	//start the animation
	start(letterArray);
	
})

//this function makes all of the letters draggable, and then starts the animation
function start(letterArray){
	for(i = 0; i < letterArray.length; i++){
		var letterId = letterArray[i];
		//make the letters draggable
		$(letterId).draggable({
			drag: function(event, ui){
				//while dragging, stop the animation
				var id = $(this).attr("id");
				$('#'+id).stop();
				var tempArray = new Array();
				//this loop removes the letter being dragged from the letter array.
				//This is to prevent the letter from being animated while being dragged.
				for(i = 0; i < letterArray.length; i++){
					var idName = $(letterArray[i]).attr("id");
					if(idName!=(id)){
						tempArray.push(letterArray[i]);
					}
				}
				letterArray = tempArray;
			},
			stop: function(event, ui){
				//after dragging is complete, place it back in the array.
				letterArray.push(this);
			}
		});
	}
	//this calls the animation method continously, with 750ms in between each call.
	setInterval(function(){animateLetters(letterArray);},750);
}

//this method places the letters on the screen randomly. it then returns the letters in an array
function renderLetters(word){
	var letterArray = new Array();
	for(i=0; i < word.length; i++){
		var letter = word.charAt(i);
		
		//create letter div
		var letterDiv = "<div id= id"+i+" class = 'letter'>"+letter+"</div>"
		//add it to the container
		$("#container").append(letterDiv);
		
		//choose a random left, and top location in the screen
		var left = Math.floor((Math.random()*800)+100)+"px";
		var top =  Math.floor((Math.random()*350))+"px";	
		
		//add those locations to the css of the letter
		var id = "id"+i;
		$("#"+id).css({"left":left});
		$("#"+id).css({"top":top});
		//make array
		letterArray.push("#"+id);	
	}
	//return the array
	return letterArray;
}

//this function computes, and implements the animation
function animateLetters(letters){
	//for each letter, pick a random location, and time, and then animate to that location
	for(i = 0; i < letters.length; i++){
		var letter = letters[i];
		var position = $(letter).position();
	    var xLocation = (Math.floor((Math.random()*800)+100))+"px";
		var yLocation = (Math.floor((Math.random()*350)))+"px";
		var time = 	Math.floor((Math.random()*2000)+3000);
		$(letter).animate({"left": xLocation, "top": yLocation}, {duration: time});;
	}
}



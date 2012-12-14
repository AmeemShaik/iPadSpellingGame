//execute this function when the DOM is fully loaded
$("document").ready(function() {
	//an array of the words we will use in our game
	var wordArray = ["cat", "dog", "tiger", "phone", "book", "lion", "elephant"];
	//an index for the current word
	var wordIndex = 0;
	//the current word
	var currentWord = wordArray[wordIndex];
	//set the text of the droppable div to the current word
	$("#droppable").text(currentWord);

	var letterArray = setupWord(currentWord);
	
	var letterIndex = 0;
	var expectedLetter = currentWord[letterIndex];
	document.addEventListener('dropped', function(event) {
		// e.target matches the elem from above
		var el = event.srcElement;
		//if the letter matches the next expected letter,
		//remove it from the screen, and change expectedLetter to
		//the next letter in the word.
		if ($(el).text() == expectedLetter) {
			$(el).remove();
			letterIndex++;
			expectedLetter = currentWord[letterIndex];
		}
		//if all of the letters have been dropped,
		//and the word has been spelled, go to the next word.
		if (letterIndex == currentWord.length) {
			wordIndex++;
			//if all the words have been spelled, start again
			if (wordIndex == wordArray.length) {
				wordIndex = 0;
			}
			//get the next word in the array
			currentWord = wordArray[wordIndex];
			$("#droppable").text(currentWord);
			
			//start from the first letter of the word.
			letterIndex = 0;
			//set expected letter
			expectedLetter = currentWord[letterIndex];
	
			letterArray = setupWord(currentWord);
		}
	}, false);
});

//this method places the letters on the screen randomly. it then returns the letters in an array
function renderLetters(word) {
	//create an array to hold the letters of the word
	var letterArray = new Array();
	for ( i = 0; i < word.length; i++) {
		//get the letter
		var letter = word.charAt(i);

		//create an id for the letter and add it to the letter array
		var id = "id" + i;
		letterArray.push(id);

		//create letter div
		var letterDiv = "<div id=" + id + " class = 'letter'>" + letter + "</div>"
		//add it to the container
		$("#container").append(letterDiv);

		//place the letter in a random location using jquery transit css method
		var xLocation = (Math.floor((Math.random() * 800) + 100));
		var yLocation = (Math.floor((Math.random() * 350)));
		$("#" + id).css({
			"x" : xLocation + "px"
		});
		$("#" + id).css({
			"y" : yLocation + "px"
		});
	}
	//return the array
	return letterArray;
}

//this method animates each letter
function animateLetters(letterArray) {
	//for each letter, pick a random location, and time, and then animate to that location
	for ( i = 0; i < letterArray.length; i++) {
		//get current letter
		var letter = letterArray[i];
		//choose random x location
		var xLocation = (Math.floor((Math.random() * 800) + 100));
		//choose random y location
		var yLocation = (Math.floor((Math.random() * 350)));
		//choose random time
		var time = Math.floor((Math.random() * 5000) + 7000);
		//transition the currrent letter. Note that we use x and y for position, instead of left and top
		$("#" + letter).transition({
			x : xLocation + "px",
			y : yLocation + "px"
		}, time);
	}
}

//this function will make each letter draggable
function addInteractions(letterArray) {
	for (var i = 0; i < letterArray.length; i++) {
		//get current letter
		var letter = letterArray[i];
		//make it draggable
		$("#" + letter).draggable();
	}
}

function setupWord(currentWord){
	//add letters to the screen, and return an array of the letter ids
	var letterArray = renderLetters(currentWord);

	//add touch interactions
	addInteractions(letterArray);

	//animate the letters
	animateLetters(letterArray);
	//animate repeatedly
	setInterval(function() {
		animateLetters(letterArray);
	}, 12000);
	return letterArray;
}
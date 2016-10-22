const dictionary = [
	[
		["A", "P", "P", "L", "E"],
		["O", "R", "A", "N", "G", "E"],
		["B", "A", "N", "A", "N", "A"],
		["P", "E", "A", "R"],
		["G", "R", "A", "P", "E"],
		["C", "R", "A", "N", "B", "E", "R", "R", "Y"],
		["W", "A", "T", "E", "R", "M", "E", "L", "O", "N"],
		["A", "P", "R", "I", "C", "O", "T"],
		["A", "V", "A", "C", "A", "D", "O"],
		["P", "E", "A", "C", "H"],
		["R", "A", "S", "P", "B", "E", "R", "R", "Y"],
		["G", "U", "A", "V", "A"],
		["M", "A", "N", "G", "O"],
		["D", "A", "T", "E"],
		["L", "E", "M", "O", "N"],
		["P", "O", "M", "E", "G", "R", "A", "N", "A", "T", "E"]

	],

	[
		["R", "E", "D"],
		["O", "R", "A", "N", "G", "E"],
		["C", "Y", "A", "N", "I", "D", "E"],
		["Y", "E", "L", "L", "O", "W"],
		["G", "R", "E", "E", "N"],
		["P", "U", "R", "P", "L", "E"],
		["B", "L", "A", "C", "K"],
		["W", "H", "I", "T", "E"],
		["B", "L", "U", "E"],
		["M", "A", "G", "E", "N", "T", "A"],	
		["G", "O", "L", "D"],
		["S", "I", "L", "V", "E", "R"],
		["L", "I", "M", "E"],
		["C", "H", "O", "C", "O", "L", "A", "T", "E"],
		["A", "Q", "U", "A"]
	],

	[
		["B", "A", "S", "K", "E", "T", "B", "A", "L", "L"],
		["T", "E", "N", "N", "I", "S"],
		["G", "O", "L", "F"],
		["S", "O", "C", "C", "E", "R"],
		["B", "O", "W", "L", "I", "N", "G"],
		["B", "A", "D", "M", "I", "N", "T", "O", "N"],
		["V", "O", "L", "L", "E", "Y", "B", "A", "L", "L"],
		["B", "O", "X", "I", "N", "G"],
		["R", "O", "W", "I", "N", "G"],
		["S", "U", "R", "F", "I", "N", "G"],
		["R", "U", "N", "N", "I", "N", "G"],
		["H", "O", "C", "K", "E", "Y"],
		["B", "A", "S", "E", "B", "A", "L", "L"],
		["F", "O", "O", "T", "B", "A", "L", "L"],
		["R", "U", "G", "B", "Y"],
		["A", "R", "C", "H", "E", "R", "Y"],
		["C", "R", "I", "C", "K", "E", "T"],
		["S", "N", "O", "W", "B", "O", "A", "R", "D", "I", "N", "G"],
		["D", "O", "D", "G", "E", "B", "A", "L", "L"],
		["B", "I", "K", "I", "N", "G"],
		["E", "S", "P", "O", "R", "T", "S"],
		["U", "L", "T", "I", "M", "A", "T", "E"]
	],

	[
		["O", "B", "A", "M", "A"],
		["W", "A", "S", "H", "I", "N", "G", "T", "O", "N"],
		["B", "U", "S", "H"],
		["G", "O", "R", "E"],
		["T", "R", "U", "M", "P"],
		["C", "L", "I", "N", "T", "O", "N"],
		["R", "O", "O", "S", "E", "V", "E", "L", "T"],
		["W", "I", "L", "S", "O", "N"],
		["J", "A", "C", "K", "S", "O", "N"],
		["R", "E", "A", "G", "A", "N"],
		["L", "I", "N", "C", "O", "L", "N"],
		["T", "R", "U", "M", "A", "N"],
		["J", "E", "F", "F", "E", "R", "S", "O", "N"],
		["E", "I", "S", "E", "N", "H", "O", "W", "E", "R"],
		["K", "E", "N", "N", "E", "D", "Y"],
		["M", "A", "D", "I", "S", "O", "N"]
	],

	[
		["J", "A", "V", "A"],
		["C", "+", "+"],
		["P", "Y", "T", "H", "O", "N"],
		["L", "I", "S", "P"],
		["P", "E", "R", "L"],
		["R", "U", "B", "Y"],
		["P", "H", "P"],
		["H", "A", "C", "K"],
		["F", "O", "R", "T", "R", "A", "N"],
		["C"],
		["R"],
		["C", "#"],
		["O", "B", "J", "E", "C", "T", "I", "V", "E", "-", "C"],
		["S", "W", "F", "I", "T"],
		["L", "U", "A"],
		["S", "Q", "L"],
		["J", "A", "V", "A", "S", "C", "R", "I", "P", "T"],
		["H", "T", "M", "L"],
		["C", "S", "S"],
		["A", "S", "S", "E", "M", "B", "L", "Y"]


	]
]


let category;

function fruitCategory() {
	category = 0;
	chooseCategory(category);
}

function colorCategory() {
	category = 1;
	chooseCategory(category);
}

function sportsCategory() {
	category = 2;
	chooseCategory(category);
}

function presidentCategory() {
	category = 3;
	chooseCategory(category);
}

function csLanguagesCategory() {
	category = 4;
	chooseCategory(category);
}

let spaces = [];	// an array to hold underscored spaces
let chosen;
let answer = "";
let count = 0;
let choseCategory = false;



function chooseCategory(num){
	if(choseCategory===true){
		window.alert("You already chose a category!")
	}else{
		let random = Math.floor((Math.random()*(dictionary[num].length)));
		chosen = dictionary[num][random];
		spaces = Array(chosen.length);
		for (let i = 0; i < spaces.length; i++){
			spaces[i] = "_ ";
		}
		for (let i = 0; i < chosen.length; i++){
			answer += chosen[i];
		}
		choseCategory = true;
		printTries();
		printspaces();
	}
}

function guessAnswer(){
	console.log('lmo');
	let f = document.guess_form;
	let b = f.elements["input_answer"];
	let guess = b.value.toUpperCase();
	if(count > 6){
		window.alert("Uh...I guess you're dead now. The correct word was " + answer);
	} else if (guess === answer){
		spaces = chosen;
		window.alert("You guessed the right answer.  You win!")
	} else {
		count++;
		hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + count + ".png";
		window.alert("Wrong guess, try again!");
	}
	b.value = "";
}

function printTries(){
	let tries = document.getElementById("tries");

	let text_node = document.createTextNode("You have 6 lives, good luck!");
	tries.appendChild(text_node);
	
}

// prints the guessfield
function printspaces(){
	for (let i = 0; i < spaces.length; i++){
		let guess_space = document.getElementById("guess_space");	// must have an element node
		let text_node = document.createTextNode(spaces[i]);		// to create a text node to add into HTML
		guess_space.appendChild(text_node);			// append text node to element in HTML
	}
}

// checks if the the letter provided by the user matches one or more of the letters in the word
let checkLetter = function(){
	let f = document.guess_form;		// form from HTML
	let b = f.elements["input_letter"];	// the "input_letter" element from the form
	let letter = b.value; 				// the letter provided by the user into "input_letter" element
	letter = letter.toUpperCase();
	let found = false;
	// here, we check if the user's guessed letter is a letter in the word (chosen)
	for (let i = 0; i < chosen.length; i++){
		if(chosen[i] === letter){
			found = true;
			spaces[i] = letter + " ";	// replace spaces[i] with the letter found
		}
	}
	b.value = "";		// empty out text input box for next round
	
	// deletes the guessfield and replaces it with the new one
	let guess_space = document.getElementById("guess_space");
	guess_space.innerHTML=""; 
	printspaces();
	
	// if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
	if(!found){
		let wrong_letters = document.getElementById("wrong_letters");	// get wrong_letters id from HTML
		let text_node = document.createTextNode(" " + letter);	// create a text node consisting of space + letter
		wrong_letters.appendChild(text_node);
		count++;	// increment count of wrong letters
		let hangman = document.getElementById("hangman");
		// change the image src of hangman element in HTML
		if(count > 6){
			hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman0.png";
		} else {
    		hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + count + ".png";
		}
	}
	
	//checks if all letters have been found
	let word_found = true;
	for (let i = 0; i < spaces.length; i++){
		if(spaces[i] === "_ "){
			word_found = false;
		}
	}
	if(word_found){
		window.alert("You win!");
	}

	if(count > 6){ //once you got six wrong letters, you lose
		window.alert("Uh...I guess you're dead now. The correct word was " + answer);
	}
}

function init(){
}
window.onload = init;


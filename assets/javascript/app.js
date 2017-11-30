$(document).ready(function() {

	// global variables
	var answersRight = 0;
	var answersWrong = 0;
	var unanswered = 0;
	var questionNumber = 0;
	var startButton;
	var resetButton;
	var counter = 30;
	var theClock;

	// variables from easyLevelQuestion function, all questions 'easy'
	var answerChoices = [];
	var generateCorrectAnswerInteger;
	var questionColor;
	var questionText;

	// reset variables for new game
	function reset() {
		answersRight = 0;
		answersWrong = 0;
		unanswered = 0;
		questionNumber = 0;
		counter = 30;
		theClock;
		
		// new colors for new quiz
		questionArray = [

			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor(),
			generateRandomColor()

		];

		// reset answer feedback (tabs at top right)
		for (var i = 0; i < 10; i++) {
			$("#q" + [i] + "Box").css('background-color', "");
			$("#q" + [i] + "BoxSmall").css('background-color', "");
		}

	};

	// timer, 30 seconds
	function timer() {
		theClock = setInterval(thirtySeconds, 1000);
		counter = 30;
		$("#timer").html("Timer: " + counter);
		function thirtySeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				LossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}

			$("#timer").html("Timer: " + counter);
		}
	};

	// function for when the time runs out
	function LossDueToTimeOut() {
		unanswered++;
		clearInterval(theClock);
		nextQuestion();
	};

	// function to generate a random color
	function generateRandomColor() {

		// random color picker and variables 
		randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		return randomColor;

	};

	// array holding ten random colors for ten questions
	var questionArray = [

		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor(),
		generateRandomColor()

	];

	// the start screen, with start button
	function startScreen() {

		startButton = "<p class='startClickEvent'><a href='#'>Start Quiz</a></p>";
		$("#startStop").html(startButton);

		// hide the answer div so the game is not started automatically on accident
		document.getElementById("answers").style.display = "none";

	};

	// start game screen on page load
	startScreen();

	// start button
	$(".startClickEvent").on("click", function(event){
		$("#startStop").empty();
		easyLevelQuestion(questionNumber);
		timer();
	});

	// get a random int, parameters as min and max
	function getRandomInt(min, max) {

	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

	};

	// get the rgb values from hex color
	function hexToRgb(hex) {

	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;

	}

	// easy level question, though they are all 'easy'
	function easyLevelQuestion(x) {

		document.getElementById("answers").style.display = "block";

		questionColor = questionArray[x];
	 
		randomColorScoreR = hexToRgb(questionColor).r;
		randomColorScoreG = hexToRgb(questionColor).g;
		randomColorScoreB = hexToRgb(questionColor).b;

		questionText = ("Pick the matching color: " + questionColor + " (r" + randomColorScoreR + ", g" + randomColorScoreG + ", b" + randomColorScoreB + ")" );

		$("#question").text(questionText);

		// ---------- generate answer choices
		answerChoices = [
			"something",
			"something",
			"something",
			"something",
			"something"
		];

		generateCorrectAnswerInteger = getRandomInt(0, 5);

		for (var a = 0; a < answerChoices.length; a++) {
			
			if (a !== generateCorrectAnswerInteger) {

				//answerChoices[a] = "testing";
				answerChoices[a] = generateRandomColor();

			}

			else {

				answerChoices[generateCorrectAnswerInteger] = questionColor;

			}

		}	
		
		
		$("#answer1").css('background-color', answerChoices[0]);
		$("#answer2").css('background-color', answerChoices[1]);
		$("#answer3").css('background-color', answerChoices[2]);
		$("#answer4").css('background-color', answerChoices[3]);
		$("#answer5").css('background-color', answerChoices[4]);

		$("#answer1").data("color", answerChoices[0]);
		$("#answer2").data("color", answerChoices[1]);
		$("#answer3").data("color", answerChoices[2]);
		$("#answer4").data("color", answerChoices[3]);
		$("#answer5").data("color", answerChoices[4]);


	};

	// -------------------------------------- answer click event -----------------

	$("body").on("click", ".color", function(event){

		//alert($(this).data("color"));
		selectedAnswer = $(this).data("color");
		
		if (selectedAnswer === answerChoices[generateCorrectAnswerInteger]) {
			// add one to right answer tally
			answersRight++;
			// reset the clock
			clearInterval(theClock);
			// answer feedback (top right), right so one color tab
			$("#q" + [questionNumber]+ "Box").css('background-color', selectedAnswer);
		}

		else {
			//add one to wrong answer tally
			answersWrong++;
			// reset the clock
			clearInterval(theClock);
			// answer feedback (top right), wrong so two color tab
			$("#q" + [questionNumber]+ "Box").css('background-color', answerChoices[generateCorrectAnswerInteger]);
			$("#q" + [questionNumber]+ "BoxSmall").css('background-color', selectedAnswer);
		}

		nextQuestion();

	});

	// go to the next question
	function nextQuestion() {

		// if not the last question, continue to the next question
		if (questionNumber < 9) {

			questionNumber++;

			//generate questions
			easyLevelQuestion(questionNumber);
			timer();
		}

		// it is the last question, time to get the final score
		else {

			finalScore();
		}

	}

	// display final score, the game has ended
	function finalScore(){

		// none so that users will not accidentally 'answer', would add to their tally
		document.getElementById("answers").style.display = "none";

		// display score
		score = "<p class='finalScore'>Here's how you did!<br>Correct Answers: " + answersRight 
		+ "<br>Incorrect Answers: " + answersWrong + "<br>Unanswered: " + unanswered + "</p>";
		$("#startStop").html(score);
		$(".color").removeAttr('style');
		$("#timer").html("");
		$("#question").empty();

		// create reset button
		resetButton = "<p class='resetClickEvent'><a href='#'>Reset Quiz</a></p>";
		$("#startStop").append(resetButton);
	};

	// reset button actions on click
	$("body").on("click", ".resetClickEvent", function(event){
		reset();
		$("#startStop").empty();
		easyLevelQuestion(questionNumber);
		timer();
	});

});







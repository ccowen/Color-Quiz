$(document).ready(function() {

	var answersRight = 0;
	var answersWrong = 0;
	var unanswered = 0;
	var questionNumber = 0;
	var startButton;
	var resetButton;
	var counter = 30;
	var theClock;

	// variables from easy function
	var answerChoices = [];
	var generateCorrectAnswerInteger;
	var questionColor;
	var questionText;

	function reset() {
		answersRight = 0;
		answersWrong = 0;
		unanswered = 0;
		questionNumber = 0;
		counter = 30;
		theClock;
		
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

		for (var i = 0; i < 10; i++) {
			$("#q" + [i] + "Box").css('background-color', "");
			$("#q" + [i] + "BoxSmall").css('background-color', "");
		}

	};

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

	function LossDueToTimeOut() {
		unanswered++;
		clearInterval(theClock);
		nextQuestion();
	};

	function generateRandomColor() {

		// random color picker and variables 
		randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		return randomColor;

	};

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

	function startScreen() {

		startButton = "<p class='startClickEvent'><a href='#'>Start Quiz</a></p>";
		$("#startStop").html(startButton);

	};

	startScreen();

	$(".startClickEvent").on("click", function(event){
		$("#startStop").empty();
		easyLevelQuestion(questionNumber);
		timer();
	});

	function getRandomInt(min, max) {

	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

	};

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

	function easyLevelQuestion(x) {

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
			//alert("correct");
			answersRight++;
			clearInterval(theClock);
			$("#q" + [questionNumber]+ "Box").css('background-color', selectedAnswer);
		}

		else {
			//alert("wrong answer!");
			answersWrong++;
			clearInterval(theClock);
			$("#q" + [questionNumber]+ "Box").css('background-color', answerChoices[generateCorrectAnswerInteger]);
			$("#q" + [questionNumber]+ "BoxSmall").css('background-color', selectedAnswer);
		}

		nextQuestion();

	});

	function nextQuestion() {

		if (questionNumber < 9) {

			questionNumber++;

			//generate questions
			easyLevelQuestion(questionNumber);
			timer();
		}

		else {

			finalScore();
		}

	}

	function finalScore(){

		score = "<p class='finalScore'>Here's how you did!<br>Correct Answers: " + answersRight 
		+ "<br>Incorrect Answers: " + answersWrong + "<br>Unanswered: " + unanswered + "</p>";
		$("#startStop").html(score);
		$(".color").removeAttr('style');
		$("#timer").html("");
		$("#question").empty();

		resetButton = "<p class='resetClickEvent'><a href='#'>Reset Quiz</a></p>";
		$("#startStop").append(resetButton);
	};

	$("body").on("click", ".resetClickEvent", function(event){
		reset();
		$("#startStop").empty();
		easyLevelQuestion(questionNumber);
		timer();
	});

});







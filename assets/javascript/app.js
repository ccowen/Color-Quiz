$(document).ready(function() {

var answersRight = 0;
var answersWrong = 0;
var answerChoices = [];
var generateCorrectAnswerInteger;
var questionColor;
var questionText;


/* function reset() {

};

function initialScreen() {

}

initialScreen(); */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// function for generating a random color
function generateRandomColor() {

	// random color picker and variables 
	randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

	return randomColor;

};

// question array, ten questions total
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

	console.log(generateCorrectAnswerInteger);

	for (var a = 0; a < answerChoices.length; a++) {
		
		if (a !== generateCorrectAnswerInteger) {

			answerChoices[a] = "testing";

		}

		else {

			answerChoices[generateCorrectAnswerInteger] = questionColor;

		}

	}	
	
	
	$("#answer1").css('background-color', answerChoices[0]);
	$("#answer2").text(answerChoices[1]);
	$("#answer3").text(answerChoices[2]);
	$("#answer4").text(answerChoices[3]);
	$("#answer5").text(answerChoices[4]);

};



console.log(questionArray);


// 	answers with colors in them $("#answerdiv").css('background-color', randomColor);


// if score exceeds a number make the question harder
// if, if else, if else, if else

// function easyLevelQuestion()
// function mediumLevelQuestion()
// function hardLevelQuestion()
// function superhardLevelQuestion()

easyLevelQuestion(0);

$("body").on("click", ".color", function(event){

	selectedAnswer = $(this).text();
	if(selectedAnswer === answerChoices[generateCorrectAnswerInteger]) {
		alert("correct");
		//clearInterval(theClock);
		//generateWin();

		//for (var i = 0; i < questionArray.length; i++) {

			if (answersRight < 4) {

				easyLevelQuestion(i);
				
			}

			else if (answersRight < 7) {

			}
			else if (answersRight < 9) {

			}

		//}

	}

	else {
		alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
});






function LossDueToTimeOut() {
	answersWrong++;
	//gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	//$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	answersRight++;
	//gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	//$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	answersWrong++;
	//gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	//$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

/*function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}*/

});

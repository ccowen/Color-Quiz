$(document).ready(function() {

var answersRight = 0;
var answersWrong = 0;


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

	var questionColor = questionArray[x];
 
	randomColorScoreR = hexToRgb(questionColor).r;
	randomColorScoreG = hexToRgb(questionColor).g;
	randomColorScoreB = hexToRgb(questionColor).b;

	var questionText = ("Pick the matching color: " + questionColor + " (r" + randomColorScoreR + ", g" + randomColorScoreG + ", b" + randomColorScoreB + ")" );

	$("#question").text(questionText);

	// ---------- generate answer choices
	var answerChoices = [
		"answerChoice",
		"answerChoice",
		"answerChoice",
		"answerChoice",
		"answerChoice"
	];

	var generateCorrectAnswerInteger = getRandomInt(0, 4);

	for (var x = 0; x < answerChoices.length; x++) {
		
		if (x !== generateCorrectAnswerInteger) {

			answerChoices[x] = "testing";

		}

	}

	for (var a = 0; a < answerChoices.length; a++) {

		answerChoices[generateCorrectAnswerInteger] = questionColor;
	
	}
	
	$("#answer1").text(answerChoices[0]);
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

for (var i = 0; i < questionArray.length; i++) {
	if (answersRight < 4) {
		easyLevelQuestion(i);
	}
	else if (answersRight < 7) {

	}
	else if (answersRight < 9) {

	}



}


});

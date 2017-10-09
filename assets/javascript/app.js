$(document).ready(function() {

var answersRight = 0;
var answersWrong = 0;


/* function reset() {

};

function initialScreen() {

}

initialScreen(); */

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

function easyLevelQuestion(x) {

	var questionColor = questionArray[x];

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
 
	randomColorScoreR = hexToRgb(randomColor).r;
	randomColorScoreG = hexToRgb(randomColor).g;
	randomColorScoreB = hexToRgb(randomColor).b;

	var questionText = ("Pick the matching color: " + randomColor + " (r" + randomColorScoreR + ", g" + randomColorScoreG + ", b" + randomColorScoreB + ")" );

	$("#question").text(questionText);
	
};



console.log(questionArray);


// 	answers with colors in them $("#answerdiv").css('background-color', randomColor);


// if score exceeds a number make the question harder
// if, if else, if else, if else

// function easyLevelQuestion()
// function mediumLevelQuestion()
// function hardLevelQuestion()
// function superhardLevelQuestion()

for (var i = 0; i <= questionArray.length; i++) {
	if (answersRight < 4) {
		easyLevelQuestion(i);
	}
	else if (answersRight < 7) {

	}
	else if (answersRight < 9) {

	}



}


});

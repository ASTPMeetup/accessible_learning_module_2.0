'use strict';

var placeholderValue = 5;
var maxGrade = 100;
var grade = 0;
var dragCollection = $('[data-draggable="item"]');
var totalDraggables = dragCollection.length;
var objDescriptions = ['The only president to be a licensed bartender.',
                       'This place is super real and has some super interesting history.',
                       '1700s English Poet who kept a pet bear in his college dorm room.',
                       'This man challenged George Washington to a breakdance competition.',
                       'He had servants called the “Grooms of Stool” whose job it was to wipe his bottom.',
                       'He was a huge fan of Star Trek.'];

$('#progressBar').progressbar({
		value: grade,
		max: maxGrade
	})
	.children('.ui-progressbar-value')
	.html(grade + '%')
	.css("display", "block");

function incrementProgress(){
	grade = 0;
	var loadIncrements = maxGrade / totalDraggables;
	var correctAnswers = [];
	var incorrectAnswers = [];

	// run through all draggables**
	for(var li = 0; li < totalDraggables; li++) {

		// checks each draggable for correct matches to increment grade
		var liCategory = dragCollection[li].getAttribute("data-category");
		var listCategory = dragCollection[li].parentNode.getAttribute("data-list");

		if(liCategory === listCategory){
			correctAnswers.push(dragCollection[li]);
			grade += loadIncrements;
		}
	}

  grade = Math.floor(grade);

	checkForCompletion(grade);

	$('.ui-progressbar-value').html(grade + '%');

	var activeProgressBar= (grade > 0) ? "1" : "0.5";
	$('.ui-progressbar-value').css("opacity", activeProgressBar);

	$('#progressBar').progressbar({
			value: grade,
			max: maxGrade
		})
		.attr("aria-valuenow", grade).css({'padding-bottom': '20px'});
}

$('[data-draggable="item"]').keydown(function(e){
  console.log($(this).text());
  if (e.keyCode == 40) {
    initializePopup($(this));
  }
  if (e.keyCode == 38) {
    removePopup($(this));
  }
});

$('.dropdown').one("click", function(){
  initializePopup($(this).parent());
});

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 825) {
    $('#grading').fadeIn("slow");
  } else {
    $('#grading').fadeOut("show");
  }
});

function initializePopup(dragObject) {
  //remove all existing popup objects
  $('#popup').remove();
  // Set ARIA properties
  var descriptionIndex = dragObject.attr('data-description-id');
  // Build description popup
  var objDescription = $('<li></li>');
  objDescription.attr('id', 'popup');
  objDescription.attr('aria-label', 'object description');
  objDescription.attr('role', 'tooltip');
  objDescription.attr('tabindex', '1');
  objDescription.focus();
  objDescription.text(objDescriptions[descriptionIndex]);
  objDescription.prepend($('<hr>').css('margin', '10px'));
  dragObject.append(objDescription);

  dragObject.children().one('click', function(){ removePopup(dragObject); });
  dragObject.attr('aria-owns', 'popup');
}

function removePopup(dragObject){
  if ($('#popup')){
    $('#popup').remove();
    dragObject.children().one('click', function(){ initializePopup(dragObject); });
  }
}

var colorCollection = ['#0099ff', '#e6005c', '#009933', '#ff9933', '#ac00e6', '#2eb8b8'];

for (var i = 0; i < totalDraggables; i++) {
  dragCollection[i].style.background = colorCollection[i];
  dragCollection[i].setAttribute('aria-haspopup', 'true');
}

function checkForCompletion(grade) {
	if (grade === maxGrade) {
		$('[data-draggable="item"]').css({ "opacity" : "0.4" });
	}
}

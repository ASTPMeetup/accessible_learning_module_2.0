"use strict";function incrementProgress(){grade=0;for(var e=maxGrade/totalDraggables,a=[],o=0;totalDraggables>o;o++){var r=dragCollection[o].getAttribute("data-category"),t=dragCollection[o].parentNode.getAttribute("data-list");r===t&&(a.push(dragCollection[o]),grade+=e)}grade=Math.floor(grade),checkForCompletion(grade),$(".ui-progressbar-value").html(grade+"%");var i=grade>0?"1":"0.5";$(".ui-progressbar-value").css("opacity",i),$("#progressBar").progressbar({value:grade,max:maxGrade}).attr("aria-valuenow",grade).css({"padding-bottom":"20px"})}function initializePopup(e){$("#popup").remove();var a=e.attr("data-description-id"),o=$("<li></li>");o.attr("id","popup"),o.attr("aria-label","object description"),o.attr("role","tooltip"),o.attr("tabindex","1"),o.focus(),o.text(objDescriptions[a]),o.prepend($("<hr>").css("margin","10px")),e.append(o),e.children().one("click",function(){removePopup(e)}),e.attr("aria-owns","popup")}function removePopup(e){$("#popup")&&($("#popup").remove(),e.children().one("click",function(){initializePopup(e)}))}function checkForCompletion(e){e===maxGrade&&$('[data-draggable="item"]').css({opacity:"0.4"})}var placeholderValue=5,maxGrade=100,grade=0,dragCollection=$('[data-draggable="item"]'),totalDraggables=dragCollection.length,objDescriptions=["The only president to be a licensed bartender.","This place is super real and has some super interesting history.","1700s English Poet who kept a pet bear in his college dorm room.","This man challenged George Washington to a breakdance competition.","He had servants called the “Grooms of Stool” whose job it was to wipe his bottom.","Coldest city on earth. Lowest recorded temperature a record -96 degrees Fahrenheit."];$("#progressBar").progressbar({value:grade,max:maxGrade}).children(".ui-progressbar-value").html(grade+"%").css("display","block"),$('[data-draggable="item"]').keydown(function(e){console.log($(this).text()),40==e.keyCode&&initializePopup($(this)),38==e.keyCode&&removePopup($(this))}),$(".dropdown").one("click",function(){initializePopup($(this).parent())}),$(document).scroll(function(){var e=$(this).scrollTop();e>825?$("#grading").fadeIn("slow"):$("#grading").fadeOut("show")});for(var colorCollection=["#0099ff","#e6005c","#009933","#f05f40","#ac00e6","#2eb8b8"],i=0;totalDraggables>i;i++)dragCollection[i].style.background=colorCollection[i],dragCollection[i].setAttribute("aria-haspopup","true");
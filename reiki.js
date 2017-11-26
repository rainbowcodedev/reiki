/*
   Final Project
   
   Reiki By Jake

   Author: Jacob Fletcher   
   Date: 11/22/2015     

   Filename:  reiki.js

   -------------------------------------------------------------
   Function List:
 

   -------------------------------------------------------------
   Global Variable List:


   -------------------------------------------------------------
*/

window.onload = setTabs;

var currentTab = null;
var maxZ = 1;

function setTabs() {
     var menuTabs = new Array();
     var allElems = document.getElementsByTagName("*");

     for (var i = 0; i < allElems.length; i++) {
	if (allElems[i].className == "tab") menuTabs.push(allElems[i]);
	}
	
     for (var i = 0; i < menuTabs.length; i++) {
	currentTab = menuTabs[0];
	menuTabs[i].onclick = showTab;
	}
	
}

function showTab() {

currentTab.style.backgroundColor = "white";
maxZ++;

tabList = this.getElementsByTagName("ul")[0];
tabList.style.zIndex = maxZ;
currentTab = this;
currentTab.style.backgroundColor = "rgb(104, 222, 169)";

}


/* Tutorial 1 functions - to create a date box */


function showDate() {
   thisDate = new Date();
   var thisWDay=thisDate.getDay();
   var thisDay=thisDate.getDate();
   var thisMonth=thisDate.getMonth();
   var thisYear=thisDate.getFullYear();
   var mName = new Array("January", "February", "March", "April", "May", 
       "June", "July", "August", "September", "October","November", "December");
   var wdName = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
       "Thursday", "Friday", "Saturday");
   return wdName[thisWDay]+", "+mName[thisMonth]+" "+thisDay+", "+thisYear;
}

function weekDay(){
   thisDate = new Date();
   var thisWDay=thisDate.getDay();
   var wdName = new Array("sunday", "monday", "tuesday", "wednesday",
       "thursday", "friday", "saturday");
   return wdName[thisWDay];
}

/* Tutorial 2 functions - to create a random tip box */

function randInt(lower, upper) {

	// declare a variable equal to the number of integers in the range
	var size = 7;

	// calculate the random integer
	return Math.floor(lower + size*Math.random());
}

function tipTitle(n) {
   var title = new Array();
   title[1] = "The root chakra";   
   title[2] = "The sacral chakra"; 
   title[3] = "The solar plexus chakra";
   title[4] = "The heart chakra";
   title[5] = "The throat chakra";
   title[6] = "The third-eye chakra";
   title[7] = "The crown chakra";
   return title[n];
}

function tipText(n) {
   var text = new Array();
   text[1] = "is associated with the reproductive glands " +
             "and the spine and kidneys."; 
   text[2] = "is connected with the adrenal glands " +
             "and the bladder, gall bladder, and spleen.";
   text[3] = "is associated with the pancreas " +
             "and the liver, intestines, and the stomach.";
   text[4] = "is connected to the thymus gland " +
             "and the heart and lungs.";
   text[5] = "is associated with the thyroid gland " +
             "and the vocal cords, the tongue, and the esophagus.";
   text[6] = "is connected to the pituitary gland " +
             "and the eyes and brain.";
   text[7] = "is associated with the pineal gland " +
             "and the spinal cord and brain stem, and sleep regulation.";
   return text[n];
}



/* Tutorial 3 functions - to create a calendar */


function calendar(calendarDay) {
	if (calendarDay == null) calDate=new Date()
	else calDate = new Date(calendarDay);

	

	document.write("<table id='calendar_table'>");
	writeCalTitle(calDate);
	writeDayNames();
	writeCalDays(calDate);
	document.write("</table>")
}

function writeCalTitle(calendarDay) {
	var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

var thisMonth=calendarDay.getMonth();
var thisYear=calendarDay.getFullYear();

document.write("<tr>");
document.write("<th id='calendar_head' colspan='7'>");
document.write(monthName[thisMonth]+" "+thisYear);
document.write("</th>");
document.write("</tr>");
}

function writeDayNames() {
	var dayName = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

	document.write("<tr>");
	for (var i = 0;i<dayName.length;i++) {
		document.write("<th class='calendar_weekdays'>" +dayName[i]+"</th>");
	}
	document.write("</tr>");
}


function daysInMonth(calendarDay) {
	var thisYear = calendarDay.getFullYear();
	var thisMonth = calendarDay.getMonth();
	var dayCount = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

if (thisYear % 4 == 0) {
	if ((thisYear % 100 != 0) || (thisYear % 400 == 0)) {
	dayCount[1] = 29; // this is a leap year
	}
}

	return dayCount[thisMonth]; // return the number of days in the month
}


function writeCalDays(calendarDay) {
	var currentDay = calendarDay.getDate();

	// determine the starting day of the week
	var dayCount = 1;
	var totalDays = daysInMonth(calendarDay);
	calendarDay.setDate(1);	// set the date to the first day of the month
	var weekDay = calendarDay.getDay(); // the day of the week of the first day
	
	
	// write blank cells preceding the starting day
	document.write("<tr>");
	for (var i=0; i < weekDay; i++) {
		document.write("<td></td>");
	}

	// write cells for each day of the month
	while (dayCount <= totalDays) {
	
	     // write the table rows and cells
		if (weekDay == 0) document.write("<tr>");

		if (dayCount == currentDay) {
		// highlight the current day
		document.write("<td class='calendar_dates' id='calendar_today'>"+dayCount+"</td>");
		} 
		else {
		// display the day as usual
		document.write("<td class='calendar_dates'>"+dayCount+"</td>");
		}


		if (weekDay == 6) document.write("</tr>");
	
	     // move to the next day
		dayCount++;
		calendarDay.setDate(dayCount);
		weekDay = calendarDay.getDay();
	}
	document.write("</tr>");

}






/* Tutorial 6 - functions to create a slide show */


function getStyle(object, styleName) {
   if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
   } else if (object.currentStyle) {
      return object.currentStyle[styleName]
   }
}


function addEvent(object, evName, fnName, cap) {
    if (object.attachEvent)
	object.attachEvent("on" + evName, fnName);
    else if (object.addEventListener)
	object.addEventListener(evName, fnName, cap);
} 


function removeEvent(object, evName, fnName, cap) {
   if (object.detachEvent)
     object.detachEvent("on" + evName, fnName);
   else if (object.removeEventListener)
	object.removeEventListener(evName, fnName, cap);
}


var scrollButton = null;
var diffX = null;


window.onload = setup;

function setup() {

	scrollButton = document.getElementById("button");
	scrollButton.style.top = getStyle(scrollButton, "top");
	scrollButton.style.left = getStyle(scrollButton, "left");

	scrollButton.style.cursor = "pointer";

	addEvent(scrollButton, "mousedown", grabIt, false);
	//addEvent(document, "keydown", keyShow, false);
	document.onkeydown = keyShow;
}


function grabIt(e) {
	var evt = e || window.event;

	var mouseX = evt.clientX; // x-coordinate of pointer
	diffX = parseInt(scrollButton.style.left) - mouseX;
	addEvent(scrollButton, "mousemove", moveIt, false);
	addEvent(scrollButton, "mouseup", dropIt, false);
}

function moveIt(e) {
	var evt = e || window.event;
	
	var mouseX = evt.clientX; // x-coordinate of pointer
	var buttonPosX = mouseX + diffX;
	showSlide(buttonPosX);

}

function showSlide(x) {

	if (x < 20) {
	   x = 20;
	}
	if (x > 299 ) {
	   x = 299;
	}
	scrollButton.style.left = x + "px";
	var i = Math.floor((x-20)/31);
	document.getElementById("photo").src = "image"+i+".jpg";
}

function dropIt(e) {

	removeEvent(scrollButton, "mousemove", moveIt, false);
}

function keyShow(e){

     var evt = e || window.event;
     var key = evt.keyCode;
     
     var buttonPosX = parseInt(scrollButton.style.left);
	if (key == 37) buttonPosX -= 31;
	if (key == 39) buttonPosX += 31;
	showSlide(buttonPosX);
}




/* Tutorial 7 - functions to make the chakra list */


var chakra=new Array();
chakra[0]="Root chakra";
chakra[1]="Sacral chakra";
chakra[2]="Solar plexus chakra";
chakra[3]="Heart chakra";
chakra[4]="Throat chakra";
chakra[5]="Third-eye chakra";
chakra[6]="Crown chakra";

var fact=new Array();
fact[0]="Muladhara";
fact[1]="Svadhishthana";
fact[2]="Manipura";
fact[3]="Anahata";
fact[4]="Vishuddha";
fact[5]="Ajna";
fact[6]="Sahasrara";



addEvent (window, "load", setUp, false);

function setUp() {
   var transDoc = document.getElementById("doc");
   var olElem = document.createElement("ol");
	for (var i = 0; i < chakra.length; i++){
          var newLI = document.createElement("li");
		newLI.innerHTML = chakra[i];
		newLI.id = i + "phrase";
		newLI.style.cursor = "pointer";
		addEvent(newLI, "mousedown", swapcf, false);
		addEvent(newLI, "mouseup", swapfc, false);
		olElem.appendChild (newLI);
	   }
    transDoc.appendChild(olElem);
}


function swapcf(e) {
   var evt = e || window.event;
   var phrase = evt.target || evt.srcElement;
	if (phrase.nodeName == "#text")
	phrase = phrase.parentNode;
		
	var phraseNum = parseInt(phrase.id);
	   phrase.innerHTML = fact[phraseNum];
	   phrase.style.color = "rgb(104, 222, 169)";
	   phrase.style.fontStyle = "italic";
}

function swapfc(e) {
   var evt = e || window.event;
   var phrase = evt.target || evt.srcElement;
	if (phrase.nodeName == "#text")
	phrase = phrase.parentNode;
 
	var phraseNum = parseInt(phrase.id);
	   phrase.innerHTML = chakra[phraseNum];
	   phrase.style.color = "black";
	   phrase.style.fontStyle = "normal";
}
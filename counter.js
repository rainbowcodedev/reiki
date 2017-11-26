/*
   
   Final Project
   Reiki By Jake
   Author: Jacob Fletcher
   Date: 11/22/2015   


   Filename: counter.js



   Functions List:

   addEvent(object, evName, fnName, cap)
      Adds an event handler to object where object is the object 
      reference, evName is the name of the event, fnName is the
      reference to the function, and cap specifies the
      capture phase.

   writeDateString(dateObj)
      Returns the date contained in the dateObj date object as
      a text string in the format mmm. dd, yyyy

   storeCookie(cName, cValue, expDate, cPath, cDomain, cSecure)
      Stores a cookie named cName with value cValue. Optional parameters
      expDate, cPath, cDomain, and cSecure set the expiry date,
      path, doman, and secure flag

   getCookie(cName)
      Returns the value of cookie, cName.

   setCounter()
      Retrieves and updates the date last visited and page counter
      cookies and displays them on the Web page along with the
      date last modified.

*/

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}


function writeDateString(dateObj) {

   var monthName = new Array("Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec");
	
   var thisMonth = dateObj.getMonth();
   var thisYear = dateObj.getFullYear();

   return monthName[thisMonth] + " " + dateObj.getDate() + ", " + thisYear;
}

function setCookie(cName, cValue, expDate, cPath, cDomain, cSecure) {
   if (cName && cValue != "") {
      var cString = cName + "=" + escape(cValue);
      cString += (expDate ? ";expires=" + expDate.toGMTString(): "");
      cString += (cPath ? ";path=" + cPath : "");
      cString += (cDomain ? ";domain=" + cDomain : "");
      cString += (cSecure ? ";secure" : "");
      document.cookie = cString;
   }
}


function getCookie(cName) {
   if (document.cookie) {
      var cookies = document.cookie.split("; ");
      for (var i = 0; i < cookies.length; i++) {
         if (cookies[i].split("=")[0] == cName) {
            return unescape(cookies[i].split("=")[1]);
         }
      }
   }
}




addEvent(window, "load", setCounter, false);


function setCounter() {

      // Retrieve the date of last visit
      if (getCookie("lastVisit") == null) lastVisit = "Welcome to Reiki By Jake!"
      else lastVisit = "Last Visit: " + unescape(getCookie("lastVisit"));

      // Set date of current visit
      var today = new Date();
      var currentVisit = writeDateString(today);
      setCookie("lastVisit", currentVisit);

      // Retrieve the page counter
      if (getCookie("pageCounter") == null) {
         var pageCount = 1;
      } else {
         var pageCount = parseInt(getCookie("pageCounter")) + 1;
      }

      setCookie("pageCounter", pageCount);

      // Determine the date the page was last modified
      var lastModified = new Date();
      var pageUpdate = writeDateString(lastModified);

      var footer = document.createElement("div");
      footer.id = "pageFooter";

      var span1 = document.createElement("span");
      span1.innerHTML = "Visit Number: " + pageCount;

      var span2 = document.createElement("span");
      span2.innerHTML = lastVisit;

      var span3 = document.createElement("span");
      span3.innerHTML = "Last Update: " + pageUpdate;

      footer.appendChild(span1);
      footer.appendChild(span2);
      footer.appendChild(span3);

      document.getElementById("bottom").appendChild(footer);


}

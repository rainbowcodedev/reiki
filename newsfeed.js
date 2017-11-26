/*
   Final Project
   Reiki By Jake
   Author: Jacob Fletcher
   Date: 11/22/2015   

   Filename: newsfeed.js



   Functions List:

   getCommentary()
      Retrieves the HTML code stored in the commentary.txt file,
      displaying it in the main section of the document

   getHeadlines()

      Retrieves the RSS feed stored in the headlines.xml file,
      displaying it in the news section of the document



*/

addEvent(window, "load", getCommentary, false);

function getCommentary() {
	
	var main = document.getElementById("main");
	
	// Request object for the commentary.txt file
	var reqCom = new XMLHttpRequest();
	reqCom.open("GET", "commentary.txt");
	reqCom.send(null);
	
	reqCom.onreadystatechange = function() {
		// Process the data when the response is 
		// completed without error
		if (this.readyState == 4) {
			if (this.status == 200) {
				// Retrieve the daily commentary and
				// display it within the main section
				main.innerHTML = this.responseText;
			}
		}
	}
}


addEvent(window, "load", getHeadlines, false);

function getHeadlines() {
	
	var news = document.getElementById("news");
	
	// Request object for the headlines feed
	var reqHead = new XMLHttpRequest();
	reqHead.open("GET", "headlines.xml");
	reqHead.setRequestHeader("Cache-Control", "no-cache");
	reqHead.send(null);
	
	reqHead.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				// Retrieve the headlines feed
				var newsDoc = this.responseXML;
				var rssDoc = new RSSFeed(newsDoc);
				rssDoc.parseToHTML(news);
				
			}
		}
	}
}
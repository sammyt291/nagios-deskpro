
//============================================================//
//============================================================//
//  Find and append DeskPro ticket links for Nagios comments  //
//============================================================//
//============================================================//

//What should we look for when linking to a ticket?
let searchStrings = [
  "CN",
  "notified",
  "notify",
  "note",
  "ref:",
  "ACK",
  "see"
];

//Keep a count for fun
let count = 0;

//Get an array of all comment cells
$("td", ".commentOdd,.commentEven").each(function(idx){ 
  //Keep lowercase for matching
  let string = $(this).text().toLowerCase();
  
  //Flag for skipping non-ticket related table cells
  let valid = false;
  //Loop each of our 'looking for' strings
  for (const i in searchStrings) {
    var check = searchStrings[i];
    //If the cell we are looking at has the search string we are checking
    if(string.includes(check.toLowerCase())){
      //We have a valid ticket-related cell
      valid = true;
      break;
    }
  }
  
  if(valid){
    //Find the ticket number
    let idstring = string.match(/([1-9][0-9]*)/);
    //Check we found a valid number
    let id = parseInt(idstring);
    //Check it is a valid ticket
    if(id > 9999){
      count++
      //Add an icon that links to the ticket!
      $(this).append(` - <a href="https://tech.iomart.com/tech/tickets/ticketview.php?id=${id}" target="_blank">📑</a> `);
    }
  }
});

//Victory message!
console.log("Linked", count, "tickets!!!");

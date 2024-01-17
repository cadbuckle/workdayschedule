// // Add advancedFormat to daysjs
// var advancedFormat = require('dayjs/plugin/advancedFormat');
// dayjs.extend(advancedFormat);

// "global" variables
const hourSlots = [ "9am", "10am", "11am", "12pm","1pm","2pm","3pm","4pm","5pm"]
var currentHour;

displayCurrentDate();

displayTimeBlocks();

// Display the current day at the top of the calender when a user opens the planner.
// currentDay = "Thursday September 5th"
function displayCurrentDate() {
  var currentDayEl = $("#currentDay");
  var dateNow = dayjs().format("dddd MMMM D");
  var currentHour = dayjs().format("HH");
  console.log(currentHour);
  // TODO - add st, nd, rd, th to date

  // display calculated date
  currentDayEl.append(dateNow);
}

// Present timeblocks as <tr> for standard business hours (0900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700) when the user scrolls down.
// Fields <td> within the row for hour, text, action button
function displayTimeBlocks() {
    var containerEl = $('div[class=container]');
    
    // add table
    containerEl.append($('<table>').addClass('col-12 col-md-8 col-lg-9'));
    
    // get table
    var tableEl = $('table');
    
    // add table body
    tableEl.append($('<tbody id="timeSlots">'));
    
    //get table body
    var tbodyEl = $('tbody');
    
    // add the rows for each time slot

    for (let i = 0; i <= hourSlots.length; i++) {
      // defines the timeslot row
      var timeslotRowEl = $('<tr>');
      timeslotRowEl.addClass('future');
      
      // add hour to row
      timeslotRowEl.append($('<td>')
        .text(hourSlots[i])
        .addClass('hour'));
      
        // add description
      timeslotRowEl.append($('<td>')
        .text("a description here")
        .addClass('description'));
      
        // add button
      saveBtnEl = $('<td>').addClass('saveBtn');
      saveBtnEl.append($('<i>').text('Save'));
      
      timeslotRowEl.append(saveBtnEl);
      
      // add row main screen
      tbodyEl.append(timeslotRowEl);
    }
    // console.log(li);
    // console.log(containerEl);
    // containerEl.innerHTML = li;
}

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.
//      TODO add timer so that when hour changes run logic to determine colour of bars

// Allow a user to enter an event when they click a timeblock
//      TODO add listerner for click on the timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page
//      TODO get items from local storage

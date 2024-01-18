// "global" variables
const hourSlots = [ "9am", "10am", "11am", "12pm","1pm","2pm","3pm","4pm","5pm"]
var currentHour;
var scheduleArray = [];
// get container element
var containerEl = $('div[class=container]');
// add table
containerEl.append($('<table>').addClass('col-12 col-md-8 col-lg-9'));
// get table element
var tableEl = $('table');
// add table body
tableEl.append($('<tbody id="timeSlots">'));
// get table body element
var tbodyEl = $('tbody');

getSchedule();
displayCurrentDate();
displayTimeBlocks();

// Display the current day at the top of the calender when a user opens the planner.
// currentDay = "Thursday September 5th"
function displayCurrentDate() {
  var currentDayEl = $("#currentDay");
  var dateNow = dayjs().format("dddd MMMM D");
  // get current hour - used for shading timeslots
  currentHour = dayjs().format("H");
  // TODO - add st, nd, rd, th to date

  // display calculated date
  currentDayEl.append(dateNow);
}

// Present timeblocks as <tr> for standard business hours (0900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700) when the user scrolls down.
// Fields <td> within the row for hour, text, action button
function displayTimeBlocks() {
    // add the rows for each time slot
    for (let i = 0; i < hourSlots.length; i++) {
      // defines the timeslot row
      var timeslotRowEl = $('<tr>');
      // add shading (class = past/present/future) to row
      if (i+9 == currentHour) {
        timeslotRowEl.addClass('present');
      } else if(i+9 < currentHour){
        timeslotRowEl.addClass('past');
      } else {
        timeslotRowEl.addClass('future');
      }
      
      // add hour to row
      timeslotRowEl.append($('<td>')
        .text(hourSlots[i])
        .addClass('hour'));
      
        // add description
      timeslotRowEl.append($('<textarea>')
        .text(scheduleArray[i])
        .addClass('description'));
      
        // add button
      saveBtnEl = $('<td>').addClass('saveBtn');
      saveBtnEl.append($('<i>').text('Save'));
      
      timeslotRowEl.append(saveBtnEl);
      
      // add row main screen
      tbodyEl.append(timeslotRowEl);
    }
}

//      TODO add timer so that when hour changes run logic to determine colour of bars

// Save the event in local storage when the save button is clicked in that timeblock.
function saveSchedule(event) {
  // get all descriptions from table
  var schedDescriptions = tbodyEl.children().children('textarea');
  
  // save entered information to array
  for (let i = 0; i < schedDescriptions.length; i++) {
    var arrayItem = schedDescriptions[i].value;
    scheduleArray[i] = arrayItem;
  }

  // save array to local storage.
  localStorage.setItem("wk07-schedule",JSON.stringify(scheduleArray));
  
}

// listener for Save button
tbodyEl.on('click', '.saveBtn', saveSchedule);

// Get schedule from local storage
function getSchedule() {
  console.log("Get Schedule from LocalStorage");
  var savedSchedule = localStorage.getItem("wk07-schedule");
    // parse return value to create array (if not empty)
  // and then iterate through through and display
  if (savedSchedule !== null) {
    // parse data from local storage to an array
    scheduleArray = JSON.parse(savedSchedule);
    // loop through array to build html to display
  } else {
    // create empty array
    for (let i = 0; i < 9; i++) {
      scheduleArray.push("");
    }
  }
}
// "global" variables
const hourSlots = [
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
  ];
  var currentHour;
  var scheduleArray = [];
  var containerEl  = $("div[class=container]");

  drawScreen();

  // function to draw the screen
  function drawScreen() {
    // get container element

    // get schedule from local store
    getSchedule();

    // calculate and dsplay current date
    displayCurrentDate();

    // display time blocks
    displayTimeBlocks();
  };
  
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
    // remove current time blocks from display
    containerEl.empty();

    // add the rows for each time slot
    for (let i = 0; i < hourSlots.length; i++) {
      // defines the timeslot row
      var timeslotRowEl = $("<div>")
        .attr("id", i)
        .addClass('row');
      // add shading (class = past/present/future) to row
      if (i + 9 == currentHour) {
        timeslotRowEl.addClass("present");
      } else if (i + 9 < currentHour) {
        timeslotRowEl.addClass("past");
      } else {
        timeslotRowEl.addClass("future");
      }
  
      // add hour to row
      timeslotRowEl.append($("<div>").text(hourSlots[i]).addClass("col-md-1 hour"));
  
      // add description
      timeslotRowEl.append(
        $("<textarea>").text(scheduleArray[i]).addClass("col-md-10 description")
      );
  
      // add button
      saveBtnEl = $("<button>").addClass("saveBtn col-md-1");
      saveBtnEl.append($("<i>")
        .addClass("fas fa-lock")
        );
  
      timeslotRowEl.append(saveBtnEl);
  
      // add row main screen
      containerEl.append(timeslotRowEl);
    }
  }
  
  // listener for Save button
  // Save the event in local storage when the save button is clicked in that timeblock.
  $(".saveBtn").click(function (event) {
    // get description and time from selected row
    event.preventDefault();
    var scheduleDesc = $(this).siblings(".description").val();
    var arrayTimeSlot = $(this).parent().attr("id");
    console.log("save");
    // save to internal array
    scheduleArray[arrayTimeSlot] = scheduleDesc;
    // save to local storage
    localStorage.setItem("wk07-schedule", JSON.stringify(scheduleArray));
    // refresh screen
    drawScreen();
  });
  
  // Get schedule from local storage
  function getSchedule() {
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
  
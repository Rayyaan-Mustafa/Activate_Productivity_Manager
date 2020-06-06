function openActivateTab(evt, ActivateTabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(ActivateTabName).style.display = "block";
  evt.currentTarget.className += " active";
  if (ActivateTabName == 'Calendar') {
    loadCalendarDays();
    //loadCalendarYears();
  }
}


//calendar stuff
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var currmonth = 0;
var curryear = 2020;
var currday = 0;

function loadCalendarMonth(newmonth) {
  if (newmonth == -1) {
    return;
  }
  currmonth = newmonth - 1;
  loadCalendarDays();
  document.getElementById("curMonth").innerHTML = months[newmonth - 1];
}

function loadCalendarYear(newyear) {
  if (newyear == -1) {
    return;
  }
  curryear = newyear;
  loadCalendarDays();
  document.getElementById("curYear").innerHTML = newyear;
}


function loadCalendarDays() {
  document.getElementById("calendarDays").innerHTML = "";

  var tmpDate = new Date(curryear, currmonth, 0);
  var num = daysInMonth(currmonth, curryear);
  var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

  for (var i = 0; i <= dayofweek; i++) {
    var d = document.createElement("div");
    d.classList.add("day");
    d.classList.add("blank");
    document.getElementById("calendarDays").appendChild(d);
  }

  for (var i = 0; i < num; i++) {
    var tmp = i + 1;
    var d = document.createElement("div");
    d.id = "calendarday_" + i;
    d.className = "day";
    d.innerHTML = tmp;
    d.onclick = (function () {
      var selectedDay = tmp;
      return function () {
        currday = selectedDay;
        loadEventList();
        return currday;
      }
    })();

    document.getElementById("calendarDays").appendChild(d);
  }

  var clear = document.createElement("div");
  clear.className = "clear";
  document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year) {
  var d = new Date(year, month + 1, 0);
  return d.getDate();
}

function loadEventList() {
  var result = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    if (item.day == currday && item.year == curryear && item.month == currmonth + 1) {
      result += eventsContainer[i].stringify();
    }
  }
  if (result == "") {
    result = "Empty";
  }
  document.getElementById("eventlist").innerHTML = result;

}

window.addEventListener('load', function () {
  var date = new Date();
  currmonth = date.getMonth();
  curryear = date.getFullYear();
  currday = date.getDay();
  document.getElementById("curMonth").innerHTML = months[currmonth];
  document.getElementById("curYear").innerHTML = curryear;
  loadCalendarDays();
});


// function createDropdown(identification, count) { 
//     for(var i=1; i<=count; i++){
//       var select = document.getElementById(identification);
//       var option = document.createElement("OPTION");
//       select.options.add(option);
//       option.text = i;
//       option.value = i;
//     }
// }

function submitInput() {
  const dayInput = document.querySelector('#day').value;
  const monthInput = document.querySelector('#month').value;
  const yearInput = document.querySelector('#year').value;
  const startHourInput = document.querySelector('#startHour').value;
  const endHourInput = document.querySelector('#endHour').value;
  const eventTitleInput = document.querySelector('#eventTitle').value;
  //e.preventDefault();//if this whole function doesnt work then just follow traveries method of event listenr
  if (localStorage.length == 0) {
    localStorage.setItem("day", dayInput);
    localStorage.setItem("month", monthInput);
    localStorage.setItem("year", yearInput);
    localStorage.setItem("startHour", startHourInput);
    localStorage.setItem("endHour", endHourInput);
    localStorage.setItem("eventTitle", eventTitleInput);

    eventsContainer.push(new ActivateEvent(dayInput, monthInput, yearInput, startHourInput, endHourInput, eventTitleInput))

  }
  else {//if something is already in local storage, it appends the next input
    let a = localStorage.getItem('day');
    a += ';' + dayInput;
    localStorage.setItem("day", a);

    let b = localStorage.getItem('month');
    b += ';' + monthInput;
    localStorage.setItem("month", b);

    let c = localStorage.getItem('year');
    c += ';' + yearInput;
    localStorage.setItem("year", c);

    let d = localStorage.getItem('startHour');
    d += ';' + startHourInput;
    localStorage.setItem("startHour", d);

    let e = localStorage.getItem('endHour');
    e += ';' + endHourInput;
    localStorage.setItem("endHour", e);

    let f = localStorage.getItem('eventTitle');
    f += ';' + eventTitleInput;
    localStorage.setItem("eventTitle", f);

    eventsContainer.push(new ActivateEvent(dayInput, monthInput, yearInput, startHourInput, endHourInput, eventTitleInput))
  }
}

function alert() {
  $('.alert').addClass("show");
  $('.alert').removeClass("hide");
  $('.alert').addClass("showAlert");
  // timeout so that msg fades
  setTimeout(function () {
    $('.alert').removeClass("show");
    $('.alert').addClass("hide");
  }, 1250);
}

function getNumOfEvents() {
  if (localStorage.length == 0) {
    return 0
  }
  else {
    return localStorage.getItem("day").split(';').length;
  }
}

// function getHoursOfEvent(){//(string of localstorage key)

// }

function createPreviousArray() {//on page refresh eventsContainer is emptied, so we need this function
  if (localStorage.length == 0) {//if LS is empty, do nothing
    return
  }
  else if (eventsContainer.length > 0) {//if something already exists in eventsContainer, do nothing
    return
  }
  else if (eventsContainer.length == 0) {//only called on page refresh where localStorage has items, but events container does not
    var dayArr = localStorage.getItem("day").split(';')
    var monthArr = localStorage.getItem("month").split(';')
    var yearArr = localStorage.getItem("year").split(';')
    var startHourArr = localStorage.getItem("startHour").split(';')
    var endHourArr = localStorage.getItem("endHour").split(';')
    var eventTitleArr = localStorage.getItem("eventTitle").split(';')

    for (var i = 0; i < getNumOfEvents(); i++) {
      //eventsContainer.push(new ActivateEvent(localStorage.getItem("day").value,localStorage.getItem("month").value,localStorage.getItem("year").value,localStorage.getItem("startHour").value,localStorage.getItem("endHour").value,localStorage.getItem("eventTitle").value,))
      eventsContainer.push(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]))

    }
  }

}

class ActivateEvent {
  constructor(day, month, year, startHour, endHour, eventTitle) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.startHour = startHour;
    this.endHour = endHour;
    this.eventTitle = eventTitle;
  }
  getValue(key) {
    switch (key) {
      case 'day':
        return this.day;
      case 'month':
        return this.month;
      case 'year':
        return this.year;
      case 'startHour':
        return this.startHour;
      case 'endHour':
        return this.endHour;
      case 'eventTitle':
        return this.eventTitle;
      default:
        return "N/A"
    }
  }
  stringify() {

    return "<br>" + this.eventTitle + "<br>from " + this.startHour + " to " + this.endHour + "<br>";
  }
}

function resetLocalStorage() {
  localStorage.clear()
}

function resetLSAndContainer() {
  if (window.confirm('Are you sure you want to reset your data?\nThis action cannot be undone.')) {
    localStorage.clear();
    eventsContainer = [];
  }

}
function total_hrs_by_event(eventTitle) {
  let result = 0
  eventsContainer.forEach(function (item) {
    if (item.eventTitle == eventTitle) {
      result += (item.endHour - item.startHour)
    }
  })
  return result
}

function hrs_by_event_by_day(eventTitle, day, month, year) {
  let result = 0;
  eventsContainer.forEach(function (item) {
    if (item.eventTitle == eventTitle && item.day == day && item.month == month && item.year == year) {
      result += (item.endHour - item.startHour)
    }
  })
  return result
}

function displayRadarChart() {//MOST LIKE BETTER TO IMPLEMENT THIS AS A BAR CHART
  let radarChart = document.getElementById('radarChart').getContext('2d');

  window.chart = new Chart(radarChart, {
    type: 'polarArea',
    data: {
      labels: ["downtime", "eating", "exercise", "family-time", "homework", "productive-work", "reading", "sleep", "social-time", "work"],
      datasets: [{
        data: [
          total_hrs_by_event("downtime"),
          total_hrs_by_event("eating"),
          total_hrs_by_event("exercise"),
          total_hrs_by_event("family-time"),
          total_hrs_by_event("homework"),
          total_hrs_by_event("productive-work"),
          total_hrs_by_event("reading"),
          total_hrs_by_event("sleep"),
          total_hrs_by_event("social-time"),
          total_hrs_by_event("work")
        ]
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  })
}

function displayLineChart() {
  let lineChart = document.getElementById('lineChart').getContext('2d')
}

function displayPieChart() {

}

//page initialization stuff goes here

var eventsContainer = [];//array for each object 
createPreviousArray();



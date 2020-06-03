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
var startYear = 2010;
var endYear = 2030;
var month = 0;
var year = 2020;

function loadCalendarMonth(newmonth) {
  if (newmonth == -1) {
    return;
  }
  month = newmonth - 1;
  loadCalendarDays();
  document.getElementById("curMonth").innerHTML = months[newmonth - 1];
}

function loadCalendarYear(newyear) {
  if (newyear == -1) {
    return;
  }
  year = newyear;
  loadCalendarDays();
  document.getElementById("curYear").innerHTML = newyear;
}

// function loadCalendarYears() {
//   document.getElementById("years").innerHTML = "";

//   for (var i = startYear; i <= endYear; i++) {
//     var doc = document.createElement("div");
//     doc.innerHTML = i;
//     doc.classList.add("dropdown-item");

//     doc.onclick = (function () {
//       var selectedYear = i;
//       return function () {
//         year = selectedYear;
//         document.getElementById("curYear").innerHTML = year;
//         loadCalendarDays();
//         return year;
//       }
//     })();

//     document.getElementById("years").appendChild(doc);
//   }
// }



function loadCalendarDays() {
  document.getElementById("calendarDays").innerHTML = "";

  var tmpDate = new Date(year, month, 0);
  var num = daysInMonth(month, year);
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

window.addEventListener('load', function () {
  var date = new Date();
  month = date.getMonth();
  year = date.getFullYear();
  document.getElementById("curMonth").innerHTML = months[month];
  document.getElementById("curYear").innerHTML = year;
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
}

function resetLocalStorage() {
  localStorage.clear()
}



//page initialization stuff goes here

var eventsContainer = [];//array for each object 
createPreviousArray()







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
    //loadCalendarYears();
  }
}


//calendar stuff
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2010;
var endYear = 2030;
var month = 0;
var year = 0;

function loadCalendarMonths() {
  for (var i = 0; i < months.length; i++) {
    var doc = document.createElement("div");
    doc.setAttribute('id', months[i]);
    doc.innerHTML = months[i];
    //doc.classList.add("dropdown-item");

    doc.onclick = (function () {
      var selectedMonth = i;

      return function () {
        month = selectedMonth;
        loadCalendarDays();
        hideCalendarMonths();
        return month;
      }

    })();

    document.getElementById("months").appendChild(doc);
  }

}

function hideCalendarMonths() {
  for (var j = 0; j < months.length; j++) {
    var elem = document.getElementById(months[j]);
    elem.style.display = "none";
    elem.parentNode.removeChild(elem);
  }
}

function loadCalendarYears() {
  document.getElementById("years").innerHTML = "";

  for (var i = startYear; i <= endYear; i++) {
    var doc = document.createElement("div");
    doc.innerHTML = i;
    doc.classList.add("dropdown-item");

    doc.onclick = (function () {
      var selectedYear = i;
      return function () {
        year = selectedYear;
        document.getElementById("curYear").innerHTML = year;
        loadCalendarDays();
        return year;
      }
    })();

    document.getElementById("years").appendChild(doc);
  }
}



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
  //loadCalendarYears();
  loadCalendarDays();
});

// //this function will find today's date
// function calendar() {
//   var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   var d = new Date();
//   setText('calendar-day', day[d.getDay()]);
//   setText('calendar-date', d.getDate());
//   setText('calendar-month-year', month[d.getMonth()] + ' ' + (1900 + d.getYear()));
// };

// //this function will set the text value of 
// tags
// function setText(id, val) {
//   if (val < 10) {
//     val = '0' + val;    //add leading 0 if val < 10
//   }
//   document.getElementById(id).innerHTML = val;
// };

// //call calendar() when page load
// window.onload = calendar;

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
  }
  else {//if something is already in local storage, it appends the next input
    let a = localStorage.getItem('day');
    a += ';' + dayInput;
    localStorage.setItem("day", a);

    a = localStorage.getItem('month');
    a += ';' + monthInput;
    localStorage.setItem("month", a);

    a = localStorage.getItem('year');
    a += ';' + yearInput;
    localStorage.setItem("year", a);

    a = localStorage.getItem('startHour');
    a += ';' + startHourInput;
    localStorage.setItem("startHour", a);

    a = localStorage.getItem('endHour');
    a += ';' + endHourInput;
    localStorage.setItem("endHour", a);

    a = localStorage.getItem('eventTitle');
    a += ';' + eventTitleInput;
    localStorage.setItem("eventTitle", a);

  }
}


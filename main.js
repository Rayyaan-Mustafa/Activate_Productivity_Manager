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
  document.querySelector('#insightBtn').value = "Generate insights for " + months[currmonth] + " " + currday + ", " + curryear;
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
  var eventlist = eventComposite.getChild(curryear);
  if (eventlist != -1) {
    eventlist = eventlist.getChild(currmonth + 1);
    if (eventlist != -1) {
      eventlist = eventlist.getChild(currday);
      if (eventlist != -1) {
        for (var i = 0; i < eventlist.numEvents; i++) {
          result += eventlist.getChild(i).stringify();
        }
      }
    }
  }

  if (result == "") {
    result = "<br>Empty";
  }
  document.getElementById("events").innerHTML = "<br>Events for " + months[currmonth] + " " + currday + "<br>";
  document.getElementById("eventlist").innerHTML = result;

}

window.addEventListener('load', function () {
  var date = new Date();
  currmonth = date.getMonth();
  curryear = date.getFullYear();
  currday = date.getDate();
  document.getElementById("curMonth").innerHTML = months[currmonth];
  document.getElementById("curYear").innerHTML = curryear;
  loadCalendarDays();
  loadEventList();
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
  eventComposite.addComponent(new ActivateEvent(dayInput, monthInput, yearInput, startHourInput, endHourInput, eventTitleInput));

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
  //if (localStorage.length == 0) {
  if (!localStorage.getItem("day")) {
    return 0
  }
  else {
    return localStorage.getItem("day").split(';').length;
  }
}

// function getHoursOfEvent(){//(string of localstorage key)

// }

function createPreviousArray() {//on page refresh eventsContainer is emptied, so we need this function
  if (getNumOfEvents() == 0) {//if LS is empty, do nothing
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
      eventsContainer.push(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]));
      eventComposite.addComponent(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]));
    }
  }

}

//composite components
class ActivateBase {
  constructor() {
    this.years = [];
    this.numYears = 0;
  }
  addComponent(event) {
    for (var i = 0; i < this.numYears; i++) {
      if (this.years[i].year == event.year) {
        this.years[i].addComponent(event);
        return;
      }
    }
    this.years.push(new ActivateYear(event.year));
    this.years[this.numYears].addComponent(event);
    this.numYears++;
  }
  getChild(year) {
    for (var i = 0; i < this.numYears; i++) {
      if (this.years[i].year == year) {
        return this.years[i];
      }
    }
    return -1;
  }
}
class ActivateYear {
  constructor(year) {
    this.year = year;
    this.numMonths = 0;
    this.months = [];
  }
  addComponent(event) {
    for (var i = 0; i < this.numMonths; i++) {
      if (this.months[i].month == event.month) {
        this.months[i].addComponent(event);
        return;
      }
    }
    this.months.push(new ActivateMonth(event.month));
    this.months[this.numMonths].addComponent(event);
    this.numMonths++;
  }
  getChild(month) {
    for (var i = 0; i < this.numMonths; i++) {
      if (this.months[i].month == month) {
        return this.months[i];
      }
    }
    return -1;
  }
}
class ActivateMonth {
  constructor(month) {
    this.month = month;
    this.numDays = 0;
    this.days = [];
  }
  addComponent(event) {
    for (var i = 0; i < this.numDays; i++) {
      if (this.days[i].day == event.day) {
        this.days[i].addComponent(event);
        return;
      }
    }
    this.days.push(new ActivateDay(event.day));
    this.days[this.numDays].addComponent(event);
    this.numDays++;
  }
  getChild(day) {
    for (var i = 0; i < this.numDays; i++) {
      if (this.days[i].day == day) {
        return this.days[i];
      }
    }
    return -1;
  }
}
class ActivateDay {
  constructor(day) {
    this.day = day;
    this.numEvents = 0;
    this.events = [];
  }
  addComponent(event) {
    this.events.push(event);
    this.numEvents++;
  }
  getChild(index) {
    return this.events[index];
  }
}
//concrete component
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
    eventComposite = new ActivateBase();
  }
  //displaypolarChart();
  clearinsight();
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

function displayPolarChart() {//MOST LIKE BETTER TO IMPLEMENT THIS AS A BAR CHART
  let polarChart = document.getElementById('PolarChart').getContext('2d');

  window.chart = new Chart(polarChart, {
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

class insightManager {
  constructor() {
    this._strategies = [];
  }
  addStrategy(strategy) {
    this._strategies = [...this._strategies, strategy];
  }
  getStrategy(name) {
    return this._strategies.find(strategy => strategy._name === name);
  }
}

class Strategy {
  constructor(name, handeler) {
    this._name = name;
    this._handeler = handeler;
  }
  doAction() {
    this._handeler();
  }
}

doActionDiet = () => {
  var eatingTime = 0;
  var end = 0;
  var insight = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    //console.log(item);
    console.log(currday + " " + currmonth + " " + curryear);
    if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'eating') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      eatingTime += Math.abs(item.startHour - end);
    }
  }

  if (eatingTime < "2") {
    insight = "Eating is important. Consider spending more time eating."
  }
  else if (eatingTime > "3") {
    insight = "Eating is taking a considerable amount of time. Consider cutting it down."
  }
  else {
    insight = "Looks good!";
  }

  document.getElementById("Diet Insights").innerHTML = "<br>Insights for Eating</br>";
  document.getElementById("Dtime").innerHTML = "Time spent eating: " + eatingTime + " hours";
  document.getElementById("Dinsight").innerHTML = insight;
}

doActionWork = () => {
  var workTime = 0;
  var productiveWork = 0;
  var end = 0;
  var insight = "";
  var insight2 = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    //console.log(item);
    if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'work') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      workTime += Math.abs(item.startHour - end);
    }
    else if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'productive-work') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      productiveWork += Math.abs(item.startHour - end);
    }
  }

  if (workTime <= "2") {
    insight = "Don't you have something to do?"
  }
  else if (workTime >= "10") {
    insight = "Work is taking a considerable amount of time. Remember to take breaks."
  }
  else {
    insight = "Looks good!";
  }

  if (productiveWork <= "2") {
    insight2 = "Stop slacking!"
  }
  else if (productiveWork >= "10") {
    insight2 = "Productive Work is taking a considerable amount of time. Very nice but remember to take breaks."
  }
  else {
    insight2 = "Looks good!";
  }

  document.getElementById("Work Insights").innerHTML = "<br>Insights for Working</br>";
  document.getElementById("Wtime").innerHTML = "Time spent working: " + workTime + " hours";
  document.getElementById("Winsight").innerHTML = insight;
  document.getElementById("Ptime").innerHTML = "Time spent on productive work: " + productiveWork + " hours";
  document.getElementById("Pinsight").innerHTML = insight2;
}

doActionSleep = () => {
  var sleepTime = 0;
  var end = 0;
  var insight = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    //console.log(item);
    if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'sleep') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      sleepTime += Math.abs(item.startHour - end);
    }
  }

  if (sleepTime < "7") {
    insight = "Sleep is important. Consider spending more time sleeping."
  }
  else if (sleepTime >= "12") {
    insight = "Sleeping is taking a considerable amount of time. Consider cutting it down."
  }
  else {
    insight = "Looks good!";
  }

  document.getElementById("Sleep Insights").innerHTML = "<br>Insights for Sleeping</br>";
  document.getElementById("Stime").innerHTML = "Time spent Sleeping: " + sleepTime + " hours";
  document.getElementById("Sinsight").innerHTML = insight;
}

doActionRelax = () => {
  var downTime = 0;
  var end = 0;
  var insight = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    //console.log(item);
    if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'downtime') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      downTime += Math.abs(item.startHour - end);
    }
  }

  if (downTime < "2") {
    insight = "Relaxing is important. Consider spending more time relaxing."
  }
  else if (downTime >= "12") {
    insight = "Downtime is taking a considerable amount of time. Consider cutting it down to stay productive."
  }
  else {
    insight = "Looks good!";
  }

  document.getElementById("Relax Insights").innerHTML = "<br>Insights for Downtime</br>";
  document.getElementById("Rtime").innerHTML = "Time spent in downtime: " + downTime + " hours";
  document.getElementById("Rinsight").innerHTML = insight;
}


doActionExercise = () => {
  var exerciseTime = 0;
  var end = 0;
  var insight = "";
  for (var i = 0; i < getNumOfEvents(); i++) {
    var item = eventsContainer[i];
    console.log(item);
    if (parseInt(item.day, 10) === currday && parseInt(item.month, 10) === currmonth + 1
      && parseInt(item.year, 10) === curryear && item.eventTitle === 'exercise') {
      if (item.startHour === "24") {
        end = "24" + item.endHour;
      }
      else {
        end = item.endHour;
      }
      exerciseTime += Math.abs(item.startHour - end);
    }
  }

  if (exerciseTime <= "0") {
    insight = "Exercise is important. Consider spending some time exercising to stay healthy."
  }
  else if (exerciseTime > "5") {
    insight = "Exercise is good but is taking a considerable amount of time. Consider cutting it down."
  }
  else {
    insight = "Looks good!";
  }

  document.getElementById("Exercise Insights").innerHTML = "<br>Insights for Exercising</br>";
  document.getElementById("Etime").innerHTML = "Time spent exercising: " + exerciseTime + " hours";
  document.getElementById("Einsight").innerHTML = insight;
}

function insightClient() {
  const stratM = new insightManager();
  const strategy1 = new Strategy('insightDiet', doActionDiet);
  const strategy2 = new Strategy('insightWork', doActionWork);
  const strategy3 = new Strategy('insightSleep', doActionSleep);
  const strategy4 = new Strategy('insightRelax', doActionRelax);
  const strategy5 = new Strategy('insightExercise', doActionExercise);

  stratM.addStrategy(strategy1);
  stratM.addStrategy(strategy2);
  stratM.addStrategy(strategy3);
  stratM.addStrategy(strategy4);
  stratM.addStrategy(strategy5);

  const strategyA = stratM.getStrategy('insightDiet');
  strategyA.doAction();

  const strategyB = stratM.getStrategy('insightWork');
  strategyB.doAction();

  const strategyC = stratM.getStrategy('insightSleep');
  strategyC.doAction();

  const strategyD = stratM.getStrategy('insightRelax');
  strategyD.doAction();

  const strategyE = stratM.getStrategy('insightExercise');
  strategyE.doAction();
}

function clearinsight() {
  document.getElementById("Diet Insights").innerHTML = "";
  document.getElementById("Dtime").innerHTML = "";
  document.getElementById("Dinsight").innerHTML = "";

  document.getElementById("Work Insights").innerHTML = "";
  document.getElementById("Wtime").innerHTML = "";
  document.getElementById("Winsight").innerHTML = "";
  document.getElementById("Ptime").innerHTML = "";
  document.getElementById("Pinsight").innerHTML = "";

  document.getElementById("Sleep Insights").innerHTML = "";
  document.getElementById("Stime").innerHTML = "";
  document.getElementById("Sinsight").innerHTML = "";

  document.getElementById("Relax Insights").innerHTML = "";
  document.getElementById("Rtime").innerHTML = "";
  document.getElementById("Rinsight").innerHTML = "";

  document.getElementById("Exercise Insights").innerHTML = "";
  document.getElementById("Etime").innerHTML = "";
  document.getElementById("Einsight").innerHTML = "";
}

function saveSettings() {
  const nameInput = document.querySelector('#changeName').value;
  localStorage.setItem("name", nameInput)
  document.querySelector('#homeName').innerHTML = localStorage.getItem("name")

}

function percentProductive() {
  downtimehours
  return Math.round((24 * 7 - downtimehours) / (24 * 7))
}
//page initialization stuff goes here
var eventComposite = new ActivateBase();
var eventsContainer = [];//array for each object 
createPreviousArray();


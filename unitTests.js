/* COMPOSITE TEST */
compositeUnitTest = () => {
  quickReset();
  console.log("Testing if all events present for 6/9/2020");
  createArray_tests(
    "9;9;8;8;9;8", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
    "1;1;1;1;1;0", "eating;work;productive-work;sleep;downtime;exercise"
  );
  currday = 9;
  currmonth = 6 - 1;
  curryear = 2020;
  loadEventList();
  var s = document.getElementById('eventlist').innerHTML;
  var t = document.getElementById('events').innerHTML;
  console.log(
    t.includes("Events for Jun 9"),
    s.includes("eating"),
    s.includes("work"),
    s.includes("downtime"),
  )
  quickReset();
  console.log("Testing for empty list");
  currday = 23;
  currmonth = 3 - 1;
  curryear = 2023;
  loadEventList();
  var s = document.getElementById('eventlist').innerHTML;
  var t = document.getElementById('events').innerHTML;
  console.log(
    t.includes("Events for Mar 23"),
    s.includes("Empty")
  )
  quickReset();
  console.log("Testing events with same date but different years");
  createArray_tests(
    "9;9;8;8;9;8", "6;6;6;6;6;6", "2020;1969;2020;2020;2020;2020", "0;0;0;0;0;0",
    "1;1;1;1;1;0", "eating;work;productive-work;sleep;downtime;exercise"
  );
  currday = 9;
  currmonth = 6 - 1;
  curryear = 2020;
  loadEventList();
  var s = document.getElementById('eventlist').innerHTML;
  var t = document.getElementById('events').innerHTML;
  console.log(
    t.includes("Events for Jun 9"),
    s.includes("eating"),
    !s.includes("work"),
    s.includes("downtime"),
  )
  quickReset();
}

/* STRATEGY TEST */
strategyUnitTest = () => {
  currday = 9;
  currmonth = 6-1;
  curryear = 2020;
  clearinsight();
  quickReset();
  console.log("Testing for insight (under)");
  createArray_tests(
    "9;9;9;9;9;9", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
    "1;1;1;1;1;0", "eating;work;productive-work;sleep;downtime;exercise"
  );
  insightClient();
  var s = document.getElementsByTagName('div1')[0].innerHTML;
  console.log(
    s.includes("Eating is important. Consider spending more time eating."),
    s.includes("Don't you have something to do?"),
    s.includes("Stop slacking!"),
    s.includes("Sleep is important. Consider getting more rest."),
    s.includes("Downtime is important. Consider spending more time relaxing."),
    s.includes("Exercise is important. Consider spending some time exercising to stay healthy."),
  )
  quickReset();
  clearinsight();
  console.log("Testing for insight (over)");
  createArray_tests(
    "9;9;9;9;9;9", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
    "12;12;12;12;12;12", "eating;work;productive-work;sleep;downtime;exercise"
  );
  insightClient();
  var s = document.getElementsByTagName('div1')[0].innerHTML;
  console.log(
    s.includes("Eating is taking a considerable amount of time. Consider cutting it down."),
    s.includes("Work is taking a considerable amount of time. Remember to take breaks."),
    s.includes("You are very porductive! Very nice but remember to take breaks."),
    s.includes("Sleeping is taking a considerable amount of time. Consider cutting it down."),
    s.includes("Downtime is taking a considerable amount of time. Consider cutting it down to stay productive."),
    s.includes("Exercise is good, but it's taking a considerable amount of time. Consider cutting it down."),
  )
  quickReset();
  clearinsight();
  console.log("Testing for insight (ok)");
  createArray_tests(
    "9;9;9;9;9;9", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
    "3;8;8;8;5;1", "eating;work;productive-work;sleep;downtime;exercise"
  );
  insightClient();
  var s = document.getElementsByTagName('div1')[0].innerHTML;
  console.log(
    s.includes("Looks good!"),
    s.includes("Looks good!"),
    s.includes("Looks good!"),
    s.includes("Looks good!"),
    s.includes("Looks good!"),
    s.includes("Looks good!"),
  )
  quickReset();
  clearinsight();
}

/* Unit Test helper functions */
quickReset = () => {
  localStorage.clear();
  eventsContainer = [];
  eventComposite = new ActivateBase();
  if (window.chart) { window.chart.destroy(); }
  loadEventList();
  clearinsight();
}

/* Unit Test helper functions */
quickReset = () => {
  localStorage.clear();
  eventsContainer = [];
  eventComposite = new ActivateBase();
  if (window.chart) { window.chart.destroy(); }
  loadEventList();
  clearinsight();
}

function createArray_tests(d, m, y, s, e, t) {
  localStorage.setItem('day', d);
  localStorage.setItem('month', m);
  localStorage.setItem('year', y);
  localStorage.setItem('startHour', s);
  localStorage.setItem('endHour', e);
  localStorage.setItem('eventTitle', t);
  var dayArr = localStorage.getItem("day").split(';')
  var monthArr = localStorage.getItem("month").split(';')
  var yearArr = localStorage.getItem("year").split(';')
  var startHourArr = localStorage.getItem("startHour").split(';')
  var endHourArr = localStorage.getItem("endHour").split(';')
  var eventTitleArr = localStorage.getItem("eventTitle").split(';')
  for (var i = 0; i < getNumOfEvents(); i++) {
    eventsContainer.push(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]));
    eventComposite.addComponent(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]));
  }
}
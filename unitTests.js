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

decoratorUnitTest = () => {//decorator can really only be tested through observing the visual representations. However, we can test some of the functions associated with the decorator pattern
  quickReset();
  createArray_tests(
    "8;8;8;8;8;8", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;1;2;3;4;5",
    "1;2;3;4;5;6", "eating;work;productive-work;sleep;downtime;exercise"
  );

  console.log("Testing total_hrs_by_event() function");
  if( total_hrs_by_event("downtime") == 1 &&
      total_hrs_by_event("eating") == 1 && 
      total_hrs_by_event("exercise") == 1 && 
      total_hrs_by_event("productive-work") == 1&& 
      total_hrs_by_event("sleep") == 1 && 
      total_hrs_by_event("work") == 1
    ){
    console.log(true);
    }
  else {
    console.log(false);
  }
  console.log("Testing bgTheme() and bcTheme() function");
  var bgDefault = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 198, 204, 0.2)',
          'rgba(189, 195, 204, 0.2)',
          'rgba(117, 196, 188, 0.2)',
          'rgba(226, 135, 145, 0.2)'
        ]
  var bgDark =   [
          'rgba(0,104,132,0.2)',
          'rgba(237,250,157,0.2)',
          'rgba(176,0,81,0.2)',
          'rgba(0,0,0,0.2)',
          'rgba(110,0,108,0.2)',
          'rgba(91,91,91,0.2)',
          'rgba(57,106,177,0.2)',
          'rgba(218,124,48,0.2)',
          'rgba(62,150,81,0.2)',
          'rgba(146,36,40,0.2)'
        ]
  var bcDefault = [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 198, 204, 1)',
          'rgba(189, 195, 204, 1)',
          'rgba(117, 196, 188, 1)',
          'rgba(226, 135, 145, 1)'
          ]
  var bcDark = [
          'rgba(0,104,132,1)',
          'rgba(237,250,157,1)',
          'rgba(176,0,81,1)',
          'rgba(0,0,0,1)',
          'rgba(110,0,108,1)',
          'rgba(91,91,91,1)',
          'rgba(57,106,177,1)',
          'rgba(218,124,48,1)',
          'rgba(62,150,81,1)',
          'rgba(146,36,40,1)'
          ]   
  localStorage.setItem("colorTheme", "default") 
   for(var i = 0; i< bgDefault.length; i++){
    console.log(bgTheme()[i] == bgDefault[i])
  }
   localStorage.setItem("colorTheme", "dark")
  for(var i = 0; i< bgDark.length; i++){
    console.log(bgTheme()[i] == bgDark[i])
  }
  localStorage.setItem("colorTheme", "default") 
   for(var i = 0; i< bcDefault.length; i++){
    console.log(bcTheme()[i] == bcDefault[i])
  }
   localStorage.setItem("colorTheme", "dark")
   for(var i = 0; i< bcDark.length; i++){
    console.log(bcTheme()[i] == bcDark[i])
  }
    


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
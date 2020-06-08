/* DECORATOR TEST */
decorUnitTest = () => {
    quickReset();
    console.log("Testing for insight (under)");
    createArray_tests(
      "8;8;8;8;8;8", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
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
    console.log("Testing for insight (over)");
    createArray_tests(
      "8;8;8;8;8;8", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
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
    console.log("Testing for insight (ok)");
    createArray_tests(
      "8;8;8;8;8;8", "6;6;6;6;6;6", "2020;2020;2020;2020;2020;2020", "0;0;0;0;0;0",
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
  }
  
  /* Unit Test helper functions */
  quickReset = () => {
    localStorage.clear();
    eventsContainer = [];
    eventComposite = new ActivateBase();
    if(window.chart) {window.chart.destroy();} 
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
      //eventComposite.addComponent(new ActivateEvent(dayArr[i], monthArr[i], yearArr[i], startHourArr[i], endHourArr[i], eventTitleArr[i]));
    }
  }
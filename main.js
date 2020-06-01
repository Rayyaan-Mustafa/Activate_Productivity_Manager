

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
}

// function createDropdown(identification, count) { 
//     for(var i=1; i<=count; i++){
//       var select = document.getElementById(identification);
//       var option = document.createElement("OPTION");
//       select.options.add(option);
//       option.text = i;
//       option.value = i;
//     }
// }

function submitInput(){
  const dayInput = document.querySelector('#day').value;
  const monthInput = document.querySelector('#month').value;
  const yearInput = document.querySelector('#year').value;
  const startHourInput = document.querySelector('#startHour').value;
  const endHourInput = document.querySelector('#endHour').value;
  const eventTitleInput = document.querySelector('#eventTitle').value;
  //e.preventDefault();//if this whole function doesnt work then just follow traveries method of event listenr
  if(localStorage.length == 0){
    localStorage.setItem("day",dayInput);
    localStorage.setItem("month",monthInput);
    localStorage.setItem("year",yearInput);
    localStorage.setItem("startHour",startHourInput);
    localStorage.setItem("endHour",endHourInput);
    localStorage.setItem("eventTitle",eventTitleInput);
  }
  else {//if something is already in local storage, it appends the next input
    let a = localStorage.getItem('day');
    a += ';' + dayInput;
    localStorage.setItem("day",a);

    a = localStorage.getItem('month');
    a += ';' + monthInput;
    localStorage.setItem("month",a);

    a = localStorage.getItem('year');
    a += ';' + yearInput;
    localStorage.setItem("year",a);

    a = localStorage.getItem('startHour');
    a += ';' + startHourInput;
    localStorage.setItem("startHour",a);

    a = localStorage.getItem('endHour');
    a += ';' + endHourInput;
    localStorage.setItem("endHour",a);

    a = localStorage.getItem('eventTitle');
    a += ';' + eventTitleInput;  
    localStorage.setItem("eventTitle",a);

  }
}
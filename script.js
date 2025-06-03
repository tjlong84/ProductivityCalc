function calcEndTime() {
  var inputStartTime = document.getElementById("startTime").value;
  var productiveHours = document.getElementById("productiveHours").value;
  var productiveMinutes = document.getElementById("productiveMinutes").value;
  var productivity = document.getElementById("productivity").value;
  var inputTimeDec =
    parseInt(inputStartTime.slice(0, 2)) +
    parseInt(inputStartTime.slice(3, 5)) / 60;
  var productiveTimeDec =
    parseInt(productiveHours) + parseInt(productiveMinutes) / 60;
  var totalTime = productiveTimeDec / (parseInt(productivity) / 100);
  var endTimeDec = inputTimeDec + totalTime;
  var n = new Date(0, 0);
  n.setSeconds(+endTimeDec * 60 * 60);
  var endTimeFormatted = formatAMPM(n);
  document.getElementById("outputTime").innerHTML = endTimeFormatted;
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

document.getElementById("startTime").addEventListener("change", calcEndTime);
document
  .getElementById("productiveHours")
  .addEventListener("change", calcEndTime);
document
  .getElementById("productiveMinutes")
  .addEventListener("change", calcEndTime);
document.getElementById("productivity").addEventListener("change", calcEndTime);

calcEndTime();

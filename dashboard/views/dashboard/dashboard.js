// Dashboard view
var table;
function dashboardView() {
  $('#login-view').hide();
  $('#dashboard-view').show();
  getEmployeesData();
  $('.header').show();
  $('#min, #max, #minHrs, #maxHrs').keyup(function() {
    table.draw();
  });
  $('#type').on('change', function() {
    table.draw();
  });
}
function padZero(str) {
  str += '';
  return str.length < 2 ? ('0' + str) : str;
}
// Format date
function formatDate(date) {
  var period = {},
    date = new Date(date);
  period.date = date.getDate() + "/" + padZero(date.getMonth() + 1) + "/" + date.getFullYear();
  period.time = padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
  return period;
}
// Working hours calculator
function dateDiff(inTime, outTime) {
  var t = Date.parse(new Date(outTime)) - Date.parse(new Date(inTime)),
    seconds = Math.floor((t / 1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hours = Math.floor(t / (1000 * 60 * 60)),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    timeDiff = "";
  if(hours>0){
    if(hours<10){
      timeDiff += "0"
    }
    timeDiff += hours + ":"
  }
  else{
    timeDiff = "00:";
  }
  if(minutes>0){
    if(minutes<10){
      timeDiff += "0"
    }
    timeDiff += minutes + ":"
  }
  else{
    timeDiff += "00:"
  }
  if(hours>0 || minutes>0 || seconds>0){
    if(seconds<10){
      timeDiff += "0"
    }
    timeDiff += seconds
  }
  return timeDiff;
}
// Parse employees data
function parseData() {
  var tbody = $('#ram-db > tbody')[0],
      checkIn = {},
      workingHrs;
  $(tbody).html('');
  empData.forEach(function(record) {
    var period = formatDate(record.date);
    if (record.schedule === 'Check-In') {
      checkIn[record.id] = record.date;
    } else {
      workingHrs = dateDiff(checkIn[record.id], record.date);
    }
    var index = record.imageurl.lastIndexOf('upload/') + 7;
    var thumbnail = record.imageurl.slice(0, index) + 'h_120/' + record.imageurl.slice(index, record.imageurl.length);
    var tr = $('<tr/>').appendTo(tbody);
    tr.append('<td>' + record.id + '</td>');
    tr.append('<td>' + record.email + '</td>');
    tr.append('<td>' + record.name + '</td>');
    tr.append('<td>' + period.date + '</td>');
    tr.append('<td>' + period.time + '</td>');
    tr.append('<td>' + record.schedule + '</td>');
    if (record.schedule === 'Check-In') {
      tr.append('<td>NA</td>');
    } else {
      tr.append('<td>' + workingHrs + '</td>');
    }
    if (record.streetName && record.locality) {
      tr.append('<td>' + record.streetName + ', ' + record.locality + '</td>');
    } else if (record.streetName) {
      tr.append('<td>' + record.streetName + '</td>');
    } else if (record.locality) {
      tr.append('<td>' + record.locality + '</td>');
    } else {
      tr.append('<td> NA </td>');
    }
    tr.append('<td> <a class="preview" target="_blank" href="' + record.imageurl + '" ><img onload="adjustHeader();" src="' + thumbnail + '" /></a></td>');
    tbody.append()
  });
  $('.loader').hide();
  $('table, .refresh').show();
  table = $('#ram-db').DataTable({
    dom: 'B<"wrapper"lf>rtip',
    "iDisplayLength": 100,
    "columnDefs": [{
      "targets"  : 'no-sort',
      "orderable": false
    }],
    "order": [[ 3, "desc" ]],
    fixedHeader: true,
    buttons: [
      {
        extend: 'csv',
        className: 'btn btn-primary MRT5',
      },
      {
        extend: 'excel',
        className: 'btn btn-primary MRT5'
      },
      {
        extend: 'pdf',
        className: 'btn btn-primary MRT5'
      }
    ]
  });
  imagePreview();
}
function adjustHeader() {
  table.fixedHeader.adjust();
}
// Fetch employees attendance data
function getEmployeesData() {
  if (table) {
    table.destroy();
  }
  $('.loader').show();
  $('table, .refresh').hide();
  empData = [];
  var query = firebase.database().ref("employees").orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.child("records").forEach(function(childSnapshot) {
      var userInfo;
      snapshot.child("info/" + childSnapshot.key).forEach(function(info){
        userInfo = info.val();
      });
      var childData = childSnapshot.val();
      Object.keys(childData).forEach(function(key) {
        empData.push($.extend(childData[key], userInfo));
      });
    });
    parseData();
  });
}
// Custom time filter for data table
$.fn.dataTable.ext.search.push(function( settings, data, dataIndex ) {
  // Hours filter
  var minHour = parseInt( $('#min').val().split(":")[0], 10 );
  var maxHour = parseInt( $('#max').val().split(":")[0], 10 );
  // Minutes filter
  var minMin = parseInt( $('#min').val().split(":")[1], 10 );
  var maxMin = parseInt( $('#max').val().split(":")[1], 10 );
  // Working hours filter
  var minWHrs = parseInt( $('#maxHrs').val(), 10 );
  var maxWHrs = parseInt( $('#minHrs').val(), 10 );
  // Type filter
  var type = $('#type').val();
  // Data values
  var hour = parseFloat( data[4].split(":")[0] ) || 0;
  var min = parseFloat( data[4].split(":")[1] ) || 0;
  var wHrs;

  if ((minWHrs || maxWHrs) && data[6] === 'NA') {
    wHrs = 'NA';
  } else {
    wHrs = parseFloat( data[6].split(":")[0] ) || 0;
  }

  if( !isNaN(maxHour) && isNaN(maxMin)) {
    maxMin = 0;
  }

  if (type !=='all' && type !== data[5]) {
    return false;
  }

  if ( ( isNaN( minHour ) && isNaN( maxHour ) ) || ( isNaN( minHour ) && hour <= maxHour ) || ( minHour <= hour   && isNaN( maxHour ) ) || ( minHour <= hour   && hour <= maxHour ) ) {
    if ( ( isNaN( minMin ) && isNaN( maxMin ) ) || ( isNaN( minMin ) && min <= maxMin ) || ( minMin <= min   && isNaN( maxMin ) ) || ( minMin <= min   && min <= maxMin ) || ( hour > minHour ) || ( hour < maxHour ) ) {
      if ( wHrs !== 'NA' && ( isNaN( minWHrs ) && isNaN( maxWHrs ) ) || ( isNaN( minWHrs ) && wHrs <= maxWHrs ) || ( minWHrs <= wHrs   && isNaN( maxWHrs ) ) || ( minWHrs <= wHrs   && wHrs <= maxWHrs ) ) {
        return true;
      }
    }
  }
  return false;
});


// Image preview
function imagePreview() {
  var xOffset = 300,
      yOffset = 30;
  $(".preview").hover(function(e) {
    var img = $(this).find("img");
    var pos = img.position();
    this.t = this.title;
    this.title = "";  
    var c = (this.t != "") ? "<br/>" + this.t : "";
    $("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");
    $("#preview")
    .css("top", (pos.top - 80)  + "px")
    .css("left", (pos.left - 250) + "px")
    .fadeIn("fast");
  },
  function(){
    this.title = this.t;
    $("#preview").remove();
  });
};

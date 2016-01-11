var UI = require('ui');
var ajax = require('ajax');
var URL = 'https://home.v.icario.us/';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'HomeState',
  subtitle:'Fetching...'
});
// Display the Card
card.show();


// the request 
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched HomeState!');
    var status = "";
    
    if(data.state.open === true) {status = "Open";}
    else if(data.state.open === false){status = "Closed";}
    else{status = "ERROR";}
    
    // get lastchanged date + time
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = hour + ':' + min + ':' + sec + '\n' + date + ' ' + month + ' ' + year ;
        return time;
    }

    // show to user 
    card.subtitle("Status: " + status);   
    card.body("Changed: " + timeConverter(data.state.lastchange));
  },
  
  function(error) {
    // Failure!
    console.log('Failed fetching HomeState: ' + error);
  }
  
);
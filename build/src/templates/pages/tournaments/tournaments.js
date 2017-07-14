function getTourneys(){
  var tourneyDiv = document.getElementById('tournaments-container'); 
  var html = ''; 
  for(key in _Tournaments){
    var tourn = _Tournaments[key]; 
    html += '<div class="tournament-container">Table Size: ' + tourn.tableSize + 
    ' <br>Status:  ' + tourn.status + 
    ' <br>Entries: ' +
    '</div>'; 
  }
  tourneyDiv.innerHTML = html; 
}

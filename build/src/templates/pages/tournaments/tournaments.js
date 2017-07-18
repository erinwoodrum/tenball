function getTourneys(){ 
  if(!window['_Tournaments']) return; 
  var tourneyDiv = document.getElementById('tournaments-container'); 
  var html = ''; 
  for(key in _Tournaments){
    var tourn = _Tournaments[key]; 
    html += '<div class="tournament-container">' +
      '<div class="data-item">' + 
        '<div class="label">Table Size: </div>' + tourn.tableSize + 
      '</div>' + 
      '<div class="data-item">' + 
        '<div class="label">Status:  </div>' + tourn.status + 
    ' </div>' + 
    '<div class="data-item">' + 
      '<div class="label">Entries: </div></div>'; 
      
    if(_User.data.tickets && _User.data.tickets > 0){
      html += '<div class="next-step-button light-blue-bg" onclick="router.changePage(\'entry\',\'' + key + '\')">Enter Tournament</div></div>'; 
    } else {
      html += '<div class="next-step-phrase light-blue-bg" onclick="router.changePage(\'ticket\')">' + 
      'Purchase a ticket in order to enter this tournament</div></div>'; 
    }
  }
  tourneyDiv.innerHTML = html; 
}
getTourneys(); 
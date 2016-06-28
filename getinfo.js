$(document).ready(function(){

  var objArr; 

  var data = {
    resource_id: '346d58fc-b7c1-4c38-bf4d-c9d5fb43ce7b', // the resource id
    //limit: 5 get 5 results
   //q: 'jones' // query for 'jones'
  };
  $.ajax({
    url: 'https://data.qld.gov.au/api/action/datastore_search',
    data: data,
    dataType: 'jsonp',
    success: function(data) {
      objArr = data.result.records;

      //SORT THE TABLE BY SUBURB NAME
      objArr.sort(function(x,y){
        var suburbX = x.Suburb.toUpperCase(); 
        var suburbY = y.Suburb.toUpperCase();  
        if(suburbX > suburbY){
          return 1;
        } 
        if(suburbY > suburbX){
          return -1;
        }
      });

      for(var i = 0; i < objArr.length; i++){
        objArr[i]["Display Date"] = objArr[i]["Display Date"].replace('T00:00:00', '');
      }
    }
  });

  //PUT ALL THE VALUES INTO THE TABLE
  $("form").submit(function(event){
    var suburbValue = new String($("#suburbInput").val());
    console.log(suburbValue);
    suburbValue = suburbValue.toUpperCase();  
    $("td").remove();
    var txt = "";
    for(var i = 0; i < objArr.length; i++){
    //use == because suburbValue is class String whereas objArr[i].Suburb is a primative string
        if(suburbValue == objArr[i].Suburb || suburbValue == objArr[i].PCode){
          txt += "<tr><td>" + objArr[i]["Display Date"] + "<td>" + objArr[i].PCode + "<td>" + objArr[i].Suburb + "<td>" + objArr[i]["Times(s)"] + "<tr>";
        }
        else{
          console.log(suburbValue + "!=" + objArr[i].PCode);
        }
      }
      $("table").append(txt);
      event.preventDefault();
    });

    $("button").click(function(){
    console.log("Clicked da button");
    $("td").remove();
    var txt = "";
    for(var i = 0; i < objArr.length; i++){
      txt += "<tr><td>" + objArr[i]["Display Date"] + "<td>" + objArr[i].PCode + "<td>" + objArr[i].Suburb + "<td>" + objArr[i]["Times(s)"] + "<tr>";
    }
    $("table").append(txt);
  });
});
var Events = [];
var Projects = [];
var Galleries = [];
var baseUrl = "https://statesman4.github.io/AAAA/AAAA/AAAA";

function hitApi(url, callback) {
  var req = new XMLHttpRequest();

  req.addEventListener('load', onLoad);
  req.addEventListener('error', onFail);
  req.addEventListener('abort', onFail);

  req.open('GET', url);
  req.send();

  function onLoad(event) {
    if (req.status >= 400) {
      onFail(event);
    } else {
      var json = JSON.parse(this.responseText);
      callback(null, json);
    }
  }

  function onFail(event) {
    callback(new Error('...'));
  }
}
var GetEventsFromAPI = function(){
  hitApi(baseUrl + "/Assets/models/events.js", function(error, data) {
    if (error) {
      LoadingError(error);
    } else {
      TransformEventData(data);
    }
  });
}
var GetProjectsFromAPI = function(){
  hitApi(baseUrl + "/Assets/models/projects.js", function(error, data) {
    if (error) {
      LoadingError(error);
    } else {
      TransformProjectData(data);
    }
  });
}
var GetGalleriesFromAPI = function(){
  hitApi(baseUrl + "/Assets/models/gallery.js", function(error, data) {
    if (error) {
      LoadingError(error);
    } else {
      TransformGalleryData(data);
    }
  });
}
function GetEvents(){
  GetEventsFromAPI()
}
function GetProjects(){
  GetProjectsFromAPI();
}
function GetGalleries(){
  GetGalleriesFromAPI();
}
function LoadingError(error){
  $('#errorSection').removeClass('hideSection');
  $('#contentSection').addClass('hideSection');
}
var TransformEventData = function (results) {
  Events = [];
  totalRecords = results["count"];
  $.each(results.value, function (i, item) {
      Events.push({
          Name: item["Name"],
          Date: item['Date'],
          Description:item['Date'],
          FileName: item['File']
      });
  });
  return Events;
};
var TransformProjectData = function (results) {
  Projects = [];
  totalRecords = results["count"];
  $.each(results.value, function (i, item) {
    Projects.push({
          Name: item["Name"],
          Date: item['Date'],
          Description:item['Date'],
          FileName: item['File']
      });
  });
  return Projects;
};
var TransformGalleryData = function (results) {
  Galleries = [];
  totalRecords = results["count"];
  $.each(results.value, function (i, item) {
    Galleries.push({
          Name: item["Name"],
          Date: item['Date'],
          Description:item['Date'],
          FileName: item['File']
      });
  });
  return Galleries;
};
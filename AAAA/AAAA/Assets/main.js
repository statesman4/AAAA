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
  totalRecords = results.events.length;
  $.each(results.events, function (i, item) {
      Events.push({
          Id: item["Id"],
          Name: item["Name"],
          Date: item['Date'],
          Description: item['Description'],
          FileName: item['File']
      });
  });
  $('#eventItemsDiv').removeClass('hidden');
    if ($.fn.dataTable.isDataTable('#eventItem')) {
        $('#eventItem').DataTable().destroy();
    }
    $('#eventItem')
        .DataTable({
            data: Events,
            "paging": true,
            "ordering": true,
            "order": [[0, "desc"]],
            "info": true,
            "searching": true,
            "pageLength": 25,
            language: {
                 searchPlaceholder: "  Search",
                search: ""
            },
            columnDefs: [
                { "width": "25%", className: "map-table-td mobile-hide", targets: 0 },
                { "width": "15%", className: "map-table-td", targets: 1 },
                { "width": "35%", className: "map-table-td", targets: 2 },
                { "width": "25%", className: "map-table-td", targets: 3 }
            ],
            'columns': [
                {
                    'data': 'Name'
                },
                {
                    'data': 'Date'
                },
                {
                    'data': 'Description'
                },
                {
                  'render': function (data, type, full, meta) {
                      return '<a class="customLink" onClick = "ItemDetails(\'' + full.FileName + '\')">' + full.FileName + '</a>';
                }
              },
              
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).addClass('line-on-bottom hidden-cell');
            }
        });
  //return Events;
};
var TransformProjectData = function (results) {
  Projects = [];
  totalRecords = results.projects.length;
  $.each(results.projects, function (i, item) {
    Projects.push({
          Id: item["Id"],
          Name: item["Name"],
          Date: item['Date'],
          Description: item['Description'],
          FileName: item['File']
      });
  });
  $('#projectItemDiv').removeClass('hidden');
  if ($.fn.dataTable.isDataTable('#projectItem')) {
      $('#projectItem').DataTable().destroy();
  }
    $('#projectItem')
      .DataTable({
          data: Projects,
          "paging": true,
          "ordering": true,
          "order": [[0, "desc"]],
          "info": true,
          "searching": true,
          "pageLength": 25,
          language: {
              searchPlaceholder: "  Search",
              search: ""
          },
          columnDefs: [
              { "width": "25%", className: "map-table-td mobile-hide", targets: 0 },
              { "width": "15%", className: "map-table-td", targets: 1 },
              { "width": "35%", className: "map-table-td", targets: 2 },
              { "width": "25%", className: "map-table-td", targets: 3 }
          ],
          'columns': [
              {
                  'data': 'Name'
              },
              {
                  'data': 'Date'
              },
              {
                  'data': 'Description'
              },
              {
                  'render': function (data, type, full, meta) {
                      return '<a class="linkColor" onClick = "ItemDetails(\'' + full.FileName + '\')">' + full.FileName + '</a>';
                  }
              },

          ],
          createdRow: function (row, data, dataIndex) {
              $(row).addClass('line-on-bottom hidden-cell');
          }
      });
  //return Projects;
};
var TransformGalleryData = function (results) {
  Galleries = [];
  totalRecords = results.galleries.length;
  $.each(results.galleries, function (i, item) {
    Galleries.push({
          Id: item["Id"],
          Name: item["Name"],
          Date: item['Date'],
          Description: item['Description'],
        });
  });
  $('#galleryItemDiv').removeClass('hidden');
  if ($.fn.dataTable.isDataTable('#galleryItem')) {
      $('#galleryItem').DataTable().destroy();
  }
    $('#galleryItem')
    .DataTable({
        data: Galleries,
        "paging": true,
        "ordering": true,
        "order": [[0, "desc"]],
        "info": true,
        "searching": true,
        "pageLength": 25,
        language: {
            searchPlaceholder: "  Search",
            search: ""
        },
        columnDefs: [
            { "width": "50%", className: "map-table-td mobile-hide", targets: 0 },
            { "width": "20%", className: "map-table-td", targets: 1 },
            { "width": "30%", className: "map-table-td", targets: 2 }
        ],
        'columns': [
            {
                'data': 'Name'
            },
            {
                'data': 'Date'
            },
            {
                'render': function (data, type, full, meta) {
                    return '<a class="linkColor" onClick = "GelleryDetails(\'' + full.Id + '\')">Picture Gallery</a>';
                }
            }
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).addClass('line-on-bottom hidden-cell');
        }
    });
  return Galleries;
};
function ItemDetails(file){
  if (file !== "") {
    window.open(file, "_blank");
  }
}
function GelleryDetails(Id) {
    //load all images that correspond to Id.
}
function escapeSpecialChars(jsonString) {

    return jsonString.replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f");

}
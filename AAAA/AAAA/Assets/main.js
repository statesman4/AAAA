var Events = [];
var Publications = [];
var PictureGalleries = [];
var baseUrl = "https://statesman4.github.io/AAAA/AAAA/AAAA";
//baseUrl = "http://127.0.0.1:5500/AAAA";

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
var GetPublicationsFromAPI = function(){
  hitApi(baseUrl + "/Assets/models/publications.js", function(error, data) {
    if (error) {
      LoadingError(error);
    } else {
      TransformPublicationData(data);
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
function GetPublications(){
  GetPublicationsFromAPI();
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
          FileName: item['File'],
          Images: item['Images']
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
                { "width": "40%", className: "map-table-td", targets: 0 },
                { "width": "20%", className: "map-table-td", targets: 1 },
                { "width": "20%", className: "map-table-td", targets: 2 },
                { "width": "20%", className: "map-table-td", targets: 3 }
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
                        if (full.FileName === "") {
                            return full.FileName;
                        } else {
                            return '<span class="customLink" onClick = "ItemDetails(\'' + full.FileName + '\')">' + full.Name + '</span>';
                        }
                }
              },
              {
                   'render': function (data, type, full, meta) {
                    return '<span class="linkColor" onClick = "EventDetails(\'' + full.Id + '\')">Gallery</span>';
                }
              }
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).addClass('line-on-bottom hidden-cell');
            }
        });
  //return Events;
};
var TransformPublicationData = function (results) {
  Publications = [];
  totalRecords = results.publications.length;
  $.each(results.publications, function (i, item) {
    Publications.push({
          Id: item["Id"],
          Name: item["Name"],
          Date: item['Date'],
          Description: item['Description'],
          FileName: item['File']          
      });
  });
  $('#publicationItemDiv').removeClass('hidden');
  if ($.fn.dataTable.isDataTable('#publicationItem')) {
      $('#publicationItem').DataTable().destroy();
  }
    $('#publicationItem')
      .DataTable({
          data: Publications,
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
              { "width": "50%", className: "map-table-td", targets: 0 },
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
                      if (full.FileName === "") {
                          return full.FileName;
                      } else {
                          return '<span class="customLink" onClick = "ItemDetails(\'' + full.FileName + '\')">' + full.Name + '</span>';
                      }
                  }
              }
            ],
          createdRow: function (row, data, dataIndex) {
              $(row).addClass('line-on-bottom hidden-cell');
          }
      });
  //return Publications;
};
var TransformGalleryData = function (results) {
  PictureGalleries = [];
  totalRecords = results.galleries.length;
  $.each(results.galleries, function (i, item) {
      PictureGalleries.push({
          Id: item["Id"],
          Name: item["Name"],
          Date: item['Date'],
          Description: item['Description'],
          Images:item["Images"]
        });
  });
  $('#galleryItemDiv').removeClass('hidden');
  $('#noImages').addClass('hidden');
  //$('#gallerydetails').addClass('hidden');
  if ($.fn.dataTable.isDataTable('#galleryItem')) {
      $('#galleryItem').DataTable().destroy();
  }
    $('#galleryItem')
    .DataTable({
        data: PictureGalleries,
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
            { "width": "50%", className: "map-table-td", targets: 0 },
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
                    return '<span class="linkColor" onClick = "GelleryDetails(\'' + full.Id + '\')">Picture Gallery</span>';
                }
            }
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).addClass('line-on-bottom hidden-cell');
        }
    });
    return PictureGalleries;
};
function ItemDetails(file){
  if (file !== "") {
    window.open(file, "_blank");
  }
}
function EventDetails(Id){
  /* if (file !== "") {
    window.open(file, "_blank");
  } */
  $('#eventdetails').removeClass('hidden');
  $('#eventimages img').remove();
    var selectedEvent = $.grep(Events, function (e) {
        return e.Id.toString() === Id.toString();
    });
    if (selectedEvent.length === "") {
        $('#noEventImages').removeClass('hidden');
    } else {
        $('#selectedEventName').text(selectedEvent[0].Name);
        $.each(selectedEvent, function (i, item) {
            if (item.Images && item.Images.length > 0) {
              $('#eventimages').removeClass('hidden');
              $('#noEventImages').addClass('hidden');
              $('#eventimages').empty();
                $.each(item.Images, function (y, img) {
                    $('#eventimages').prepend('<a href="' + img.Path + '" target="_blank">' + img.Display + '</a>')
                });
            } else {
                $('#noEventImages').removeClass('hidden');
                $('#eventimages').addClass('hidden');
            }
        });
    }
}
function GelleryDetails(Id) {

    $('#gallerydetails').removeClass('hidden');
    $('#galleryimages img').remove();
    var selectedGallery = $.grep(PictureGalleries, function (e) {
        return e.Id.toString() === Id.toString();
    });
    if (selectedGallery.length === "") {
        $('#noImages').removeClass('hidden');
    } else {
        $('#selectedGalleryName').text(selectedGallery[0].Name);
        $.each(selectedGallery, function (i, item) {
            if (item.Images && item.Images.length > 0) {
                $.each(item.Images, function (y, img) {
                    $('#galleryimages').prepend('<img id="' + parseInt(y) + parseInt(1) + '" src="' + img.Path + '" class="smallerImage" onClick="openModalImage(\'' + parseInt(y) + parseInt(1) + '\');"/>')
                });
            } else {
                $('#noImages').removeClass('hidden');
            }
        });
    }
}

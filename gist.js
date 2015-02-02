
function saveFavorite(id)
{
  var favoritesList = JSON.parse(localStorage.getItem('favoritesList'));

  if (!favoritesList)
    favoritesList = new Array();

  favoritesList.push(id);

  localStorage.setItem('favoritesList', JSON.stringify(favoritesList));

}



function searchGist()
{
  var url = 'https://api.github.com/gists/public?page=1&per_page=';
  var httpRequest;
  var gistRequest;
  var numberPages = document.getElementsByName('numberPages')[0].value;
  var python = document.getElementsByName('python')[0].checked;
  var json = document.getElementsByName('json')[0].checked;
  var javaScript = document.getElementsByName('javaScript')[0].checked;
  var sql = document.getElementsByName('sql')[0].checked;
  var ul = document.getElementById('gist_results');
  var entry;

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  if (window.XMLHttpRequest)
  {
    httpRequest = new XMLHttpRequest();
  }

  else if (window.ActiveXObject)
  {
    httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
  }

  httpRequest.open('GET', url + (numberPages * 30), false);
  httpRequest.send();



  gistRequest = JSON.parse(httpRequest.responseText);




  for (var i = 0; i < gistRequest.length; i++)
  {
    var language;

    for (varKey in gistRequest[i].files)
      language = gistRequest[i].files[varKey].language;


    if (!json && !python && !javaScript && !sql)
    {
      gistDisplay(ul, gistRequest[i].url,
      gistRequest[i].description, gistRequest[i].id);
    }
    else
    {
      if (json && (language == 'JSON'))
        gistDisplay(ul, gistRequest[i].url,
        gistRequest[i].description, gistRequest[i].id);
      if (python && (language == 'Python'))
        gistDisplay(ul, gistRequest[i].url,
        gistRequest[i].description, gistRequest[i].id);
      if (javaScript && (language == 'JavaScript'))
        gistDisplay(ul, gistRequest[i].url,
        gistRequest[i].description, gistRequest[i].id);
      if (sql && (language == 'SQL'))
        gistDisplay(ul, gistRequest[i].url,
        gistRequest[i].description, gistRequest[i].id);
    }
  }
}


function gistDisplay(ul, url, description, id)
{
  var li = document.createElement('li');
  var a = document.createElement('a');
  var form = document.createElement('form');
  var favoriteButton = document.createElement('button');

  favoriteButton.type = 'button';
  favoriteButton.id = id;
  favoriteButton.addEventListener('click', function()
  {
    saveFavorite(id);
  }); 
  favoriteButton.textContent = 'Save Favorite';
  form.action = 'gist.html';
  form.method = 'get';
  a.href = url;
  if (!description)
    a.textContent = 'No Description';
  else
    a.textContent = description;

  form.appendChild(a);
  form.appendChild(favoriteButton);
  li.appendChild(form);
  ul.appendChild(li);
}


window.onload = function() {
  var favoritesList = JSON.parse(localStorage.getItem('favoritesList'));
  var table = document.getElementById('favorites_table');
  var ul = document.getElementById('gist_results');
  
  
  
  
  
  
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  
  
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var cellText = document.createTextNode('test');
  td.appendChild(cellText);
  tr.appendChild(td);
  table.appendChild(tr);

  if (favoritesList) {


    for (var i = 0; i < favoritesList.length; i++)
    {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      var cellText = document.createTextNode(favoritesList[i]);
      td.appendChild(cellText);
      tr.appendChild(td);
      table.appendChild(tr);


    }
  }

  


};



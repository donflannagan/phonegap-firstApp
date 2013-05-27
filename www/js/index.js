var db;

$('#reposHome').bind('pageinit', function(event) {
    loadRepos();
    
});

function loadRepos() {
    $.ajax("https://api.github.com/legacy/repos/search/javascript").done(function (data) {
        //data.repositories = data.repositories.sort(dynamicSort("name"));
        var i, repo;
        $.each(data.repositories, function (i, repo) {
            $("#allRepos").append("<li><a href='repodetail.html?owner=" + repo.username + "&name=" + repo.name + "'>"
            + "<h4>" + repo.name + "</h4>"
            + "<p>" + repo.username + "</p></a></li>");
        });
        $('#allRepos').listview('refresh');
    });
}

$('#reposDetail').live('pageshow', function(event) {
    var owner = getUrlVars().owner;
    var name = getUrlVars().name;
    loadRepoDetail(owner,name);
    $("#saveBtn").bind("click", saveFave);
    checkFave();
});

function loadRepoDetail(owner,name) {
     $.ajax("https://api.github.com/repos/" + owner + "/" + name).done(function(data) {
         var repo = data;
         console.log(data);

         $('#repoName').html("<a href='" + repo.homepage + "'>" + repo.name + "</a>");
         $('#description').text(repo.description);
         $('#forks').html("<strong>Forks:</strong> " + repo.forks + "<br><strong>Watchers:</strong> " + repo.watchers);

         $('#avatar').attr('src', repo.owner.avatar_url);
         $('#ownerName').html("<strong>Owner:</strong> <a href='" + repo.owner.url + "'>" + repo.owner.login + "</a>");
     });
}

function txSuccessFave() {
    console.log("Save success");
    disableSaveButton();
}

function disableSaveButton() {
    // change the button text and style
    var ctx = $("#saveBtn").closest(".ui-btn");
    $('span.ui-btn-text',ctx).text("Saved").closest(".ui-btn-inner").addClass("ui-btn-up-b");
    $("#saveBtn").unbind("click", saveFave);
}

function txSuccessCheckFave(tx,results) {
    console.log("Read success");
    console.log(results);
    if (results.rows.length)
         disableSaveButton();
}
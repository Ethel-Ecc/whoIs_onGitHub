$(document).ready(
    document.getElementById("userInput").addEventListener("input", userEntry)
);
// Making first calls to the AJAX API to get the user profile.
function userEntry(e) {
    "use strict";
    let userEntryValues = e.target.value;
    //make the ajax call to the GitHub API
    $.ajax({
        url:"https://api.github.com/users/"+userEntryValues,
        data:{
            client_id:"cdbdc6513ffbe63a46f2",
            client_secret:"74642d4319697d76b3390dfe0dedc1bdece4cbea"
        }
    }).done(function(ajaxResult){
        "use strict";
        searchResult(ajaxResult);
        //After displaying users info, make another call to display the repositories.
        $.ajax({
            url:"https://api.github.com/users/"+userEntryValues+"/repos",
            data:{
                client_id:"cdbdc6513ffbe63a46f2",
                client_secret:"74642d4319697d76b3390dfe0dedc1bdece4cbea",
                sort: "created: asc",
                per_page: 7
            }
        }).done(function (userRepos) {
            latestRepos(userRepos)
        });
    });

    e.preventDefault();
}
function searchResult(ajaxResult) {
    $("#displayResult").html(`
        <div class="card card-body">
            <h5 class="card-title">${ajaxResult.name}</h5>
            <div class="row">
                <div class="col-md-3">
                    <img class="thumbnail" style="width: 100%" src="${ajaxResult.avatar_url}">
                        <a href="${ajaxResult.html_url}" class="btn btn-outline-primary btn-block mt-2 " target="_blank">View User Info</a>
                </div>
                <div class="col-md-6">
                    <h5>
                        <span class="badge badge-dark"> Public Repos: ${ajaxResult.public_repos}  </span> 
                        <span class="badge badge-success"> Public Gists: ${ajaxResult.public_gists}  </span>
                        <span class="badge badge-danger"> Followers: ${ajaxResult.followers}  </span>
                        <span class="badge badge-primary"> Following: ${ajaxResult.following}  </span>
                    </h5>
                    <br>
                    <ul class="list-group">
                        <li class="list-group-item">Company:  ${ajaxResult.company}</li>
                            <li class="list-group-item">Location:  ${ajaxResult.location}</li>
                            <li class="list-group-item">Website/Blog:  ${ajaxResult.blog}</li>
                            <li class="list-group-item">Joined on:  ${ajaxResult.created_at}</li>
                        </ul>       
                </div>
            </div>
        </div>
        <div class="mt-3">
            <h4>Recent Repositories</h4><hr color="blue">
            <div id="userRepos"></div>
        </div><br><br>
        <div class="d-flex justify-content-center">
        <span> <strong>ECC </strong>&copy;2017  ||  Designed with <i class="fa fa-coffee"></i>&nbsp; and &nbsp;<i class="fa fa-music"></i></span>
        </div>
        
    `);
}
function latestRepos (userRepos) {
    userRepos.forEach(function (userRepo) {
        $("#userRepos").append(`
        <div class="card card-body">
            <div class="row">
                <div class="col-md-5">
                    <h5 class="card-title">${userRepo.name}:</h5>
                    <p>${userRepo.description}</p>
                </div>
                <div class="col-md-4">
                    <span class="badge badge-success"> Repo size: ${userRepo.size}  </span>
                    <span class="badge badge-danger"> Repo stars: ${userRepo.stargazers_count}  </span>
                    <span class="badge badge-primary"> Watchers: ${userRepo.watchers_count}  </span>
                </div>
                <div class="col-md-1">
                    <a href="${userRepo.html_url}" target="_blank"><button class="btn btn-outline-success btn-sm">View this Repo</button></a>
                </div>
        </div>
    `)
    });
}

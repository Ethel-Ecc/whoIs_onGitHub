$(document).ready(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;

		// This will make the AJAX request to the GitHUB API url. 
		// there are lot of diiferent functions to use, but $.ajax is nice. 
		// It will take in an object(also called a dictionary) with our parameters[url and data]
		$.ajax({
			url: 'https://api.github.com/users/'+username,
			data: {
				client_id:'cdbdc6513ffbe63a46f2',
				client_secret:'74642d4319697d76b3390dfe0dedc1bdece4cbea'
			}
		}).done(function (user){ 

				$.ajax({
					url: 'https://api.github.com/users/'+username+'/repos',
					data: {
						client_id:'cdbdc6513ffbe63a46f2',
						client_secret:'74642d4319697d76b3390dfe0dedc1bdece4cbea',
						sort: 'created: asc',
						per_page: 5
					}
				}).done(function(repos) {
					$.each(repos, function(index, repo){
						$("#repos").append(`
							<div class="well">
								<div class='row'> 
									<div class= "col-md-7">
										<strong>${repo.name}</strong>: ${repo.description}
									</div>
									<div class= "col-md-3">
										<span class="label label-default">Forks: ${repo.forks_count}</span>
										<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
										<span class="label label-success">Stars: ${repo.stargazers_count}</span>
									</div>
									<div class= "col-md-2">
									<a href="${repo.html_url}" target: "_blank" class= "btn btn-default"> View Repo </a>
									</div>
								</div>

							</div>

							`);
					});
				});

				$('#profile').html(`
					<div class="panel panel-default" style='margin-top:20px'>
					  <div class="panel-heading">
					    <h3 class="panel-title">${user.name}</h3>
					  </div>
					  <div class="panel-body">
					   <div class = 'row'>

					   		<div class= "col-md-3">
						   		<img class="thumbnail avatar" src="${user.avatar_url}">
						   		<a class="btn btn-success btn-block shadow" target="_blank" href='${user.html_url}'>View profile</a>
					   		</div>

					   		<div class='col-md-9'>
					   			<span class="label label-default">Public Repos: ${user.public_repos}</span>
								<span class="label label-primary">Public Gists: ${user.public_gists}</span>
								<span class="label label-success">Followers: ${user.followers}</span>
								<span class="label label-info">Folowing: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}</li>
									<li class="list-group-item">Website/Blog: ${user.blog}</li>
									<li class="list-group-item">Location: ${user.location}</li>
									<li class="list-group-item">Member Since: ${user.created_at}</li>
								</ul>
					   		</div>
					   </div>
					  </div>
					</div>

					<h3 class='page-header'>Latest Repositories</h3>
					<div id="repos"></div>
					`);
		});



	});
});
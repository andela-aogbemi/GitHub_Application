var gitFind = {
			username: $("#user_name"),
			searchButton: $("#search_button"),
			searchForUser: function() {
				var searchInput = gitFind.username.val().trim();
				console.log(searchInput);
				var url = "https://api.github.com/users/"+searchInput;
				$.getJSON(url, function (data) {
					console.log(data);
					var info = '<div id="users">';
						info += '<div id="avatar"><img src="'+data.avatar_url+'" alt="user avatar" width="200" height="200"></div>';
						info += '<div id="followers">Followers: '+data.followers+'</div>';
						info += '<div id="following">Following: '+data.following+'</div>';
						
					
					
					$.getJSON(data.repos_url, function(repos) {
						$.each(repos, function(key, value) {
								console.log(value.url);
								$('<li>'+value.url+'</li>').appendTo('#allRepos');
								$("ul").appendTo("#List");
						}); 
					});
				  $("#users").html(info);
				  info += '</div>';
				});
			}
};
gitFind.searchButton.click(gitFind.searchForUser);
$(document).ready(function() {
	$('#list').hide();
	$('#numOrg').hide();
	var gitFind = {
				username: $("#user_name"),
				searchButton: $("#search_button"),
				searchForUser: function() {
					$('form').submit(function (evt) {
						evt.preventDefault();

					$("#allRepos").children().remove();

					var searchInput = gitFind.username.val().trim();
					console.log(searchInput);
					var url = "https://api.github.com/users/"+searchInput;
					
					$.getJSON(url, function (data) {
						$('#error').html("");
						//console.log(data);
						var info = '<div id="users">';
							info += '<div id="avatar"><img src="'+data.avatar_url+'" alt="user avatar" width="200" height="200"></div>';
							info += '<div id="followers">Followers<br /> '+data.followers+'</div>';
							info += '<div id="following">Following<br /> '+data.following+'</div>';
							info += '<div id="numRepos">Repositories<br />'+data.public_repos+'</div>';
							
						$("#list").show();
						var repoUrl = "https://api.github.com/users/"+searchInput+"/repos";
						$.getJSON(repoUrl, function(repos) {
							$("").appendTo("#links");
							$.each(repos, function(key, value) {
									//console.log(value.html_url);
									$('<li id="links"><a href='+value.html_url+' target="_blank">'+value.name+'</a></li>').appendTo("#allRepos");
									$("ul").appendTo("#list");
							}); 
						});


						$("#numOrg").show();
						var orgUrl = "https://api.github.com/users/"+searchInput+"/orgs";
						$.getJSON(orgUrl, function(orgs) {
							//console.log("orgs", orgs);
							//console.log(orgs.length);
							$("#orgz").html('<div id="numOrg">Organizations<br />'+orgs.length+'</div>');
							});

					  $("#users").html(info);
					  info += '</div>';
					}).fail(function(error) {
						//console.log("Error: ",error);
						$('#error').html('<p>"An error occured. Try again!"</p>');
					});
				}); //end of form submit function
				}
	};
	gitFind.searchButton.click(gitFind.searchForUser);
});





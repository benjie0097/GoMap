var registerjs = true;

$(document).on('click', '#back_to_login', function(e){
	e.preventDefault();
	showLogin();
});

$(document).on('submit', '#form_register', function(e) {
	e.preventDefault();
	var formdata = $(this).serialize();

	if($('#password').val() == $('#confirm_password').val()) {
		$('.loading-overlay').removeClass('hide');
		$.ajax({
			type: "POST",
			url: "https://zbenedictjhon88.000webhostapp.com/register.php",
			data: formdata,
			success: function(data) {
				var result = JSON.parse(data);
				console.log(result);

				if (result.isError == 0) {
				 	M.toast({html: "Username Already Exists!"});
				 	$('.loading-overlay').addClass('hide');
				} else  {
					$.getJSON(cordova.file.externalDataDirectory + 'config.json', function(data){
						console.log(data);
						data.account.id = result.account.id;
						data.account.firstname = result.account.firstname;
						data.account.lastname = result.account.lastname;
						data.account.username = result.account.username;
						data.account.password = result.account.password;
						data.account.role = result.account.role;

						saveJSON(data, "You're successfully logged-in!", function(){
							goToRegisteredUser();
							$('.loading-overlay').addClass('hide');
						});

					});
						//goToRegisteredUser();
						//$('.loading-overlay').addClass('hide');
				}
			},
			error: function (data) { // if error occured
                M.toast({html: "Something Went Wrong! Try Again."});
                $('.loading-overlay').addClass('hide');
            },
            dataType: 'html'
		});
	}
	else {
		M.toast({html: 'Password does not match!'});
	}
});
//var loginjs = true;
//document.cookie[0] = "";
//do//cument.cookie[1] = "";
//do//cument.cookie[2] = "";
//
$(document).on('submit', '#form_login', function(e){
////
	e.preventDefault();
	var formdata = $(this).serialize();

	$('.loading-overlay').removeClass('hide');
	$.ajax({
		type: "POST",
		url: "https://zbenedictjhon88.000webhostapp.com/validate.php",
		data: formdata,
		success: function(result) {
				var result = JSON.parse(result);
				
				if (result.isError == 0) {
				 	M.toast({html: "Invalid Email or Password! Try Again."});
				 	$('.loading-overlay').addClass('hide');
				} else  {
					console.log(cordova.file);
					$.getJSON(cordova.file.applicationDirectory + 'data/config.json', function(data){

						console.log(data);
						data.account.id = result.id;
						data.account.firstname = result.firstname;
						data.account.lastname = result.lastname;
						data.account.username = result.username;
						data.account.password = result.password;
						data.account.role = result.role;
						saveJSON(data, "You're successfully logged-in!", function(){
							if(result.role == 1) {
								goToRegisteredUser();
								$('.loading-overlay').addClass('hide');
							} else {
								M.toast({html: "You're successfully logged-in!"});
								goToRegisteredUser();
								$('.loading-overlay').addClass('hide');
							}	
						});
					});
					// console.log(result.role);
					//Session["role"] = result.role;
					//Session["username"] = result.username;
					//Session["password"] = result.password;

					//if(result.role == 1) {
						//goToRegisteredUser();
					//	$('.loading-overlay').addClass('hide');
					//} else {
					//	M.toast({html: "You're successfully logged-in!"});
					//	goToRegisteredUser();
					//	$('.loading-overlay').addClass('hide');
					//}								
				}
			},
			error: function (data) { // if error occured
                M.toast({html: "Something Went Wrong! Try Again."});
                $('.loading-overlay').addClass('hide');
            },
           
	});
});

$(document).on('click', '#register', function(e){
	e.preventDefault();
	showRegister();
});

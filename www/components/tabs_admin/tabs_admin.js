var tabsadminjs = true;

$(document).on('click', '#home_tab', function(e) {
	e.preventDefault();
	$('.menu-panel').addClass('hide');
	$('.pinning-panel').addClass('hide');
});

$(document).on('click', '#road_status_tab', function(e) {
	e.preventDefault();
	$('.pinning-panel').removeClass('hide');
});

$(document).on('click', '#menu_tab', function(e) {
	e.preventDefault();
	$('.menu-panel').removeClass('hide');
});
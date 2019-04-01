var searchjs = true;
var destinationPolyLine = null;
var routePoints = [];

$(document).on('click', '#search_destination', function(e){
	e.preventDefault();
	searchDestination($('#destination_input').val());
});

$(document).on('change', 'input:radio[name="dest-evac"]', function(e){
	e.preventDefault();
	console.log($(this).val());
	switch($(this).val()) {
		case 'destination':
		$('#dest-evac-search div.select-wrapper').addClass('hide');
		$('#dest-evac-search>div>input').removeClass('hide');
		$('#search_destination').removeClass('hide');
		break;
		case 'evacuation':
		$('#dest-evac-search>div>input').addClass('hide');
		$('#search_destination').addClass('hide');
		$('#dest-evac-search div.select-wrapper').removeClass('hide');
		break;
	}
	$('#map_canvas').css('top', $('header').height() + $('#dest-evac').height() + 'px');
});

$(document).on('change', '#dest-evac-search select', function(e){
	e.preventDefault();
	searchDestination($(this).val());
});
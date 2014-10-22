$(document).ready(set_box);
	
/*function intiate(){	
	$('#nav').load('sub_page/nav.html');
	$("#bottom_footer").load('sub_page/footer.html');
}*/

function set_box(){
	$largest=0;
	$('.two_cols .box_embossing').each(function(index,value){
		//console.log(jQuery(value).css('height'));
		if(largest<jQuery(value).css('height'))
		{
			$largest=jQuery(value).css('height');
		}
	});
}
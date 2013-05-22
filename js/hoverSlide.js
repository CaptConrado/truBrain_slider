/* Begin: HoverSlide
/* created 11/09 by Rich Rudzinski
/*------------------------------------------*/
// init
function hoverSlide() {
	var obj = this;
	this.container = $('hoverSlide');
	this.active = $('#hoverSlide .active')[0];
	this.slideItems = $('#hoverSlide .slide');	

	this.slideItems.each(function() {
		$(this).attr('rel', 72 * $(this).attr('id').replace('slide', '') - 72);
		obj.itemAnimate(this);
	});
}	

// handle item events	
hoverSlide.prototype.itemAnimate = function(item) {
	var obj = this;
	$(item).mouseover(function() {
		if(!$(this).hasClass('active')) {
			for(x=1; x<obj.slideItems.length+1; x++) {
				$('#slide' + x).stop();
			}
			$(obj.active).removeClass('active');
			$('#'+$(obj.active).attr('id')+'_replace').replaceWith('<div id="'+$(obj.active).attr('id')+'_replace"></div>');
			obj.active = $(this);
			obj.active.num = Number(obj.active.attr('id').replace('slide', ''));
			$(this).addClass('active');
			for(i=obj.active.num+1; i<obj.slideItems.length+1; i++) {
				$('#slide' + i).animate({
					left: Number($('#slide' + i).attr('rel')) + 572 + 'px'
				}, 1000);
			}
			for(d=obj.active.num; d>= 0; d--) {
				$('#slide' + d).animate({
					left: $('#slide' + d).attr('rel') + 'px'
				}, 1000);
			}
		}
	});
	
}

function playerReady(obj) {
	var player = document.getElementById(obj['id']);
	player.addModelListener('STATE', 'stateChanged');
}

function stateChanged(obj) {
	if(obj.newstate == 'IDLE') {
		var player = document.getElementById(obj['id']);
		$(player).replaceWith('<div id="'+obj['id']+'"></div>');
	}
}


// 573
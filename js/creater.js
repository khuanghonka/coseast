var startStep={
	init:function(){
		$('#startBtn').on('click',startStep.start);
	},
	start:function(){
		basicStep.basic();
	},
	enable:function () {
		$('#startBtn').removeClass('hide');
		$('#startText').addClass('hide');
		$('#startDiv').fadeTo('slow', 1);
	},
	disable:function (argument) {
		$('#startBtn').addClass('hide');
		$('#startText').removeClass('hide');
		$('#startDiv').fadeTo('slow', 0.5);
	}
}
var basicStep={
	init:function () {
		$('#startChooseTypeBtn').on('click',basicStep.startChooseType);
	},
	enable:function () {
		$('#createBasicDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#createBasicDiv").offset().top}, 500);
		});
	},
	disable:function () {
		$('#createBasicDiv').fadeTo('slow', 0.5);
		$('.basicStepControl').attr('disabled', 'disabled');
	},
	basic:function () {
		basicStep.enable();
		startStep.disable();
	},
	startChooseType:function () {
		$.getScript("js/chooseType.js",function () {
			chooseTypeStep.init();
		});
	}
}
$(document).ready(function(){
	startStep.init();
	basicStep.init();
});
var chooseTypeStep={
	init:function() {
		$("#chooseTypeDiv").remove();
		var div=$("<div class=\"container hide\" id=\"chooseTypeDiv\"></div>");
		$("#create_cover").before(div);
		$('#chooseTypeDiv').load("chooseType.html",chooseTypeStep.callback);
	},
	enable:function () {
		$('#chooseTypeDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#chooseTypeDiv").offset().top}, 500);
		});
	},
	disable:function () {
		$('#chooseTypeDiv').fadeTo('slow', 0.5);
	},
	callback:function() {
		$('#type1Btn').on('click', chooseTypeStep.startDesignForm);
		chooseTypeStep.enable();
		basicStep.disable();
	},
	startDesignForm:function () {
		$.getScript("js/designForm.js",function () {
			designForm.init();
		});
	}
}
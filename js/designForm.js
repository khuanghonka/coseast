var w;
var designForm={
	eventID:0,
	formLength:0,
	init:function() {
		$("#designFormDiv").remove();
		var div=$("<div class=\"container\" id=\"designFormDiv\"></div>");
		$("#create_cover").before(div);
		$('#designFormDiv').load("designForm.html",designForm.callback);
	},
	callback:function() {
		$('#startDesignFormMainBtn').on('click', designForm.startDesignFormMain);
		$('#startDesignFormCheckBtn').on('click', designForm.startDesignFormCheck);
		$('#startDesignFormSubmitBtn').on('click', designForm.startDesignFormSubmit);
		$('#finalFormSubmitBtn').on('click', designForm.finalFormSubmit);
		designForm.enableHeader();
		chooseTypeStep.disable();
		tools.init();
	},
	enableHeader:function () {
		$('#designFormHeaderDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#designFormHeaderDiv").offset().top}, 500);
		});
	},
	disableHeader:function () {
		$('#designFormHeaderDiv').fadeTo('slow', 0.5);
	},
	enableMain:function () {
		$('#designFormMainDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#designFormMainDiv").offset().top}, 500);
		});
	},
	disableMain:function () {
		$('#designFormMainDiv').fadeTo('slow', 0.5);
	},
	enableCheck:function () {
		tools.generateForm();
		
		$('#designFormCheckDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#designFormCheckDiv").offset().top}, 500);
		});
	},
	disableCheck:function () {
		$('#designFormCheckDiv').fadeTo('slow', 0.5);
		//$('#checkArea').empty();
	},
	enableSubmit:function () {
		$('#designFormSubmitDiv').removeClass('hide').css('opacity', 0).fadeTo('slow', 1, function() {
		$('html, body').animate({scrollTop: $("#designFormSubmitDiv").offset().top}, 500);
		});
	},
	disableSubmit:function () {
		$('#designFormSubmitDiv').fadeTo('slow', 0.5);
	},
	startDesignFormMain:function(){
		designForm.disableHeader();
		designForm.enableMain();
	},
	startDesignFormCheck:function () {
		designForm.disableMain();
		designForm.enableCheck();
	},
	startDesignFormSubmit:function () {
		designForm.disableCheck();
		designForm.enableSubmit();
	},
	finalFormSubmit:function () {
		designForm.saveActivity();
	},
	saveActivity:function () {
		alert("post basicInfoForm");
		$.post("saveActivity.php",{ name: $('#eventName').val(), info: $('#eventInfo').val() },function(result){
    		alert(result);
    		if(result>0)
    		{
    			designForm.eventID = result ;
    			designForm.createTable();
    		}
		});
	},
	createTable:function () {
		var ms = "test";
		for (var i = 0; i < designForm.formLength; i++) {
			ms+=",a"+i;
		}
		alert("post createTable");
		$.post("createTable.php",{ table: ms },function(result){
			alert(result);
			if(result)
			{
				designForm.saveForm();
			}
		});
	},
	saveForm:function () {
		$.post("saveForm.php",{ ID: designForm.eventID , form :  $('#checkArea').html()},function(result){
			alert(result);
		});
	}
}
var tools={
	init:function () {
		$('body').append("<div id=\"toolsComponentsDiv\" class=\"hide\"></div>");
		$('#toolsComponentsDiv').load("toolsComponents.html",tools.listen);
	},
	listen:function () {
		$('.addSingleInputBtn').on('click', tools.addSingleInput);
		$('.addTextareaBtn').on('click', tools.addTextarea);
		$('.addSingleChoiceBtn').on('click', tools.addSingleChoice);
		$('.removeFormItemBtn').on('click', tools.removeFormItem);
		$('.moveItemUpBtn').on('click', tools.moveItemUp);
		$('.moveItemDownBtn').on('click', tools.moveItemDown);
		$('.editable').on('click', tools.editLable);
		$('.editInput').on('blur', tools.editBack);
	},
	destory:function () {
		$('.toolsRemove').remove();
	},
	addSingleInput:function () {
		$(this).closest(".toolsComponents").before($('#toolsComponentsDiv .singleInput').clone(true).prepend($('#toolsComponentsDiv .tools-sidebar').clone(true)));
	},
	addTextarea:function () {
		$(this).closest(".toolsComponents").before($('#toolsComponentsDiv .textarea').clone(true).prepend($('#toolsComponentsDiv .tools-sidebar').clone(true)));
	},
	addSingleChoice:function () {
		$(this).closest(".toolsComponents").before($('#toolsComponentsDiv .singleChoice').clone(true).prepend($('#toolsComponentsDiv .tools-sidebar').clone(true)));
	},
	removeFormItem:function () {
		if(confirm("确认要删除这个元素吗？"))
			$(this).closest(".toolsComponents").remove();
	},
	moveItemUp:function () {
		$(this).closest(".toolsComponents").insertBefore($(this).closest(".toolsComponents").prev(".toolsComponents.well"));
	},
	moveItemDown:function () {
		$(this).closest(".toolsComponents").insertAfter($(this).closest(".toolsComponents").next(".toolsComponents.well"));
	},
	editLable:function () {
		$(this).addClass('hide');
		$(this).siblings(".editInput").val($(this).text());
		$(this).siblings(".editInput").removeClass('hide').focus();
	},
	editBack:function () {
		$(this).addClass('hide');
		$(this).siblings(".editable").text($(this).val()).removeClass('hide');
	},
	generateForm:function () {
		$('#checkArea').html($('#designArea .myForm').clone());
		$('#checkArea .toolsRemove').remove();
		$('#checkArea .myForm').append($('#toolsComponentsDiv .userSubmitControlBox').clone());

		var items = $('#checkArea .form-group');
		designForm.formLength = items.length;
		for (var i = 0; i < items.length; i++) {
			$(items[i]).find(".userControl").attr('name', 'a'+i);
		}
	}
}
$("#appetizerButton").click(function(){
	if($("#appetizerContent").is(":hidden")){
		$("#appetizerContent").show("slow");
		$("#menuContent").hide("slow");
	}
	else{
		$("#appetizerContent").hide("slow");
	};
});

$("#menuButton").click(function(){
	if($("#menuContent").is(":hidden")){
		$("#menuContent").show("slow");
		$("#appetizerContent").hide("slow");

	}
	else{
		$("#menuContent").hide("slow");
	};
});

if($(".dropdownContent").is(":visible")){
	$(".dropdownContent").hide();
};

$(window).click(function(e) {
  if (!e.target.matches('.dropdownButton')) {
	  if($(".dropdownContent").is(":visible")){
	$(".dropdownContent").hide("slow");
	}
  }
});

$("#deleteButton").click(function(){
	$("#nachosItem").hide("slow");
});
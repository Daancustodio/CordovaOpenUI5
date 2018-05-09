sap.ui.define(
	[
		"myAppName/controller/BaseController",
		"sap/m/MessageToast",	
		"sap/ui/model/json/JSONModel",		
	],
	function (BaseController, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("myAppName.controller.App", {
		onInit : function(){
			var that = this;
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},	
	});
});
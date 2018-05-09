sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"myAppName/model/formatter",
		"sap/ui/model/json/JSONModel",	
		"sap/m/MessageToast",			
	], function (Controller, History, formatter, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("myAppName.controller.BaseController", {		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
			
		},
		setUserTheme : function(){
			var user = this.getUserSession();
			if(user.UserSettings == undefined) 
				return;
			if(!user.UserSettings.Theme)
				return;

			var theme = sap.ui.getCore().getConfiguration().getTheme();
			
			if(theme != user.UserSettings.Theme)
				sap.ui.getCore().applyTheme(user.UserSettings.Theme); 
		},
		
	

		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getText: function(sKey){
			return this.getResourceBundle().getText(sKey);
		},

		onNavBack : function(sRoute, mData) {			
				window.history.go(-1);		
		},	
		
		getIndexOfPath : function(sPath){
			var pathArray = sPath.split("/");
			var sIndex = pathArray[pathArray.length - 1];
			var index = Number.parseInt(sIndex);
			return index;
		},	
		
		loadModel(context, endPoint, nameModel, busyControls, refresh =false ){
			let model =new JSONModel();
			
			model.attachRequestSent(data => { busyControls.forEach(x => x.setBusy(true))});
            model.attachRequestCompleted(data =>{ busyControls.forEach(x => x.setBusy(false) )});
            model.attachRequestFailed(data =>{ busyControls.forEach(x => x.setBusy(false))});            
			model.loadData(endPoint);
			context.setModel(model, nameModel);
			if(refresh)
				context.getView().getModel(nameModel).refresh(true);
		},
		
		loadModelForDialog(context, endPoint, busyControls, successFunction, errorFunction ){
			let model =new JSONModel();
			try {
				model.attachRequestSent(data => {busyControls.forEach(x => x.setBusy(true))});
			model.attachRequestFailed(data =>{				
				busyControls.forEach(x => x.setBusy(false))
			});            
            model.attachRequestCompleted(data => { 
				
				busyControls.forEach(x => x.setBusy(false) );
				var requestReturn = data.getParameters();
				if(requestReturn.success){
					context.setModel(model);
					if(successFunction)
						successFunction();
				}else {
					MessageToast.show(requestReturn.errorobject.responseText);
					if(errorFunction)
						errorFunction();
						
				}
			});			
			model.loadData(endPoint);
			} catch (error) {
				console.log(error)
			}
				
			
		},		
	});
});
sap.ui.define([
"sap/ui/core/UIComponent"
], 
function (UIComponent) {
	"use strict";
	
	return UIComponent.extend("myAppName.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();			
		},

		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		createContent : function() {
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			return oRootView;
		}
	});
});
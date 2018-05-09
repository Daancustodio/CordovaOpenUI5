sap.ui.define([
	'jquery.sap.global',
	'myAppName/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(jQuery, BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	var DashBoard = BaseController.extend("myAppName.controller.DashBoard", {
		onInit: function () {
			this._wizard = this.byId("CreateProductWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");
			
			this.model = new sap.ui.model.json.JSONModel();
			this.model.setData({
				productNameState:"Error",
				productWeightState:"Error"
			});
			this.getView().setModel(this.model);
			
		},
		setProductType: function (evt) {
			var productType = evt.getSource().getTitle();
			this.model.setProperty("/productType", productType);
			this.byId("ProductStepChosenType").setText("Chosen product type: " + productType);
			
		},
		setProductTypeFromSegmented: function (evt) {
			var productType = evt.mParameters.button.getText();
			this.model.setProperty("/productType", productType);
			
		},
		additionalInfoValidation : function () {
			/* var name = this.byId("ProductName").getValue();
			var weight = parseInt(this.byId("ProductWeight").getValue(), 10);

			if (isNaN(weight)) {
				this.model.setProperty("/productWeightState", "Error");
			} else {
				this.model.setProperty("/productWeightState", "None");
			}
			if (name.length < 6) {
				this.model.setProperty("/productNameState", "Error");
			} else {
				this.model.setProperty("/productNameState", "None");
			}

			if (name.length < 6 || isNaN(weight)) {
				this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			} else {
				this._wizard.validateStep(this.byId("ProductInfoStep"));
			} */
		},
		optionalStepActivation: function () {
			MessageToast.show(
				'This event is fired on activate of Step3.'
			);
		},
		optionalStepCompletion: function () {
			MessageToast.show(
				'This event is fired on complete of Step3. You can use it to gather the information, and lock the input data.'
			);
		},
		
		backToWizardContent : function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},
		editStepOne : function () {
			this._handleNavigationToStep(0);
		},
		editStepTwo : function () {
			this._handleNavigationToStep(1);
		},
		editStepThree : function () {
			this._handleNavigationToStep(2);
		},
		editStepFour : function () {
			this._handleNavigationToStep(3);
		},
		_handleNavigationToStep : function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},
		_handleMessageBoxOpen : function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._handleNavigationToStep(0);
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
					}
				}.bind(this)
			});
		},
		
		handleWizardCancel : function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
		},
		handleWizardSubmit : function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},
		
		discardProgress: function () {
			this._wizard.discardProgress(this.byId("ProductTypeStep"));

			var clearContent = function (content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};

			
			clearContent(this._wizard.getSteps());
		}
	});

	return DashBoard;
});
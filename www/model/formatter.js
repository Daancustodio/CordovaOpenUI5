sap.ui.define([
  "myAppName/controller/BaseController",
], function (BaseController) {
	"use strict";
  return {

    formatUpperCase: function(sName) {
      return sName && sName.toUpperCase();
    },

    formatCaptalize: function(sName){
      return sName[0].toUpperCase() + sName.slice(1);
    },

    dimActive : function(dimActive){
      return (dimActive == 'Y');
    },

    formatRequestPurchaseStatusDescription :  function (satusId) {
      switch (satusId) {
        case "O":
          return "Aberto";          
        case "Y":
          return "Aprovado";          
        case "C":
          return "Fechado"
        case "W":
          return "Aguardando Autorização";
        default:
          return "Não Definido";          
      }
		},
    dateNow : function(){
      var data = new Date().toISOString();      
      return data.substring(0, data.length - 1);
    },
    getIdFromStringEndPoint: function(sEndPoint){
        var arr = sEndPoint.split("/");
        var objectId = arr[arr.length-1];
        return objectId;
    },

    boolToYesNo : function(booleanValue){
      var resource = this.getView().getModel("i18n").getResourceBundle();      
      if(booleanValue)
        return resource.getText("Commom.Yes");
      else
        return resource.getText("Commom.No");      
    },
    yesNoToBool : function(stringYesOrNo){
         
      if(stringYesOrNo == "Y")
         return true;
      else
        return false;
    },
    yesNoToState : function(stringYesOrNo){
         
      if(stringYesOrNo == "Y")
         return 'Success';
      else
        return "None";
    },
    
    documentType : function(enumDocumentType){
      var resource = this.getView().getModel("i18n").getResourceBundle();  
      switch (enumDocumentType) {
        case 1470000113:
          return resource.getText("Commom.Menu.RequestPurchese");
        default:
          return "Não Definido";          
      }
    },

    getStateOfPriority: function(bUrgent) {      
      if(bUrgent)
        return sap.ui.core.ValueState.Error
      else
        return sap.ui.core.ValueState.None;
    },

    getIndexOfPath : function(sPath){
      var pathArray = sPath.split("/");
			var sIndex = pathArray[pathArray.length - 1];
      var index = Number.parseInt(sIndex);
      return index;
    },

    formatRequestPurchaseStateById :  function (statusId) {
      
      switch (statusId) {
                
        case 'O':
          return "None"
        case 'C':
          return "Error";          
        case 'W':
          return "Warning"; 
        case 'Y':
          return "Success"; 
      }
    },
    maxRecordsPerSearch : function(iValue){
      if (iValue < 50) {
				return "Success";
			} else if (iValue >= 50 && iValue < 101 ) {
				return "None";
			} else if (iValue >= 101 && iValue < 151 ) {
				return "Warning";
			} else {
				return "Error";
			}
    },
    formatIconColor : function(iValue){
      if (iValue < 50) {
				return "Positive";
			} else if (iValue >= 50 && iValue < 101 ) {
				return "Neutral";
			} else if (iValue >= 101 && iValue < 151 ) {
				return "Critical";
			} else {
				return "Negative";
			}
    },
    isEmptyModel : function(oModel){
      var modelStr = JSON.stringify(oModel);
      return modelStr === "{}";
    },
    currency: function(amount) {
      if(amount == null)
       return "";
       
      var currencyFormatter = new sap.ui.model.type.Currency({decimals:2});
      var formated = currencyFormatter.formatValue([amount.toString(),'R$ '], 'string');
      return formated;
    },
    formatNegativePositiveValue : function(nValue){
      if(nValue < 0)
        return sap.ui.core.ValueState.Error;
      else if(nValue > 0)
       return sap.ui.core.ValueState.Success;
      else
        return sap.ui.core.ValueState.None;
    },
    percentStateCritical:function(percent){
      
      if(percent > 0 && percent < 50)
        return sap.ui.core.ValueState.Success;
      else if(percent >= 50 && percent < 80)
        return sap.ui.core.ValueState.None;
      else if(percent >= 80 && percent <= 99.99)
        return sap.ui.core.ValueState.Warning;
      else {
        return sap.ui.core.ValueState.Error;
      }

    }
  };

}, true);
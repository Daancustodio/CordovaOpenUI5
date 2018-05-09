jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "myAppName/Component-preload",
	"modules": {
		"myAppName/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"myAppName.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()},getContentDensityClass:function(){return this._sContentDensityClass||(sap.ui.Device.support.touch?this._sContentDensityClass=\"sapUiSizeCozy\":this._sContentDensityClass=\"sapUiSizeCompact\"),this._sContentDensityClass},createContent:function(){return t.prototype.createContent.apply(this,arguments)}})});",
		"myAppName/controller/App.controller.js": "sap.ui.define([\"myAppName/controller/BaseController\",\"sap/m/MessageToast\",\"sap/ui/model/json/JSONModel\"],function(e,t,n){\"use strict\";return e.extend(\"myAppName.controller.App\",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});",
		"myAppName/controller/BaseController.js": "sap.ui.define([\n\t\t\"sap/ui/core/mvc/Controller\",\n\t\t\"sap/ui/core/routing/History\",\n\t\t\"myAppName/model/formatter\",\n\t\t\"sap/ui/model/json/JSONModel\",\t\n\t\t\"sap/m/MessageToast\",\t\t\t\n\t], function (Controller, History, formatter, JSONModel, MessageToast) {\n\t\"use strict\";\n\n\treturn Controller.extend(\"myAppName.controller.BaseController\", {\t\t\n\t\tgetRouter : function () {\n\t\t\treturn sap.ui.core.UIComponent.getRouterFor(this);\n\t\t\t\n\t\t},\n\t\tsetUserTheme : function(){\n\t\t\tvar user = this.getUserSession();\n\t\t\tif(user.UserSettings == undefined) \n\t\t\t\treturn;\n\t\t\tif(!user.UserSettings.Theme)\n\t\t\t\treturn;\n\n\t\t\tvar theme = sap.ui.getCore().getConfiguration().getTheme();\n\t\t\t\n\t\t\tif(theme != user.UserSettings.Theme)\n\t\t\t\tsap.ui.getCore().applyTheme(user.UserSettings.Theme); \n\t\t},\n\t\t\n\t\n\n\t\tgetModel : function (sName) {\n\t\t\treturn this.getView().getModel(sName);\n\t\t},\n\n\t\t\n\t\tsetModel : function (oModel, sName) {\n\t\t\treturn this.getView().setModel(oModel, sName);\n\t\t},\n\n\t\tgetResourceBundle : function () {\n\t\t\treturn this.getOwnerComponent().getModel(\"i18n\").getResourceBundle();\n\t\t},\n\n\t\tgetText: function(sKey){\n\t\t\treturn this.getResourceBundle().getText(sKey);\n\t\t},\n\n\t\tonNavBack : function(sRoute, mData) {\t\t\t\n\t\t\t\twindow.history.go(-1);\t\t\n\t\t},\t\n\t\t\n\t\tgetIndexOfPath : function(sPath){\n\t\t\tvar pathArray = sPath.split(\"/\");\n\t\t\tvar sIndex = pathArray[pathArray.length - 1];\n\t\t\tvar index = Number.parseInt(sIndex);\n\t\t\treturn index;\n\t\t},\t\n\t\t\n\t\tloadModel(context, endPoint, nameModel, busyControls, refresh =false ){\n\t\t\tlet model =new JSONModel();\n\t\t\t\n\t\t\tmodel.attachRequestSent(data => { busyControls.forEach(x => x.setBusy(true))});\n            model.attachRequestCompleted(data =>{ busyControls.forEach(x => x.setBusy(false) )});\n            model.attachRequestFailed(data =>{ busyControls.forEach(x => x.setBusy(false))});            \n\t\t\tmodel.loadData(endPoint);\n\t\t\tcontext.setModel(model, nameModel);\n\t\t\tif(refresh)\n\t\t\t\tcontext.getView().getModel(nameModel).refresh(true);\n\t\t},\n\t\t\n\t\tloadModelForDialog(context, endPoint, busyControls, successFunction, errorFunction ){\n\t\t\tlet model =new JSONModel();\n\t\t\ttry {\n\t\t\t\tmodel.attachRequestSent(data => {busyControls.forEach(x => x.setBusy(true))});\n\t\t\tmodel.attachRequestFailed(data =>{\t\t\t\t\n\t\t\t\tbusyControls.forEach(x => x.setBusy(false))\n\t\t\t});            \n            model.attachRequestCompleted(data => { \n\t\t\t\t\n\t\t\t\tbusyControls.forEach(x => x.setBusy(false) );\n\t\t\t\tvar requestReturn = data.getParameters();\n\t\t\t\tif(requestReturn.success){\n\t\t\t\t\tcontext.setModel(model);\n\t\t\t\t\tif(successFunction)\n\t\t\t\t\t\tsuccessFunction();\n\t\t\t\t}else {\n\t\t\t\t\tMessageToast.show(requestReturn.errorobject.responseText);\n\t\t\t\t\tif(errorFunction)\n\t\t\t\t\t\terrorFunction();\n\t\t\t\t\t\t\n\t\t\t\t}\n\t\t\t});\t\t\t\n\t\t\tmodel.loadData(endPoint);\n\t\t\t} catch (error) {\n\t\t\t\tconsole.log(error)\n\t\t\t}\n\t\t\t\t\n\t\t\t\n\t\t},\t\t\n\t});\n});",
		"myAppName/controller/DashBoard.controller.js": "sap.ui.define([\"jquery.sap.global\",\"myAppName/controller/BaseController\",\"sap/ui/model/json/JSONModel\",\"sap/m/MessageToast\",\"sap/m/MessageBox\"],function(t,e,o,i,n){\"use strict\";return e.extend(\"myAppName.controller.DashBoard\",{onInit:function(){this._wizard=this.byId(\"CreateProductWizard\"),this._oNavContainer=this.byId(\"wizardNavContainer\"),this._oWizardContentPage=this.byId(\"wizardContentPage\"),this.model=new sap.ui.model.json.JSONModel,this.model.setData({productNameState:\"Error\",productWeightState:\"Error\"}),this.getView().setModel(this.model)},setProductType:function(t){var e=t.getSource().getTitle();this.model.setProperty(\"/productType\",e),this.byId(\"ProductStepChosenType\").setText(\"Chosen product type: \"+e)},setProductTypeFromSegmented:function(t){var e=t.mParameters.button.getText();this.model.setProperty(\"/productType\",e)},additionalInfoValidation:function(){},optionalStepActivation:function(){i.show(\"This event is fired on activate of Step3.\")},optionalStepCompletion:function(){i.show(\"This event is fired on complete of Step3. You can use it to gather the information, and lock the input data.\")},backToWizardContent:function(){this._oNavContainer.backToPage(this._oWizardContentPage.getId())},editStepOne:function(){this._handleNavigationToStep(0)},editStepTwo:function(){this._handleNavigationToStep(1)},editStepThree:function(){this._handleNavigationToStep(2)},editStepFour:function(){this._handleNavigationToStep(3)},_handleNavigationToStep:function(t){var e=function(){this._wizard.goToStep(this._wizard.getSteps()[t]),this._oNavContainer.detachAfterNavigate(e)}.bind(this);this._oNavContainer.attachAfterNavigate(e),this.backToWizardContent()},_handleMessageBoxOpen:function(t,e){n[e](t,{actions:[n.Action.YES,n.Action.NO],onClose:function(t){t===n.Action.YES&&(this._handleNavigationToStep(0),this._wizard.discardProgress(this._wizard.getSteps()[0]))}.bind(this)})},handleWizardCancel:function(){this._handleMessageBoxOpen(\"Are you sure you want to cancel your report?\",\"warning\")},handleWizardSubmit:function(){this._handleMessageBoxOpen(\"Are you sure you want to submit your report?\",\"confirm\")},discardProgress:function(){this._wizard.discardProgress(this.byId(\"ProductTypeStep\"));var t=function(e){for(var o=0;o<e.length;o++)e[o].setValue&&e[o].setValue(\"\"),e[o].getContent&&t(e[o].getContent())};t(this._wizard.getSteps())}})});",
		"myAppName/js/index.js": "var app={initialize:function(){sap.ui.getCore().attachInit(function(){sap.ui.require([\"sap/m/Shell\",\"sap/ui/core/ComponentContainer\"],function(n,e){sap.ui.component({async:!0,name:\"myAppName\"}).then(function(i){new n({app:new e({height:\"100%\",component:i})}).placeAt(\"content\")})})})}};app.initialize();",
		"myAppName/model/formatter.js": "sap.ui.define([\"myAppName/controller/BaseController\"],function(e){\"use strict\";return{formatUpperCase:function(e){return e&&e.toUpperCase()},formatCaptalize:function(e){return e[0].toUpperCase()+e.slice(1)},dimActive:function(e){return\"Y\"==e},formatRequestPurchaseStatusDescription:function(e){switch(e){case\"O\":return\"Aberto\";case\"Y\":return\"Aprovado\";case\"C\":return\"Fechado\";case\"W\":return\"Aguardando Autorização\";default:return\"Não Definido\"}},dateNow:function(){var e=(new Date).toISOString();return e.substring(0,e.length-1)},getIdFromStringEndPoint:function(e){var t=e.split(\"/\");return t[t.length-1]},boolToYesNo:function(e){var t=this.getView().getModel(\"i18n\").getResourceBundle();return e?t.getText(\"Commom.Yes\"):t.getText(\"Commom.No\")},yesNoToBool:function(e){return\"Y\"==e},yesNoToState:function(e){return\"Y\"==e?\"Success\":\"None\"},documentType:function(e){var t=this.getView().getModel(\"i18n\").getResourceBundle();switch(e){case 1470000113:return t.getText(\"Commom.Menu.RequestPurchese\");default:return\"Não Definido\"}},getStateOfPriority:function(e){return e?sap.ui.core.ValueState.Error:sap.ui.core.ValueState.None},getIndexOfPath:function(e){var t=e.split(\"/\"),r=t[t.length-1];return Number.parseInt(r)},formatRequestPurchaseStateById:function(e){switch(e){case\"O\":return\"None\";case\"C\":return\"Error\";case\"W\":return\"Warning\";case\"Y\":return\"Success\"}},maxRecordsPerSearch:function(e){return e<50?\"Success\":e>=50&&e<101?\"None\":e>=101&&e<151?\"Warning\":\"Error\"},formatIconColor:function(e){return e<50?\"Positive\":e>=50&&e<101?\"Neutral\":e>=101&&e<151?\"Critical\":\"Negative\"},isEmptyModel:function(e){return\"{}\"===JSON.stringify(e)},currency:function(e){return null==e?\"\":new sap.ui.model.type.Currency({decimals:2}).formatValue([e.toString(),\"R$ \"],\"string\")},formatNegativePositiveValue:function(e){return e<0?sap.ui.core.ValueState.Error:e>0?sap.ui.core.ValueState.Success:sap.ui.core.ValueState.None},percentStateCritical:function(e){return e>0&&e<50?sap.ui.core.ValueState.Success:e>=50&&e<80?sap.ui.core.ValueState.None:e>=80&&e<=99.99?sap.ui.core.ValueState.Warning:sap.ui.core.ValueState.Error}}},!0);",
		"myAppName/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"myAppName.controller.App\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:tnt=\"sap.tnt\"\n\theight=\"90%\"><tnt:ToolHeader><Button  icon=\"sap-icon://home\" type=\"Transparent\"  press=\"onHome\" ><layoutData><OverflowToolbarLayoutData priority=\"NeverOverflow\" /></layoutData></Button><ToolbarSpacer /><Text text=\"{i18n>MasterView.tittle}\" wrapping=\"false\"><layoutData><OverflowToolbarLayoutData priority=\"Disappear\" /></layoutData></Text><ToolbarSpacer /><Button id=\"userLoggedPopOver\" text=\"{currentUser>/U_NAME}\" type=\"Transparent\"  icon=\"sap-icon://person-placeholder\"  press=\"onLoginPopOver\"><layoutData><OverflowToolbarLayoutData priority=\"NeverOverflow\" /></layoutData></Button></tnt:ToolHeader><App id=\"app\" /></mvc:View> ",
		"myAppName/view/DashBoard.view.xml": "<mvc:View\r\n\t\theight=\"100%\"\r\n\t\tcontrollerName=\"myAppName.controller.DashBoard\"\r\n\t\txmlns:form=\"sap.ui.layout.form\"\r\n\t\txmlns:core=\"sap.ui.core\"\r\n\t\txmlns:u=\"sap.ui.unified\"\r\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\r\n\t\txmlns=\"sap.m\"><NavContainer id=\"wizardNavContainer\"><pages><Page\r\n\t\t\t\tid=\"wizardContentPage\"\r\n\t\t\t\tshowHeader=\"false\"><content><Wizard id=\"CreateProductWizard\"\r\n\t\t\t\t\t\t\t\t><WizardStep id=\"ProductTypeStep\"\r\n\t\t\t\t\t\t\t\t\t\ttitle=\"Introdução\"\r\n\t\t\t\t\t\t\t\t\t\tvalidated=\"true\"><MessageStrip class=\"sapUiSmallMarginBottom\"\r\n\t\t\t\t\t\t\t\t\t\ttext=\"Bem Vindo ao Starter kit Openui5 + Cordova\"\r\n\t\t\t\t\t\t\t\t\t\tshowIcon=\"true\"/><Text class=\"sapUiSmallMarginBottom\"\r\n\t\t\t\t\t\t\t\t\t\ttext=\"Para aplicar as modificações necessárias para seu projeto, começe alterando em todos os pontos do sistema o nome 'myAppName' pelo nome que dejesa dar ao seu aplicativo.\"/><HBox\r\n\t\t\t\t\t\t\t\t\t\talignItems=\"Center\"\r\n\t\t\t\t\t\t\t\t\t\tjustifyContent=\"Center\"\r\n\t\t\t\t\t\t\t\t\t\twidth=\"100%\"><SegmentedButton\r\n\t\t\t\t\t\t\t\t\t\t\twidth=\"320px\"\r\n\t\t\t\t\t\t\t\t\t\t\tselect=\"setProductTypeFromSegmented\"><Button icon=\"sap-icon://iphone\" text=\"Mobile\"/><Button icon=\"sap-icon://sys-monitor\" text=\"Desktop\"/><Button icon=\"sap-icon://database\" text=\"Other\"/></SegmentedButton></HBox></WizardStep><WizardStep id=\"ProductInfoStep\"\r\n\t\t\t\t\t\t\t\t\t\tvalidated=\"true\"\r\n\t\t\t\t\t\t\t\t\t\ttitle=\"Compilação\"\r\n\t\t\t\t\t\t\t\t\t\t><MessageStrip class=\"sapUiSmallMarginBottom\"\r\n\t\t\t\t\t\t\t\t\t\ttext=\"Para mehoria de performance, a SAP introduziu um conceito chamado Component-Preload\"\r\n\t\t\t\t\t\t\t\t\t\tshowIcon=\"true\"/><Text text=\"O packege.json, já está configurado para instalar as dependencias necessárias,\r\n                                 bastar utilizar comando: 'npm install', assim seram instaladas todas as dependências necessárias para criar seu component-preload. \r\n                                 Após instalação, para gerar o componente-preload, utilize o Comando 'grunt build --force' \"/></WizardStep><WizardStep id=\"OptionalInfoStep\"\r\n\t\t\t\t\t\t\t\t\t\tvalidated=\"true\"\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\ttitle=\"Servidor Web\"><MessageStrip class=\"sapUiSmallMarginBottom\"\r\n\t\t\t\t\t\t\t\t\t\ttext=\"Para rodar o projeto você precisa de um servidor Web\"\r\n\t\t\t\t\t\t\t\t\t\tshowIcon=\"true\"/><Text text=\"Um servidor web simples e muito bom para testes é o 'http-serve', o mesmo pode ser encontrado no npm, então basta rodar o comando: 'npm install -g http-serve'\r\n                                Após intalar esse servidor, para acessar seu aplicativo basta utilizar o comando: 'http-serve -o'.\"/></WizardStep></Wizard></content><footer><OverflowToolbar><ToolbarSpacer/><Button text=\"Cancel\" press=\"handleWizardCancel\"/></OverflowToolbar></footer></Page></pages></NavContainer></mvc:View>",
		"myAppName/i18n/i18n_de.properties": "",
		"myAppName/i18n/i18n_en.properties": "",
		"myAppName/i18n/i18n_pt_BR.properties": "\n",
		"myAppName/i18n/i18n_pt.properties": "",
		"myAppName/i18n/i18n.properties": "MasterView.tittle=My Starter OpenUI5 Cordova App\nappDescription=Application with OpenUI5 and cordova\n",
		"myAppName/manifest.json": "{\"_version\":\"1.0.1\",\"sap.app\":{\"_version\":\"1.0.0\",\"id\":\"myAppName\",\"type\":\"application\",\"i18n\":\"i18n/i18n.properties\",\"title\":\"{{MasterView.tittle}}\",\"description\":\"{{appDescription}}\",\"applicationVersion\":{\"version\":\"1.0.0\"}},\"sap.ui\":{\"_version\":\"1.3.0\",\"technology\":\"UI5\",\"deviceTypes\":{\"desktop\":true,\"tablet\":true,\"phone\":true},\"supportedThemes\":[\"sap_bluecrystal\",\"sap_belize_plus\",\"sap_belize\"]},\"sap.ui5\":{\"_version\":\"1.2.0\",\"rootView\":\"myAppName.view.App\",\"dependencies\":{\"minUI5Version\":\"1.34.0\",\"libs\":{\"sap.ui.core\":{\"minVersion\":\"1.34.0\"},\"sap.m\":{\"minVersion\":\"1.34.0\"},\"sap.ui.layout\":{\"minVersion\":\"1.34.0\"}}},\"contentDensities\":{\"compact\":true,\"cozy\":true},\"models\":{\"i18n\":{\"type\":\"sap.ui.model.resource.ResourceModel\",\"settings\":{\"bundleName\":\"myAppName.i18n.i18n\"}}},\"routing\":{\"config\":{\"routerClass\":\"sap.m.routing.Router\",\"viewType\":\"XML\",\"viewPath\":\"myAppName.view\",\"controlId\":\"app\",\"controlAggregation\":\"pages\"},\"routes\":[{\"pattern\":\"\",\"name\":\"dashBoard\",\"target\":\"dashBoard\"},{\"pattern\":\"requestPurchase\",\"name\":\"requestPurchase\",\"target\":\"requestPurchase\"},{\"pattern\":\"requestPurchaseDetail/:id:/:isDraft:\",\"name\":\"requestPurchaseDetail\",\"target\":\"requestPurchaseDetail\"}],\"targets\":{\"dashBoard\":{\"viewName\":\"DashBoard\",\"viewLevel\":1},\"requestPurchase\":{\"viewName\":\"List\",\"viewLevel\":2,\"viewPath\":\"myAppName.view.RequestPurchase\"},\"requestPurchaseDetail\":{\"viewName\":\"Detail\",\"viewLevel\":3,\"viewPath\":\"myAppName.view.RequestPurchase\"}}}}}"
	}
});
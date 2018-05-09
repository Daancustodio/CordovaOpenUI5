var app = {
    // Application Constructor
    initialize: function() {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        sap.ui.getCore().attachInit(function () {
            sap.ui.require([
                "sap/m/Shell",
                "sap/ui/core/ComponentContainer"							
            ], function (Shell, ComponentContainer) {			
                sap.ui.component({
                    async: true,
                    name: "myAppName"
                }).then(function(oComp){
                    new Shell({					
                        app: new ComponentContainer({
                        height : "100%",
                        component : oComp
                        })
                    }).placeAt("content");					
                });
            });
        });
    },   
};

app.initialize();
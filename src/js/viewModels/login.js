/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Main content module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojmodel', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation'],
  function(oj, ko) {
   /**
    * The view model for the main content view template.  Please note that since
    * this example uses ojModule binding, you do not need to call ko.applyBindings
    * like the JET Cookbook examples.  ojModule handles applying bindings for its
    * associated view.
    */
    function LoginContentViewModel() {
        var self = this;
        self.username = ko.observable("ms724472@iteso.mx");
        self.password = ko.observable("welcome1");
        self.tracker = ko.observable();
        
        self.login = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            
            var userName = document.getElementById("username").value;
            var passWord = document.getElementById("password").value;
            var bodyRequest = { usuario:userName, contrasenia:passWord };
            $.ajax({type: "POST",
             contentType: "text/plain; charset=utf-8",
             url: "https://sisvan-iteso.dynu.net/SISVANWS/rest/wls/1.0/auth/getSession",
             dataType: "text",
             data: JSON.stringify(bodyRequest).replace(/]|[[]/g,''),
             success: function(data, textStatus){
                 alert('jalo');
             }
            }).fail( function(data){
                alert("Error en el servidor, favor de comunicarse con el administrador 2. " + JSON.stringify(data));
                return;
            });
            
            
            
            
            
            self.router = oj.Router.rootInstance;
            self.router.configure({
                'dashboard': {label: 'Dashboard', isDefault: true},
                'incidents': {label: 'Incidents'},
                'customers': {label: 'Customers'},
                'about': {label: 'About'}
            });

            // Navigation setup
            var navData = [
                {name: 'Dashboard', id: 'dashboard',
                  iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                {name: 'Incidents', id: 'incidents',
                  iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
                {name: 'Customers', id: 'customers',
                  iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
                {name: 'About', id: 'about',
                  iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
            ];

            var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
            rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
            rootViewModel.userLogin(self.username());
            rootViewModel.isLoggedIn('true');
            rootViewModel.restSessionId("");

            self.username(null);
            self.password(null);

            oj.Router.sync();
        };
        
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
    }

    /**
     * This example returns a view model instance, but can instead return a constructor function
     * which will be invoked to create a view model instance for each module reference.
     * This instance example will be used as a singleton whenever this module is referenced.
     * Please see the 'ViewModel's Lifecycle' section of the ojModule doc for more info.
     */
    return new LoginContentViewModel();
});
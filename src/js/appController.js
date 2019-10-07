/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas', 'ojs/ojdialog', 'ojs/ojswitch', 'ojs/ojbutton'],
        function (oj, ko) {
            function ControllerViewModel() {
                var self = this;

                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

                // Router setup
                self.router = oj.Router.rootInstance;
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                self.router.configure({
                    'login': {label: 'Login', isDefault: true}
                });
                var navData = [{name: 'Login', id: 'login',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'}
                ];

                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                // Drawer
                // Called by nav drawer option change events so we can close drawer after selection
                self.navChangeHandler = function (event, data) {
                    if (data.option === 'selection' && data.value !== self.router.stateId()) {
                        self.toggleDrawer();
                    }
                }
                // Close offcanvas on medium and larger screens
                self.mdScreen.subscribe(function () {
                    oj.OffcanvasUtils.close(self.drawerParams);
                });
                self.drawerParams = {
                    displayMode: 'push',
                    selector: '#navDrawer',
                    content: '#pageContent'
                };
                // Called by navigation drawer toggle button and after selection of nav drawer item
                self.toggleDrawer = function () {
                    return oj.OffcanvasUtils.toggle(self.drawerParams);
                }

                // Header
                // Application Name used in Branding Area
                self.appName = ko.observable('Sistema de Vigilancia Nutricional | ITESO');
                self.copyright = ko.observable(oj.Translations.getTranslatedString('copyright'));
                self.about = ko.observable(oj.Translations.getTranslatedString('about'));
                self.dueDate = ko.observable(oj.Translations.getTranslatedString('dueDate'));
                // User Info used in Global Navigation area
                self.userLogin = ko.observable("");

                self.isLoggedIn = ko.observable(false);
                self.restSessionId = ko.observable("");

                self.incidentNumber = ko.observable(oj.Translations.getTranslatedString('incidentNumber'));

                self.languageChecked = ko.observable();
                self.languageChecked.subscribe(function (data) {
                    var newLang = '';
                    if (data === true) {
                        newLang = 'lt-LT';
                    } else {
                        newLang = 'en-US';
                    }
                    oj.Config.setLocale(newLang,
                            function () {
                                $('html').attr('lang', newLang);
                                self.incidentNumber(oj.Translations.getTranslatedString('incidentNumber'));
                                self.appName('Sistema de Vigilancia Nutricional | ITESO');
                                self.copyright(oj.Translations.getTranslatedString('copyright'));
                                self.about(oj.Translations.getTranslatedString('about'));
                                self.link2Name(oj.Translations.getTranslatedString('contacts'));
                                self.dueDate(oj.Translations.getTranslatedString('dueDate'));

                                self.router.configure({
                                    'home': {label: 'Principal', isDefault: true},
                                    'evalIndv': {label: 'Evaluaciones individuales'},
                                    'estUtils': {label: 'Estadisticas útiles'},
                                    'datEsc': {label: 'Datos escolares'}
                                });
                                // Navigation setup
                                var navData = [
                                    {name: 'Principal', id: 'home',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24'},
                                    {name: 'Evaluaciones individuales', id: 'evalIndv',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'},
                                    {name: 'Estadisticas útiles', id: 'estUtils',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                                    {name: 'Datos escolares', id: 'datEsc',
                                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-library-icon-24'}
                                ];
                                self.navDataSource.reset(navData, {idAttribute: 'id'});
                                oj.Router.sync();
                            }
                    );
                });

                // Dropdown menu states
                self.menuItemSelect = function (event, ui) {
                    switch (ui.item.attr("id")) {
                        case "pref":
                            if ($('html').attr('lang') === 'lt-LT') {
                                self.languageChecked(true);
                            } else {
                                self.languageChecked(false);
                            }

                            $("#md1").ojDialog("open");
                            break;
                        case "about":

                            break;
                        case "out":
                            document.body.style.background = "url(\"../css/images/fondo_login.jpg\")";
                            self.userLogin("");
                            self.isLoggedIn(false);
                            self.restSessionId("");

                            self.router.configure({
                                'login': {label: 'Login', isDefault: true}
                            });

                            var data = [
                                {name: 'Login', id: 'login',
                                    iconClass: 'demo-home-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'}
                            ];

                            self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                            self.router.go().then(
                                    function (result) {
                                        if (result.hasChanged) {
                                        } else {
                                            oj.Router.sync();
                                        }
                                    },
                                    function (error) {
                                        console.log('Transition to default state failed: ' + error.message);
                                    }
                            );
                            break;
                        default:
                    }
                };

                self.closePreferences = function () {
                    $("#md1").ojDialog("close");
                }

                self.link1Name = "About Oracle";
                self.link1Id = "aboutOracle";
                self.link1Url = "http://www.oracle.com/us/corporate/index.html#menu-about";

                self.link2Name = ko.observable(oj.Translations.getTranslatedString('contacts'));
                self.link2Id = "contactUs";
                self.link2Url = "http://www.oracle.com/us/corporate/contact/index.html";
            }

            return new ControllerViewModel();
        }
);

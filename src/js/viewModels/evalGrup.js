/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox',
    'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojcollapsible'],
        function (oj, ko, $) {
            function IncidentsViewModel() {
                var self = this;
                self.origenDatosEscuelas = ko.observable();
                self.escuelaSeleccionada = ko.observable();
                self.porcentajesEscuelas = ko.observable();
                self.porcentajesGrupos = ko.observable();
                self.origenDatosGrupos = ko.observable();
                self.origenDatosGrupo1 = ko.observable();
                self.origenDatosGrupo2 = ko.observable();
                self.origenDatosGrupo3 = ko.observable();
                self.origenDatosGrupo4 = ko.observable();
                self.origenDatosGrupo5 = ko.observable();
                self.origenDatosGrupo6 = ko.observable();

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.
                self.obtenerPorcentajesEscolares = function (idEscuela) {
                    $.ajax({type: "GET",
                        contentType: "text/plain; charset=utf-8",
                        url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escolares/obtenerPorcentajesEscuela/" + idEscuela,
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            json = $.parseJSON(data);
                            if (json.hasOwnProperty("error")) {
                                alert('No se encontro ningun dato, contacte al administrador.');
                                return;
                            } else {
                                self.porcentajesEscuelas(new oj.ArrayDataProvider(json.datos));
                            }
                        }
                    }).fail(function () {
                        alert("Error en el servidor, favor de comunicarse con el administrador.");
                        return;
                    });
                };
                
                self.obtenerPorcentajesGrupales = function (idGrupo) {
                    $.ajax({type: "GET",
                        contentType: "text/plain; charset=utf-8",
                        url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escolares/obtenerPorcentajesGrupo/" + idGrupo,
                        dataType: "text",
                        async: false,
                        success: function (data) {
                            json = $.parseJSON(data);
                            if (json.hasOwnProperty("error")) {
                                alert('No se encontro ningun dato, contacte al administrador.');
                                return;
                            } else {
                                self.porcentajesGrupos(new oj.ArrayDataProvider(json.datos));
                            }
                        }
                    }).fail(function () {
                        alert("Error en el servidor, favor de comunicarse con el administrador.");
                        return;
                    });
                };
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/obtenerEscuelas",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ninguna escuela');
                            return;
                        } else {
                            self.origenDatosEscuelas(new oj.ArrayDataProvider(json.escuelas));
                            self.obtenerPorcentajesEscolares(1);
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/1",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupos(new oj.ArrayDataProvider(json.grupos));
                            self.origenDatosGrupo1(new oj.ArrayDataProvider(json.grupos));
                            self.obtenerPorcentajesGrupales(1);
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/2",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupo2(new oj.ArrayDataProvider(json.grupos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/3",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupo3(new oj.ArrayDataProvider(json.grupos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/4",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupo4(new oj.ArrayDataProvider(json.grupos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/5",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupo5(new oj.ArrayDataProvider(json.grupos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/escuelas/obtenerGrupos/6",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('No se encontro ningun grupo');
                            return;
                        } else {
                            self.origenDatosGrupo6(new oj.ArrayDataProvider(json.grupos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
                
                self.cambioEscuela = event => {
                    switch(event.detail.value){
                        case 1:
                            self.origenDatosGrupos(self.origenDatosGrupo1());
                        break;
                        case 2:
                            self.origenDatosGrupos(self.origenDatosGrupo2());
                        break;
                        case 3:
                            self.origenDatosGrupos(self.origenDatosGrupo3());
                        break;
                        case 4:
                            self.origenDatosGrupos(self.origenDatosGrupo4());
                        break;
                        case 5:
                            self.origenDatosGrupos(self.origenDatosGrupo5());
                        break;
                        case 6:
                            self.origenDatosGrupos(self.origenDatosGrupo6());
                        break;
                    }
                };
                
                self.generarGraficaEscuela  = function () {
                   self.obtenerPorcentajesEscolares(document.getElementById('seleccionadorEscuela').value);
                }; 

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new IncidentsViewModel();
        }
);

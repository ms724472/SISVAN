/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojinputnumber', 'ojs/ojselectcombobox',
    'ojs/ojinputtext', 'ojs/ojcollapsible', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojaccordion'],
        function (oj, ko, $) {
            function ModeloEstadisticasOMS() {
                var self = this;
                self.origenDatosZNinas = ko.observable();
                self.origenDatosZNinos = ko.observable();
                self.orientationValue = ko.observable();
                self.tipoIndice = ko.observable("peso");
                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                this.orientationValue = ko.observable('vertical');

                self.obtenerEstadisticas = function (modeloCargado) {
                    if(modeloCargado) {
                        document.getElementById("dialogoCargando").open(); 
                    }
                    $.ajax({
                        type: "GET",
                        contentType: "text/plain; charset=utf-8",
                        url: oj.gWSUrl() + "estadisticas/obtenerPuntajesZ/" + self.tipoIndice() + "/femenino",
                        dataType: "text",
                        async: true,
                        success: function (data) {
                            json = $.parseJSON(data);
                            if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                                alert('Error de autenticación, por favor revisa tus datos.');
                                return;
                            } else {
                                self.origenDatosZNinas(new oj.ArrayDataProvider(json.mediciones, { keyAttributes: 'id' }));
                            }
                        }
                    }).fail(function () {
                        alert("Error en el servidor, favor de comunicarse con el administrador.");
                        return;
                    });

                    $.ajax({
                        type: "GET",
                        contentType: "text/plain; charset=utf-8",
                        url: oj.gWSUrl() + "estadisticas/obtenerPuntajesZ/" + self.tipoIndice() + "/masculino",
                        dataType: "text",
                        async: true,
                        success: function (data) {
                            json = $.parseJSON(data);
                            if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                                alert('Error de autenticación, por favor revisa tus datos.');
                                return;
                            } else {
                                self.origenDatosZNinos(new oj.ArrayDataProvider(json.mediciones, { keyAttributes: 'id' }));
                            }
                            if(modeloCargado) {
                                document.getElementById("dialogoCargando").close(); 
                            } 
                        }
                    }).fail(function () {
                        if(modeloCargado) {
                            document.getElementById("dialogoCargando").close(); 
                        } 
                        alert("Error en el servidor, favor de comunicarse con el administrador.");
                        return;
                    });
                };

                self.obtenerEstadisticas(false);

                self.tipoSeleccionado = function() {
                    self.obtenerEstadisticas(true);
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
            return new ModeloEstadisticasOMS();
        }
);

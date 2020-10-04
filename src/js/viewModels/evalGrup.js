/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'comun/constantes',
    'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojcollapsible', 'ojs/ojaccordion'],
        function (oj, ko, $) {
            function ModeloEvaluacionesGrupales() {
                var self = this;
                var todosLosGrupos = {};
                self.origenDatosEscuelas = ko.observable();
                self.escuelaSeleccionada = ko.observable();
                self.porcentajesEscuelas = ko.observable();
                self.porcentajesGrupos = ko.observable();
                self.origenDatosGrupos = ko.observable();    
                self.valorDesde = ko.observable();
                self.valorHasta = ko.observable();            

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.
                self.obtenerPorcentajesEscolares = function (idEscuela, diagnostico) {
                    var servicio = "escolares/obtenerPorcentajesEscuela/?id_escuela=" + idEscuela + 
                                                                        "&desde=" + self.valorDesde() + 
                                                                        "&hasta=" + self.valorHasta() + 
                                                                        "&diagnostico=" + diagnostico;
                    var peticionPorcentajesEscolares = new XMLHttpRequest();
                    peticionPorcentajesEscolares.open("GET", oj.gWSUrl() + servicio, false);
                    peticionPorcentajesEscolares.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                              var respuestaJSON = JSON.parse(this.responseText);
                              if (respuestaJSON.hasOwnProperty("error")) {
                                  if(respuestaJSON.error === "No hay datos.") {
                                    self.porcentajesEscuelas(new oj.ArrayDataProvider([{NoData:""}]));
                                  } else {
                                    alert(ERROR_INTERNO_SERVIDOR);
                                  }
                              } else {
                                self.porcentajesEscuelas(new oj.ArrayDataProvider(respuestaJSON.datos));
                              }                              
                              
                              console.log(ERROR_INTERNO_SERVIDOR);
                            } else {
                                alert(ERROR_INTERNO_SERVIDOR);
                            }
                        }
                    };
                    peticionPorcentajesEscolares.send();                    
                };

                self.funcionTecho = function (desde) {
                    var fecha = new Date(desde());
                    if (fecha.getMonth() >= 8 && fecha.getMonth() <= 12) {
                        var anio = fecha.getFullYear() + 1;
                        return anio + '-' + '07-31';
                    } else {
                        return fecha.getFullYear() + '-' + '07-31';
                    }
                };

                self.obtenerPorcentajesGrupales = function (idGrupo) {
                    var servicio = "escolares/obtenerPorcentajesGrupo/?id_grupo=" + idGrupo + 
                                                                      "&desde=" + self.valorDesde() + 
                                                                      "&hasta=" + self.valorHasta() + 
                                                                      "&diagnostico=" + diagnostico;
                    
                    var peticionPorcentajesGrupos = new XMLHttpRequest();
                    peticionPorcentajesGrupos.open("GET", oj.gWSUrl() + servicio, false);
                    peticionPorcentajesGrupos.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                              var respuestaJSON = JSON.parse(this.responseText);
                              if (respuestaJSON.hasOwnProperty("error")) {
                                  if(respuestaJSON.error === "No hay datos.") {
                                    self.porcentajesGrupos(new oj.ArrayDataProvider([{NoData:""}]));
                                  } else {
                                    alert(ERROR_INTERNO_SERVIDOR);
                                  }
                              } else {
                                self.porcentajesGrupos(new oj.ArrayDataProvider(respuestaJSON.datos));
                              }                              
                              
                              console.log(ERROR_INTERNO_SERVIDOR);
                            } else {
                                alert(ERROR_INTERNO_SERVIDOR);
                            }
                        }
                    };
                    peticionPorcentajesGrupos.send();
                };

                var peticionListaEscuelas = new XMLHttpRequest();
                peticionListaEscuelas.open("GET", oj.gWSUrl() + "obtenerEscuelas", false);
                peticionListaEscuelas.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                          var respuestaJSON = JSON.parse(this.responseText);
                          if (respuestaJSON.hasOwnProperty("error")) {
                              if(respuestaJSON.error === "No hay datos.") {
                                alert('No se encontro ninguna escuela');
                              } else {
                                alert(ERROR_INTERNO_SERVIDOR);
                              }
                          } else {
                            self.origenDatosEscuelas(new oj.ArrayDataProvider(respuestaJSON.escuelas));                            
                          }                              
                          
                          console.log(ERROR_INTERNO_SERVIDOR);
                        } else {
                            alert(ERROR_INTERNO_SERVIDOR);
                        }
                    }
                };

                peticionListaEscuelas.send(); 

                self.obtenerTodosLosGrupos = function() {
                    var peticionGrupos = new XMLHttpRequest();
                    peticionGrupos.open("GET", oj.gWSUrl() + "grupos/obtenerTodosLosGrupos/" + self.valorHasta(), false);
                    peticionGrupos.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                todosLosGrupos = JSON.parse(this.responseText);
                                self.origenDatosGrupos(new oj.ArrayDataProvider(todosLosGrupos[1], { keyAttributes: 'value' }));
                            }
                        }
                    };
                    peticionGrupos.send();
                }              

                var peticionRangos = new XMLHttpRequest();
                peticionRangos.open("GET", oj.gWSUrl() + "obtenerRangos", false);
                peticionRangos.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var respuestaJSON = JSON.parse(this.responseText);
                            self.valorDesde(respuestaJSON.rangos[0].desde);
                            self.valorHasta(respuestaJSON.rangos[0].hasta);
                            self.obtenerPorcentajesEscolares(1);
                            self.obtenerPorcentajesGrupales(1);
                            self.obtenerTodosLosGrupos();
                        } else {
                            alert("Error cargando ultimas mediciones, favor de contactar al administrador.")
                        }
                    }
                };

                peticionRangos.send();

                self.cambioEscuela = event => {
                    switch (event.detail.value) {
                        
                    }
                };

                self.generarGraficaEscuela = function () {
                    self.obtenerPorcentajesEscolares(document.getElementById('seleccionadorEscuela').value);
                };

                self.generarGraficaGrupo = function () {
                    self.obtenerPorcentajesGrupales(document.getElementById('seleccionadorGrupo').value);
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
            return new ModeloEvaluacionesGrupales();
        }
);

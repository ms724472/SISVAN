/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'libs/comun/constantes', 'ojs/ojtoolbar',
    'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojcollapsible', 'ojs/ojaccordion', 'ojs/ojdialog'],
        function (oj, ko, $) {
            function ModeloEvaluacionesGrupales() {
                var self = this;
                var todosLosGrupos = {};
                var escuelaSeleccionada = "";
                var nombreEscuelaSeleccionada = "";
                var grupoSeleccionado;
                var etiquetaGrupoSeleccionado;
                var diagnosticoSeleccionado;                
                self.tituloDiagnostico = ko.observable(" IMC");
                self.porcentajesEscuelas = ko.observable();
                self.porcentajesGrupos = ko.observable();   
                self.valorDesde = ko.observable();
                self.valorHasta = ko.observable();    
                self.escuelas = [];
                self.grupos = ko.observableArray();;
                self.diagnosticos = [
                    { value: "imc", label: "IMC" },
                    { value: "talla", label: "Talla" },
                    { value: "peso", label: "Peso" }
                ];

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
                            } else {
                                alert(ERROR_INTERNO_SERVIDOR);
                            }
                        }
                    };
                    peticionPorcentajesEscolares.send();                    
                };

                self.funcionTecho = function (desde) {
                    var fecha = new Date(desde() + "T12:00:00");
                    var fechaHasta;

                    if (fecha.getMonth() >= 7 && fecha.getMonth() <= 11) {
                        var anio = fecha.getFullYear() + 1;
                        fechaHasta = anio + '-' + '07-31';
                    } else {
                        fechaHasta = fecha.getFullYear() + '-' + '07-31';
                    }
                    
                    self.valorHasta(fechaHasta);
                    return fechaHasta;
                };

                self.obtenerPorcentajesGrupales = function (idGrupo, diagnostico) {
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
                            self.escuelas = respuestaJSON.escuelas;
                          }                                                        
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
                                self.grupos(todosLosGrupos[self.escuelas[0].value]);
                            }
                        }
                    };
                    peticionGrupos.send();
                };              

                var peticionRangos = new XMLHttpRequest();
                peticionRangos.open("GET", oj.gWSUrl() + "obtenerRangos", false);
                peticionRangos.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var respuestaJSON = JSON.parse(this.responseText);
                            var desde = respuestaJSON.rangos[0].desde;
                            var hasta = respuestaJSON.rangos[0].hasta;                            

                            if(desde === "" || hasta === "") {
                                var fechaActual = new Date();
                                if(fechaActual.getMonth() >= 7 && fechaActual.getMonth() <= 11) {                          
                                    self.valorDesde(fechaActual.getFullYear() + "-08-01");
                                    self.valorHasta((fechaActual.getFullYear() + 1) + "-07-31");
                                } else {
                                    self.valorDesde((fechaActual.getFullYear() - 1) + "-08-01");
                                    self.valorHasta(fechaActual.getFullYear() + "-07-31");
                                }
                            } else{
                                self.valorDesde(desde);
                                self.valorHasta(hasta);   
                            }

                            self.obtenerTodosLosGrupos();      
                            self.obtenerPorcentajesEscolares(todosLosGrupos[self.escuelas[0].value][0].value, "imc");
                            self.obtenerPorcentajesGrupales(todosLosGrupos[self.escuelas[0].value][0].value, "imc");  
                            nombreEscuelaSeleccionada = self.escuelas[0].label;
                            etiquetaGrupoSeleccionado = todosLosGrupos[self.escuelas[0].value][0].label;                       
                        } else {
                            alert("Error cargando ultimas mediciones, favor de contactar al administrador.")
                        }
                    }
                };

                peticionRangos.send();

                self.cambioEscuela = function(event) {
                    nombreEscuelaSeleccionada = event.target.innerText;
                    escuelaSeleccionada = event.target.value;
                    grupoSeleccionado = "";
                    if(todosLosGrupos.hasOwnProperty(event.target.value)) {                        
                        self.grupos(todosLosGrupos[event.target.value]);
                    } else {
                        self.grupos([]);
                    }
                };

                self.cambioGrupo = function(event) {
                    etiquetaGrupoSeleccionado = event.target.innerText;
                    grupoSeleccionado = event.target.value;                    
                };

                self.tituloEscuela = ko.pureComputed(function () {
                    return {
                        title: "Escuela Primaria: " + nombreEscuelaSeleccionada
                    };
                });
    
                self.tituloGrupo = ko.pureComputed(function () {
                    return {
                        title: "Escuela Primaria: " + nombreEscuelaSeleccionada + "\nGrupo: " + etiquetaGrupoSeleccionado
                    };
                });

                self.cambioDiagnostico = function(event) {
                    diagnosticoSeleccionado = event.target.value;
                    self.tituloDiagnostico(event.target.innerText);
                };

                self.actualizarGraficos = function(event) {
                    self.obtenerPorcentajesEscolares(escuelaSeleccionada, diagnosticoSeleccionado);
                    self.obtenerPorcentajesGrupales(grupoSeleccionado, diagnosticoSeleccionado);
                };

                self.descargarPDF = function(event) {
                    var panelesColapsables = document.getElementsByClassName("oj-expanded");
                    if(panelesColapsables.length === 0) {
                        alert("Favor de abrir una de las evaluaciones para generar el reporte.");
                    } else {
                        document.getElementById("dialogoCargando").open(); 

                        var cuerpoPeticion = {
                            alto: 350,
                            ancho: 500,
                            svg: panelesColapsables[0].getElementsByTagName("svg")[0].outerHTML,
                            tipo: panelesColapsables[0].outerText.includes("escolar") ? "escuela" : "grupo"
                        };

                        var peticionPDF = new XMLHttpRequest();
                        peticionPDF.open("POST", oj.gWSUrl() + "generarImagen", true);
                        peticionPDF.responseType = 'arraybuffer';
                        peticionPDF.onreadystatechange = function() {
                            if (this.readyState === 4) {
                                if (this.status === 200) {
                                    var link = document.createElement("a");
                                    var blob = new Blob([this.response], { type: "image/png" });
                                    var pdfUrl = URL.createObjectURL(blob);
                                    link.href = pdfUrl;
                                    link.style = "visibility:hidden";
                                    link.download = "Grafico.png";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                } else {
                                    alert(ERROR_INTERNO_SERVIDOR);
                                }
                                document.getElementById("dialogoCargando").close();
                            }
                        };
                        peticionPDF.send(JSON.stringify(cuerpoPeticion));
                    }
                };

                self.descargarExcel = function(event) {
                    if(escuelaSeleccionada === "") {
                        alert("Seleccione una escuela para descargar el archivo de Excel.");
                        return;
                    }
                    
                    document.getElementById("dialogoCargando").open();
                    var servicio = "escolares/generarExcelGrupal" + 
                                   "?id_escuela=" + escuelaSeleccionada +
                                   "&desde=" + self.valorDesde() +
                                   "&hasta=" + self.valorHasta();

                    var peticionExcel = new XMLHttpRequest();
                    peticionExcel.open("GET", oj.gWSUrl() + servicio, true);
                    peticionExcel.responseType = 'arraybuffer';
                    peticionExcel.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                var link = document.createElement("a");
                                var blob = new Blob([this.response], { type: "application/vnd.ms-excel" });
                                var xlsxUrl = URL.createObjectURL(blob);
                                link.href = xlsxUrl;
                                link.style = "visibility:hidden";
                                link.download = "Antropometria.xlsx";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } else {
                                alert(ERROR_INTERNO_SERVIDOR);
                            }
                            document.getElementById("dialogoCargando").close();
                        }
                    };
                    peticionExcel.send(JSON.stringify());
                }

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

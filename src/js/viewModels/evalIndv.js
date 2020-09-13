/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojarraytabledatasource',
    'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojcollapsible', 'ojs/ojprogress', 'ojs/ojaccordion'],
        function (oj, ko, $) {
            self.dataProvider = ko.observable();
            self.datosEstatura = ko.observable();
            self.orientationValue = ko.observable();
            self.origenDatosEscuelas = ko.observable();
            self.mediciones = '[{"NoData":""}]';

            function ChartModel() {
                /* toggle button variables */
                this.orientationValue = ko.observable('vertical');
                this.dataProvider = new oj.ArrayDataProvider(JSON.parse(mediciones), {keyAttributes: 'id'});
                this.datosEstatura = new oj.ArrayDataProvider(JSON.parse(mediciones), {keyAttributes: 'id'});
            }

            self.nombresColumnas = ko.observableArray([
                {headerText: 'Nombre(s)', field: 'nombre'},
                {headerText: 'Apellido Paterno', field: 'apellido_p'},
                {headerText: 'Apellido Materno', field: 'apellido_m'},
                {headerText: 'Sexo', field: 'sexo'},
                {headerText: 'Fecha nacimiento', field: 'fecha_nac'},
                {headerText: 'Escuela', field: 'escuela'},
                {headerText: 'Grado', field: 'grado'},
                {headerText: 'Grupo', field: 'letra'}
            ]);

            self.columnasMediciones = ko.observableArray([
                {headerText: 'Fecha medición', field: 'fecha', sortable: 'disabled'},
                {headerText: 'Peso', field: 'masa', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'DxPeso', field: 'diagnostico_peso', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},                            
                {headerText: 'Talla', field: 'estatura', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'DxTall', field: 'diagnostico_talla', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'IMC', field: 'imc', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'DxIMC', field: 'diagnostico_imc', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'Per. Cuello', field: 'perimetro_cuello', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'Cintura', field: 'cintura', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'Triceps', field: 'triceps', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'Subescapula', field: 'subescapula', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'},
                {headerText: 'Pli. Cuello', field: 'pliegue_cuello', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;'}
            ]);

            self.origenDatosAlumnos = ko.observable();
            self.origenDatosNombres = ko.observable();
            self.origenDatosMediciones = ko.observable();

            var datos = '{"NoData":""}';
            datos = JSON.parse("[" + datos + "]");
            self.origenDatosAlumnos(new oj.ArrayTableDataSource(datos));
            self.origenDatosNombres(new oj.ArrayTableDataSource(datos));
            self.origenDatosMediciones(new oj.ArrayTableDataSource(datos));
            self.origenDatosEscuelas(new oj.ArrayTableDataSource(datos));

            $.ajax({type: "GET",
                contentType: "text/plain; charset=utf-8",
                url: oj.gWSUrl() + "obtenerEscuelas",
                dataType: "text",
                async: false,
                success: function (data) {
                    json = $.parseJSON(data);
                    if (json.hasOwnProperty("error")) {
                        alert('No se encontro ninguna escuela');
                        return;
                    } else {
                        self.origenDatosEscuelas(new oj.ArrayDataProvider(json.escuelas));
                    }
                }
            }).fail(function () {
                alert("Error en el servidor, favor de comunicarse con el administrador.");
                return;
            });

            function IncidentsViewModel() {
                var self = this;

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

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

            self.obtenerInfo = function () {
                datos = '{"NoData":""}';
                datos = JSON.parse("[" + datos + "]");

                self.origenDatosAlumnos(new oj.ArrayTableDataSource(datos));

                var idAlumno = document.getElementById("idAlumno").value;
                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerDatos/" + idAlumno,
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                            alert('Error de autenticación, por favor revisa tus datos.');
                            return;
                        } else {
                            self.origenDatosAlumnos(new oj.ArrayTableDataSource(json.datos));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerMediciones/" + idAlumno,
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                            alert('Error de autenticación, por favor revisa tus datos.');
                            return;
                        } else {
                            self.origenDatosMediciones(new oj.ArrayTableDataSource(json.mediciones));
                            document.getElementById('colapsableHistoricoMediciones').expanded = 'true';
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerHistoricoMasa/" + idAlumno,
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                            alert('Error de autenticación, por favor revisa tus datos.');
                            return;
                        } else {
                            self.dataProvider(new oj.ArrayDataProvider(json.mediciones, {keyAttributes: 'id'}));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerHistoricoEstatura/" + idAlumno,
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                            alert('Error de autenticación, por favor revisa tus datos.');
                            return;
                        } else {
                            self.datosEstatura(new oj.ArrayDataProvider(json.mediciones, {keyAttributes: 'id'}));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            self.agregarAlumno = function () {
                document.getElementById('dialogoNuevoAlumno').open();
            };

            self.buscarAlumno = function () {
                document.getElementById('dialogoBuscarAlumno').open();
            };

            self.encontrarAlumno = function () {
                var nombreAlumno = document.getElementById("nombreABuscar").value;
                var datos = '{"No se encontraron resultados":""}';
                datos = JSON.parse("[" + datos + "]");

                $.ajax({type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/buscarPorNombre/" + nombreAlumno,
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") && json.error !== "No hay datos.") {
                            alert('No se encontro ningun alumno');
                            return;
                        } else if (json.error === "No hay datos.") {
                            self.origenDatosNombres(new oj.ArrayTableDataSource(datos));
                        } else {
                            self.origenDatosNombres(new oj.ArrayTableDataSource(json.alumnos, {keyAttributes: 'id_alumno'}));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            this.cerrarNuevoAlumno = function (event) {
                document.getElementById('dialogoNuevoAlumno').close();
            }

            self.crearNuevoAlumno = function () {
                document.getElementById('dialogoCargando').open();
                var idAlumno = document.getElementById("nuevoIdAlumno").value;
                var nombre = document.getElementById("nuevoNombreAlumno").value;
                var apellido_p = document.getElementById("nuevoApellidoPAlumno").value;
                var apellido_m = document.getElementById("nuevoApellidoMAlumno").value;
                var sexo = document.getElementById("nuevoSexoAlumno").value;
                var fecha_nac = document.getElementById("nuevoFNacimientoAlumno").value;
                var bodyRequest = {id_alumno: idAlumno,
                    nombre: nombre,
                    apellido_p: apellido_p,
                    apellido_m: apellido_m,
                    sexo: sexo,
                    fecha_nac: fecha_nac};
                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/agregarAlumno",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            document.getElementById('dialogoCargando').close();
                            alert('Error, por favor revisa tus datos.');
                            return;
                        } else {
                            document.getElementById("idAlumno").value = idAlumno;
                            self.obtenerInfo();
                            document.getElementById('dialogoCargando').close();
                            document.getElementById('dialogoNuevoAlumno').close();
                            document.getElementById("nuevoIdAlumno").value = '';
                            document.getElementById("nuevoNombreAlumno").value = '';
                            document.getElementById("nuevoApellidoPAlumno").value = '';
                            document.getElementById("nuevoApellidoMAlumno").value = '';
                            document.getElementById("nuevoSexoAlumno").value = 'Femenino';
                            document.getElementById("nuevoFNacimientoAlumno").value = '';
                            document.getElementById("nuevoEscuelaAlumno").value = '';
                            document.getElementById("nuevoGradoAlumno").value = '';
                            document.getElementById("nuevoGrupoAlumno").value = '';
                            alert('Agregado correctamente.');
                        }
                    }
                }).fail(function () {
                    document.getElementById('dialogoCargando').close();
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            self.seleccionarAlumno = function () {
                var tabla = document.getElementById('tablaNombres');
                var datos = '{"No se encontraron resultados":""}';
                datos = JSON.parse("[" + datos + "]");
                document.getElementById('idAlumno').value = tabla.currentRow.rowKey[0];
                document.getElementById('nombreABuscar').value = '';
                self.origenDatosNombres(new oj.ArrayTableDataSource(datos));
                document.getElementById('dialogoBuscarAlumno').close();
            };

            self.agregarMedicion = function () {
                document.getElementById('dialogoNuevaMedicion').open();
            };

            self.crearNuevaMedicion = function () {
                document.getElementById('dialogoCargando').open();
                var idAlumno = document.getElementById("idAlumno").value;
                var fecha = document.getElementById("nuevaFMedicion").value;
                var masa = document.getElementById("nuevaMasaMedicion").value;
                var estatura = document.getElementById("nuevaEstaturaMedicion").value;
                var perimetro_cuello = document.getElementById("nuevaPerimetroCuelloMedicion").value;
                var cintura = document.getElementById("nuevaCinturaMedicion").value;
                var triceps = document.getElementById("nuevaTricepsMedicion").value;
                var subEscapula = document.getElementById("nuevaSubescapulaMedicion").value;
                var pliegueCuello = document.getElementById("nuevaPliegueCuelloMedicion").value;
                var bodyRequest = {id_alumno: idAlumno,
                    fecha: fecha,
                    masa: masa,
                    estatura: estatura,
                    perimetro_cuello: perimetro_cuello,
                    cintura: cintura,
                    triceps: triceps,
                    subEscapula: subEscapula,
                    pliegueCuello: pliegueCuello};
                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/agregarMedicion",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            document.getElementById('dialogoCargando').close();
                            alert('Error, por favor revisa tus datos.');
                            return;
                        } else {
                            self.obtenerInfo();
                            document.getElementById('dialogoCargando').close();
                            document.getElementById('dialogoNuevaMedicion').close();
                            document.getElementById('nuevaFMedicion').value = '';
                            document.getElementById('nuevaMasaMedicion').value = '';
                            document.getElementById("nuevaEstaturaMedicion").value = '';
                            alert('Agregado correctamente.');
                        }
                    }
                }).fail(function () {
                    document.getElementById('dialogoCargando').close();
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            this.cerrarNuevaMedicion = function () {
                document.getElementById('dialogoNuevaMedicion').close();
            };

            this.descargarInfo = function () {
                var idAlumno = document.getElementById("idAlumno").value;

                var xhr = new XMLHttpRequest();
                xhr.open("GET", oj.gWSUrl() + "alumnos/generarExcel/" + idAlumno, true);
                xhr.responseType = 'arraybuffer';

                xhr.onload = function (event) {
                    var link = document.createElement("a");
                    var arrayBuffer = xhr.response;
                    var blob = new Blob([arrayBuffer], {type: "application/vnd.ms-excel"});
                    var xlsxUrl = URL.createObjectURL(blob);
                    link.href = xlsxUrl;
                    link.style = "visibility:hidden";
                    link.download = "Reporte.xlsx";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                xhr.send();
            };

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new IncidentsViewModel();
        }
);

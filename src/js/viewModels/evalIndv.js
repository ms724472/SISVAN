/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojarraytabledatasource',
    'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojcollapsible','ojs/ojprogress'],
        function (oj, ko, $) {
            self.dataProvider = ko.observable();
            self.datosEstatura = ko.observable();
            self.orientationValue = ko.observable();
            self.mediciones = '[{"NoData":""}]';

            function ChartModel() {
                /* toggle button variables */
                this.orientationValue = ko.observable('vertical');
                this.dataProvider = new oj.ArrayDataProvider(JSON.parse(mediciones), {keyAttributes: 'id'});
                this.datosEstatura = new oj.ArrayDataProvider(JSON.parse(mediciones), {keyAttributes: 'id'});
            }

            var chartModel = new ChartModel();
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
                {headerText: 'Fecha medición', field: 'fecha'},
                {headerText: 'Masa', field: 'masa'},
                {headerText: 'Estatura', field: 'estatura'},
                {headerText: 'Indice de Masa Coporal', field: 'imc'}
            ]);

            self.origenDatosAlumnos = ko.observable();
            self.origenDatosMediciones = ko.observable();

            var datos = '{"NoData":""}';
            datos = JSON.parse("[" + datos + "]");
            self.origenDatosAlumnos(new oj.ArrayTableDataSource(datos));
            self.origenDatosMediciones(new oj.ArrayTableDataSource(datos));

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
                var bodyRequest = {id_alumno: idAlumno};
                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/alumnos/obtenerDatos",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
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

                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/alumnos/obtenerMediciones",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('Error de autenticación, por favor revisa tus datos.');
                            return;
                        } else {
                            self.origenDatosMediciones(new oj.ArrayTableDataSource(json.mediciones));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/alumnos/obtenerHistoricoMasa",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
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

                $.ajax({type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/alumnos/obtenerHistoricoEstatura",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
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
                    url: "http://sisvan-iteso.online/SISVANWS/rest/wls/1.0/alumnos/agregarAlumno",
                    dataType: "text",
                    data: JSON.stringify(bodyRequest).replace(/]|[[]/g, ''),
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error") || json.status === 'fallo') {
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
                            document.getElementById("nuevoSexoAlumno").value = '';
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

            self.agregarMedicion = function () {
                document.getElementById('dialogoNuevaMedicion').open();
            };

            this.cerrarNuevaMedicion = function () {
                document.getElementById('dialogoNuevaMedicion').close();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new IncidentsViewModel();
        }
);

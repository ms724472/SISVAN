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

            self.dataProvider = ko.observable();
            self.datosEstatura = ko.observable();
            self.datosIMC = ko.observable();
            self.orientationValue = ko.observable();
            self.origenDatosEscuelas = ko.observable();
            self.origenDatosGrupos = ko.observable()
            self.nuevoEscuelaAlumno = ko.observable();
            self.nuevoGrupoAlumno = ko.observable();
            self.alumnoActual = ko.observable('');
            self.escuelaDelAlumno = ko.observable();
            self.nuevoGrupoMedicion = ko.observable();
            self.mediciones = '[{"NoData":""}]';
            self.fechaNuevaMedicion = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.idDeshabilitado = ko.observable(false);
            self.nuevaFechaNac = ko.observable();
            self.dialogoAlumno = ko.observable("Agregar nuevo alumno");
            self.botonFormularioAlumno = ko.observable("Agregar");
            self.tituloMedicion = ko.observable("Agregar nueva medición");
            self.botonFormularioMedicion = ko.observable("Agregar");
            self.medicionSeleccionada = ko.observable();

            var datosAlumnoActual = {};
            var grupos = {};

            function ChartModel() {
                /* toggle button variables */
                this.orientationValue = ko.observable('vertical');
                this.dataProvider = new oj.ArrayDataProvider(JSON.parse(mediciones), { keyAttributes: 'id' });
                this.datosEstatura = new oj.ArrayDataProvider(JSON.parse(mediciones), { keyAttributes: 'id' });
            }

            self.nombresColumnas = ko.observableArray([
                { headerText: 'Nombre(s)', field: 'nombre' },
                { headerText: 'Apellido Paterno', field: 'apellido_p' },
                { headerText: 'Apellido Materno', field: 'apellido_m' },
                { headerText: 'Sexo', field: 'sexo' },
                { headerText: 'Fecha nacimiento', field: 'fecha_nac' },
                { headerText: 'Escuela', field: 'escuela' },
                { headerText: 'Grado estimado', field: 'grado' },
                { headerText: 'Grupo', field: 'letra' }
            ]);

            self.columnasMediciones = ko.observableArray([
                { headerText: 'Fecha medición', field: 'fecha', sortable: 'disabled' },
                { headerText: 'Meses', field: 'meses', sortable: 'disabled' },
                { headerText: 'Grupo', field: 'grupo', sortable: 'disabled' },
                { headerText: 'Peso', field: 'masa', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'DxPeso', field: 'diagnostico_peso', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'zPeso', field: 'z_peso', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Talla', field: 'estatura', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'DxTalla', field: 'diagnostico_talla', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'zTalla', field: 'z_talla', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'IMC', field: 'imc', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'DxIMC', field: 'diagnostico_imc', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'zIMC', field: 'z_imc', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Per. Cuello', field: 'perimetro_cuello', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Cintura', field: 'cintura', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Triceps', field: 'triceps', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Subescapula', field: 'subescapula', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' },
                { headerText: 'Pli. Cuello', field: 'pliegue_cuello', style: 'text-align: right;', sortable: 'disabled', headerStyle: 'text-align: right;' }
            ]);

            self.origenDatosAlumnos = ko.observable();
            self.origenDatosNombres = ko.observable();
            self.origenDatosMediciones = ko.observable();

            self.convertidorFechas = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                createConverter(
                    {
                        pattern: "dd/MM/yyyy"
                    }));

            self.tituloIMC = ko.pureComputed(function () {
                return {
                    title: "Historico IMC"
                };
            });

            self.tituloTalla = ko.pureComputed(function () {
                return {
                    title: "Historico Talla"
                };
            });

            self.tituloPeso = ko.pureComputed(function () {
                return {
                    title: "Historico Peso"
                };
            });


            var datos = '{"NoData":""}';
            datos = JSON.parse("[" + datos + "]");
            self.origenDatosAlumnos(new oj.ArrayTableDataSource(datos));
            self.origenDatosNombres(new oj.ArrayTableDataSource(datos));
            self.origenDatosMediciones(new oj.ArrayTableDataSource(datos));
            self.origenDatosEscuelas(new oj.ArrayTableDataSource(datos));

            $.ajax({
                type: "GET",
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

            var peticionGrupos = new XMLHttpRequest();
            peticionGrupos.open("GET", oj.gWSUrl() + "grupos/obtenerTodosLosGrupos", false);
            peticionGrupos.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        var jsonResponse = JSON.parse(this.responseText);
                        if (jsonResponse.hasOwnProperty("error")) {
                            alert('No al inicializar el modulo, por favor contacta al administrador.');
                        } else {
                            if (Object.keys(jsonResponse).length == 0) {
                                alert("Te recomendamos agregar un grupo para agregar nuevos alumnos o mediciones.")
                            } else {
                                grupos = jsonResponse;
                            }
                        }
                    }
                }
            };

            peticionGrupos.send();

            self.validadorNumerico = ko.computed(function () {
                return [{
                    type: 'regExp',
                    options: {
                        pattern: '[0-9]+',
                        messageSummary: 'Valor invalido',
                        messageDetail: 'Corrija el campo.'
                    }
                }];
            });

            self.validadorTexto = ko.computed(function () {
                return [{
                    type: 'regExp',
                    options: {
                        pattern: '[\\w\\s]+',
                        messageSummary: 'Valor invalido',
                        messageDetail: 'Corrija el campo.'
                    }
                }];
            });

            self.validadorFechas = ko.computed(function () {
                return [{
                    type: 'regExp',
                    options: {
                        pattern: '.+',
                        messageSummary: 'Valor invalido',
                        messageDetail: 'Corrija el campo.'
                    }
                }];
            });

            self.validadorGrupos = ko.computed(function () {
                return [{
                    type: 'regExp',
                    options: {
                        pattern: '[0-6] [A-Z]',
                        messageSummary: 'Grupo invalido',
                        messageDetail: 'Corrija el campo.'
                    }
                }];
            });

            self.obtenerInfo = function () {
                var peticionHistoticoIMC = new XMLHttpRequest();
                datos = '{"NoData":""}';
                datos = JSON.parse("[" + datos + "]");

                self.origenDatosAlumnos(new oj.ArrayTableDataSource(datos));

                $.ajax({
                    type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerDatos/" + self.alumnoActual(),
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            alert('Identificador de alumno no valido, por favor revisa tus datos.');
                            return;
                        } else {
                            self.origenDatosAlumnos(new oj.ArrayTableDataSource(json.datos));
                            self.escuelaDelAlumno(json.datos[0].id_escuela);
                            datosAlumnoActual = json.datos[0];
                            if (json.datos[0].grado !== "EGRESADO") {
                                self.nuevoGrupoMedicion(json.datos[0].id_grupo);
                            }
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({
                    type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerMediciones/" + self.alumnoActual(),
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            if (json.error === "No hay datos.") {
                                self.origenDatosMediciones(new oj.ArrayTableDataSource([{ "Sin datos": "" }]));
                                document.getElementById('colapsableHistoricoMediciones').expanded = 'true';
                            } else {
                                alert('No es posible obtener los datos, por favor contacta al administrador.');
                            }
                            return;
                        } else {
                            self.origenDatosMediciones(new oj.ArrayTableDataSource(json.mediciones));
                            document.getElementById('colapsableHistoricoMediciones').expanded = 'true';
                        }
                    }
                }).fail(function () {
                    alert("No es posible obtener los datos, por favor contacta al administrador.");
                    return;
                });

                $.ajax({
                    type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerHistoricoMasa/" + self.alumnoActual(),
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            if (json.error === "No hay datos.") {
                                self.dataProvider(new oj.ArrayDataProvider([]));
                            } else {
                                alert('No es posible obtener los datos, por favor contacta al administrador.');
                            }
                            return;
                        } else {
                            self.dataProvider(new oj.ArrayDataProvider(json.mediciones, { keyAttributes: 'id' }));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                $.ajax({
                    type: "GET",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/obtenerHistoricoEstatura/" + self.alumnoActual(),
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        json = $.parseJSON(data);
                        if (json.hasOwnProperty("error")) {
                            if (json.error === "No hay datos.") {
                                self.datosEstatura(new oj.ArrayDataProvider([]));
                            } else {
                                alert('No es posible obtener los datos, por favor contacta al administrador.');
                            }
                            return;
                        } else {
                            self.datosEstatura(new oj.ArrayDataProvider(json.mediciones, { keyAttributes: 'id' }));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });

                peticionHistoticoIMC.open("GET", oj.gWSUrl() + "alumnos/obtenerHistoricoIMC/" + self.alumnoActual(), false);
                peticionHistoticoIMC.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var jsonResponse = JSON.parse(this.responseText);
                            if (jsonResponse.hasOwnProperty("error")) {
                                if (jsonResponse.error === "No hay datos.") {
                                    self.datosIMC(new oj.ArrayDataProvider([]));
                                } else {
                                    alert('No es posible obtener los datos, por favor contacta al administrador.');
                                }
                                return;
                            } else {
                                self.datosIMC(new oj.ArrayDataProvider(jsonResponse.mediciones, { keyAttributes: 'id' }));
                            }
                        } else {
                            alert("Error en el servidor, favor de comunicarse con el administrador.");
                        }
                    }
                };
                peticionHistoticoIMC.send();
            };

            self.agregarAlumno = function () {
                self.dialogoAlumno("Agregar nuevo alumno");
                self.botonFormularioAlumno("Agregar");
                document.getElementById('dialogoNuevoAlumno').open();
            };

            self.buscarAlumno = function () {
                document.getElementById('dialogoBuscarAlumno').open();
            };

            self.encontrarAlumno = function () {
                var nombreAlumno = document.getElementById("nombreABuscar").value;
                var datos = '{"No se encontraron resultados":""}';
                datos = JSON.parse("[" + datos + "]");

                $.ajax({
                    type: "GET",
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
                            self.origenDatosNombres(new oj.ArrayTableDataSource(json.alumnos, { keyAttributes: 'id_alumno' }));
                        }
                    }
                }).fail(function () {
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            self.cerrarNuevoAlumno = function (event) {
                document.getElementById('dialogoNuevoAlumno').close();
                self.idDeshabilitado(false);
                document.getElementById("nuevoIdAlumno").value = '';
                document.getElementById("nuevoNombreAlumno").value = '';
                document.getElementById("nuevoApellidoPAlumno").value = '';
                document.getElementById("nuevoApellidoMAlumno").value = '';
                document.getElementById("nuevoSexoAlumno").value = 'femenino';
                document.getElementById("nuevoFNacimientoAlumno").value = '';
                self.nuevoEscuelaAlumno('');
                self.nuevoGrupoAlumno('');
                if (Object.keys(grupos).length > 0) {
                    self.origenDatosGrupos(new oj.ArrayDataProvider(datos));
                }
            }

            self.escuelaSeleccionada = function (event) {
                var id_escuela = event['detail'].value.toString();
                if (id_escuela !== "" && Object.keys(grupos).length > 0) {
                    self.origenDatosGrupos(new oj.ArrayDataProvider(grupos[id_escuela], { keyAttributes: 'value' }));
                }
            };

            self.editarMedicion = function(event) {
                console.log(self.medicionSeleccionada()[0].startIndex);
            };

            self.editarAlumno = function () {
                if(Object.keys(datosAlumnoActual).length === 0){
                    alert("Para editar es necesario seleccionar un alumno.");
                    return;
                }
                self.dialogoAlumno("Editar alumno");
                self.botonFormularioAlumno("Guardar");
                document.getElementById("nuevoIdAlumno").value = self.alumnoActual().toString();
                self.idDeshabilitado(true);
                document.getElementById("nuevoNombreAlumno").value = datosAlumnoActual.nombre;
                document.getElementById("nuevoApellidoPAlumno").value = datosAlumnoActual.apellido_p;
                document.getElementById("nuevoApellidoMAlumno").value = datosAlumnoActual.apellido_m;
                document.getElementById("nuevoSexoAlumno").value = datosAlumnoActual.sexo.toLowerCase();
                var compFechaNac = datosAlumnoActual.fecha_nac.split("/");
                self.nuevaFechaNac(compFechaNac[2] + "-" + compFechaNac[1] + "-" + compFechaNac[0]);
                self.nuevoEscuelaAlumno(datosAlumnoActual.id_escuela);
                document.getElementById("nuevoGrupoAlumno").value = datosAlumnoActual.id_grupo;
                document.getElementById('dialogoNuevoAlumno').open();
            };

            self.crearNuevoAlumno = function () {
                var campoId = document.getElementById("nuevoIdAlumno");
                var campoNombre = document.getElementById("nuevoNombreAlumno");
                var campoApellidoP = document.getElementById("nuevoApellidoPAlumno");
                var campoApellidoM = document.getElementById("nuevoApellidoMAlumno");
                var campoSexoAlumno = document.getElementById("nuevoSexoAlumno");
                var campoFechaNac = document.getElementById("nuevoFNacimientoAlumno");
                var campoGrupoAlumno = document.getElementById("nuevoGrupoAlumno");

                campoId.validate();
                campoNombre.validate();
                campoApellidoP.validate();
                campoApellidoM.validate();
                campoFechaNac.validate();
                campoGrupoAlumno.validate();
                if (campoId.valid === 'invalidShown' || campoNombre.valid === 'invalidShown' ||
                    campoApellidoP.valid === 'invalidShown' || campoApellidoM.valid === 'invalidShown' ||
                    campoFechaNac.valid === 'invalidShown' || campoGrupoAlumno.valid === 'invalidShown') {
                    return;
                }
                document.getElementById('dialogoCargando').open();
                var idAlumno = campoId.value;
                var nombre = campoNombre.value;
                var apellido_p = campoApellidoP.value;
                var apellido_m = campoApellidoM.value;
                var sexo = campoSexoAlumno.value;
                var fecha_nac = campoFechaNac.value;
                var bodyRequest = {
                    id_alumno: idAlumno,
                    nombre: nombre,
                    apellido_p: apellido_p,
                    apellido_m: apellido_m,
                    sexo: sexo,
                    fecha_nac: fecha_nac,
                    id_grupo: self.nuevoGrupoAlumno().toString()
                };
                var servicio = 'agregarAlumno';
                if(self.botonFormularioAlumno() === 'Guardar') {
                    servicio = 'actualizarAlumno';
                }
                $.ajax({
                    type: "POST",
                    contentType: "text/plain; charset=utf-8",
                    url: oj.gWSUrl() + "alumnos/" + servicio,
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
                            self.cerrarNuevoAlumno();
                            if(self.botonFormularioAlumno() === 'Guardar') {                                
                                alert('Guardado correctamente.');
                            } else {
                                alert('Agregado correctamente.');
                            }
                            
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
                self.obtenerInfo();
                document.getElementById('dialogoBuscarAlumno').close();
            };

            self.agregarMedicion = function () {
                if(Object.keys(datosAlumnoActual).length === 0){
                    alert("Para agregar mediciones es necesario seleccionar un alumno.");
                } else {
                    if (Object.keys(grupos).length > 0) {
                        self.origenDatosGrupos(new oj.ArrayDataProvider(grupos[self.escuelaDelAlumno()], { keyAttributes: 'value' }));
                        document.getElementById('dialogoNuevaMedicion').open();
                    } else {
                        alert("Favor de agregar un nuevo grupo.");
                    }
                }
            };

            self.crearNuevaMedicion = function () {
                self.botonFormularioMedicion("Agregar");
                self.tituloMedicion("Agregar nueva medición");
                document.getElementById('dialogoCargando').open();
                var idAlumno = document.getElementById("idAlumno").value;
                var fecha = self.fechaNuevaMedicion();
                var masa = document.getElementById("nuevaMasaMedicion").value;
                var estatura = document.getElementById("nuevaEstaturaMedicion").value;
                var perimetro_cuello = document.getElementById("nuevaPerimetroCuelloMedicion").value;
                var cintura = document.getElementById("nuevaCinturaMedicion").value;
                var triceps = document.getElementById("nuevaTricepsMedicion").value;
                var subescapula = document.getElementById("nuevaSubescapulaMedicion").value;
                var pliegue_cuello = document.getElementById("nuevaPliegueCuelloMedicion").value;
                var bodyRequest = {
                    id_alumno: idAlumno,
                    id_grupo: self.nuevoGrupoMedicion().toString(),
                    fecha: fecha,
                    masa: masa,
                    estatura: estatura,
                    perimetro_cuello: perimetro_cuello,
                    cintura: cintura,
                    triceps: triceps,
                    subescapula: subescapula,
                    pliegue_cuello: pliegue_cuello
                };
                $.ajax({
                    type: "POST",
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
                            self.cerrarNuevaMedicion();
                            alert('Agregado correctamente.');
                        }
                    }
                }).fail(function () {
                    document.getElementById('dialogoCargando').close();
                    alert("Error en el servidor, favor de comunicarse con el administrador.");
                    return;
                });
            };

            self.cerrarNuevaMedicion = function () {
                document.getElementById('dialogoNuevaMedicion').close();
                self.fechaNuevaMedicion(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                document.getElementById('nuevaMasaMedicion').value = '';
                document.getElementById("nuevaEstaturaMedicion").value = '';
                document.getElementById("nuevaPerimetroCuelloMedicion").value  = '';
                document.getElementById("nuevaCinturaMedicion").value  = '';
                document.getElementById("nuevaTricepsMedicion").value  = '';
                document.getElementById("nuevaSubescapulaMedicion").value  = '';
                document.getElementById("nuevaPliegueCuelloMedicion").value  = '';
            };

            this.descargarInfo = function () {
                var idAlumno = document.getElementById("idAlumno").value;

                var xhr = new XMLHttpRequest();
                xhr.open("GET", oj.gWSUrl() + "alumnos/generarExcel/" + idAlumno, true);
                xhr.responseType = 'arraybuffer';

                xhr.onload = function (event) {
                    var link = document.createElement("a");
                    var arrayBuffer = xhr.response;
                    var blob = new Blob([arrayBuffer], { type: "application/vnd.ms-excel" });
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
        };

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new IncidentsViewModel();
    }
);

/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojmenu', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
  'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojselectcombobox'],
  function (oj, ko, $, ArrayDataProvider) {

    function ModelosDatosEscolares() {
      var self = this;
      var datosEscuela;
      var filaEscSeleccionada = 0;
      var filaGrpSeleccionado = -1;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      self.origenDatosEscuelas = ko.observable();
      self.origenDatosGrupos = ko.observable();
      self.campoCCT = ko.observable();
      self.campoNombre = ko.observable();
      self.campoDireccion = ko.observable();
      self.campoColonia = ko.observable();
      self.campoCodigoPostal = ko.observable();
      self.campoTelefono = ko.observable();
      self.campoEstado = ko.observable();
      self.campoMunicipio = ko.observable();
      self.tituloDialogoEscuela = ko.observable("Agregar nueva escuela");
      self.botonDialogoEscuela = ko.observable("Agregar");
      self.datosMunicipios = ko.observableArray();
      self.tituloDialogoGrupo = ko.observable("Agregar nuevo grupo");
      self.botonDialogoGrupo = ko.observable("Agregar");
      self.campoGrado = ko.observable();
      self.campoLetra = ko.observable();
      self.fechaToma = ko.observable('');

      self.nombresColumnas = ko.observableArray([
        { headerText: 'Clave de escuela', field: 'clave_sep' },
        { headerText: 'Nombre', field: 'nombre' },
        { headerText: 'Dirección', field: 'direccion' },
        { headerText: 'Colonia', field: 'colonia' },
        { headerText: 'Código Postal', field: 'codigo_postal' },
        { headerText: 'Municipio', field: 'municipio' },
        { headerText: 'Estado', field: 'estado' },
        { headerText: 'Teléfono', field: 'telefono' }
      ]);

      self.columnasGrupos = ko.observableArray([
        { headerText: 'Grado', field: 'grado' },
        { headerText: 'Letra', field: 'letra' },
        { headerText: 'Año de ingreso', field: 'anio_ingreso' },
        { headerText: 'Año de egreso', field: 'anio_graduacion' }
      ]);

      self.estados = [
        { value: 'JALISCO' }
      ];

      self.datosEstados = new ArrayDataProvider(self.estados, { keyAttributes: 'value' });

      self.grados = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 }
      ];

      self.datosGrados = new ArrayDataProvider(self.grados, { keyAttributes: 'value' });

      self.municipios = {
        JALISCO: [
          { value: 'ACATIC' },
          { value: 'ACATLAN DE JUAREZ' },
          { value: 'AHUALULCO DE MERCADO' },
          { value: 'AMACUECA' },
          { value: 'AMATITAN' },
          { value: 'AMECA' },
          { value: 'ARANDAS' },
          { value: 'ATEMAJAC DE BRIZUELA' },
          { value: 'ATENGO' },
          { value: 'ATENGUILLO' },
          { value: 'ATOTONILCO EL ALTO' },
          { value: 'ATOYAC' },
          { value: 'AUTLAN DE NAVARRO' },
          { value: 'AYOTLAN' },
          { value: 'AYUTLA' },
          { value: 'BOLAÑOS' },
          { value: 'CABO CORRIENTES' },
          { value: 'CAÑADAS DE OBREGON' },
          { value: 'CASIMIRO CASTILLO' },
          { value: 'CHAPALA' },
          { value: 'CHIMALTITAN' },
          { value: 'CHIQUILISTLAN' },
          { value: 'CIHUATLAN' },
          { value: 'COCULA' },
          { value: 'COLOTLAN' },
          { value: 'CONCEPCION DE BUENOS AIRES' },
          { value: 'CUAUTITLAN DE GARCIA BARRAGAN' },
          { value: 'CUAUTLA' },
          { value: 'CUQUIO' },
          { value: 'DEGOLLADO' },
          { value: 'EJUTLA' },
          { value: 'EL ARENAL' },
          { value: 'EL GRULLO' },
          { value: 'EL LIMON' },
          { value: 'EL SALTO' },
          { value: 'ENCARNACION DE DIAZ' },
          { value: 'ETZATLAN' },
          { value: 'GOMEZ FARIAS' },
          { value: 'GUACHINANGO' },
          { value: 'GUADALAJARA' },
          { value: 'HOSTOTIPAQUILLO' },
          { value: 'HUEJUCAR' },
          { value: 'HUEJUQUILLA EL ALTO' },
          { value: 'IXTLAHUACAN DE LOS MEMBRILLOS' },
          { value: 'IXTLAHUACAN DEL RIO' },
          { value: 'JALOSTOTITLAN' },
          { value: 'JAMAY' },
          { value: 'JESUS MARIA' },
          { value: 'JILOTLAN DE LOS DOLORES' },
          { value: 'JOCOTEPEC' },
          { value: 'JUANACATLAN' },
          { value: 'JUCHITLAN' },
          { value: 'LA BARCA' },
          { value: 'LA HUERTA' },
          { value: 'LA MANZANILLA DE LA PAZ' },
          { value: 'LAGOS DE MORENO' },
          { value: 'MAGDALENA' },
          { value: 'MASCOTA' },
          { value: 'MAZAMITLA' },
          { value: 'MEXTICACAN' },
          { value: 'MEZQUITIC' },
          { value: 'MIXTLAN' },
          { value: 'OCOTLAN' },
          { value: 'OJUELOS DE JALISCO' },
          { value: 'PIHUAMO' },
          { value: 'PONCITLAN' },
          { value: 'PUERTO VALLARTA' },
          { value: 'QUITUPAN' },
          { value: 'SAN CRISTOBAL DE LA BARRANCA' },
          { value: 'SAN DIEGO DE ALEJANDRIA' },
          { value: 'SAN GABRIEL' },
          { value: 'SAN IGNACIO CERRO GORDO' },
          { value: 'SAN JUAN DE LOS LAGOS' },
          { value: 'SAN JUANITO DE ESCOBEDO' },
          { value: 'SAN JULIAN' },
          { value: 'SAN MARCOS' },
          { value: 'SAN MARTIN DE BOLAÑOS' },
          { value: 'SAN MARTIN DE HIDALGO' },
          { value: 'SAN MIGUEL EL ALTO' },
          { value: 'SAN SEBASTIAN DEL OESTE' },
          { value: 'SANTA MARIA DE LOS ANGELES' },
          { value: 'SANTA MARIA DEL ORO' },
          { value: 'SAYULA' },
          { value: 'TALA' },
          { value: 'TALPA DE ALLENDE' },
          { value: 'TAMAZULA DE GORDIANO' },
          { value: 'TAPALPA' },
          { value: 'TECALITLAN' },
          { value: 'TECOLOTLAN' },
          { value: 'TECHALUTA DE MONTENEGRO' },
          { value: 'TENAMAXTLAN' },
          { value: 'TEOCALTICHE' },
          { value: 'TEOCUITATLAN DE CORONA' },
          { value: 'TEPATITLAN DE MORELOS' },
          { value: 'TEQUILA' },
          { value: 'TEUCHITLAN' },
          { value: 'TIZAPAN EL ALTO' },
          { value: 'TLAJOMULCO DE ZUÑIGA' },
          { value: 'TLAQUEPAQUE' },
          { value: 'TOLIMAN' },
          { value: 'TOMATLAN' },
          { value: 'TONALA' },
          { value: 'TONAYA' },
          { value: 'TONILA' },
          { value: 'TOTATICHE' },
          { value: 'TOTOTLAN' },
          { value: 'TUXCACUESCO' },
          { value: 'TUXCUECA' },
          { value: 'TUXPAN' },
          { value: 'UNION DE SAN ANTONIO' },
          { value: 'UNION DE TULA' },
          { value: 'VALLE DE GUADALUPE' },
          { value: 'VALLE DE JUAREZ' },
          { value: 'VILLA PURIFICACION' },
          { value: 'VILLA CORONA' },
          { value: 'VILLA GUERRERO' },
          { value: 'VILLA HIDALGO' },
          { value: 'YAHUALICA DE GONZALEZ GALLO' },
          { value: 'ZACOALCO DE TORRES' },
          { value: 'ZAPOPAN' },
          { value: 'ZAPOTILTIC' },
          { value: 'ZAPOTITLAN DE VADILLO' },
          { value: 'ZAPOTLAN DEL REY' },
          { value: 'ZAPOTLAN EL GRANDE' },
          { value: 'ZAPOTLANEJO' }
        ]
      };

      self.validadorTelefonico = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[0-9]{10}',
            messageSummary: 'Valor inválido',
            messageDetail: 'Deben ser 10 dígitos.'
          }
        }];
      });

      self.validadorPostal = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[0-9]{5}',
            messageSummary: 'Valor inválido',
            messageDetail: 'Deben ser 5 dígitos.'
          }
        }];
      });

      self.validadorGeo = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[A-Za-z, \\.0-9-]+',
            messageSummary: 'Valor inválido',
            messageDetail: 'Solo se permiten letras, números, punto, coma y espacio.'
          }
        }];
      });

      self.validadorNombre = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[A-Za-z \\.0-9]+',
            messageSummary: 'Valor inválido',
            messageDetail: 'Solo se permiten letras, números, punto y espacio.'
          }
        }];
      });

      self.validadorCCT = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[A-Z0-9]+',
            messageSummary: 'Valor inválido',
            messageDetail: 'Corrija el campo.'
          }
        }];
      });

      self.validadorLetra = ko.computed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: '[A-Z]{1}',
            messageSummary: 'Valor inválido',
            messageDetail: 'Corrija el campo.'
          }
        }];
      });

      self.convertidorFechas = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
        createConverter(
          {
            pattern: "dd/MM/yyyy"
          }));

      self.estadoSeleccionado = function (event) {
        var estado = event['detail'].value;
        if (estado !== "" && self.municipios.hasOwnProperty(estado) && Object.keys(self.municipios[estado]).length > 0) {
          self.datosMunicipios(new ArrayDataProvider(self.municipios[estado], { keyAttributes: 'value' }));
        }
      };

      self.obtenerInformacion = function (event) {
        var peticionDatosEscuelas = new XMLHttpRequest();
        peticionDatosEscuelas.open('GET', oj.gWSUrl() + "obtenerDatosEscuelas", false);
        peticionDatosEscuelas.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var json = JSON.parse(this.responseText);
              if (json.hasOwnProperty("error")) {
                alert('No se encontro ningun dato, contacte al administrador.');
                return;
              } else {
                var tablaEscuelas = document.getElementById("tablaEscuelas");
                self.origenDatosEscuelas(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(json.escuelas, { idAttribute: 'id_escuela' })));
                if (tablaEscuelas !== undefined && tablaEscuelas !== null) {
                  var jsonEscSeleccionada = [{
                    startIndex: { row: filaEscSeleccionada },
                    endIndex: { row: filaEscSeleccionada },
                    startKey: { row: filaEscSeleccionada + 1 },
                    endKey: { row: filaEscSeleccionada + 1 }
                  }];
                  tablaEscuelas.selection = jsonEscSeleccionada;
                }
              }
            }
          }
        };

        peticionDatosEscuelas.send();
      };

      self.obtenerInformacion();

      $('document').ready(function () {
        if (self.origenDatosEscuelas().dataSource.totalSize() > 0) {
          var jsonEscSeleccionada = [{
            startIndex: { row: filaEscSeleccionada },
            endIndex: { row: filaEscSeleccionada },
            startKey: { row: filaEscSeleccionada + 1 },
            endKey: { row: filaEscSeleccionada + 1 }
          }];
          document.getElementById("tablaEscuelas").selection = jsonEscSeleccionada;
        }
      });

      self.obtenerGrupos = function (event) {
        var peticionDatosGrupos = new XMLHttpRequest();
        peticionDatosGrupos.open('GET', oj.gWSUrl() + "obtenerDatosGrupos/" + datosEscuela.id_escuela, false);
        peticionDatosGrupos.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var json = JSON.parse(this.responseText);
              if (json.hasOwnProperty("error")) {
                if (json.error === "No hay datos.") {
                  self.origenDatosGrupos(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([{ NoData: "" }])));
                } else {
                  alert('No se encontro ningun dato, contacte al administrador.');
                }
                return;
              } else {
                self.origenDatosGrupos(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(json.grupos, { idAttribute: 'id_grupo' })));
              }
            }
          }
        };

        peticionDatosGrupos.send();
      };

      self.escuelaSeleccionada = function (event) {
        filaEscSeleccionada = event.detail.value[0].startIndex.row;
        datosEscuela = self.origenDatosEscuelas().dataSource.data[filaEscSeleccionada];
        filaGrpSeleccionado = -1;
        self.obtenerGrupos();
      };

      self.grupoSeleccionado = function (event) {
        filaGrpSeleccionado = event.detail.value[0].startIndex.row;
      };

      self.crearNuevaEscuela = function (event) {
        self.tituloDialogoEscuela("Agregar nueva escuela");
        self.botonDialogoEscuela("Agregar");
        document.getElementById('dialogoEscuela').open();
      };

      self.editarEscuela = function (event) {
        self.tituloDialogoEscuela("Editar escuela");
        self.botonDialogoEscuela("Guardar");
        self.campoCCT(datosEscuela.clave_sep);
        self.campoNombre(datosEscuela.nombre);
        self.campoDireccion(datosEscuela.direccion);
        self.campoColonia(datosEscuela.colonia);
        self.campoCodigoPostal(datosEscuela.codigo_postal.toString());
        self.campoTelefono(datosEscuela.telefono);
        self.campoEstado(datosEscuela.estado);
        self.campoMunicipio(datosEscuela.municipio);
        document.getElementById('dialogoEscuela').open();
      };

      self.limpiarDialogoEscuela = function (event) {
        self.campoCCT("");
        self.campoNombre("");
        self.campoDireccion("");
        self.campoColonia("");
        self.campoCodigoPostal("");
        self.campoTelefono("");
        self.campoEstado("");
        self.campoMunicipio("");
        document.getElementById('dialogoEscuela').close();
      };

      self.procesarDatosEscuela = function (event) {
        var campoCCT = document.getElementById("campo-cct");
        var campoNombre = document.getElementById("campo-nombre");
        var campoDireccion = document.getElementById("campo-direccion");
        var campoColonia = document.getElementById("campo-colonia");
        var campoCPostal = document.getElementById("campo-codigo-postal");
        var campoTelefono = document.getElementById("campo-telefono");

        campoCCT.validate();
        campoNombre.validate();
        campoDireccion.validate();
        campoColonia.validate();
        campoCPostal.validate();
        campoTelefono.validate();
        if (campoCCT.valid === 'invalidShown' || campoNombre.valid === 'invalidShown' ||
          campoDireccion.valid === 'invalidShown' || campoColonia.valid === 'invalidShown' ||
          campoCPostal.valid === 'invalidShown' || campoTelefono.valid === 'invalidShown') {
          return;
        }

        var datosEscuelas = {
          clave_sep: self.campoCCT().toUpperCase(),
          nombre: self.campoNombre().toUpperCase(),
          direccion: self.campoDireccion().toUpperCase(),
          colonia: self.campoColonia().toUpperCase(),
          codigo_postal: self.campoCodigoPostal(),
          telefono: self.campoTelefono(),
          estado: self.campoEstado(),
          municipio: self.campoMunicipio()
        };

        var servicio = "agregarEscuela";
        var metodo = "POST";

        if (self.botonDialogoEscuela() !== "Agregar") {
          servicio = "actualizarEscuela";
          metodo = "PUT";
          datosEscuelas.id_escuela = datosEscuela.id_escuela.toString();
          datosEscuela = datosEscuelas;
        }

        var peticionProcesarEscuela = new XMLHttpRequest();
        peticionProcesarEscuela.open(metodo, oj.gWSUrl() + "escuelas/" + servicio, false);
        peticionProcesarEscuela.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var respuestaJSON = JSON.parse(this.responseText);
              if (respuestaJSON.hasOwnProperty("error")) {
                alert('Error, por favor revisa tus datos.');
              } else {
                if (respuestaJSON.status === 'exito') {
                  if (self.botonDialogoEscuela() === "Agregar") {
                    alert('Escuela agregada correctamente.');
                  } else {
                    alert('Escuela actualizada correctamente.');
                  }
                } else {
                  alert('Error, por favor revisa tus datos.');
                }
              }
            } else {
              alert("Error interno del servidor, favor de contactar al administrador.");
            }
          }
        };

        peticionProcesarEscuela.send(JSON.stringify(datosEscuelas));
        self.limpiarDialogoEscuela();
        self.obtenerInformacion();
      };

      self.limpiarDialogoGrupo = function (event) {
        self.campoGrado("");
        self.campoLetra("");
        document.getElementById('dialogoGrupo').close();
      };

      self.crearNuevoGrupo = function (event) {
        self.tituloDialogoGrupo("Agregar nuevo grupo");
        self.botonDialogoGrupo("Agregar");
        document.getElementById('dialogoGrupo').open();
      };

      self.editarGrupo = function (event) {
        if (filaGrpSeleccionado === -1) {
          alert("Seleccione un grupo para editar.");
        } else {
          var datosGrupos = self.origenDatosGrupos().dataSource.data[filaGrpSeleccionado];
          self.campoGrado(parseInt(datosGrupos.grado));
          self.campoLetra(datosGrupos.letra);
          self.tituloDialogoGrupo("Editar grupo");
          self.botonDialogoGrupo("Guardar");
          document.getElementById('dialogoGrupo').open();
        }
      };

      self.procesarDatosGrupos = function (event) {
        var campoLetra = document.getElementById("campo-letra");

        campoLetra.validate();

        if (campoLetra.valid === 'invalidShown') {
          return;
        }

        var servicio = "agregarGrupo";
        var metodo = "POST";
        var fechaActual = new Date();
        var mesActual = fechaActual.getMonth() + 1;
        var anioActual = fechaActual.getFullYear();
        var anio_ingreso;

        if(self.fechaToma() !== "") {
          var componentes = self.fechaToma().split("-");
          mesActual = parseInt(componentes[1]);
          anioActual = parseInt(componentes[0]);
        }

        if (mesActual >= 8 && mesActual <= 12) {
          anio_ingreso = anioActual;
        } else {
          anio_ingreso = anioActual - 1;
        }

        var datosGrupo = {
          anio_ingreso: (anio_ingreso - (self.campoGrado() - 1)).toString(),
          letra: self.campoLetra()
        };

        if (self.botonDialogoGrupo() !== "Agregar") {
          servicio = "actualizarGrupo";
          metodo = "PUT";
          var id_grupo = self.origenDatosGrupos().dataSource.data[filaGrpSeleccionado].id_grupo;
          datosGrupo.id_grupo = id_grupo.toString();
        } else {
          datosGrupo.id_escuela = datosEscuela.id_escuela.toString();
        }

        var peticionProcesarGrupo = new XMLHttpRequest();
        peticionProcesarGrupo.open(metodo, oj.gWSUrl() + "escuelas/" + servicio, false);
        peticionProcesarGrupo.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var respuestaJSON = JSON.parse(this.responseText);
              if (respuestaJSON.hasOwnProperty("error")) {
                alert('Error, por favor revisa tus datos.');
              } else {
                if (respuestaJSON.status === 'exito') {
                  if (self.botonDialogoGrupo() === "Agregar") {
                    alert('Grupo agregado correctamente.');
                  } else {
                    alert('Grupo actualizado correctamente.');
                  }
                } else {
                  alert('Error, por favor revisa tus datos.');
                }
              }
            } else {
              alert("Error interno del servidor, favor de contactar al administrador.");
            }
          }
        };
        peticionProcesarGrupo.send(JSON.stringify(datosGrupo));
        self.limpiarDialogoGrupo();
        self.obtenerGrupos();
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
    return new ModelosDatosEscolares();
  }
);

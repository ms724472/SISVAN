/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojmenu', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojselectcombobox'],
 function(oj, ko, $, ArrayDataProvider) {
  
    function AboutViewModel() {
      var self = this;
      var datosEscuela;
      var filaEscSeleccionada = 0;
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
      self.campoEscuela = ko.observable();
      self.campoGrado = ko.observable();
      self.campoLetra = ko.observable();
      
      self.nombresColumnas = ko.observableArray([
        { headerText: 'Clave de escuela', field: 'clave_sep'},
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
        { value: 'Jalisco' }
      ];

      self.datosEstados = new ArrayDataProvider(self.estados, {keyAttributes: 'value'});

      self.grados = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 }
      ];

      self.datosGrados = new ArrayDataProvider(self.grados, {keyAttributes: 'value'});
      
      self.municipios = {
        Jalisco: [
          { value: 'Acatic' },
          { value: 'Acatlán de Juárez' },
          { value: 'Ahualulco de Mercado' },
          { value: 'Amacueca' },
          { value: 'Amatitán' },
          { value: 'Ameca' },
          { value: 'Arandas' },
          { value: 'Atemajac de Brizuela' },
          { value: 'Atengo' },
          { value: 'Atenguillo' },
          { value: 'Atotonilco el Alto' },
          { value: 'Atoyac' },
          { value: 'Autlán de Navarro' },
          { value: 'Ayotlán' },
          { value: 'Ayutla' },
          { value: 'Bolaños' },
          { value: 'Cabo Corrientes' },
          { value: 'Cañadas de Obregón' },
          { value: 'Casimiro Castillo' },
          { value: 'Chapala' },
          { value: 'Chimaltitán' },
          { value: 'Chiquilistlán' },
          { value: 'Cihuatlán' },
          { value: 'Cocula' },
          { value: 'Colotlán' },
          { value: 'Concepción de Buenos Aires' },
          { value: 'Cuautitlán de García Barragán' },
          { value: 'Cuautla' },
          { value: 'Cuquío' },
          { value: 'Degollado' },
          { value: 'Ejutla' },
          { value: 'El Arenal' },
          { value: 'El Grullo' },
          { value: 'El Limón' },
          { value: 'El Salto' },
          { value: 'Encarnación de Díaz' },
          { value: 'Etzatlán' },
          { value: 'Gómez Farías' },
          { value: 'Guachinango' },
          { value: 'Guadalajara' },
          { value: 'Hostotipaquillo' },
          { value: 'Huejúcar' },
          { value: 'Huejuquilla el Alto' },
          { value: 'Ixtlahuacán de los Membrillos' },
          { value: 'Ixtlahuacán del Río' },
          { value: 'Jalostotitlán' },
          { value: 'Jamay' },
          { value: 'Jesús María' },
          { value: 'Jilotlán de los Dolores' },
          { value: 'Jocotepec' },
          { value: 'Juanacatlán' },
          { value: 'Juchitlán' },
          { value: 'La Barca' },
          { value: 'La Huerta' },
          { value: 'La Manzanilla de la Paz' },
          { value: 'Lagos de Moreno' },
          { value: 'Magdalena' },
          { value: 'Mascota' },
          { value: 'Mazamitla' },
          { value: 'Mexticacán' },
          { value: 'Mezquitic' },
          { value: 'Mixtlán' },
          { value: 'Ocotlán' },
          { value: 'Ojuelos de Jalisco' },
          { value: 'Pihuamo' },
          { value: 'Poncitlán' },
          { value: 'Puerto Vallarta' },
          { value: 'Quitupan' },
          { value: 'San Cristóbal de la Barranca' },
          { value: 'San Diego de Alejandría' },
          { value: 'San Gabriel' },
          { value: 'San Ignacio Cerro Gordo' },
          { value: 'San Juan de los Lagos' },
          { value: 'San Juanito de Escobedo' },
          { value: 'San Julián' },
          { value: 'San Marcos' },
          { value: 'San Martín de Bolaños' },
          { value: 'San Martín de Hidalgo' },
          { value: 'San Miguel el Alto' },
          { value: 'San Sebastián del Oeste' },
          { value: 'Santa María de los Ángeles' },
          { value: 'Santa María del Oro' },
          { value: 'Sayula' },
          { value: 'Tala' },
          { value: 'Talpa de Allende' },
          { value: 'Tamazula de Gordiano' },
          { value: 'Tapalpa' },
          { value: 'Tecalitlán' },
          { value: 'Tecolotlán' },
          { value: 'Techaluta de Montenegro' },
          { value: 'Tenamaxtlán' },
          { value: 'Teocaltiche' },
          { value: 'Teocuitatlán de Corona' },
          { value: 'Tepatitlán de Morelos' },
          { value: 'Tequila' },
          { value: 'Teuchitlán' },
          { value: 'Tizapán el Alto' },
          { value: 'Tlajomulco de Zúñiga' },
          { value: 'Tlaquepaque' },
          { value: 'Tolimán' },
          { value: 'Tomatlán' },
          { value: 'Tonalá' },
          { value: 'Tonaya' },
          { value: 'Tonila' },
          { value: 'Totatiche' },
          { value: 'Tototlán' },
          { value: 'Tuxcacuesco' },
          { value: 'Tuxcueca' },
          { value: 'Tuxpan' },
          { value: 'Unión de San Antonio' },
          { value: 'Unión de Tula' },
          { value: 'Valle de Guadalupe' },
          { value: 'Valle de Juárez' },
          { value: 'Villa Purificación' },
          { value: 'Villa Corona' },
          { value: 'Villa Guerrero' },
          { value: 'Villa Hidalgo' },
          { value: 'Yahualica de González Gallo' },
          { value: 'Zacoalco de Torres' },
          { value: 'Zapopan' },
          { value: 'Zapotiltic' },
          { value: 'Zapotitlán de Vadillo' },
          { value: 'Zapotlán del Rey' },
          { value: 'Zapotlán El Grande' },
          { value: 'Zapotlanejo' }
        ]
      };

      self.estadoSeleccionado = function (event) {
        var estado = event['detail'].value;
        if (estado !== "" && self.municipios.hasOwnProperty(estado) && Object.keys(self.municipios[estado]).length > 0) {
          self.datosMunicipios(new ArrayDataProvider(self.municipios[estado], {keyAttributes: 'value'}));
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
                if(tablaEscuelas !== undefined && tablaEscuelas !== null) {
                  var jsonEscSeleccionada = [{
                    startIndex: { row: filaEscSeleccionada },
                    endIndex: { row: filaEscSeleccionada },
                    startKey: { row: filaEscSeleccionada+1 },
                    endKey: { row: filaEscSeleccionada+1 }
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

      $('document').ready(function(){
        if(self.origenDatosEscuelas().dataSource.totalSize() > 0) {
          var jsonEscSeleccionada = [{
            startIndex: { row: filaEscSeleccionada },
            endIndex: { row: filaEscSeleccionada },
            startKey: { row: filaEscSeleccionada+1 },
            endKey: { row: filaEscSeleccionada+1 }
          }];
          document.getElementById("tablaEscuelas").selection = jsonEscSeleccionada;
        }
      });

      self.escuelaSeleccionada = function(event) {
        filaEscSeleccionada = event.detail.value[0].startIndex.row;
        datosEscuela = self.origenDatosEscuelas().dataSource.data[filaEscSeleccionada];        

        var peticionDatosGrupos = new XMLHttpRequest();
        peticionDatosGrupos.open('GET', oj.gWSUrl() + "obtenerDatosGrupos/" + datosEscuela.id_escuela, false);
        peticionDatosGrupos.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var json = JSON.parse(this.responseText);
              if (json.hasOwnProperty("error")) {
                if(json.error === "No hay datos.") {
                  self.origenDatosGrupos(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([{NoData:""}])));
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

      self.grupoSeleccionado = function(event) {
        console.log(event.target.value);
      };

      self.crearNuevaEscuela = function(event) {
        self.tituloDialogoEscuela("Agregar nueva escuela");
        self.botonDialogoEscuela("Agregar");
        document.getElementById('dialogoEscuela').open();
      };

      self.editarEscuela = function(event) {
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

      self.limpiarDialogoEscuela = function(event) {
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
        var datosEscuelas = {
          clave_sep: self.campoCCT(),
          nombre: self.campoNombre(),
          direccion: self.campoDireccion(),
          colonia: self.campoColonia(),
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

      self.limpiarDialogoGrupo = function(event) {
        self.campoEscuela("");
        self.campoGrado("");
        self.campoLetra("");
        document.getElementById('dialogoGrupo').close();
      };

      self.crearNuevoGrupo = function(event) {
        self.tituloDialogoGrupo("Agregar nuevo grupo");
        self.botonDialogoGrupo("Agregar");
        self.campoEscuela(datosEscuela.nombre);
        document.getElementById('dialogoGrupo').open();
      };

      self.procesarDatosGrupos = function(event) {
        var servicio = "agregarGrupo";
        var metodo = "POST";
        var fechaActual = new Date();
        var mesActual = fechaActual.getMonth() + 1;
        var anio_ingreso;

        if(mesActual >= 8 && mesActual <= 12) {
          anio_ingreso = fechaActual.getFullYear();          
        } else {
          anio_ingreso = fechaActual.getFullYear()-1;
        }

        var datosGrupo = {
          anio_ingreso: self.campoGrado() === 1 ? 
                        anio_ingreso : 
                        anio_ingreso - (self.campoGrado() - 1),
          letra: self.campoLetra()
        };

        if(self.botonDialogoGrupo() !== "Agregar") {
          servicio = "actualizarGrupo";
          metodo = "PUT";
          datosGrupo.id_grupo = "";
        } else {
          datosGrupo.id_escuela = datosEscuela.id_escuela;
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
        self.obtenerInformacion();
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
      self.handleActivated = function(info) {
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
      self.handleAttached = function(info) {
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
      self.handleBindingsApplied = function(info) {
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
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);

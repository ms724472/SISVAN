/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmenu', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojtoolbar'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      self.origenDatosEscuelas = ko.observable();
      self.origenDatosGrupos = ko.observable();
      
      self.nombresColumnas = ko.observableArray([
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
              self.origenDatosEscuelas(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(json.escuelas, {idAttribute: 'id_escuela'})));
            }
          }
        }
      };

      peticionDatosEscuelas.send();

      var peticionDatosGrupos = new XMLHttpRequest();
      peticionDatosGrupos.open('GET', oj.gWSUrl() + "obtenerDatosGrupos/1", false);
      peticionDatosGrupos.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            var json = JSON.parse(this.responseText);
            if (json.hasOwnProperty("error")) {
              alert('No se encontro ningun dato, contacte al administrador.');
              return;
            } else {
              self.origenDatosEscuelas(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(json.grupos, {idAttribute: 'id_grupo'})));
            }
          }
        }
      };

      peticionDatosGrupos.send();

      self.escuelaSeleccionada = function(event) {
        console.log(event.target.value);
      }

      self.grupoSeleccionado = function(event) {
        console.log(event.target.value);
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

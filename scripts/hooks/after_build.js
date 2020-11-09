'use strict';
const fs = require('fs');
const archiver = require('archiver');
module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
	console.log("Empaquetando archivo de despliegue.");
   
	//Aqui definimos el archivo a desplegar en WebLogic es
	//un archivo ZIP con extencion WAR.
    var output = fs.createWriteStream('SISVAN.war');    
    var archive = archiver('zip');
  
    output.on('close', () => {
      console.log('Empaquetado correctamente.');
      resolve();
    });
  
    archive.on('warning', (error) => {
      console.warn(error);
    });
  
    archive.on('error', (error) => {
      reject(error);
    });
  
    archive.pipe(output);
    archive.directory('web', 'sve');
	archive.directory('WEB-INF', 'WEB-INF');
	archive.directory('imagenes', 'imagenes');
	archive.append(fs.createReadStream('estilos.css'), { name: 'estilos.css'});
	archive.append(fs.createReadStream('login.jsp'), { name: 'login.jsp'});
	archive.append(fs.createReadStream('sve.jsp'), { name: 'sve.jsp'});
	archive.finalize();
   });
};
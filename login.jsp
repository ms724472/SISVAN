<html>
	<head>
		<meta charset="UTF-8">
		<title>SVE NACE | Iniciar Sesi&oacute;n</title>
		<link rel="icon" href="imagenes/favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" href="estilos.css" type="text/css"/>
	</head>
	<body>		
		<div class="login-page" align="center">
			<div class="login-box centrado">
				<span role="img" id="login-icon" title="Logo NACE" alt="Logo NACE"></span>
				<form method="POST" action="j_security_check">
					<div class="login-input-box"> 
					    <p id="mensaje-error">Cuenta o contrase&ntilde;a incorrecta,
						<br/>
						favor de verificar los datos.</p>
						<div class="login-pane campo" align="left">
							<input placeholder="Nombre de usuario" id="username" class="login-input" required="true" type="text" name="j_username"/>
						</div>
						<div class="login-pane campo" align="left">
							<input placeholder="Contrase&ntilde;a" id="password" class="login-input" required="true" type="password" name="j_password"/>
						</div>
						<div>
							<input id="login-button" type=submit value="INGRESAR"/>
						</div>
					</div>
				</form>
			</div>
		</div>
		<script type="text/javascript">
			if(window.location.href.includes("j_security_check")) {
				document.getElementById("mensaje-error").style.color = "crimson";
			}
		</script>
	</body>
</html>
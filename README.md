**FRONTEND PRUEBA TÉCNICA:**

1. El frontend fue desarrollado con React + Vite

1. Se crearon dos componentes, uno para el formulario y otro para la lista de contactos. Los componentes utilizan un servicio el cual les brinda los endpoints del backend para realizar las operaciones crud.

1. Tener encuenta modificar el archivo **api.js** con la url del backend que este corriendo.

1. Una vez el proyecto este descargado instalar todas las dependencias con el comando
	- npm install

1. Para correr el proyecto usar el comando
	- npm run dev

1. Una vez ejecutado se mostrará la url donde esta fucnionando.

1. Se realizó el desligue en producción usando Docker. Se crea la imagen con el **Dockerfile** y el arhivo para el servidor **nginx.conf**, esta imagen se sube a github y en EC2 de aws se descarga para crear el contenedor el cual se encuentra desplegado en la siguiente url:

	http://3.148.114.153:8085/

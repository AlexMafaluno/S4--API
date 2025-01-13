

1. **Introducción**:

Este proyecto tiene como objetivo realizar consultas a una API de bromas y mostrar el resultado en una página web. 
Se hace uso de promesas y asincronía para manejar las solicitudes HTTP y obtener las bromas.
Además, se implementa un servidor proxy usando Express para evitar los problemas relacionados con las políticas de CORS y facilitar las solicitudes a la API de un servicio de tiempo.
También se soluciona un error CORS al utilizar un proxy.


2. **Requerimientos**:

Lista las herramientas necesarias para ejecutar el proyecto (Node.js y npm).
Node.js: Entorno de ejecución para el servidor.
Express.js: Framework para crear el servidor web.
node-fetch: Para realizar solicitudes HTTP (usado con el sistema de módulos ES6).
CORS: Para gestionar las políticas de acceso entre diferentes orígenes.
Promesas y Asincronía: Para gestionar las solicitudes HTTP de manera asíncrona y no bloqueante.

3. **Instalación**:

Para instalar y configurar el proyecto, sigue estos pasos:

1. *Clonar el Proyecto*
Primero, clona el repositorio en tu máquina local.

´´´
bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio.git
´´´
cd tu-repositorio

2. *Instalar Node.js*
Si aún no tienes Node.js instalado, ve a Node.js official website y descarga la versión recomendada.

3. **Instalar Dependencias**
Dentro de la carpeta del proyecto, instala las dependencias necesarias usando npm (Node Package Manager):
´´´
bash
Copiar código
npm install
4. *Instalar TypeScript*
Si no tienes TypeScript instalado globalmente en tu máquina, puedes hacerlo con el siguiente comando:
´´´
´´´
bash
Copiar código
npm install -g typescript
Luego, para asegurarte de que TypeScript está correctamente instalado, puedes comprobar la versión con:

bash
Copiar código
tsc --version

5. *Compilar TypeScript a JavaScript*
Para compilar el código TypeScript a JavaScript, usa el siguiente comando:
´´´
bash
Copiar código
tsc
´´´
Esto generará el archivo JavaScript a partir del código TypeScript.

6. **Configurar el Proxy (Servidor Express)**
El proyecto utiliza un servidor Express que actúa como proxy para hacer las consultas a la API de bromas sin sufrir problemas de CORS. El código está en el archivo proxy.js.

Para ejecutar el servidor Express, usa el siguiente comando:
´´´
bash
Copiar código
node proxy.js
Si proxy.js está dentro de la carpeta src, ejecuta:
node src proxy.js

Esto iniciará el servidor en http://localhost:3000.
´´´
7. **Ejecutar el Proyecto en el Navegador**

Una vez que el servidor esté en funcionamiento, abre tu navegador y dirígete a http://localhost:3000 para ver la interfaz y consultar las bromas. 
El servidor enviará las respuestas de la API y las mostrará en la página.


Proporciona instrucciones paso a paso para clonar el repositorio e instalar las dependencias necesarias.

4. **Estructura del Proyecto**:

Muestra cómo están organizados los archivos dentro del proyecto.

5. **Cómo Funciona**:

Explica la lógica del servidor proxy, cómo maneja las solicitudes a la API externa y cómo se solucionó el problema de CORS.

6. **Uso de `node-fetch` y `express`**:

Detalla los paquetes utilizados y cómo se configuró el proyecto para trabajar con ESM.

7. **Iniciar el Servidor**:
Instrucciones para poner en marcha el servidor localmente.

8. **Endpoint para Obtener el Tiempo**:

Detalla el endpoint disponible en el servidor proxy para obtener la información del clima.

9. **¿Qué Más Se Puede Hacer?**:

Sugerencias de futuras mejoras y funcionalidades.

10. **Contribuciones**:

Abierto a mejoras y sugerencias por parte de otros desarrolladores.

11. **Licencia**:

Información sobre la licencia del proyecto.

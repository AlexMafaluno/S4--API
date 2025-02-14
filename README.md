# Sprint 4 API

![image](https://github.com/user-attachments/assets/edf88040-70ea-4997-95d2-1f71587e503e)


## Introducción 

Este proyecto tiene como objetivo realizar consultas a una API de bromas y mostrar el resultado en una página web. 
Se hace uso de promesas y asincronía para manejar las solicitudes HTTP y obtener las bromas.

## Tecnologías utilizadas

**HTML:** Estructura semántica del proyecto.

**CSS:** Personalización de estilos para mejorar la identidad visual.

**Promesas y Asincronía:** Para gestionar las solicitudes HTTP de manera asíncrona y no bloqueante.

**Bootstrap 5:** Sistema de grillas para diseño responsive. Componentes como botones y navbar.

**JavaScript:** Manipulación dinámica de datos y funcionalidades.

**TypeScript:** Añade tipado estático.

## Estructura del Proyecto

```bash
SPRINT 4

├── /styles
│   ├── styles2.css    # Archivo de estilos personalizados
│   ├── styles2.scss   # Archivo de estilos personalizados
├── /images            # Carpeta de imágenes de productos y elementos visuales
├── /src
│   ├── index.js       # Funciones principales
│   ├── index.ts       # Código Typescript( tipado de datos)
├── index.html         # Página principal
└── README.md          # Documentación del proyecto
```
## Instalación y Configuración
1.**Clona el repositorio en tu máquina local**

```bash
Copiar código
https://github.com/AlexMafaluno/S4--API.git

```
Abre el proyecto en tu editor de texto favorito (recomendado: Visual Studio Code).

Instala la extensión Live Server en Visual Studio Code.

Haz clic derecho en el archivo index.html y selecciona "Open with Live Server" para visualizar el proyecto en tu navegador.



2. **Instalar TypeScript**

Si no tienes TypeScript instalado globalmente en tu máquina, puedes hacerlo con el siguiente comando:
```
bash
Copiar código
npm install -g typescript
```
Luego, para asegurarte de que TypeScript está correctamente instalado, puedes comprobar la versión con:

```
bash
Copiar código
tsc --version
```
3. **Compilar TypeScript a JavaScript**

Para compilar el código TypeScript a JavaScript, usa el siguiente comando:
```
bash
Copiar código
npx tsc
```
Esto generará el archivo JavaScript a partir del código TypeScript.

Puedes activar el modo watch usando el siguiente comando:
```
bash
Copiar código
npx tsc -w
```

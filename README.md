# **GREYDIVE** | Challenge Técnico 

## **📌 INFORMACIÓN DEL PROYECTO**

Bienvenido al README del proyecto **GREYDIVE**, un desafío técnico que consiste en el desarrollo de una aplicación de encuestas basada en archivos JSON. En este documento, encontrarás todos los detalles clave para comprender y utilizar esta aplicación.

### **Objetivo**

El objetivo central de este proyecto es desarrollar una aplicación que pueda procesar archivos JSON y transformar cada ítem en una interfaz de encuesta similar a las que se encuentran en Google Forms.

### **Tecnologías Utilizadas**

- **React**: Para el desarrollo de la interfaz de usuario.
- **Vite**: Para una construcción rápida y eficiente.
- **Redux**: Para el manejo centralizado del estado de la aplicación.
- **Node** y **Express**: Para el desarrollo del backend.
- **Sequelize**: Como ORM para la comunicación con la base de datos.
- **CSS puro**: Para un estilo limpio y personalizado.

### **Funcionalidades Destacadas**

La aplicación, **GREYDIVE**, ofrece una serie de características imprescindibles:

- **Gestión de Cuentas**: Los usuarios pueden crear cuentas e iniciar sesión de manera segura.
- **Completar Formularios**: Permite a los usuarios completar formularios generados a partir de los ítems de un archivo JSON.
- **Guardar y Editar Respuestas**: Las respuestas a los formularios se guardan y pueden ser editadas posteriormente.
- **Manejo de Errores**: Se ha implementado un sistema de manejo de errores para evitar datos erroneos.
- **Estilo Personalizado**: Se utilizo CSS puro para lograr un diseño simple y fácil de usar.

### **Desarrollo y Deploy**

El proyecto ha sido desarrollado en un tiempo de 48 horas. Para el deploy, se utilizaron las plataformas de alojamiento Railway (base de datos y backend) y Render (frontend).

## **⚠️ GUÍA DE USO**

A continuación, una guía paso a paso para utilizar la aplicación **GREYDIVE**:

### **1. Crear Cuenta y Iniciar Sesión**

- Cuando accedas a la aplicación, encontrarás una landing page con la opción de iniciar sesión. Si es tu primera visita, selecciona "Crear Cuenta".
- Llena los campos requeridos y, una vez validados, haz clic en "Crear Cuenta".
- Ahora podrás iniciar sesión con la cuenta recién creada.

### **2. Explorar el Dashboard y los Formularios**

- Al acceder, serás recibido por un dashboard que muestra los formularios completados y tus datos.
- En la esquina inferior izquierda, encontrarás una barra de búsqueda que te permite acceder rápidamente a nuevos formularios. (Con el codigo "1", podras visualizar el formulario "Formulario de registro")
- Si ingresas un código de formulario inválido o uno que ya has completado, se te notificará el error.
- Los códigos válidos te llevarán a la página de completar el formulario.

### **3. Completar Formularios**

- Los formularios no se guardarán automáticamente mientras los completas. Debes enviarlos para que se registren.
- Una vez enviados, volverás al dashboard y verás que el formulario se ha añadido a tus respuestas.
- No se te permitira enviar formularios que contengan datos erroneos. 

### **4. Editar/Eliminar Formularios**

- En la lista de formularios completados, encontrarás botones para "ver respuestas" y eliminar.
- Antes de eliminar un formulario, se te pedirá confirmación para evitar eliminaciones accidentales.
- Al hacer click en "ver respuestas", se te redirigirá a una vista donde podrás ver y modificar tus respuestas.
- Tanto al editar como al completar por primera vez un formulario, podrás ver un botón en la barra de navegación para regresar al perfil.

### **5. Cerrar Sesión**

- Desde la barra de navegación, puedes cerrar sesión en cualquier momento.
- Ten en cuenta que la barra de navegación solo aparecerá cuando estés logueado.
- Sin inicio de sesión, no podrás acceder a la aplicación.

## **🚀 ¡Es hora de sumergirse en GREYDIVE!**

Esta guía proporciona una visión completa de cómo utilizar esta aplicación de encuestas. 

**¡Te invito a probar la aplicación!**
- Deploy: [Greydive](https://greydive-otxe.onrender.com/)
*Recuerda utilizar el codigo "1" al momento de agregar un nuevo formulario. 

# **GREYDIVE** | Challenge Técnico 

## **📌 INFORMACIÓN DEL PROYECTO**

-  Objetivo: Realizar una app que lea un archivo JSON, y que con cada ítem genere una interfaz de app de encuesta (como Google Forms).
-  Tecnologías utilizadas: **React**, **Vite**, **Redux**, **Node**, **Express** y **Sequelize**.
-  Cuenta con: Manejo de cuentas, permite crear una cuenta e iniciar sesión, permite completar formularios, guardar las respuestas y editarlas, cuenta con manejo de errores y css puro.
-  Deploy realizado con Railway (Back end) y Render (Front end).
-  Realizado en 48hs ⏱

<br />

## **⚠️ GUIA DE USO**

1-CREAR CUENTA Y LOGIN:
Inicialmente vamos a encontrarnos en una landing page donde esta la opcion de iniciar sesión, en caso de que sea nuestra primera visita le daremos click a Crear Cuenta.
Una vez rellenados los campos y sin errores vamos a poder dar click en Crear Cuenta y vamos a ser redirigidos al inicio, donde ahora podremos ingresar con la cuenta nueva.

2-HOME Y FORMULARIOS:
El inicio (home) es un dashboard donde el usuario puede ver los formularios que ha completado, sus datos y donde hay una pequeña barra de búsqueda.
Esta barra de busqueda ubicada en la esquina inferior izquierda de la pantalla sirve para buscar y acceder a un formulario nuevo.
En caso de introducir el código de un formulario que ya fue respondido (y esta guardado entre nuestras respuestas) o que no existe nos avisara del error.
Si el código númerico es valido entonces nos va a redirigir a realizar el formulario.

3-COMPLETAR FORMULARIOS:
Al ser redirigidos a un formulario este no se va a guardar entre nuestras respuestas a menos que lo completemos y enviemos.
Al ser enviado el formulario somos automaticamente enviados a nuestro inicio donde podremos verlo que se sumo a nuestras respuestas, recordar que no se aceptara el formulario si tiene errores.

4-EDITAR/ELIMINAR FORMULARIOS:
En nuestra lista de formularios respondidos, veremos dos botones. Uno nos permite eliminar y otro editar, en caso de eliminar nos consultara antes, para que no borremos por error una respuesta.
En caso de darle click a editar seremos redirigidos a otra vista donde estara el formulario ya completo con nuestras respuestas, ahi podemos editarlas a nuestro gusto.
Tanto en "editar formulario" como en "completar formulario" cuando lo hacemos por primera vez, tendremos un boton en la barra de navegación que nos permite volver atras a nuestro perfil.

5-LOGOUT:
Como mencionamos previamente, la barra de navegación nos permite volver a nuestro perfil, esta tambien tiene el boton para cerrar sesión, y al presionarlo volveremos a la landing con nuestra cuenta cerrada.
Tener en cuenta que la barra de navegación solo aparecerá si estamos en una pagina distinta a la landing es decir si estamos logeados, tampoco podremos acceder a las otras url si no tenemos nuestra cuenta activa. 

<br />

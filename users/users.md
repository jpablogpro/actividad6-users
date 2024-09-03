# APP Users

## Pasos seguidos:

### 1. Creación de las páginas UserList, UserView y Form.

### 2. Creación del componente UserCard
       Este componente debe ser cargado dentro de UserList, ya que UserList se encarga de cargar una lista de usuarios. Cada uno de estos usuarios será un componente UserCard.

### 3. Creación de servicio de usuarios (users) y un interfaz de usuarios (iuser).
        - El interfaz debe tener los datos que se devuelven en el API con URL: https://peticiones.online/users.

### 4. Definición del sistema de rutas, que es el siguiente:
        '/' redirectTo home
        '/home': componente UserList
        '/user/id': componente UserView
        '/newuser': componente Form
        'updateuser/id': componente Form

### 5. Vista de la página home con la carga de todos los usuarios.
        - El servicio debe tener un método para recuperar los usuarios del endpoint GET de la API:
        GET https://peticiones.online/api/users?page=1
        GET https://peticiones.online/api/users?page=2
        <br>Respuestas: En ambos casos se devuelve un objeto que contiene una clave "results", cuyo valor es un Array con todos los usuarios de esa página (10 en la primera y 5 en la segunda)

# APP Users

## Pasos seguidos:

### 1. Creación de las páginas UserList, UserView y Form.

### 2. Creación del componente UserCard
       Este componente debe ser cargado dentro de UserList, ya que UserList se encarga de carga una lista de usuarios. Cada uno de estos usuarios será un componente UserCard.

### 3. Creación de servicio de usuarios (users) y un interfaz de usuarios (iuser).
        - El interfaz debe tener los datos que se devuelven en el endpoint GET https://peticiones.online/api/users?1.

### 4. Definición del sistema de rutas, que es el siguiente:
        '/' redirectTo home
        '/home': componente UserList
        '/user/id': componente UserView
        '/newuser': componente Form
        'updateuser/id': componente Form

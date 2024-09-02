# APP Users

## Crear las siguientes páginas: UserList, UserView, Form
        '/' redirectTo a home
        '/home': componente UserList
        '/user/id': componente UserView
        '/newuser': componente Form
        'updateuser/id': componente Form

## Crear el siguiente componente: UserCard
       Este componente debe ser cargado dentro de UserList, ya que UserList se encarga de carga una lista de usuarios. Cada uno de estos usuarios será un componente UserCard.

## Crear un servicio de usuarios y un interfaz de usuarios.
        - El interfaz debe tener los datos que se devuelven en el endpoint GET https://peticiones.online/api/users?1.

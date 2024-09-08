import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

type AlertResponse = { title: string; text: string; icon: SweetAlertIcon, cbutton: string};

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  usersService = inject(UsersService);

  async delete(_id: string | undefined) {
    let borrado = confirm('Deseas Borrar el Usuario con Nombre: ' + this.myUser.first_name + '?');
    if (borrado) {
      let alert_res: AlertResponse;
      try {
        const res = await this.usersService.deleteByID(_id);
        if ('_id' in res && res._id === _id) {
          alert_res = {title: 'Perfecto!', text: 'Usuario con ID: ' + _id + ' Borrado con exito', icon: 'success', cbutton: 'Aceptar'}
        } else {
          let text: string;
          text = ('error' in res) ?  'Ha ocurrido un error' : 'Usuario con ID: ' + _id + ' No encontrado'
          alert_res = {title: 'Error!', text: text, icon: 'error', cbutton: 'Aceptar'}
        }
      } catch (error) {
        console.log(error);
        alert_res = {title: 'Error!', text: 'Ha ocurrido un error', icon: 'error', cbutton: 'Aceptar'}
      }
      Swal.fire(alert_res)
    }
  }
}

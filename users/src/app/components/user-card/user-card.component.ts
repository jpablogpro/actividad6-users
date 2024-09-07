import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

type AlertResponse = { title: string; text: string; icon: SweetAlertIcon };

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
    let alert_res: AlertResponse;
    let borrado = confirm('Deseas Borrar el Usuario con ID: ' + _id + '?');
    if (borrado) {
      try {
        const res = await this.usersService.deleteByID(_id);
        if ('_id' in res && res['_id'] === _id) {
          Swal.fire({
            title: 'Perfecto!',
            text: 'Usuario con ID: ' + _id + ' Borrado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Usuario con ID: ' + _id + ' No Encontrado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

type AlertResponse = { title: string; text: string; icon: SweetAlertIcon, cbutton: string};

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService)

  user: IUser | null = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      this.user = await this.usersService.getByID(id);
    })
  }

  async delete(_id: string | undefined) {
    let borrado = confirm('Deseas Borrar el Usuario con ID: ' + _id + '?');
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
      this.router.navigate(['/dashboard', 'home'])
    }
  }  
}

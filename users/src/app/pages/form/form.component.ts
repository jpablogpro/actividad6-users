import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  usersService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;
  tipo_form: string = 'Insertar';

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, []),
      last_name: new FormControl(null, []),
      username: new FormControl(null, []),
      email: new FormControl(null, []),
      image: new FormControl(null, []),
      password: new FormControl(null, []),
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id) {
        this.tipo_form = 'Actualizar'
        const user: IUser = await this.usersService.getByID(params.id)
        this.userForm = new FormGroup({
          _id: new FormControl(user._id, []),
          first_name: new FormControl(user.first_name, []),
          last_name: new FormControl(user.last_name, []),
          username: new FormControl(user.username, []),
          email: new FormControl(user.email, []),
          image: new FormControl(user.image, []),
          password: new FormControl(user.password, []),
        }, [])
      }
    })
  }

  async getDataForm() {
    if (this.userForm.value._id) {
      try{
        const response: IUser = await this.usersService.update(this.userForm.value)
        if (response._id && response._id === this.userForm.value._id) {
          alert('Usuario Actualizado con Exito')
          this.router.navigate(['/dashboard', 'home'])
        }
      } catch (error) {
        console.log(error)
      }

    }else{
      try{
        const response: IUser = await this.usersService.insert(this.userForm.value)
        console.log(response)
        if (response.id) {
          this.router.navigate(['/dashboard', 'home'])
  
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  tipo_form: string = 'Nuevo';

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      image: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      repitepassword: new FormControl(null, [Validators.required]),
    }, [this.checkPassword])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id) {
        this.tipo_form = 'Actualizar'
        const user: IUser = await this.usersService.getByID(params.id)
        this.userForm = new FormGroup({
          _id: new FormControl(user._id, []),
          first_name: new FormControl(user.first_name, [Validators.required]),
          last_name: new FormControl(user.last_name, [Validators.required]),
          username: new FormControl(user.username, [Validators.required]),
          email: new FormControl(user.email, [
            Validators.required, 
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
          ]),
          image: new FormControl(user.image, [Validators.required]),
          password: new FormControl(user.password, [Validators.required]),
          repitepassword: new FormControl(user.password, [Validators.required]),
        }, [this.checkPassword])
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

  checkControl(formControlName: string, validator: string){
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }

  checkPassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value
    const repitepassword = formValue.get('repitepassword')?.value
    if (password !== repitepassword) {
      return {'checkpassword': true}
    } else {
      return null
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userServices = inject(UsersService);
  usersList: IUser[] = [];

  async ngOnInit() {
    try {
      const res = await this.userServices.getAll(1);
      this.usersList = res.results;

    } catch (error) {
      console.log(error)
    }
  }

}

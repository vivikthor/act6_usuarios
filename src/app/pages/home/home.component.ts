import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UsersServiceService);
  USERS: IUser[] = [];

  ngOnInit() {
    this.userService.getAll()
      .then((data:any) => {
        console.log(data.results)
        this.USERS = data.results
      })
      .catch((error) => {
        console.log(error);
      });
  }



}

import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersServiceService } from '../../services/users-service.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser?: IUser;
  userService = inject(UsersServiceService)


  async delete(_id: string | undefined) {
    if (_id) {
      try {
        const resDelete: any = await this.userService.delete(_id);
        console.log(resDelete);

      } catch (error) {
        console.log(error);
      }
    }

  }
}

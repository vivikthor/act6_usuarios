import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userService = inject(UsersServiceService);
  activatedRoute = inject(ActivatedRoute);
  USER!: IUser;

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const res = await this.userService.getById(params._id);
      if (res) {
        this.USER = res;
      }
    });
  }

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

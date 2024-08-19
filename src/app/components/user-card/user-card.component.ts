import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersServiceService } from '../../services/users-service.service';
import { DeleteBtnComponent } from "../delete-btn/delete-btn.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, DeleteBtnComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser! : IUser;
  userService = inject(UsersServiceService);

  
}

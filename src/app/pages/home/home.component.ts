import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule, NavbarComponent, RouterLink, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UsersServiceService);
  USERS: IUser[] = [];
  PAGES: number[] = [];

  //TIPAR LA RESPUESTA DEL API

  ngOnInit() {
    this.userService
      .getAll()
      .then((data: any) => {
        this.USERS = data.results;

        for (let i = 1; i <= data.total_pages; i++) {
          this.PAGES.push(i);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async movePage(page: number) {
    const res = await this.userService.getAll(page);
    this.USERS = res;
  }
}

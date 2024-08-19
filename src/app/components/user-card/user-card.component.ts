import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersServiceService } from '../../services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser?: IUser;
  userService = inject(UsersServiceService);

  async delete(_id: string | undefined){
    if (_id) {
      try {
        const resDelete: any = await this.userService.delete(_id);

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: `¿Quieres eliminar a ${this.myUser?.first_name}?`,
            text: 'Si borras al usuario no habrá vuelta atrás',
            // icon: 'question',
            imageUrl: this.myUser?.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `Foto de perfil de ${this.myUser?.image}`,
            showCancelButton: true,
            confirmButtonText: '¡Sí, borrar!',
            cancelButtonText: '¡No, no quiero!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: '¡Borrado!',
                text: 'El usuario ha sido eliminado',
                icon: 'success',
              });
              console.log(resDelete);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServiceService } from '../../services/users-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-btn',
  standalone: true,
  imports: [],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.css',
})
export class DeleteBtnComponent {
  @Input() UserTarget!: IUser;
  userService = inject(UsersServiceService);


  async delete(_id: string | undefined) {
    if (_id) {
      try {
        console.log("try")
        const resDelete: IUser = await this.userService.delete(_id);

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: `¿Quieres eliminar a ${this.UserTarget?.first_name}?`,
            text: 'Si borras al usuario no habrá vuelta atrás',
            // icon: 'question',
            imageUrl: this.UserTarget?.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `Foto de perfil de ${this.UserTarget?.image}`,
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

import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  MinValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Password } from 'primeng/password';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServiceService } from '../../services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  modelForm: FormGroup;
  userService = inject(UsersServiceService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  tipo: string = 'Nuevo';
  submitBtn : string = 'Guardar';
  errorForm: any[] = [];
  emailExp = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,10}$/;
  userInProgress!: string;

  constructor() {
    this.modelForm = new FormGroup(
      {
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.emailExp),
        ]),
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        rep_password: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
      },
      [this.checkPassword]
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.userInProgress = params._id;
        this.tipo = 'Actualizar';
        this.submitBtn = 'Actualizar'
        const user: IUser = await this.userService.getById(params._id);

        this.modelForm = new FormGroup(
          {
            first_name: new FormControl(user.first_name, [Validators.required]),
            last_name: new FormControl(user.last_name, [Validators.required]),
            email: new FormControl(user.email, [
              Validators.required,
              Validators.pattern(this.emailExp),
            ]),
            username: new FormControl(user.username, [
              Validators.required,
              Validators.minLength(3),
            ]),
            password: new FormControl(user.password, [
              Validators.required,
              Validators.minLength(6),
            ]),
            rep_password: new FormControl(user.password, [Validators.required]),
            image: new FormControl(user.image, [Validators.required]),
          },
          [this.checkPassword]
        );
      }
    });
  }

  checkValidation(formControlName: string, validator: string) {
    return (
      this.modelForm.get(formControlName)?.hasError(validator) &&
      this.modelForm.get(formControlName)?.touched
    );
  }

  checkPassword(formValue: AbstractControl): any {
    const pass: string = formValue.get('password')?.value;
    const rep_pass: string = formValue.get('rep_password')?.value;
    if (rep_pass !== pass && pass !== null && rep_pass !== null) {
      return { checkpassword: true };
    } else {
      return null;
    }
  }

  // checkImage(formValue: AbstractControl): any {
  //   const imageUrl: string = formValue.value;
  //   let errors : any = formValue
  //   if (
  //     imageUrl !== null &&
  //     (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))
  //   ) {
  //     return null;
  //   } else {
  //     return errors = { checkimage: true }
  //     console.log(errors)
  //     //  { checkimage: true };
  //     // return formValue?.errors({checkimage : true})
  //   }
  // }

  async getForm() {
    // ya existe el user, solo actualizar
    const user = await this.userService.getById(this.userInProgress);
    if (user._id) {
      // console.log("ya existe")
      try {
        const res: IUser = await this.userService.update(
          this.userInProgress,
          this.modelForm.value
        );
        if (res._id) {
          this.formSuccess();
        }
      } catch ({ error }: any) {
        this.errorForm = error;
        console.log(this.errorForm);
      }
    }
    //no existe user
    else {
      try {
        // console.log("no existe")
        const res: IUser = await this.userService.insert(this.modelForm.value);
        if (res.id) {
          this.formSuccess;
        }
      } catch ({ error }: any) {
        this.errorForm = error;
        console.log(this.errorForm);
      }
    }
  }

  formSuccess() {
    let timerInterval: any;
    Swal.fire({
      title: '¡Hecho!',
      html: 'Redirigiendo a Inicio...',
      timer: 5000,
      timerProgressBar: false,
      showCancelButton: false,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Vale',
      // willClose: () => {
      //   clearInterval(timerInterval);
      // },
    }).then((result) => {
      console.log(this.modelForm.value);
      if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
        this.router.navigate(['/home']);
      }
    });
  }
}

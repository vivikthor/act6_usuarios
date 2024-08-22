import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css'
})
export class NewuserComponent {

}

import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {

}

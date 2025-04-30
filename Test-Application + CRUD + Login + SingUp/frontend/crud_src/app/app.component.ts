import { Component } from '@angular/core';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  imports: [ CrudComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
})
export class AppComponent {
  title = 'db-form';
}

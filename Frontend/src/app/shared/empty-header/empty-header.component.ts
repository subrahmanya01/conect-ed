import { Component } from '@angular/core';
import { globalConstants } from 'src/app/constants/global-constant';
import { settings } from 'src/assets/appsettings';

@Component({
  selector: 'app-empty-header',
  templateUrl: './empty-header.component.html',
  styleUrls: ['./empty-header.component.css']
})
export class EmptyHeaderComponent {
 constants: any =globalConstants;
}

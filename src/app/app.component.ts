import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentMenuItem = 'recipe';

  onMenuItemChanged(menuItem: string) {
    this.currentMenuItem = menuItem;
  }
}

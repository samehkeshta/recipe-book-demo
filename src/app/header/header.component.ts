import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveRecipes() {
    this.dataStorageService.saveRecipes().subscribe();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component"
import { HousingLocation } from "../housing-location"
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent,],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter >
      <button type="button" (click)="filterResults(filter.value)" class="primary">Search</button>
    </form>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList : HousingLocation[] = [];
  filteredLocationList : HousingLocation[] = [];
  housingService : HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList; 
        this.filteredLocationList = housingLocationList; 
      })
  }

  filterResults(text:string){ 
    if (!text){
      this.filteredLocationList = this.housingLocationList;
      }else{

      this.filteredLocationList= this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())  
      ) 
    }
  }



  
}

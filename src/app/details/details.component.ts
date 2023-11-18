import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" class="listing-photo" alt="">
      <section class="listing-decription">
        <h2 class="listing-heading">{{ housingLocation?.name}}</h2>
        <p class="listing-location">{{ housingLocation?.city}}, {{ housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="section-apply">
        <h2 class="section-heading">Apply to live here</h2>
        <form [formGroup]="applyform" (submit)="submitApplication()" >
          <label for="first-name">First Name</label>
          <input type="text" formControlName="firstName" id="first-name">
          <label for="last-name">Last Name</label>
          <input type="text" formControlName="lastName" id="last-name">
          <label for="email">Email</label>
          <input type="email" formControlName="email" id="email">
          <button type="submit" class="primary">Apply Now!</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
route: ActivatedRoute = inject(ActivatedRoute);
housingService = inject(HousingService)
housingLocation: HousingLocation | undefined;
applyform = new FormGroup({
  firstName : new FormControl(''),
  lastName : new FormControl(''),
  email : new FormControl('')
})

constructor(){
  const housingLocationId = Number(this.route.snapshot.params['id']);
  this.housingService.getHousingLocationById(housingLocationId)
    .then((housingLocation) => {
      return this.housingLocation = housingLocation; 
    })
}
submitApplication(){
  this.housingService.submitApplication(
    this.applyform.value.firstName ?? "",
    this.applyform.value.lastName ?? "",
    this.applyform.value.email ?? ""
)
}

}

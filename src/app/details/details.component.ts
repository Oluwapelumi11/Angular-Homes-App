import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { flush } from '@angular/core/testing';

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
          <button type="submit" [disabled]="buttonDisabled && !applyform.valid" class="primary">{{buttonValue}}</button>
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
  firstName : new FormControl('',Validators.required),
  lastName : new FormControl('',Validators.required),
  email : new FormControl('', Validators.required)
})
buttonValue : string = "Apply Now!"
buttonDisabled: boolean = false;
constructor(){
  const housingLocationId = Number(this.route.snapshot.params['id']);
  
this.housingLocation =this.housingService.getHousingByID(housingLocationId)
  
}
submitApplication(){
  if (this.applyform.valid){
  this.buttonValue = "Applying ...."
  this.buttonDisabled = true
  this.applyform.reset()
  setTimeout(() => {
    this.buttonValue = "Applied Success!"
 },3000)
}}

}

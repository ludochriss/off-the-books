import { Component,Input } from '@angular/core';
import { SpotAsset } from 'src/app/models/spotAsset.model';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent {
  @Input() assets: SpotAsset[];
  constructor() {}

  

  typesOfShoes: string[] = ['Loafers', 'Sneakers'];

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
}

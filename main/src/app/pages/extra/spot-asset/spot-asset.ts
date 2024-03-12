import { Component, Input } from '@angular/core';
import { SpotAsset } from 'src/app/models/spotAsset.model';

@Component({
  selector: 'spot-asset',
  templateUrl: './spot-asset.html',
  styleUrls: ['./spot-asset.scss']
})
export class SpotAssetComponent {
@Input() spotAsset: SpotAsset
}

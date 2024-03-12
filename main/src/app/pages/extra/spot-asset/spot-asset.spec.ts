import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotAssetComponent } from './spot-asset';

describe('AssetComponentComponent', () => {
  let component: SpotAssetComponent;
  let fixture: ComponentFixture<SpotAssetComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

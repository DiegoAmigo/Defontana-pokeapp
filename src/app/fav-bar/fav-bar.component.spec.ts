import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBarComponent } from './fav-bar.component';

describe('FavBarComponent', () => {
  let component: FavBarComponent;
  let fixture: ComponentFixture<FavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

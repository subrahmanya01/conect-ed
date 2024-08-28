import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingFollowerModalComponent } from './following-follower-modal.component';

describe('FollowingFollowerModalComponent', () => {
  let component: FollowingFollowerModalComponent;
  let fixture: ComponentFixture<FollowingFollowerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingFollowerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingFollowerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

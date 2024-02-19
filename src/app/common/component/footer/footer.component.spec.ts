import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    let mockTranslateService = {
      set: jasmine.createSpy()
    }

    await TestBed.configureTestingModule({
      declarations: [FooterComponent, TranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

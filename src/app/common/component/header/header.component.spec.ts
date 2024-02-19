import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule, TranslatePipe, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const mockTranslateService = {
      set: jasmine.createSpy()
    }
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ,TranslatePipe ],
      providers: [{ provide: TranslateService , useValue: mockTranslateService }]
  
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

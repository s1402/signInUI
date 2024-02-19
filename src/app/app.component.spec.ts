import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG } from '@ngx-translate/core';
import { InjectionToken } from '@angular/core';
import { HeaderComponent } from './common/component/header/header.component';
import { NavbarComponent } from './common/component/navbar/navbar.component';
import { FooterComponent } from './common/component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let mockTranslateService : jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    mockTranslateService = jasmine.createSpyObj('TranslateService',['setDefaultLang','use']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule,
        HttpClientModule
      ],
      providers:[
      { provide: TranslateService , useValue : mockTranslateService}
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        NavbarComponent,
        FooterComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

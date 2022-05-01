import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { JsonFolderRepository } from './repositories/JsonFolderRepository';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: 'IFolderRepository', useClass: JsonFolderRepository }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should return a list of folder names`, () => { 
   const fixture = TestBed.createComponent(AppComponent);
   const component = fixture.componentInstance;
    
   component.ngOnInit();
   var folderNames = component.folderNames;

   expect(folderNames.length).toBeGreaterThanOrEqual(2);
  });
});

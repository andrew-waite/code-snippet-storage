import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoeditorComponent } from './monaco-editor.component';

describe('MonacoeditorComponent', () => {
  let component: MonacoeditorComponent;
  let fixture: ComponentFixture<MonacoeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonacoeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonacoeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

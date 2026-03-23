import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TokenExpiredComponent } from "./token-expired.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MockStoreModule } from "@app/tests/tests.module";
import { Store } from "@ngrx/store";

describe("ServerErrorComponent", () => {
  let component: TokenExpiredComponent;
  let fixture: ComponentFixture<TokenExpiredComponent>;
  let store: Store<TokenExpiredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TokenExpiredComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        MockStoreModule.forRoot("Location", {}),
        NgxDatatableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TokenExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentWorkflowMapperCreateComponent } from './deployment-workflow-mapper-create.component';

describe('DeploymentWorkflowMapperCreateComponent', () => {
  let component: DeploymentWorkflowMapperCreateComponent;
  let fixture: ComponentFixture<DeploymentWorkflowMapperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentWorkflowMapperCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeploymentWorkflowMapperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

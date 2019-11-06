import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenienceFeeComponent } from './convenience-fee.component';

describe('ConvenienceFeeComponent', () => {
    let component: ConvenienceFeeComponent;
    let fixture: ComponentFixture<ConvenienceFeeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConvenienceFeeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConvenienceFeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

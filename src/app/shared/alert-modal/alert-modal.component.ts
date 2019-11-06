import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalData } from '../../core/models';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: AlertModalData
    ) {}
}

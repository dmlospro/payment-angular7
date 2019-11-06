import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface TBBBOUTDialogData {
  amount: number;
}

@Component({
    selector: 'app-tbbbout-dialog',
    templateUrl: './tbbbout-dialog.component.html',
    styleUrls: ['./tbbbout-dialog.component.scss']
  })
  export class TBBBOUTDialogComponent {
    tip = "0";
    total = 0;

    constructor(
      public dialogRef: MatDialogRef<TBBBOUTDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: TBBBOUTDialogData
    ) {}
  
    selectTip() {
      this.total = this.data.amount + this.data.amount * parseInt(this.tip) / 100;
    }

    onBeforePayment() {
      this.dialogRef.disableClose = true;
    }

    onResult(success) {
      this.dialogRef.disableClose = false;
      if (success) {
        this.dialogRef.close(true);
      }
    }
  }
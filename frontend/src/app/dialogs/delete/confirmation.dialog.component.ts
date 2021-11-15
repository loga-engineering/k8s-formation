import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation.dialog.component.html',
    styleUrls: ['./confirmation.dialog.component.css']
})
export class ConfirmationDialogComponent {

    message = 'Etes vous sure?';
    confirmButtonText = 'Oui';
    cancelButtonText = 'Annuler';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    confirm(): void {
        this.dialogRef.close(true);
    }
    cancel(): void {
        this.dialogRef.close(false);
    }
}

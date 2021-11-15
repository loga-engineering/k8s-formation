import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../dialogs/delete/confirmation.dialog.component';

@Injectable({
    providedIn: 'root'
})
export class CustomMatService {

    constructor(private dialog: MatDialog) {
    }

    showConfirmation(message: string, func: Function, buttonText?: { ok: string, cancel: string }) {
        buttonText = buttonText || {ok: '', cancel: ''};
        this.dialog.open(ConfirmationDialogComponent, {
            data: {message, buttonText}
        }).afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                func();
            }
        });
    }

    getDialog(): MatDialog {
        return this.dialog;
    }


}

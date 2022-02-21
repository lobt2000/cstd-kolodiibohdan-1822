import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.scss']
})
export class PhoneModalComponent implements OnInit {
  textInput: FormGroup = new FormGroup({
    phone_number: new FormControl('', [Validators.required]),
  });
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PhoneModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.textInput.value.phone_number)
  }

  onClickedOutsideItem(e: Event) {
    // this.closeModal()
    e.stopPropagation();
  }

}

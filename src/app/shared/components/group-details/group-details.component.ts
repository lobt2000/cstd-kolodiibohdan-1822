import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  kinderGroupDetails: FormGroup = new FormGroup({
    groupDetails: this.fb.array([], [Validators.required]),
  });
  chosenSubGroup: string = '';
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.data.hasOwnProperty('groupDetails')) {
      this.getGroupDetails.reset();
      this.data.groupDetails?.forEach(res => {
        this.getGroupDetails.push(this.fb.group({
          childrenInGroup: this.fb.control(res?.childrenInGroup),
          maxCountOfChildren: this.fb.control(res?.maxCountOfChildren),
          name: this.fb.control(res?.name),
        })
        )
      })
      if (this.data.showMode == 'chooseSubGroop' && this.data.groupDetails.some(res => res.name == this.data.currApplication.subGroup)) {
        this.chosenSubGroup = this.data.currApplication.subGroup;
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close(undefined);
  }

  save() {
    const details = this.kinderGroupDetails.controls.groupDetails;
    if (details.valid) {
      this.dialogRef.close(this.data.showMode == 'chooseSubGroop' ? this.chosenSubGroup : details.value);
    }
  }

  onClickedOutsideItem(e: Event) {
    e.stopPropagation();
  }

  addGroupDetails() {
    return this.getGroupDetails.push(this.fb.group({
      childrenInGroup: this.fb.control('', [Validators.required]),
      maxCountOfChildren: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
    }))
  }

  deleteGroupControl(i) {
    this.getGroupDetails.removeAt(i)
  }

  get getGroupDetails() {
    return this.kinderGroupDetails.get('groupDetails') as FormArray
  }

}

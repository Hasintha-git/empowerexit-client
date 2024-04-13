import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-notes',
  templateUrl: './progress-notes.component.html',
  styleUrls: ['./progress-notes.component.scss']
})
export class ProgressNotesComponent implements OnInit {
  public note: any;
  notesControl = new FormControl('');
  constructor(public dialogRef: MatDialogRef<ProgressNotesComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: any,) { 


  }

  ngOnInit(): void {
    this.note = this.data;
  }

  notesUpdate() {
    this.note = this.notesControl.value;
    this.onClose();
  }

  onClose() {
    this.dialogRef.close(this.note)
  }
}

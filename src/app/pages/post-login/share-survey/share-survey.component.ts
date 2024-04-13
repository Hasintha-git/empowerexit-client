import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { getEndpoint, SECURE, SHARESURVEY } from 'src/app/utility/constants/end-point';

@Component({
  selector: 'app-share-survey',
  templateUrl: './share-survey.component.html',
  styleUrls: ['./share-survey.component.scss']
})
export class ShareSurveyComponent implements OnInit {

  shareSurveyLink:any;

  constructor(private toastr: ToastServiceService, public dialogRef: MatDialogRef<ShareSurveyComponent>,) { }

  ngOnInit(): void {
    this.shareSurveyLink = `${SHARESURVEY}`
  }

  onClose() {
    this.dialogRef.close()
  }

  copied() {
    this.toastr.successMessage('Copied');
  }
}

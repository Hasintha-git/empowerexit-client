import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/models/StorageService';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ToastServiceService } from 'src/app/services/toast-service.service';
@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  id:any;
  sessionUser: any;

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>, 
    private employeeService: EmployeeService,
    private storage: StorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.sessionUser = this.storage.getItem("user");
  }

  ngOnInit(): void {
    this.id = this.data;
  }

  confirmDelete() {
    this.spinner.show();
    this.employeeService.deleteEmployee(this.sessionUser,this.id).subscribe((data: any) => {
      this.onClose();
      this.spinner.hide();
      this.toastr.errorMessage(data.MESSAGE);
      this.router.navigate(['/post-login/employee-analytics']);
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  onClose() {
    this.dialogRef.close()
  }
}

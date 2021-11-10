import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPass: FormGroup;
  pattern = /^.{8,16}$/gm;
  confirmPass: string = '';
  isDisabled: boolean = true;
  isVisible: boolean = false;
  isConfirmVisible: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.resetPass = this.fb.group({
      pass: this.fb.control('', [Validators.required, Validators.min(8), Validators.max(16), Validators.pattern(this.pattern)]),
      confirmpass: this.fb.control('', [Validators.required, Validators.min(8), Validators.max(16), this.confirmPassValidator()])
    })
    this.resetPass.valueChanges.subscribe(res => {
      if (this.resetPass.valid) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
    this.resetPass.controls.pass.valueChanges.subscribe(res => {
      if (res) {
        res.match(this.pattern)
        this.confirmPass = res;
      }
      if (this.resetPass.valid) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
    this.resetPass.controls.confirmpass.valueChanges.subscribe(res => {
      if (this.resetPass.valid) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
  }
  ChangeType(): void {
    this.isVisible = !this.isVisible
  }
  ChangeTypeConfirm(): void {
    this.isConfirmVisible = !this.isConfirmVisible
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => this.confirmPass !== control.value ? { notmatch: 'This value should be the same as password' } : null
  }

  sendNewPass() {
    if (this.resetPass.valid) {
      const code = this.route.snapshot.queryParams['oobCode'];
      this.authService.resetPassword(code, this.resetPass.get('pass').value)
    }
  }
}

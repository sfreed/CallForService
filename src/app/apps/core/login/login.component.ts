import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { AlertService } from 'src/app/common/services/common/Alert.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [  ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  showWaitIndicator = false;
  window: Window = window;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.getUser()) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.showWaitIndicator = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .then(
              data => {

                if (data.Errors && data.Errors.length > 0) {
                  this.alertService.error(data.Errors[0].errorDisplayMessage);
                  this.showWaitIndicator = false;
                } else {
                  this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                  this.alertService.error(error);
                  this.showWaitIndicator = false;
              }
          );
  }
}

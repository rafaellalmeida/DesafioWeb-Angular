import { HttpServiceService } from './../services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ 
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private httpService: HttpServiceService,
        private router: Router
    ){

    }

    ngOnInit() {
        this.initForm();
    }
    
    initForm(){
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.httpService.post({
            'email': this.f.email.value
          },'https://reqres.in/api/users');
          console.log({
            'email': this.f.email.value,
          })
          alert('Bem vindo ' + this.f.email.value);
            
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/dashboard']);   
       
    }
    
}
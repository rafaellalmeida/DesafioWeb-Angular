import { HttpServiceService } from './../../services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  
  registerForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  constructor( 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private httpService: HttpServiceService 
    ) { 
    
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        work: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    this.httpService.post({
      'name': this.f.name.value,
      'work': this.f.work.value,
    }, 'https://reqres.in/api/users');

    console.log({
      'name': this.f.name.value,
      'work': this.f.work.value,
    })
    alert("Cadastro realizado com sucesso");
  }

}

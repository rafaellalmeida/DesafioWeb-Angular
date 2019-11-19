import { HttpServiceService } from './../../services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private httpService: HttpServiceService,
    private router: Router
    ) {
      
  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe( params => {
      this.id = parseInt(params.id)
      this.httpService.get('https://reqres.in/api/users/' + params.id).subscribe((data:object) => {
         this.f.name.setValue((data['data'].first_name))
      });
    })  
  };

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

    this.httpService.update({
      'name': this.f.name.value,
      'work': this.f.work.value,
    }, 'https://reqres.in/api/users/' + this.id);

    console.log({
      'name': this.f.name.value,
      'work': this.f.work.value,
    })
    alert("Edição realizada com sucesso");
    this.router.navigate(['/listar']);
  }

}


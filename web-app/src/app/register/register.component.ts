import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr:ToastrService, private service:AuthService, private router:Router ){
 

  }

  registerform=this.builder.group({
    id:this.builder.control('', Validators.required),
    name:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender:this.builder.control(''),
    role:this.builder.control(''),
    isactive:this.builder.control(false)
  });

  proceedregistration() {
    //Registro com sucesso
    if (this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(res=> {
        this.toastr.success('Registro feito com sucesso!');
        this.router.navigate(['login'])
      })
    } 
    //Falha no registro
    else {
      this.toastr.warning('Por favor, colocar um dado válido!')
    }
  }

}

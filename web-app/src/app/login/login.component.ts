import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, 
    private service: AuthService, private router: Router) {
      sessionStorage.clear();
  }

  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  proceedlogin() {
    //Login com sucesso
    if (this.loginform.valid) {
      //   this.service.Proceedregister(this.loginform.value).subscribe(res=> {
      //     this.toastr.success('Registro feito com sucesso!');
      //     this.router.navigate(['login'])
      //   })
      // } 
      // //Falha no Login
      // else {
      //   this.toastr.warning('Por favor, colocar um dado válido!')
      // }
      this.service.Getbycode(this.loginform.value.username).subscribe(res => {
        this.userdata = res;
        // console.log(this.userdata);
        //Se acertar a senha:
        if (this.userdata.password === this.loginform.value.password) {
          //Se o usuário tiver permissao para entrar:
          if (this.userdata.isactive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['/initial-page'])
          } else {
            this.toastr.error('Por favor, renove seu cadastro na Dizer ou contate nosso suporte');
          }

        } else {
          this.toastr.error('Credenciais Inválidas');
        }
      })
    }
  }
}
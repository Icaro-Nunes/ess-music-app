import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alterar-senha-popup',
  templateUrl: './alterar-senha-popup.component.html',
  styleUrls: ['./alterar-senha-popup.component.css']
})
export class AlterarSenhaPopupComponent {
  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<AlterarSenhaPopupComponent>) {
  }
  user: any;
  rolelist: any;



  ngOnInit(): void {
    this.user = this.service.Getbycode(sessionStorage.getItem('username')).subscribe(res=> {
      this.user = res;
      this.registerform.setValue({
        id: this.user.id, name: this.user.name, email: this.user.email,
        password: this.user.password, role: this.user.role, gender: this.user.gender,
        isactive: this.user.isactive
      })
    })
  }

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6)])),
    email: this.builder.control(''),
    gender: this.builder.control(''),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  alterarSenha() {
    if (this.registerform.valid) {
      this.service.Updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this.toastr.success('Senha alterada com sucesso!');
        this.dialog.close();
      })
    } else {
      this.toastr.warning('A senha deve conter pelo menos 6 digitos!')
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  message: string;
  mailSent: boolean;

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  logIn(){
    try {
      if( this.email === undefined || this.password === undefined ){
        this.message = 'Usuário	ou	senha	vazios. Preencha todos os campos!';
        return;
      }

      this.authService.login(this.email, this.password)
      .then( (data) => {
        this.route.navigate(['/admin/painel']);
      })
      .catch( error => {
        let details;

        switch( error.code ){
          case 'auth/user-not-found': {
            details = 'Não	existe	usuário	para	o	email	fornecido.';
            break;
          }

          case 'auth/invalid-email': {
            details = 'E-mail ou senha inválidos.';
            break;
          }

          case 'auth/wrong-password': {
            details = 'E-mail ou senha inválidos.';
            break;
          }

          default: {
            details = error.message;
            break;
          }
        }
      });
    } catch(error) {
      this.message = `Erro ao logar. Detalhes: ${error}`;
    }
  }
  
  async sendResetEmail(){
    const { value: email } = await Swal.fire({
      title: 'Informe	o	email	cadastrado',
      input: 'email',
      inputPlaceholder: 'Seu e-mail...'
    });

    if( email ){
      this.authService.resetPassword(email)
      .then( () => {
        this.mailSent = true;
        this.message = `Email	enviado	para	${email}	com	instruções	para	recuperação`;
      })  
      .catch( (error) => {
        this.message = `Erro	ao	localizar	o	email.	Detahes	${error.message}`;
      })
    }
  }
}

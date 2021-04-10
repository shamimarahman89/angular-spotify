import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: ""
  };
  warning: any;

  success = false;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading = true;
    if(this.registerUser.userName != "" && this.registerUser.password === this.registerUser.password2){
      this.authService.register(this.registerUser).subscribe( 
        data => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        }, 
        err => {
           this.success = false;
           this.warning = err.message;
           this.loading = false; 
        });
    }
    else{
      this.success = false;
      this.warning = "invalid input";
      this.loading = false;

    }
  }

}

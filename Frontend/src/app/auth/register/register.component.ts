import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { RegisterModel } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  isEmailinValid: boolean =  false;

  @ViewChild('appTags') tags: any;

  constructor(private formbuilder : FormBuilder, private userService : UserService, private router:Router){
    this.registerForm = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8)]]
    }, { validator: this.mustMatch('password', 'confirmPassword') })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  submit()
  {
    if(!this.registerForm.valid) return;
    this.registerUser();
  }

  registerUser()
  {
    let newRegistration: RegisterModel  = {} as RegisterModel;
    newRegistration.firstName = this.registerForm.get("firstName")?.value;
    newRegistration.lastName = this.registerForm.get("lastName")?.value;
    newRegistration.email = this.registerForm.get("email")?.value;
    newRegistration.password = this.registerForm.get("password")?.value;
    newRegistration.tags = this.tags.tagList;

    this.userService.register(newRegistration).subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/");
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }

  validateEmail(data: string)
  {
    console.log(data);
    this.userService.isEmailRegistered(data).subscribe({
      next: (data: ApiResponseModel)=>{
        this.isEmailinValid = data["isEmailAlreadyRegistered"];
        if(this.isEmailinValid) 
          {
            this.registerForm.setErrors({emailInvalid : true})
          }
      },
      error:(err)=>{
        console.error(err.message);
    }
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

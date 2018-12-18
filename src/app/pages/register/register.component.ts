import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  cegReg: FormGroup;
  submitted: boolean;
  magan: boolean = true;
  kappa: Array<BarComponent> = [];
  valids: boolean[] = [];
  valid: boolean = false;

  constructor(private fb:FormBuilder) { 
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      location: ['',Validators.required]
    });
    this.cegReg = this.fb.group({
      compName: ['',Validators.required],
      compLoc: ['',Validators.required]
    });
  }

  changeHandler(event){
    if(event.target.value == 'magan'){
      console.log("magan");
      this.magan = true;
      this.cegReg.reset();
      this.kappa = [];
    }else{
      console.log("ceg");
      this.magan = false;
      this.registerForm.reset();
      this.kappa = [];
      
    }
  }
  newDiv(event){
    this.kappa.push(new BarComponent());
    if(this.valid && (this.kappa.length != this.valids.length)){
      this.valid = false; 
    }
  }
  remove(i:number){
    this.kappa.splice(i,1);
    this.valids.splice(i,1);
  }
  check(valid: boolean){
    if(valid){
      this.valids.push(valid);
    }
    console.log(this.valids);
  }

  get f() { return this.registerForm.controls; }
  get g() { return this.cegReg.controls; }

  checkValid(){
    if(this.valids.length == this.kappa.length){
      this.valid = true;
    }
  }
  register(){
    this.submitted = true;

    if(this.magan){
      if(this.registerForm.invalid){
        console.log("invalid");
        return;
      }
    }else{
      if(this.cegReg.invalid){
        return;
      }
    }
    if(this.valids.length == this.kappa.length){
      this.valid = true;
    }
    
    console.log("kappa");
  }

}

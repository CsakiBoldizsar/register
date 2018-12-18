import { Component, OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.sass']
})
export class BarComponent implements OnInit {
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();


  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
    });
    this.valid.emit(false);
  }


  changing(event){
    if(this.form.valid){
      console.log("Jo lesz a form");
      this.valid.emit(true);
    }
    console.log("Changing");
    console.log(event.target.value);
    
  }
  onclick(){
    this.remove.emit("Message From Child");
  }

}

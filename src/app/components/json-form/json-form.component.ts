import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css']
})
export class JsonFormComponent implements OnInit {

  dynamicFormArray : any;
  ttttt! : FormGroup;
  submitted = false;

  displayedColumns: string[] = ['Name', 'Gender', 'Hobbies', 'Actions'];
  dataSource! : Clients[];

  constructor(private httpClient : HttpClient,private fb : FormBuilder,private service: ClientService) {
    this.ttttt = this.fb.group({
      orders: new FormArray([])
    });
   }

  ngOnInit(){

    

    // debugger;
    this.httpClient.get('/assets/MobilityEye.json').subscribe(data => {
      this.dynamicFormArray = data;
      this.CreateFormControl();
    });

    this.fillData();
  }

  CreateFormControl(){
    this.dynamicFormArray.forEach((element : any) => {
      if(element.required == true){
        this.ttttt.addControl(element.id, new FormControl('',[Validators.required]))
      }else{
        this.ttttt.addControl(element.id, new FormControl(''))
      }
    });
  }

  fillData() {
    this.service.GetAllClients().subscribe(
      (data: any) => { 
        this.dataSource = data.result;
      });
  }

  onCheckChange(event : any) {
    const formArray: FormArray = this.ttttt.get('orders') as FormArray;
  
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
          i++;
        });
      }
  }

  Submit(){
    const formArray: FormArray = this.ttttt.get('orders') as FormArray;
    const client = new Clients();
    client.Name = this.ttttt.get('Name')?.value;
    client.Gender = this.ttttt.get('Gender')?.value;
    client.Hobbies = formArray.value.toString();

    if(this.ttttt.get('Name')?.value == null || this.ttttt.get('Name')?.value == ""){
      alert("Please Enter Your Name");
    }else if(this.ttttt.get('Gender')?.value == null || this.ttttt.get('Gender')?.value == ""){
      alert("Please Select Your Gender");
    }else if(formArray.value.toString() == null || formArray.value.toString() == ""){
      alert("Please Select At Least a Hobby");
    }else{
      this.service.CreateClient(client).subscribe(
        (result: any) => {
          alert("Update Successfully !");
          window.location.reload();
        },
        (error: any) => {
          console.log(error);
        });
    }

    
  }

  DeleteClient(id:number){
    this.service.DeleteClient(id).subscribe(
      (result: any) => {
        alert("Delete Successfully !");
      },
      (error: any) => {
        console.log(error);
      });
      location.reload();
      this.fillData();
  }

  // onReset(){
  //   this.httpClient.get('/assets/my-form.json').subscribe(data => {
  //     this.dynamicFormArray = data;
  //     this.CreateFormControl();
  //   });
  // }

}

export class Clients{
  Id!:number;
  Name!:string;
  Gender!:string;
  Hobbies!:string;
}

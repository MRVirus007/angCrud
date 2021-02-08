import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'useradmin';
  url = "http://localhost:3000/users/"
  login = true;
  register = true;
  validFields = false;
  showList = true;
  listData;
  checkUser;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  profileForm = new FormGroup({
    name: new FormControl(['', Validators.required]),
    email: new FormControl(['', Validators.required, Validators.email]),
    number: new FormControl(['', Validators.required]),
    pass: new FormControl(['', Validators.required]),
  });

  name = new FormControl('');
  email = new FormControl('');
  number = new FormControl('');
  pass = new FormControl('');

  loginForm = new FormGroup({
    email: this.email,
    pass: this.pass
  });

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      number: this.number,
      pass: this.pass
    });

    this.http.get(this.url).subscribe(res => {
      this.listData = res;
      console.log(res);
    })
  }

  loginSub() {
    console.log("Email is: " + this.email.value);
    console.log("Password is: " + this.pass.value);
    this.http.get(this.url).subscribe(udata => {
      for (let i = 0; i < Object.keys(udata).length; i++) {
        this.checkUser = udata[i].email;
        if (this.email.value == udata[i].email) {
          console.log("correct")
        }
        console.log(this.checkUser);
      }
    });

  }

  deleteUser(id) {
    console.log("ID: " + id);
    this.http.delete(this.url + id).subscribe(del => {
      console.log("User Deleted");
    });
  }

  onSubmit() {
    console.log("I am Clicked")
    if (this.profileForm.valid) {
      if (this.name.value == "" && this.email.value == "" && this.number.value == "" && this.pass.value == "") {
        console.log("Empty");
      }
      console.log("All are valid");
      this.validFields = false;
      //this.sendToApi();
    } else {
      console.log("All are not valid");
      this.validFields = true;
    }

  }

  sendToApi() {
    this.http.post(this.url, this.profileForm.value).subscribe(data => {
      console.log("Data Inserted Successfully" + data);

    }, error => {
      console.log("There are errors." + error);
    })
  }

}

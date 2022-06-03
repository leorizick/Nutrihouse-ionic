import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    username : "",
    senha : ""
  };

  constructor(
    public navCtrl: NavController,
     public menu: MenuController,
     public auth : AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
    this.menu.swipeEnable(true)
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
     this.auth.sucessfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot("MenuPages");
    },
    error => {});
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AlertController, IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { ClienteDto } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
/**
 * Generated class for the CadastroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  formGroup: FormGroup
  editGroup: FormGroup
  editCliente: ClienteDto

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public editBuilder: FormBuilder,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.maxLength(30)]],
      descricao: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      tipoCliente: ['', [Validators.required]]

    });
  }


  cadastroCliente() {
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

/*  editarCliente(cliente_id : string) {
    this.clienteService.findById(cliente_id)
    .subscribe(response => {
      this.editCliente = response;
    },
    error => {});
    
    console.log(this.editGroup.value);
    this.clienteService.insert(this.editGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }*/


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ClientesPage');
          }
        }
      ]
    });
    alert.present();
  }

}

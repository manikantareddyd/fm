import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SFM } from "../../providers/sfm";
/*
  Generated class for the Original page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-original',
  templateUrl: 'original.html'
})
export class OriginalPage {
  current;
  files;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sfm: SFM
  ) {
    this.getFilesList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OriginalPage');
  }
  
  getFilesList()
  {
    this.files = this.sfm.getFilesList();
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SFM } from "../../providers/sfm";

import { ContentPage } from '../content/content';
import { TimelinePage } from '../timeline/timeline';
import { TypePage } from '../type/type';

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
  current = null;
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

  gotoContentPage(current){
    this.navCtrl.push(ContentPage,
    {
      current: current
    });
  }
  
  gotoTimelinePage(current){
    this.navCtrl.push(TimelinePage,
    {
      current: current
    });
  }

  gotoTypePage(current){
    this.navCtrl.push(TypePage,
    {
      current: current
    });
  }


}

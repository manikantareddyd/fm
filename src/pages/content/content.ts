import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OriginalPage } from '../original/original';
import { TimelinePage } from '../timeline/timeline';
import { TypePage } from '../type/type';

/*
  Generated class for the Content page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  current;
  categories;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }
  
  gotoOriginalPage(current)
  {
    this.navCtrl.push(OriginalPage,
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

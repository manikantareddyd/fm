import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OriginalPage } from '../original/original';
import { ContentPage } from '../content/content';
import { TypePage } from '../type/type';

/*
  Generated class for the Timeline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

  gotoOriginalPage(current)
  {
    this.navCtrl.push(OriginalPage,
    {
      current: current
    });
  }

  gotoContentPage(current){
    this.navCtrl.push(ContentPage,
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

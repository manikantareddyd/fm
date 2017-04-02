import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SFM } from "../../providers/sfm";
import { OriginalPage } from '../original/original';
import { ContentPage } from '../content/content';
import { TimelinePage } from '../timeline/timeline';
/*
  Generated class for the Type page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-type',
  templateUrl: 'type.html'
})
export class TypePage {
  types;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public sfm: SFM
  ) {
    events.subscribe("file entry created", () => {
      this.types = this.sfm.getTypes();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypePage');
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

  gotoTimelinePage(current){
    this.navCtrl.push(TimelinePage,
    {
      current: current
    });
  }
}

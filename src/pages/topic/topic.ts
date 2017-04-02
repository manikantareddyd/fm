import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Topic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html'
})
export class TopicPage {
  files = [];
  topic;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.files = this.navParams.get("files");
    this.topic = this.navParams.get("topic");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicPage');
  }

}

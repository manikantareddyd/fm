import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { SFM } from "../../providers/sfm";
import { TopicPage } from '../topic/topic';
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
  topics = [];
  files = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    public sfm: SFM
  ) {
    this.topics = this.sfm.getTopicsList();
    this.files = this.sfm.getFilesList();
    events.subscribe("file entry created", () => {
      this.files = this.sfm.getFilesList();
    })
    console.log("files", this.files);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }
  

  navigateToSubDir(topic){
    var filesList = [];
    var num;
    for(num = 0; num < this.files.length; num++)
    {
      console.log("topics in file", this.files[num]['topics']);
      this.files[num]['topics'].forEach(element => {
        if(topic == element)
        {
          filesList.push(this.files[num]);
        }
      });
    }
    this.navCtrl.push(
      TopicPage,
      {
        files: filesList,
        topic: topic
      }
    );
  }

}

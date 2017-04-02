import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Mime } from "../../providers/mime";

import { FileOpener } from '@ionic-native/file-opener';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mime: Mime,
    public fileOpener: FileOpener
  ) {
    this.files = this.navParams.get("files");
    this.topic = this.navParams.get("topic");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicPage');
  }
  
  openFile(newRoot){
    if(newRoot['isFile']){
      console.log(newRoot);
      var mim = this.mime.getMime(newRoot['name']);
      if(mim == "boo")
        return;
      this.fileOpener.open(newRoot['nativeURL'], mim)
      .then(()=>
        console.log("file open")
      ).catch((err)=>
        console.log(err)
      );
    }
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SFM } from "../../providers/sfm";
import { OriginalPage } from '../original/original';
import { ContentPage } from '../content/content';
import { TimelinePage } from '../timeline/timeline';
import { FileTypePage } from "../file-type/file-type";
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
  files;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public ftp: FileTypePage,
    public sfm: SFM
  ) {
    this.types = this.sfm.getTypes();
    this.files = this.sfm.getFilesList();
    events.subscribe("file entry created", () => {
      this.types = this.sfm.getTypes();
      this.files = this.sfm.getFilesList();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypePage');
  }

  navigateToSubDir(type){
    var filesList = [];
    var num;
    for(num = 0; num < this.files.length; num++)
    {
      var fileType = this.files[num]['mime'].split("/")[0];
      if(fileType == type)
        filesList.push(this.files[num]);
    }
    this.navCtrl.push(
      FileTypePage,
      {
        files: filesList,
        type: type
      }
    );
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SFM } from "../../providers/sfm";

import { File } from '@ionic-native/file';
import { ContentPage } from '../content/content';
import { TimelinePage } from '../timeline/timeline';
import { TypePage } from '../type/type';

/*
  Generated class for the Original page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;

@Component({
  selector: 'page-original',
  templateUrl: 'original.html'
})
export class OriginalPage {
  current = null;
  files;
  root;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sfm: SFM,
    public file: File
  ) {
    this.root = this.navParams.get("root");
    console.log("curr root", this.root);
    if(this.root==null)
      this.getFilesList("test");
    else
      this.getFilesList(this.root);
    
    this.initFS();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OriginalPage');
  }
  
  initFS(){
    this.sfm.initFS();
  }

  navigateToSubDir(newRoot){
    console.log("new root", newRoot);
    this.navCtrl.push(OriginalPage,{
      root: newRoot
    });
  }

  getFilesList(root)
  {
    if(root[0]==="/")
      root = root.slice(1);
    this.file.listDir(cordova.file.externalRootDirectory, root).then(
      (currFiles) => {
        // do something
        console.log("pppp")
        console.log(currFiles);
        this.files = currFiles;
      }
    ).catch(
      (err) => {
        // do something
        console.log(err);
      }
    );
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

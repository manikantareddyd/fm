import { Component } from '@angular/core';
import { NavController, NavParams,  Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { SFM } from "../../providers/sfm";
import { FileOpener } from '@ionic-native/file-opener';
import { Mime } from "../../providers/mime";
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
    public mime: Mime,
    public events: Events,
    public file: File,
    public fileOpener: FileOpener
  ) {
    this.root = this.navParams.get("root");
    if(this.root==null)
      this.getFilesList("test");
    else
      this.getFilesList(this.root);
    
    events.subscribe("file entry created", () => {
      this.files = this.sfm.getFilesList();
    });
    this.initFS();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OriginalPage');
  }
  
  initFS(){
    this.sfm.initFS();
  }

  navigateToSubDir(newRoot){
    if(newRoot['isFile']){
      var mim = this.mime.getMime(newRoot['name']);
      if(mim == "misc")
        return;
      this.fileOpener.open(newRoot['nativeURL'], mim)
      .then(()=>
        console.log("file open")
      ).catch((err)=>
        console.log(err)
      );
    }
    else{
      newRoot = newRoot['fullPath'];
      this.navCtrl.push(OriginalPage,{
        root: newRoot
      });
    }
  }

  getFilesList(root)
  {
    if(root[0]==="/")
      root = root.slice(1);
    
    this.file.listDir(this.file.externalRootDirectory, root).then(
      (currFiles) => {
        var tmp = []
        console.log("curr files", currFiles);
        currFiles.forEach(element => {
          var ext = element['name'].split(".").pop();
          if(ext != "txt")
            tmp.push(element);
        });
        console.log("tmp", tmp);
        this.files = tmp;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
}

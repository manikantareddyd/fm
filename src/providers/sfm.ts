import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the SFM provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var cordova: any;

@Injectable()
export class SFM {
  KEY_FILES = 'st.files';
  files;
  constructor(
    public http: Http,
    public storage: Storage,
    public file: File
  ) {
    console.log('Hello SFM Provider');
  }

  /*
    Model 
    files = 
    [
      {
        key,
        name,
        extension,
        type,
        created,
        modified,
        topics = [
          "t1",
          "t2",
          "t3",
          ...
        ]
      },
      ...
    ]
  */
  generateFileKey(){
    var last = this.files.length - 1;
    var newKey = 0;
    if(last > -1)
      newKey = this.files[last]['key'] + 1;
    return newKey;
  }
  
  createFileEntry(file){
    let fileKey = this.generateFileKey();
    return fileKey;
  }

  getFilesList(){
    // this.file.listDir(cordova.file.externalRootDirectory, "Audio").then(
    //   (currFiles) => {
    //     // do something
    //     console.log("pppp")
    //     console.log(currFiles);
    //   }
    // ).catch(
    //   (err) => {
    //     // do something
    //     console.log(err);
    //   }
    // );
  }
}

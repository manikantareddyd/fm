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

  initFS(){
    this.traverseFS("test");
  }

  traverseFS(root){
    if(root[0]==="/")
      root = root.slice(1);
    this.file.listDir(cordova.file.externalRootDirectory, root).then(
      (currFiles) => {
        var num = 0;
        for(num = 0; num < currFiles.length; num++){
          if(currFiles[num]['isDirectory']){
            // If directory go inside
            this.traverseFS(currFiles[num]['fullPath'])
          }
          else{
            // If FIle add to db
            this.createFileEntry(currFiles[num]);
          }
        }
      }
    ).catch(
      (err) => {
        // do something
        console.log(err);
      }
    );
  }

  generateFileKey(){
    var last = this.files.length - 1;
    var newKey = 0;
    if(last > -1)
      newKey = this.files[last]['key'] + 1;
    return newKey;
  }
  
  createFileEntry(fileEntry){
    let fileKey = this.generateFileKey();
    var newFile;
    newFile = fileEntry;
    newFile['key'] = fileKey;
    this.files[fileKey] = newFile;
    this.storage.set(this.KEY_FILES, this.files);
    this.populateMetaData(fileKey);
  }

  populateMetaData(key){
    this.file.readAsText(cordova.file.externalRootDirectory, this.files[key]['fullPath'].slice(1)).then(
      (text) => {
        console.log(text);
        this.populateTopics(key, text); 
      }
    ).catch(
      (err) => {
        // do something
        console.log(err);
      }
    )
  }

  populateTopics(key, text){
    let headers = new Headers();
    headers.append("x-textrazor-key","b043156ea6a956b7b7cee9c9fdbead629578a609caace754ad13f958");
    headers.append("accept-encoding", "application/gzip");
    headers.append("content-type", "application/x-www-form-urlencoded");

    let data = {
      extractors: "topics",
      ""
    }
  }
}

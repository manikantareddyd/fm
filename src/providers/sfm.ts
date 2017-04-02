import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Mime } from "../providers/mime"
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
  KEY_TOPICS = 'st.topics';
  KEY_TYPES = 'st.types';
  files = [];
  topicsSet = new Set();
  types = new Set();
  constructor(
    public http: Http,
    public storage: Storage,
    public file: File,
    public events: Events,
    public mime: Mime
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
    this.storage.get(this.KEY_TOPICS).then((topicsSet) => {
        if(!topicsSet){
          this.topicsSet = new Set();
          this.storage.get(this.KEY_FILES).then((files) => {
              if(!files){
                this.files = [];
              }
              else{
                this.files = files;
              }
              this.traverseFS("test");
          })
        }
        else{
          this.topicsSet = new Set(topicsSet);
        }
        this.traverseFS("test");
      })
  }

  traverseFS(root){
    if(root[0]=="/")
      root = root.slice(1);
    this.file.listDir(this.file.externalRootDirectory, root).then(
      (currFiles) => 
      {
        var num = 0;
        for(num = 0; num < currFiles.length; num++)
        {
          if(currFiles[num]['isDirectory'])
          {
            // If directory go inside
            this.traverseFS(currFiles[num]['fullPath']);
          }
          else
          {
            // If FIle add to db
            this.createFileEntry(currFiles[num]);
          }
        }
      }
    ).catch(
      (err) => {
        console.log("traverse", err);
      }
    );
  }

  generateFileKey(){
    if(this.files != null)
      var last = this.files.length - 1;
    else
      return 0;
    var newKey = 0;
    if(last > -1)
      newKey = this.files[last]['key'] + 1;
    return newKey;
  }
  
  createFileEntry(fileEntry){
    // console.log("current file", fileEntry, "name", fileEntry['name']);
    var name = fileEntry['name'];
    var ext = name.split('.').pop();
    // console.log("1", name, ext);
    
    if(ext == "txt")
    {
      console.log("txt found");
      return;
    }
    else
    {
      var present = 0;
      this.files.forEach(element => {
        if(element['name'] == fileEntry['name'])
        {
          console.log("already in db");
          present = 1;
        }
      });
      if(present == 1)
      {
        console.log("already in db");
        return;
      }
      else
      {
        let fileKey = this.generateFileKey();
        var newFile = fileEntry;
        newFile['key'] = fileKey;
        newFile['mime'] = this.mime.getMime(newFile['name']);
        if(newFile['mime'] == "misc")
          this.types.add("misc")
        else
          this.types.add(newFile['mime'].split("/")[0]);
        this.storage.set(this.KEY_TYPES, this.types);
        
        this.files[fileKey] = newFile;
        this.storage.set(this.KEY_FILES, this.files);
        
        this.populateMetaData(fileKey);
        this.events.publish("file entry created");
      }
    }
  }

  populateMetaData(key){
    var filename = this.files[key]['fullPath'].slice(1);
    filename = filename.split(".");
    filename.pop();
    filename.push("txt");
    filename = filename.join(".");
    this.file.readAsText(this.file.externalRootDirectory, filename).then(
      (text) => {
        this.populateTopics(key, text);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  populateTopics(key, text){
    let headers = new Headers(
      {
        "x-textrazor-key": "b043156ea6a956b7b7cee9c9fdbead629578a609caace754ad13f958",
        "accept-encoding": "application/gzip",
        "content-type": "application/json"
      }
    );
    let content = "text=" + encodeURIComponent(text) + "&extractors=" + encodeURIComponent("topics");
    // this.sleep(1000);
    this.http.post('https://api.textrazor.com', content, {headers: headers})
    .subscribe(res => {
      var topics = res.json()['response']['topics'];
      var num, topicsArray = [];
      for(num = 0; num < 5; num++)
      {
        topicsArray[num] = topics[num]['label'];
        this.topicsSet.add(topics[num]['label']);
      }
      this.files[key]['topics'] = topicsArray;
      this.storage.set(this.KEY_FILES, this.files);
      this.storage.set(this.KEY_TOPICS, this.topicsSet);
    }, (err) => {
      console.log(err);
    });
  }

  getTopicsList(){
    return Array.from(this.topicsSet);
  }

  getFilesList(){
    return this.files;
  }

  getTypes(){
    return Array.from(this.types);
  }

  getTopics(){
    var promise = new Promise((resolve, reject) => {
      this.storage.get(this.KEY_TOPICS).then((topics) => {
        if(!topics){
          this.topicsSet = new Set();
        }
        else{
          this.topicsSet = new Set(topics);
        }
        resolve(this.getTopicsList());
      })
    })
    return promise;
  }
}

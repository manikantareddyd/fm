import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { OriginalPage } from '../pages/original/original';
import { ContentPage } from '../pages/content/content';
import { TimelinePage } from '../pages/timeline/timeline';
import { TypePage } from '../pages/type/type';
import { TopicPage } from '../pages/topic/topic';
import { SFM } from '../providers/sfm';
import { Mime } from '../providers/mime';
import { IonicStorageModule } from '@ionic/storage';
import { FileOpener } from '@ionic-native/file-opener';

import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OriginalPage,
    ContentPage,
    TimelinePage,
    TypePage,
    TopicPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OriginalPage,
    ContentPage,
    TimelinePage,
    TypePage,
    TopicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler,
    },
    SFM,
    Mime,
    File,
    FileOpener
  ]
})
export class AppModule {}

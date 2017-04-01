import { Component } from '@angular/core';

import { OriginalPage } from '../original/original';
import { ContentPage } from '../content/content';
import { TimelinePage } from '../timeline/timeline';
import { TypePage } from '../type/type';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  original: any = OriginalPage;
  content: any = ContentPage;
  timeline: any = TimelinePage;
  type: any = TypePage;
  constructor() {

  }
}

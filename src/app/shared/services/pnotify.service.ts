import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyDesktop from 'pnotify/dist/es/PNotifyDesktop';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  modules = {
    Buttons: {
      closer: true,
      sticker: true,
    },
    Animate: {
      animate: true,
      inClass: 'bounceInLeft',
      outClass: 'bounceOutRight'
    }
    // Desktop: {
    //   desktop: true
    // }
  };

  getPNotify() {
    PNotifyButtons;
    PNotifyDesktop;
    PNotifyStyleMaterial;
    PNotify.defaults.styling = 'material';
    PNotify.defaults.icons = 'material';
    PNotify.defaults.modules = this.modules;
    PNotify.defaults.delay = 2500;
    return PNotify;
  }
}

import { enableProdMode } from '@angular/core';
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
import 'localstorage-polyfill';

// https://stackoverflow.com/questions/52891992/referenceerror-xmlhttprequest-is-not-defined-when-running-my-angular-6-univers
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// https://blog.khophi.co/localstorage-undefined-angular-server-side-rendering/
global['localStorage'] = localStorage;
global['document'] = mock.getDocument();
global['window'] = mock.getWindow();

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';


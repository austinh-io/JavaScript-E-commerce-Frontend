import { app, appHTML } from './app.ts';
import './imports.ts';
import {
  initLightMode,
  initIconColorUpdateListener,
} from './utils/themeManager.ts';

app.id = 'app';
app.append(appHTML.content.cloneNode(true));

const appContent = app;

const documentBody = document.querySelector('body')!;
documentBody.classList.add('bg-gradient');

initLightMode();

documentBody.append(appContent);

initIconColorUpdateListener();

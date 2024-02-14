import { app, appHTML, initTesting } from './app.ts';
import './imports.ts';
import { initCatalog } from './utils/core/catalogManager.ts';
import {
  initLightMode,
  initIconColorUpdateListener,
} from './utils/ui/themeManager.ts';

initLightMode();
await initCatalog();
initTesting();

app.id = 'app';
app.append(appHTML.content.cloneNode(true));

const appContent = app;

const documentBody = document.querySelector('body')!;
documentBody.classList.add('bg-gradient');

documentBody.append(appContent);

initIconColorUpdateListener();

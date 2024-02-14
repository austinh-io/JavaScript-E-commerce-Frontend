import { app, appHTML } from './app.ts';
import './imports.ts';
import { initIconColorUpdateListener } from './utils/ui/themeManager.ts';

app.id = 'app';
app.append(appHTML.content.cloneNode(true));

const appContent = app;

const documentBody = document.querySelector('body')!;
documentBody.classList.add('bg-gradient');

documentBody.append(appContent);

initIconColorUpdateListener();

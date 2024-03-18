import { app } from './app.ts';
import './imports.ts';
import { initIconColorUpdateListener } from './utils/ui/themeManager.ts';

const appContent = app;

const documentBody = document.querySelector('body')!;

documentBody.classList.add('bg-gradient');

documentBody.append(appContent);

initIconColorUpdateListener();

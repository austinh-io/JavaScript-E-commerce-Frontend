import { initLightMode } from '../ui/themeManager';
import { initCatalog } from './catalogManager';

/***
 * TODO: Make this its own class named "app" or something. Then in my "app.ts" I can just instantiate
 * an instance of this (or make it static) and not have so much boilerplate going on the the app.ts file.
 *
 * Or perhaps if I do that then I could just get rid of the app.ts altogether and just use the main.ts
 *
 * Either way would save the eyesore of having the 10 imports I have on the app.ts file
 */

export async function initApp() {
  initLightMode();
  await initCatalog();
}

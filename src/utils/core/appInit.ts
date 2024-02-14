import { initLightMode } from '../ui/themeManager';
import { initCatalog } from './catalogManager';

export async function initApp() {
  initLightMode();
  await initCatalog();
}

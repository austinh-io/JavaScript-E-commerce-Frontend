import AppDrawer from '../components/overscreen_menus/AppDrawer';
import AppOverlay from '../components/overscreen_menus/AppOverlay';

export class OverlayMediator {
  private static _instance: OverlayMediator;
  private _drawers: { [key: string]: AppDrawer };
  private _overlay: AppOverlay;

  constructor(
    drawersValue: { [key: string]: AppDrawer },
    overlayValue: AppOverlay
  ) {
    this._drawers = drawersValue;
    this._overlay = overlayValue;
  }

  static getInstance() {
    if (!OverlayMediator._instance) {
      console.error('No instance of overlay mediator!');
    }
    return OverlayMediator._instance;
  }

  registerDrawers(drawers: { [key: string]: AppDrawer }) {
    this._drawers = drawers;
  }

  registerOverlay(overlay: AppOverlay) {
    this._overlay = overlay;
  }

  closeDrawer(drawerName: string) {
    this._drawers[drawerName].close();
    this._overlay.close();
  }

  closeOverlay() {
    this._overlay.close();
  }
}

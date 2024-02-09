import AppDrawer from '../components/overscreen_menus/AppDrawer';
import AppOverlay from '../components/overscreen_menus/AppOverlay';

export class DrawerOverlayManager {
  private static _drawers: Record<string, AppDrawer> = {};
  private static _openDrawers: Set<string> = new Set();
  private static _overlay: { [key: string]: AppOverlay } = {};

  static addDrawer(key: string, value: AppDrawer): void {
    this._drawers[key] = value;
  }

  static getDrawer(key: string): AppDrawer {
    return this._drawers[key];
  }

  static hasDrawer(key: string): boolean {
    return key in this._drawers;
  }

  static removeDrawer(key: string): boolean {
    if (this.hasDrawer(key)) {
      delete this._drawers[key];
      return true;
    }
    return false;
  }

  static getAllDrawers(): Record<string, AppDrawer> {
    return this._drawers;
  }

  static addOverlay(key: string, value: AppOverlay): void {
    this._overlay[key] = value;
  }

  static getOverlay(key: string): AppOverlay {
    return this._overlay[key];
  }

  static hasOverlay(key: string): boolean {
    return key in this._overlay;
  }

  static removeOverlay(key: string): boolean {
    if (this.hasOverlay(key)) {
      delete this._overlay[key];
      return true;
    }
    return false;
  }

  static openOverlay(key: string): void {
    this._overlay[key].open();
  }

  static closeDrawer(drawerName: string, overlay: string) {
    this._drawers[drawerName].close();
    this._overlay[overlay].close();
  }

  static closeOverlay(overlay: string) {
    if (this._openDrawers.size === 0) {
      this._overlay[overlay].close();
    }
  }

  static trackOpenDrawer(drawerName: string) {
    this._openDrawers.add(drawerName);
  }

  static removeOpenDrawer(drawerName: string) {
    this._openDrawers.delete(drawerName);
  }
}

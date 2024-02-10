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

  static getOverlay(): AppOverlay | undefined {
    const keys = Object.keys(this._overlay);
    if (keys.length === 0) {
      console.error('Overlay does not exist.');
      return undefined;
    } else {
      return this._overlay[keys[0]];
    }
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

  static openOverlay(): void {
    const keys = Object.keys(this._overlay);

    if (keys.length === 0) {
      console.error('Overlay does not exist.');
    } else {
      this._overlay[keys[0]].open();
    }
  }

  static closeDrawer(drawerName: string) {
    this._drawers[drawerName].close();
    this.closeOverlay();
  }

  static closeOverlay(): void {
    const keys = Object.keys(this._overlay);

    if (this._openDrawers.size === 0) {
      if (keys.length === 0) {
        console.error('Overlay does not exist.');
      } else {
        this._overlay[keys[0]].close();
      }
    }
  }

  static trackOpenDrawer(drawerName: string) {
    this._openDrawers.add(drawerName);
  }

  static removeOpenDrawer(drawerName: string) {
    this._openDrawers.delete(drawerName);
  }

  static isEmpty(obj: Object) {
    return Object.keys(obj).length === 0;
  }
}

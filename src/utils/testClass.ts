export class TestClass {
  private static store: Record<string, any> = {};

  static add(key: string, value: any): void {
    this.store[key] = value;
  }

  static get(key: string): any {
    return this.store[key];
  }

  static has(key: string): boolean {
    return key in this.store;
  }

  static remove(key: string): boolean {
    if (this.has(key)) {
      delete this.store[key];
      return true;
    }
    return false;
  }

  static getAll(): Record<string, any> {
    return this.store;
  }
}

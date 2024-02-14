import { ProductGroup } from '../../models/productGroup';

export class Catalog {
  private static _items: { [key: string]: ProductGroup } = {};

  static addItem(item: ProductGroup) {
    this._items[item.id] = item;
  }

  static removeItem(productId: string) {
    delete this._items[productId];
  }

  static getItem(productId: string): ProductGroup {
    return this._items[productId];
  }

  static getAllItems(): { [key: string]: ProductGroup } {
    return this._items;
  }

  // static setTestingItems() {
  //   this.addItem(new ProductGroup('0', 'Item 0', 'A nice item!', 4.99));
  //   this.addItem(new ProductGroup('1', 'Item 1', 'A nice item!', 6.9));
  //   this.addItem(new ProductGroup('2', 'Item 2', 'A nice item!', 2.49));
  //   this.addItem(new ProductGroup('3', 'Item 3', 'A nice item!', 17.99));
  //   this.addItem(new ProductGroup('4', 'Item 4', 'A nice item!', 10.99));
  //   this.addItem(new ProductGroup('5', 'Item 5', 'A nice item!', 9.99));
  //   this.addItem(new ProductGroup('6', 'Item 6', 'A nice item!', 135.94));
  // }
}

const productsJSONUrl = '../../../server/data/products.json';

async function loadJSONProducts(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON: ', error);
    return null;
  }
}

async function processData() {
  const productGroupsData = await loadJSONProducts(productsJSONUrl);

  if (productGroupsData) {
    return productGroupsData;
  } else {
    console.warn('Failed to load or parse product data.');
    return null;
  }
}

export async function initCatalog() {
  try {
    const productData = await processData();
    if (productData) {
      productData.forEach((pgData: any) => {
        const productGroup = new ProductGroup(
          pgData.id,
          pgData.name,
          pgData.description,
          pgData.price,
          pgData.variants
        );
        Catalog.addItem(productGroup);
      });
    }
  } catch (error) {
    console.error('Error initializing catalog:', error);
  }
}

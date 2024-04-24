import { ProductGroup } from '../../models/productGroup';
import { ProductVariant } from '../../models/productVariant';

export class Catalog {
  private static _productGroups: { [key: string]: ProductGroup } = {};

  static addGroup(item: ProductGroup) {
    this._productGroups[item.id] = item;
  }

  static removeGroup(productId: string) {
    delete this._productGroups[productId];
  }

  static getGroup(groupId: string): ProductGroup {
    return this._productGroups[groupId];
  }

  static getAllGroups(): { [key: string]: ProductGroup } {
    return this._productGroups;
  }

  static getVariant(groupId: string, variantId: string): ProductVariant {
    return this._productGroups[groupId].variants[variantId];
  }
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

// TODO: Move this somewhere else (like maybe the CatalogDisplay.ts component that I am not using)
export async function initCatalog() {
  try {
    const productData = await processData();
    if (productData) {
      productData.forEach((productGroupData: ProductGroup) => {
        const productGroup = new ProductGroup(
          productGroupData.id,
          productGroupData.name,
          productGroupData.description,
          productGroupData.price,
          productGroupData.variants
        );

        //Test log to see what comes up
        console.log(productGroupData.variants);

        Catalog.addGroup(productGroup);
      });
    }
  } catch (error) {
    console.error('Error initializing catalog:', error);
  }
}

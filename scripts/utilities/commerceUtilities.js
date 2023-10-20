'use strict';

const baseUrlLive = 'simple-ecommerce';
const baseUrlLocal = '.';
export const baseUrl = baseUrlLocal;
export let catalogProducts = new Array();

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function findItem(_itemList, _productId, _optionId) {
  return _itemList.find((item) => {
    if (item.productId == _productId && item.option.optionId == _optionId)
      return item;
  });
}

export async function catchProductList() {
  const response = await fetch(`${baseUrl}/data/products.json`);
  const productsObj = await response.json();
  catalogProducts = [...productsObj];
}

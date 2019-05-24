import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Product {
  id: number;
  cid: string;
  title: string;
  handle: string;
  description: string;
  categories: string;
  tags: string;
  images: {
    default: boolean;
    id: string;
    url: string;
    type: string;
  }[];
  priceTaxExcl: number;
  priceTaxIncl: number;
  taxRate: number;
  comparedPrice: number;
  quantity: number;
  sku: string;
  width: string;
  height: string;
  depth: string;
  weight: string;
  extraShippingFee: number;
  active: boolean;

  /**
   * Constructor
   *
   * @param product
   */
  constructor(product?) {
    product = product || {};
    this.id = product.id;
    this.cid = product.cid || FuseUtils.generateGUID();
    this.title = product.title || '';
    this.handle = product.handle || FuseUtils.handleize(this.title);
    this.description = product.description || '';
    this.categories = product.categories || '';
    this.tags = product.tags || '';
    this.images = product.images || [];
    this.priceTaxExcl = product.priceTaxExcl || 0;
    this.priceTaxIncl = product.priceTaxIncl || 0;
    this.taxRate = product.taxRate || 0;
    this.comparedPrice = product.comparedPrice || 0;
    this.quantity = product.quantity || 0;
    this.sku = product.sku || 0;
    this.width = product.width || 0;
    this.height = product.height || 0;
    this.depth = product.depth || 0;
    this.weight = product.weight || 0;
    this.extraShippingFee = product.extraShippingFee || 0;
    this.active = product.active || true;
  }

  /**
   * Add category
   *
   * @param {MatChipInputEvent} event
   */
  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add category
    if (value) {
      this.categories = this.categories + ',' + value;
      console.log(this.categories);
      // return this.categories;
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove category
   *
   * @param category
   */
  removeCategory(category): string {
    if (this.categories) {
      const category_list = this.categories.split(',');
      const index = category_list.indexOf(category);
      console.log(category_list);
      if (index >= 0) {
        category_list.splice(index, 1);
        this.categories = String(category_list);
        return this.categories;
      }
    } else {
      return '';
    }
  }

  /**
   * Add tag
   *
   * @param {MatChipInputEvent} event
   */
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if (value) {
      this.tags = this.tags + ',' + value;
      console.log(this.tags);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove tag
   *
   * @param tag
   */
  removeTag(tag): string {
    const tag_list = this.tags.split(',');
    const index = tag_list.indexOf(tag);

    if (index >= 0) {
      tag_list.splice(index, 1);
      this.tags = String(tag_list);
      return this.tags;
    }
  }
}

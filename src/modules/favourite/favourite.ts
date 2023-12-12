import { Component } from '../component';
import { Product } from '../product/product';
import html from './favourite.tpl.html';
//import { formatPrice } from '../../utils/helpers';
import { favService } from '../../services/favService';
import { ProductData } from 'types';

class Favourite extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favService.get();

    if (this.products.length < 1) {
      // this.view.root.classList.remove('disabled');
      // return;

      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: false });
      productComp.render();
      productComp.attach(this.view.cart);
    });
  }
}

export const favouriteComp = new Favourite(html);

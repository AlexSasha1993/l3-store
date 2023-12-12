import localforage from 'localforage';
import { ProductData } from 'types';

const Fav = '__wb-fav';

class FavService {
  async addFavorite(product: ProductData) {
    const favorites = await this.get();
    await this.set([...favorites, product]);
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(Fav)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(Fav, data);
  }
  async isInFav(product: ProductData) {
    const favProducts = await this.get();
    return favProducts.some(({ id }) => id === product.id);
  }
  // async clear() {
  //   await localforage.removeItem(Fav);
  // }
  // private async _updCounters() {
  //   const products = await this.get();
  //   const count = products.length >= 10 ? '9+' : products.length;

  //   //@ts-ignore
  //   document.querySelectorAll('.js__cart-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  // }
}

export const favService = new FavService();

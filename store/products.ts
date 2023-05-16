import { collection, doc, getDocs, getDoc, query } from 'firebase/firestore';
import { ref as firebaseRef, getDownloadURL } from 'firebase/storage';
import type { Product } from '@/types/product';

export const useProductsStore = defineStore('products', () => {
  const { db, storage } = useFirebase();
  const allProducts = ref<Product[]>();
  const singleProduct = ref<Product | object>();

  async function fetchAllProducts() {
    const items = [];
    const colRef = collection(db, 'products');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    allProducts.value = items;
  }

  async function fetchSingleProduct(productId: string) {
    const docRef = doc(db, 'products', productId);
    try {
      const docSnapshot = await getDoc(docRef);
      singleProduct.value = { ...docSnapshot.data(), id: docSnapshot.id };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  async function getImgUrl(imgSrc: string) {
    try {
      let downloadUrl = '';
      await getDownloadURL(firebaseRef(storage, imgSrc)).then((url) => {
        downloadUrl = url;
      });

      // console.log(downloadUrl);
      return downloadUrl;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  function setSingleProduct(productId: string) {
    if (allProducts.value) {
      const product = allProducts.value.find((product) => product.id === productId);
      singleProduct.value = product;
    }
  }

  return {
    allProducts,
    singleProduct,
    fetchAllProducts,
    fetchSingleProduct,
    getImgUrl,
    setSingleProduct,
  };
});

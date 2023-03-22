import { collection, doc, getDocs, getDoc, query } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  categories: string[];
}

export const useProductsStore = defineStore('products', () => {
  const { db } = useFirebase();
  const allProducts = ref<Product[]>();
  const singleProduct = ref<Product | object>({});

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

  return {
    allProducts,
    singleProduct,
    fetchAllProducts,
    fetchSingleProduct,
  };
});

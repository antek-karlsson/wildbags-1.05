import { initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function useFirebase() {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  async function getAllProducts() {
    const allProducts: DocumentData[] = [];
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((product) => {
      allProducts.push(product.data());
    });
    return allProducts;
  }

  async function getImageDownloadUrl(src: string): Promise<string> {
    let imgDownloadUrl = '';
    await getDownloadURL(ref(storage, src)).then((url) => (imgDownloadUrl = url));
    return Promise.resolve(imgDownloadUrl);
  }

  return {
    firebaseApp,
    db,
    storage,
    getAllProducts,
    getImageDownloadUrl,
  };
}

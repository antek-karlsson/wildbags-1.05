import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export function useFirebase() {
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

  async function getImageDownloadUrl(src: string): Promise<string> {
    let imgDownloadUrl = '';
    await getDownloadURL(ref(storage, src)).then((url) => (imgDownloadUrl = url));
    return Promise.resolve(imgDownloadUrl);
  }

  return {
    firebaseApp,
    db,
    storage,
    getImageDownloadUrl,
  };
}

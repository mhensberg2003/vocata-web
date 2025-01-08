export default function handler(req, res) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENTID,
    };
  
    if (!firebaseConfig.apiKey) {
      return res.status(500).json({ error: 'Firebase configuration not found' });
    }
  
    res.status(200).json(firebaseConfig);
  }
import { getFirestore, collection, query, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from './firebaseConfig';

let db = null;

export const saveChat = async (messages, language, topic) => {
  if (!db) await initializeFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User must be authenticated to save chats');
  }

  try {
    const chatData = {
      userId: user.uid,
      messages,
      language,
      topic,
      timestamp: new Date(),
      lastMessageAt: new Date()
    };

    const userChatsRef = collection(db, 'users', user.uid, 'chats');
    const docRef = await addDoc(userChatsRef, chatData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
};

export const getLastFiveChats = async () => {
  try {
    if (!db) {
      db = await initializeFirestore();
    }
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User must be authenticated to get chats');
    }

    const userChatsRef = collection(db, 'users', user.uid, 'chats');
    const q = query(
      userChatsRef,
      orderBy('lastMessageAt', 'desc'),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const chats = [];
    
    querySnapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return chats;
  } catch (error) {
    console.error('Error getting chats:', error);
    throw error;
  }
};
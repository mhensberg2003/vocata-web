import { getFirestore, collection, query, orderBy, limit, getDocs, addDoc, where, updateDoc } from 'firebase/firestore';
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
    const userChatsRef = collection(db, 'users', user.uid, 'chats');
    
    // Query for existing chat with same language and topic
    const q = query(
      userChatsRef,
      where('language', '==', language),
      where('topic', '==', topic)
    );
    
    const querySnapshot = await getDocs(q);
    
    const chatData = {
      userId: user.uid,
      messages,
      language,
      topic,
      lastMessageAt: new Date()
    };

    if (!querySnapshot.empty) {
      // Update existing chat
      const existingChat = querySnapshot.docs[0];
      await updateDoc(existingChat.ref, chatData);
      return existingChat.id;
    } else {
      // Create new chat
      chatData.timestamp = new Date(); // Only set timestamp for new chats
      const docRef = await addDoc(userChatsRef, chatData);
      return docRef.id;
    }
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
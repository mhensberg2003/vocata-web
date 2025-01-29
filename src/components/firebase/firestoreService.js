import { getFirestore, collection, query, orderBy, limit, getDocs, addDoc, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from './firebaseConfig';

let db = null;

export const saveChat = async (messages, language, topic) => {
  if (!db) {
    db = getFirestore();  // Changed from await initializeFirestore()
  }
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    console.error('No authenticated user found:', auth);
    throw new Error('User must be authenticated to save chats');
  }

  console.log('Attempting to save chat for user:', user.uid, 'Auth method:', user.providerData[0].providerId);

  try {
    const userChatsRef = collection(db, 'users', user.uid, 'chats');
    
    // Query for existing chat with same language and topic
    const existingChatQuery = query(
      userChatsRef,
      where('language', '==', language),
      where('topic', '==', topic)
    );
    
    const existingChatSnapshot = await getDocs(existingChatQuery);
    
    const chatData = {
      userId: user.uid,
      messages,
      language,
      topic,
      lastMessageAt: new Date()
    };

    // If this is an existing chat, just update it
    if (!existingChatSnapshot.empty) {
      const existingChat = existingChatSnapshot.docs[0];
      await updateDoc(existingChat.ref, chatData);
      console.log('Updated existing chat:', existingChat.id);
      return existingChat.id;
    }

    // If this is a new chat, check the total count first
    const allChatsQuery = query(
      userChatsRef,
      orderBy('lastMessageAt', 'desc')
    );
    
    const allChatsSnapshot = await getDocs(allChatsQuery);
    const totalChats = allChatsSnapshot.docs.length;
    console.log('Current total chats:', totalChats);

    // If at limit, delete the oldest chat before adding new one
    if (totalChats >= 5) {
      const oldestChat = allChatsSnapshot.docs[allChatsSnapshot.docs.length - 1];
      await deleteDoc(oldestChat.ref);
      console.log('Deleted oldest chat:', oldestChat.id);
    }

    // Now create the new chat
    chatData.timestamp = new Date();
    const docRef = await addDoc(userChatsRef, chatData);
    console.log('Created new chat:', docRef.id);
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

    console.log('Retrieved chats:', chats.length);
    console.log('Chat details:', chats.map(chat => ({
      id: chat.id,
      language: chat.language,
      topic: chat.topic,
      lastMessageAt: chat.lastMessageAt
    })));

    return chats;
  } catch (error) {
    console.error('Error getting chats:', error);
    throw error;
  }
};
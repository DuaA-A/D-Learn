import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5vt4dI99N8xPul7vrZO7485LcDgm1JY0',
  authDomain: 'd-learn-d6f04.firebaseapp.com',
  projectId: 'd-learn-d6f04',
  storageBucket: 'd-learn-d6f04.firebasestorage.app',
  messagingSenderId: '937427028335',
  appId: '1:937427028335:web:64e5944fde3dd54191809a'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function purgeDummy() {
  console.log('--- PURGING DUMMY STUDENTS & RESULTS ---');

  // 1. Delete dummy users (ID starting with std_ or email @student.d-learn.com)
  const usersSnap = await getDocs(collection(db, 'users'));
  let deletedUsers = 0;
  for (const d of usersSnap.docs) {
    const data = d.data();
    if (d.id.startsWith('std_') || (data.email && data.email.includes('@student.d-learn.com'))) {
      await deleteDoc(doc(db, 'users', d.id));
      console.log(`Deleted dummy user: ${data.displayName} (${d.id})`);
      deletedUsers++;
    }
  }

  // 2. Delete dummy assessment submissions
  const resultsSnap = await getDocs(collection(db, 'assessment_results'));
  let deletedResults = 0;
  for (const d of resultsSnap.docs) {
    const data = d.data();
    if (data.userId && data.userId.startsWith('std_')) {
      await deleteDoc(doc(db, 'assessment_results', d.id));
      console.log(`Deleted dummy submission: ${data.userName} - ${data.lessonId}`);
      deletedResults++;
    }
  }

  console.log(`Finished: ${deletedUsers} dummy users deleted, ${deletedResults} dummy submissions deleted.`);
}

purgeDummy().catch(console.error);

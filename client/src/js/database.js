import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
    // Create connection to database
    const contactDb = await openDB('jate', 1);
    // Create transaction
    const tx = contactDb.transaction('jate', 'readwrite');
    // Open up object store
    const store = tx.objectStore('jate');
    // Use PUT method to pass in the content
    const request = store.put({ id: 1, value: content });
    // Confirmation of request
    const result = await request;
    console.log('Data saved to database', result);
};



export const getDb = async () => {
  console.log('GET from database');
  // Create connection to database
  const contactDb = await openDB('jate', 1);
  // Create transaction
  const tx = contactDb.transaction('jate', 'readonly');
  // Open up object store
  const store = tx.objectStore('jate');
  // Use getAll method to get all data
  const request = store.getAll();
  // Confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Start the DB
initdb();
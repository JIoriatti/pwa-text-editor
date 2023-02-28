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


export const putDb = async (content) => {
 try{
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({content: content});
  const result = await request;
  if(result){
    console.log('Content saved to Jate database.')
  }
  else{
    console.log('Error adding content to Jate database');
  }

 }catch(err){
  console.log(err);
 }
}


export const getDb = async () => {
  try{
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
  
    if(request){
      console.log('Content retrieved from Jate database: ', request)
    }
    else{
      console.log('Error retrieving data from Jate database.')
    }
  }catch(err){
    console.log(err)
  }

}

initdb();

import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Credential, InquiryMessage, BookItem } from '../types';
import { Megaproject, SIGNATURE_WORKS } from '../data/projectsData';
import { CREDENTIALS } from '../data/profileData';
import { BOOKS_AND_PUBLICATIONS } from '../data/booksData';

const CREDENTIALS_COLLECTION = 'credentials';
const PROJECTS_COLLECTION = 'projects';
const INQUIRIES_COLLECTION = 'inquiries';
const BOOKS_COLLECTION = 'books';

/**
 * Seed initial portfolio items from static catalog into Firestore
 * if the collections have not been initialized yet.
 */
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const credSnap = await getDocs(collection(db, CREDENTIALS_COLLECTION));
    if (credSnap.empty) {
      console.log('Seeding initial credentials to Firestore...');
      for (const cred of CREDENTIALS) {
        await setDoc(doc(db, CREDENTIALS_COLLECTION, cred.id), {
          ...cred,
          updatedAt: new Date().toISOString()
        });
      }
    }

    const projSnap = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (projSnap.empty) {
      console.log('Seeding initial projects to Firestore...');
      for (const proj of SIGNATURE_WORKS) {
        await setDoc(doc(db, PROJECTS_COLLECTION, proj.id), {
          ...proj,
          updatedAt: new Date().toISOString()
        });
      }
    }

    const bookSnap = await getDocs(collection(db, BOOKS_COLLECTION));
    if (bookSnap.empty) {
      console.log('Seeding initial books to Firestore...');
      for (const book of BOOKS_AND_PUBLICATIONS) {
        await setDoc(doc(db, BOOKS_COLLECTION, book.id), {
          ...book,
          updatedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.warn('Initial Firestore seed skipped or unauthenticated:', err);
  }
}

// ---------------- Real-time Listeners ---------------- //

export function subscribeToCredentials(
  onUpdate: (credentials: Credential[]) => void,
  onError?: (error: Error) => void
) {
  const q = collection(db, CREDENTIALS_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(CREDENTIALS);
      } else {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as Credential[];
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Credentials subscription falling back to local dataset:', err);
      onUpdate(CREDENTIALS);
      if (onError) onError(err);
    }
  );
}

export function subscribeToProjects(
  onUpdate: (projects: Megaproject[]) => void,
  onError?: (error: Error) => void
) {
  const q = collection(db, PROJECTS_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(SIGNATURE_WORKS);
      } else {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as Megaproject[];
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Projects subscription falling back to local dataset:', err);
      onUpdate(SIGNATURE_WORKS);
      if (onError) onError(err);
    }
  );
}

export function subscribeToInquiries(
  onUpdate: (inquiries: InquiryMessage[]) => void,
  onError?: (error: Error) => void
) {
  const q = collection(db, INQUIRIES_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as InquiryMessage[];
      onUpdate(items);
    },
    (err) => {
      console.warn('Inquiries subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export function subscribeToBooks(
  onUpdate: (books: BookItem[]) => void,
  onError?: (error: Error) => void
) {
  const q = collection(db, BOOKS_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(BOOKS_AND_PUBLICATIONS);
      } else {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as BookItem[];
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Books subscription falling back to local dataset:', err);
      onUpdate(BOOKS_AND_PUBLICATIONS);
      if (onError) onError(err);
    }
  );
}

// ---------------- CRUD Operations: Credentials ---------------- //

export async function addCredentialItem(cred: Omit<Credential, 'id'> & { id?: string }): Promise<string> {
  const credId = cred.id || `cred-${Date.now()}`;
  const docRef = doc(db, CREDENTIALS_COLLECTION, credId);
  const data = {
    ...cred,
    id: credId,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, data);
  return credId;
}

export async function updateCredentialItem(id: string, updates: Partial<Credential>): Promise<void> {
  const docRef = doc(db, CREDENTIALS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteCredentialItem(id: string): Promise<void> {
  const docRef = doc(db, CREDENTIALS_COLLECTION, id);
  await deleteDoc(docRef);
}

// ---------------- CRUD Operations: Projects ---------------- //

export async function addProjectItem(proj: Omit<Megaproject, 'id'> & { id?: string }): Promise<string> {
  const projId = proj.id || `proj-${Date.now()}`;
  const docRef = doc(db, PROJECTS_COLLECTION, projId);
  const data = {
    ...proj,
    id: projId,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, data);
  return projId;
}

export async function updateProjectItem(id: string, updates: Partial<Megaproject>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteProjectItem(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// ---------------- CRUD Operations: Inquiries ---------------- //

export async function submitInquiryToFirestore(inquiry: Omit<InquiryMessage, 'id'>): Promise<string> {
  const colRef = collection(db, INQUIRIES_COLLECTION);
  const res = await addDoc(colRef, {
    ...inquiry,
    status: 'new',
    createdAt: new Date().toISOString()
  });
  return res.id;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'reviewed' | 'archived'): Promise<void> {
  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  await updateDoc(docRef, { status });
}

export async function deleteInquiryItem(id: string): Promise<void> {
  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  await deleteDoc(docRef);
}

// ---------------- CRUD Operations: Books ---------------- //

export async function addBookItem(book: Omit<BookItem, 'id'> & { id?: string }): Promise<string> {
  const bookId = book.id || `book-${Date.now()}`;
  const docRef = doc(db, BOOKS_COLLECTION, bookId);
  const data = {
    ...book,
    id: bookId,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, data);
  return bookId;
}

export async function updateBookItem(id: string, updates: Partial<BookItem>): Promise<void> {
  const docRef = doc(db, BOOKS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteBookItem(id: string): Promise<void> {
  const docRef = doc(db, BOOKS_COLLECTION, id);
  await deleteDoc(docRef);
}

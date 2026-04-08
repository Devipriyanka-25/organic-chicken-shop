import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('organmeat');
    
    cachedClient = client;
    cachedDb = db;

    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection('users');
}

export async function getOrdersCollection() {
  const db = await getDatabase();
  return db.collection('orders');
}

export async function getPasswordResetTokensCollection() {
  const db = await getDatabase();
  return db.collection('passwordResetTokens');
}

export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

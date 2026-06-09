import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    logger.warn('database.skipped', { reason: 'MONGODB_URI is not set' });
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info('database.connected', { uri: mongoUri.replace(/:[^:@]+@/, ':***@') });
  } catch (error) {
    logger.error('database.connection_failed', { error: (error as Error).message });
    throw error;
  }
}

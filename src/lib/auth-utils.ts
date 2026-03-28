import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Password verification
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token (simple version)
export function generateToken(userId: string, email: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  );
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const signature = btoa(
    crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('hex')
  );
  return `${header}.${payload}.${signature}`;
}

// Verify JWT token
export function verifyToken(token: string): { sub: string; email: string } | null {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const [header, payload, signature] = token.split('.');
    
    // Verify signature
    const verifySignature = btoa(
      crypto
        .createHmac('sha256', secret)
        .update(`${header}.${payload}`)
        .digest('hex')
    );

    if (signature !== verifySignature) {
      return null;
    }

    const decoded = JSON.parse(atob(payload));
    
    // Check expiration
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return { sub: decoded.sub, email: decoded.email };
  } catch (error) {
    return null;
  }
}

// User type
export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
}

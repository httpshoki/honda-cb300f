// src/lib/auth.ts
// Utilitário para autenticação e gerenciamento de sessão

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { UserModel } from './models/user';

// Chave secreta para JWT (em produção, deve ser uma variável de ambiente)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'honda_cb300f_twister_maintenance_app_secret_key'
);

// Interface para payload do token JWT
interface JWTPayload {
  userId: number;
  username: string;
  exp: number;
}

// Duração do token em segundos (1 dia)
const TOKEN_DURATION = 60 * 60 * 24;

// Função para criar um token JWT
export async function createToken(userId: number, username: string): Promise<string> {
  const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_DURATION;
  
  const token = await new SignJWT({ userId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirationTime)
    .setIssuedAt()
    .sign(JWT_SECRET);
  
  return token;
}

// Função para verificar um token JWT
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error('Erro ao verificar token JWT:', error);
    return null;
  }
}

// Função para definir o cookie de autenticação
export function setAuthCookie(token: string): void {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: TOKEN_DURATION
  });
}

// Função para remover o cookie de autenticação
export function removeAuthCookie(): void {
  cookies().delete('auth_token');
}

// Função para obter o usuário atual a partir do cookie
export async function getCurrentUser(): Promise<{ userId: number; username: string } | null> {
  const authCookie = cookies().get('auth_token');
  
  if (!authCookie) {
    return null;
  }
  
  const payload = await verifyToken(authCookie.value);
  
  if (!payload) {
    removeAuthCookie();
    return null;
  }
  
  return {
    userId: payload.userId,
    username: payload.username
  };
}

// Função para autenticar um usuário
export async function authenticateUser(username: string, password: string): Promise<string | null> {
  const user = await UserModel.verifyCredentials(username, password);
  
  if (!user || !user.id) {
    return null;
  }
  
  const token = await createToken(user.id, user.username);
  setAuthCookie(token);
  
  return token;
}

// Função para fazer logout
export function logout(): void {
  removeAuthCookie();
}

// src/middleware.ts
// Middleware para proteção de rotas e autenticação

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Rotas públicas que não precisam de autenticação
const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  // Obter o token do cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith('/api/auth/')
  );
  
  // Se for uma rota de API que não seja de autenticação, verificar token
  if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.startsWith('/api/auth/')) {
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
    }
    
    return NextResponse.next();
  }
  
  // Para rotas de página (não API)
  if (!isPublicRoute) {
    // Se não houver token, redirecionar para login
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // Verificar se o token é válido
    const payload = await verifyToken(token);
    if (!payload) {
      // Se o token for inválido, limpar o cookie e redirecionar para login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  } else if (isPublicRoute && token) {
    // Se estiver tentando acessar uma rota pública com token válido (ex: página de login)
    // Verificar se o token é válido
    const payload = await verifyToken(token);
    
    // Se o token for válido, redirecionar para a página inicial
    if (payload && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configurar quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    // Aplicar a todas as rotas exceto arquivos estáticos e favicon
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

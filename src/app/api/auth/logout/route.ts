// src/app/api/auth/logout/route.ts
// API para logout de usuários

import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    logout();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar logout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

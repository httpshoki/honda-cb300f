"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TestResults from "@/components/test-results";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  
  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testes do Sistema</h1>
        <Button variant="outline" onClick={() => router.push("/")}>
          Voltar para o Início
        </Button>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Validação de Integração</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Execute os testes para verificar se todos os componentes do sistema estão funcionando corretamente.
            </p>
          </div>
          <div className="p-6">
            <TestResults />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Instruções para Deploy</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Deploy no Netlify</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Faça login na sua conta do Netlify</li>
                <li>Clique em "New site from Git"</li>
                <li>Conecte sua conta do GitHub e selecione o repositório</li>
                <li>Configure as variáveis de ambiente:
                  <ul className="list-disc pl-5 mt-2">
                    <li><code>JWT_SECRET</code>: Uma string aleatória e segura para tokens JWT</li>
                  </ul>
                </li>
                <li>Clique em "Deploy site"</li>
              </ol>
              
              <h3 className="text-lg font-medium mt-6">Deploy no Vercel</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Faça login na sua conta do Vercel</li>
                <li>Clique em "New Project"</li>
                <li>Importe o repositório do GitHub</li>
                <li>Configure as variáveis de ambiente:
                  <ul className="list-disc pl-5 mt-2">
                    <li><code>JWT_SECRET</code>: Uma string aleatória e segura para tokens JWT</li>
                  </ul>
                </li>
                <li>Clique em "Deploy"</li>
              </ol>
              
              <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mt-6">
                <p className="font-medium">Importante:</p>
                <p>Após o deploy, acesse o sistema e crie sua conta de administrador. Por segurança, o sistema permite apenas uma conta de administrador.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

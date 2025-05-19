import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Sistema de Gerenciamento de Manutenção
          </h1>
          <h2 className="text-2xl font-semibold mb-8">Honda CB300F Twister</h2>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Próximas Manutenções</h3>
              <p className="text-gray-600 dark:text-gray-300">Visualize as próximas manutenções programadas para sua moto.</p>
              <Button className="mt-4" asChild>
                <Link href="/manutencoes">Ver Manutenções</Link>
              </Button>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Histórico</h3>
              <p className="text-gray-600 dark:text-gray-300">Acesse o histórico completo de manutenções realizadas.</p>
              <Button className="mt-4" asChild>
                <Link href="/historico">Ver Histórico</Link>
              </Button>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Dados da Moto</h3>
              <p className="text-gray-600 dark:text-gray-300">Gerencie as informações da sua Honda CB300F Twister.</p>
              <Button className="mt-4" asChild>
                <Link href="/moto">Gerenciar Dados</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Status Atual</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span>Quilometragem Atual:</span>
                <span className="font-semibold">0 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Próxima Revisão:</span>
                <span className="font-semibold text-yellow-600">1.000 km (Primeira Revisão)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Próxima Troca de Óleo:</span>
                <span className="font-semibold text-green-600">3.000 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status Geral:</span>
                <span className="font-semibold text-green-600">Em dia</span>
              </div>
            </div>
            <Button className="mt-6 w-full" variant="outline">
              Atualizar Quilometragem
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

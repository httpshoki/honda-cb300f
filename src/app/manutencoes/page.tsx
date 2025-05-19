import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ManutencoesPage() {
  // Dados simulados para demonstração
  const proximasManutencoes = [
    {
      id: 1,
      tipo: "Troca de Óleo",
      quilometragem: 3000,
      status: "Pendente",
      prioridade: "Média",
      descricao: "Trocar óleo do motor 10W30 Pro Honda"
    },
    {
      id: 2,
      tipo: "Primeira Revisão",
      quilometragem: 1000,
      status: "Pendente",
      prioridade: "Alta",
      descricao: "Revisão completa conforme manual do fabricante"
    },
    {
      id: 3,
      tipo: "Verificação da Corrente",
      quilometragem: 500,
      status: "Pendente",
      prioridade: "Baixa",
      descricao: "Verificar tensão e lubrificação da corrente"
    }
  ];

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Próximas Manutenções</h1>
        <Button asChild>
          <Link href="/manutencoes/nova">Registrar Nova Manutenção</Link>
        </Button>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quilometragem Atual</h2>
            <Button variant="outline" size="sm">Atualizar</Button>
          </div>
          <div className="text-3xl font-bold">0 km</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Manutenções Programadas</h2>
        </div>
        <div className="divide-y">
          {proximasManutencoes.map((manutencao) => (
            <div key={manutencao.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">{manutencao.tipo}</h3>
                <p className="text-gray-600 dark:text-gray-300">{manutencao.descricao}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium mr-2">Quilometragem:</span>
                  <span className="text-sm">{manutencao.quilometragem} km</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  manutencao.prioridade === "Alta" 
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                    : manutencao.prioridade === "Média"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}>
                  {manutencao.prioridade}
                </div>
                <Button size="sm" variant="outline">Marcar como Concluída</Button>
                <Button size="sm" variant="outline">Detalhes</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Tabela de Manutenção Recomendada</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Baseada no manual do fabricante para Honda CB300F Twister
          </p>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-center">1.000 km</th>
                <th className="p-3 text-center">3.000 km</th>
                <th className="p-3 text-center">6.000 km</th>
                <th className="p-3 text-center">12.000 km</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Óleo do Motor</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">T</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Filtro de Óleo</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">-</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">T</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Vela de Ignição</td>
                <td className="p-3 text-center">V</td>
                <td className="p-3 text-center">-</td>
                <td className="p-3 text-center">V</td>
                <td className="p-3 text-center">T</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Corrente de Transmissão</td>
                <td className="p-3 text-center">V/L</td>
                <td className="p-3 text-center">V/L</td>
                <td className="p-3 text-center">V/L</td>
                <td className="p-3 text-center">V/L</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Filtro de Ar</td>
                <td className="p-3 text-center">V</td>
                <td className="p-3 text-center">-</td>
                <td className="p-3 text-center">T</td>
                <td className="p-3 text-center">T</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Legenda: V = Verificar, L = Limpar, T = Trocar</p>
          </div>
        </div>
      </div>
    </main>
  );
}

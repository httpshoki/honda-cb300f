import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HistoricoPage() {
  // Dados simulados para demonstração
  const historicoManutencoes = [
    {
      id: 1,
      tipo: "Troca de Óleo",
      data: "15/03/2025",
      quilometragem: 3000,
      custo: "R$ 120,00",
      observacoes: "Óleo 10W30 Pro Honda"
    },
    {
      id: 2,
      tipo: "Revisão Completa",
      data: "10/01/2025",
      quilometragem: 1000,
      custo: "R$ 350,00",
      observacoes: "Primeira revisão obrigatória"
    },
    {
      id: 3,
      tipo: "Ajuste de Corrente",
      data: "05/12/2024",
      quilometragem: 500,
      custo: "R$ 50,00",
      observacoes: "Ajuste e lubrificação"
    }
  ];

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Histórico de Manutenções</h1>
        <Button asChild>
          <Link href="/manutencoes/nova">Registrar Nova Manutenção</Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Manutenções Realizadas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Quilometragem</th>
                <th className="p-3 text-left">Custo</th>
                <th className="p-3 text-left">Observações</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {historicoManutencoes.map((manutencao) => (
                <tr key={manutencao.id} className="border-t">
                  <td className="p-3 font-medium">{manutencao.tipo}</td>
                  <td className="p-3">{manutencao.data}</td>
                  <td className="p-3">{manutencao.quilometragem} km</td>
                  <td className="p-3">{manutencao.custo}</td>
                  <td className="p-3">{manutencao.observacoes}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline">Detalhes</Button>
                      <Button size="sm" variant="outline">Editar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Estatísticas</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span>Total de manutenções:</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Custo total:</span>
                <span className="font-semibold">R$ 520,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Média de custo por manutenção:</span>
                <span className="font-semibold">R$ 173,33</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Última manutenção:</span>
                <span className="font-semibold">15/03/2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Gráfico de Custos</h2>
          </div>
          <div className="p-6 flex items-center justify-center h-64">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>Gráfico de custos será exibido aqui</p>
              <p className="text-sm mt-2">Implementação futura com Recharts</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

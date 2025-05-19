import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MotoPage() {
  // Dados simulados para demonstração
  const dadosMoto = {
    modelo: "Honda CB300F Twister",
    ano: "2025",
    placa: "ABC-1234",
    chassi: "9C2NC4310FR123456",
    dataCompra: "01/01/2025",
    quilometragemAtual: 0,
    ultimaAtualizacao: "23/04/2025"
  };

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dados da Moto</h1>
        <Button asChild variant="outline">
          <Link href="/moto/editar">Editar Dados</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Informações Gerais</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2">
                <span className="font-medium">Modelo:</span>
                <span>{dadosMoto.modelo}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Ano:</span>
                <span>{dadosMoto.ano}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Placa:</span>
                <span>{dadosMoto.placa}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Chassi:</span>
                <span>{dadosMoto.chassi}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Data de Compra:</span>
                <span>{dadosMoto.dataCompra}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Quilometragem</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="text-4xl font-bold mb-2">{dadosMoto.quilometragemAtual} km</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Última atualização: {dadosMoto.ultimaAtualizacao}
              </div>
            </div>
            <Button className="w-full">Atualizar Quilometragem</Button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Especificações Técnicas</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid grid-cols-2">
              <span className="font-medium">Motor:</span>
              <span>291,6 cc, 4 tempos, DOHC</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Potência:</span>
              <span>24,5 cv a 7.500 rpm</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Torque:</span>
              <span>2,8 kgf.m a 6.000 rpm</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Transmissão:</span>
              <span>6 velocidades</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Sistema de Partida:</span>
              <span>Elétrica</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Tanque:</span>
              <span>14,1 litros</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Óleo Recomendado:</span>
              <span>10W30 Pro Honda</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Capacidade de Óleo:</span>
              <span>1,7 litros</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Documentos e Lembretes</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">IPVA:</span>
              <div className="flex items-center">
                <span className="mr-2">Vencimento: Janeiro/2026</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Em dia
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Licenciamento:</span>
              <div className="flex items-center">
                <span className="mr-2">Vencimento: Dezembro/2025</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Em dia
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Seguro:</span>
              <div className="flex items-center">
                <span className="mr-2">Vencimento: Janeiro/2026</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Em dia
                </span>
              </div>
            </div>
          </div>
          <Button className="mt-6" variant="outline">Adicionar Lembrete</Button>
        </div>
      </div>
    </main>
  );
}

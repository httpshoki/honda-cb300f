import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NovaManutencaoPage() {
  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Registrar Nova Manutenção</h1>
        <Button variant="outline" asChild>
          <Link href="/manutencoes">Voltar</Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Detalhes da Manutenção</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                  Tipo de Manutenção
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="troca-oleo">Troca de Óleo</option>
                  <option value="revisao">Revisão Completa</option>
                  <option value="filtro-ar">Troca de Filtro de Ar</option>
                  <option value="vela">Troca de Vela</option>
                  <option value="corrente">Ajuste/Lubrificação de Corrente</option>
                  <option value="freios">Manutenção de Freios</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium mb-1">
                  Data da Manutenção
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="quilometragem" className="block text-sm font-medium mb-1">
                  Quilometragem
                </label>
                <input
                  type="number"
                  id="quilometragem"
                  name="quilometragem"
                  placeholder="0"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="custo" className="block text-sm font-medium mb-1">
                  Custo (R$)
                </label>
                <input
                  type="number"
                  id="custo"
                  name="custo"
                  placeholder="0,00"
                  step="0.01"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="pecas" className="block text-sm font-medium mb-1">
                  Peças Substituídas
                </label>
                <input
                  type="text"
                  id="pecas"
                  name="pecas"
                  placeholder="Ex: Óleo 10W30, Filtro de óleo, etc."
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="local" className="block text-sm font-medium mb-1">
                  Local de Serviço
                </label>
                <input
                  type="text"
                  id="local"
                  name="local"
                  placeholder="Ex: Concessionária Honda, Oficina particular, etc."
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="observacoes" className="block text-sm font-medium mb-1">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  rows={4}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Detalhes adicionais sobre a manutenção..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/manutencoes">Cancelar</Link>
              </Button>
              <Button type="submit">Salvar Manutenção</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MaintenanceType } from "@/lib/models/maintenance-type";

interface MaintenanceFormProps {
  onComplete?: () => void;
}

export default function MaintenanceForm({ onComplete }: MaintenanceFormProps) {
  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);
  const [formData, setFormData] = useState({
    maintenance_type_id: "",
    date: new Date().toISOString().split("T")[0],
    mileage: 0,
    cost: "",
    parts_replaced: "",
    service_provider: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Carregar tipos de manutenção
  useEffect(() => {
    const fetchMaintenanceTypes = async () => {
      try {
        const response = await fetch("/api/maintenance-types");
        if (!response.ok) {
          throw new Error("Falha ao carregar tipos de manutenção");
        }
        const data = await response.json();
        setMaintenanceTypes(data);
      } catch (err) {
        console.error("Erro ao carregar tipos de manutenção:", err);
        setError("Não foi possível carregar os tipos de manutenção");
      }
    };

    fetchMaintenanceTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "maintenance_type_id" || name === "mileage" ? parseInt(value) || "" : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      // Validar campos obrigatórios
      if (!formData.maintenance_type_id || !formData.date || !formData.mileage) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao registrar manutenção");
      }

      setSuccess(true);
      
      // Resetar formulário
      setFormData({
        maintenance_type_id: "",
        date: new Date().toISOString().split("T")[0],
        mileage: 0,
        cost: "",
        parts_replaced: "",
        service_provider: "",
        notes: ""
      });
      
      // Chamar callback se fornecido
      if (onComplete) {
        onComplete();
      }
      
      // Atualizar a página após um breve delay
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar manutenção");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Manutenção registrada com sucesso!
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="maintenance_type_id" className="block text-sm font-medium mb-1">
            Tipo de Manutenção *
          </label>
          <select
            id="maintenance_type_id"
            name="maintenance_type_id"
            value={formData.maintenance_type_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Selecione o tipo</option>
            {maintenanceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Data da Manutenção *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="mileage" className="block text-sm font-medium mb-1">
            Quilometragem *
          </label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="0"
            required
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="cost" className="block text-sm font-medium mb-1">
            Custo (R$)
          </label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="0,00"
            step="0.01"
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="parts_replaced" className="block text-sm font-medium mb-1">
            Peças Substituídas
          </label>
          <input
            type="text"
            id="parts_replaced"
            name="parts_replaced"
            value={formData.parts_replaced}
            onChange={handleChange}
            placeholder="Ex: Óleo 10W30, Filtro de óleo, etc."
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="service_provider" className="block text-sm font-medium mb-1">
            Local de Serviço
          </label>
          <input
            type="text"
            id="service_provider"
            name="service_provider"
            value={formData.service_provider}
            onChange={handleChange}
            placeholder="Ex: Concessionária Honda, Oficina particular, etc."
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Observações
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Detalhes adicionais sobre a manutenção..."
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Manutenção"}
        </Button>
      </div>
    </form>
  );
}

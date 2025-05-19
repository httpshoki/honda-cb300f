"use client";

import { useEffect, useState } from "react";
import { MaintenanceRecordWithType } from "@/lib/models/maintenance-record";

interface MaintenanceHistoryProps {
  className?: string;
}

export default function MaintenanceHistory({ className }: MaintenanceHistoryProps) {
  const [records, setRecords] = useState<MaintenanceRecordWithType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/maintenance");
        if (!response.ok) {
          throw new Error("Falha ao carregar registros de manutenção");
        }
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        console.error("Erro ao carregar registros de manutenção:", err);
        setError("Não foi possível carregar o histórico de manutenções");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaintenanceRecords();
  }, []);

  if (isLoading) {
    return <div className={`p-6 ${className}`}>Carregando histórico de manutenções...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-100 border border-red-400 text-red-700 rounded ${className}`}>
        {error}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className={`text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <p className="text-gray-600 dark:text-gray-300">Nenhum registro de manutenção encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-3 text-left">Tipo</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Quilometragem</th>
            <th className="p-3 text-left">Custo</th>
            <th className="p-3 text-left">Observações</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="p-3 font-medium">{record.type_name}</td>
              <td className="p-3">{new Date(record.date).toLocaleDateString('pt-BR')}</td>
              <td className="p-3">{record.mileage} km</td>
              <td className="p-3">{record.cost ? `R$ ${record.cost.toFixed(2)}` : '-'}</td>
              <td className="p-3">{record.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

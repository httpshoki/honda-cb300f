"use client";

import { useEffect, useState } from "react";
import { MaintenanceRecordWithType } from "@/lib/models/maintenance-record";

interface MaintenanceStatsProps {
  className?: string;
}

export default function MaintenanceStats({ className }: MaintenanceStatsProps) {
  const [stats, setStats] = useState({
    totalCount: 0,
    totalCost: 0,
    averageCost: 0,
    lastMaintenanceDate: null as string | null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error("Falha ao carregar estatísticas");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
        setError("Não foi possível carregar as estatísticas de manutenção");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className={`p-6 ${className}`}>Carregando estatísticas...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-100 border border-red-400 text-red-700 rounded ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${className}`}>
      <div className="flex justify-between items-center">
        <span>Total de manutenções:</span>
        <span className="font-semibold">{stats.totalCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Custo total:</span>
        <span className="font-semibold">
          {stats.totalCost ? `R$ ${stats.totalCost.toFixed(2)}` : 'R$ 0,00'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Média de custo por manutenção:</span>
        <span className="font-semibold">
          {stats.averageCost ? `R$ ${stats.averageCost.toFixed(2)}` : 'R$ 0,00'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Última manutenção:</span>
        <span className="font-semibold">
          {stats.lastMaintenanceDate 
            ? new Date(stats.lastMaintenanceDate).toLocaleDateString('pt-BR')
            : 'Nenhuma'}
        </span>
      </div>
    </div>
  );
}

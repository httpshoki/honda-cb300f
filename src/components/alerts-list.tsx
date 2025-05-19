"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertWithType } from "@/lib/models/alert";

interface AlertsListProps {
  onComplete?: () => void;
}

export default function AlertsList({ onComplete }: AlertsListProps) {
  const [alerts, setAlerts] = useState<AlertWithType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const router = useRouter();

  // Carregar alertas
  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/alerts");
      if (!response.ok) {
        throw new Error("Falha ao carregar alertas");
      }
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      console.error("Erro ao carregar alertas:", err);
      setError("Não foi possível carregar os alertas de manutenção");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleMarkCompleted = async (alertId: number) => {
    try {
      setProcessingId(alertId);
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alertId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao marcar alerta como concluído");
      }

      // Atualizar a lista de alertas
      fetchAlerts();
      
      // Chamar callback se fornecido
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error("Erro ao marcar alerta como concluído:", err);
      setError(err instanceof Error ? err.message : "Erro ao processar alerta");
    } finally {
      setProcessingId(null);
    }
  };

  const getPriorityClass = (alert: AlertWithType) => {
    const kmDifference = alert.due_mileage - alert.current_mileage;
    
    if (alert.is_critical && kmDifference <= 500) {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    } else if (kmDifference <= 1000) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    } else {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando alertas...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
        {error}
        <Button className="mt-2" onClick={fetchAlerts}>Tentar novamente</Button>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300">Não há alertas de manutenção pendentes.</p>
        <Button className="mt-4" onClick={() => router.push("/manutencoes/nova")}>
          Registrar Nova Manutenção
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">{alert.type_name}</h3>
              {alert.type_description && (
                <p className="text-gray-600 dark:text-gray-300">{alert.type_description}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(alert)}`}>
                  {alert.is_critical ? "Crítico" : "Regular"}
                </span>
                <span className="text-sm">
                  Próxima manutenção: {alert.due_mileage} km
                </span>
                {alert.due_date && (
                  <span className="text-sm">
                    Data limite: {new Date(alert.due_date).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleMarkCompleted(alert.id!)}
                disabled={processingId === alert.id}
              >
                {processingId === alert.id ? "Processando..." : "Marcar como Concluído"}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => router.push("/manutencoes/nova")}
              >
                Registrar Manutenção
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

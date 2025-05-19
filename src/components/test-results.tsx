"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface TestResultsProps {
  className?: string;
}

export default function TestResults({ className }: TestResultsProps) {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const runTests = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const response = await fetch("/api/test");
      if (!response.ok) {
        throw new Error("Falha ao executar testes");
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Erro ao executar testes:", err);
      setError(err instanceof Error ? err.message : "Erro ao executar testes");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Sucesso</span>;
      case 'warning':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Aviso</span>;
      case 'error':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Erro</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Pendente</span>;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Testes de Integração</h2>
        <Button onClick={runTests} disabled={isLoading}>
          {isLoading ? "Executando..." : "Executar Testes"}
        </Button>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {results && (
        <div className="space-y-4">
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {results.message}
          </div>
          
          <div className="space-y-2">
            {Object.entries(results.results).map(([key, value]: [string, any]) => (
              <div key={key} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium capitalize">{key}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{value.message}</p>
                  </div>
                  {getStatusBadge(value.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!results && !isLoading && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Clique no botão para executar os testes de integração.</p>
        </div>
      )}
    </div>
  );
}

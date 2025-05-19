"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MileageUpdateFormProps {
  currentMileage: number;
  onUpdate?: () => void;
}

export default function MileageUpdateForm({ currentMileage, onUpdate }: MileageUpdateFormProps) {
  const [mileage, setMileage] = useState(currentMileage);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMileage(currentMileage);
  }, [currentMileage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      if (mileage < currentMileage) {
        throw new Error("A nova quilometragem não pode ser menor que a atual");
      }

      const response = await fetch("/api/motorcycle/mileage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mileage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao atualizar quilometragem");
      }

      setSuccess(true);
      
      // Chamar callback se fornecido
      if (onUpdate) {
        onUpdate();
      }
      
      // Atualizar a página após um breve delay
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar quilometragem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Quilometragem atualizada com sucesso!
        </div>
      )}
      
      <div>
        <label htmlFor="mileage" className="block text-sm font-medium">
          Nova Quilometragem (km)
        </label>
        <input
          id="mileage"
          name="mileage"
          type="number"
          min={currentMileage}
          value={mileage}
          onChange={(e) => setMileage(parseInt(e.target.value) || 0)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        <p className="mt-1 text-sm text-gray-500">
          Quilometragem atual: {currentMileage} km
        </p>
      </div>

      <div>
        <Button className="w-full" type="submit" disabled={isLoading || mileage < currentMileage}>
          {isLoading ? "Atualizando..." : "Atualizar Quilometragem"}
        </Button>
      </div>
    </form>
  );
}

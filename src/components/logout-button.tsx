"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer logout");
      }
      
      // Redirecionar para a página de login
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Saindo..." : "Sair"}
    </Button>
  );
}

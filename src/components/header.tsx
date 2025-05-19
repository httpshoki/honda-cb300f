import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CB300F</span>
            <span className="hidden text-xl font-semibold sm:inline-block">Manutenção</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/manutencoes" className="transition-colors hover:text-foreground/80">
            Manutenções
          </Link>
          <Link href="/historico" className="transition-colors hover:text-foreground/80">
            Histórico
          </Link>
          <Link href="/moto" className="transition-colors hover:text-foreground/80">
            Dados da Moto
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

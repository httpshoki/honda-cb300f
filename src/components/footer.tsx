export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Sistema de Gerenciamento de Manutenção Honda CB300F Twister
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            Termos
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}

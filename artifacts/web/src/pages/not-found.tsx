import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border border-border rounded-sm p-8 bg-card">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
          <h1 className="text-2xl font-serif text-foreground">404 — Page Not Found</h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Did you forget to add the page to the router?
        </p>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAdminAuthed } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Login é prototípico: guarda uma "sessão" local para liberar rotas do admin.
      setAdminAuthed(true);
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-2xl font-bold">IN</span>
          </div>
          <h1 className="font-serif text-2xl text-primary-foreground">Painel Administrativo</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Instituto Novo Milênio</p>
        </div>

        <Alert className="mb-4 border-accent/50 bg-card/80 text-foreground">
          <Info className="h-4 w-4 text-accent" />
          <AlertTitle>Modo demonstração</AlertTitle>
          <AlertDescription>
            Este login é apenas para testar o layout do painel. Não há validação de usuário nem servidor — não use como segurança real.
          </AlertDescription>
        </Alert>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-center text-foreground">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" placeholder="E-mail" required />
              <Input type="password" placeholder="Senha" required />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;

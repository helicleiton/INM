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
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signInEmail, isDemoMode } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDemoMode) {
      setLoading(true);
      setTimeout(() => {
        setAdminAuthed(true);
        toast.success("Login realizado (modo demonstração).");
        navigate("/admin");
        setLoading(false);
      }, 600);
      return;
    }
    setLoading(true);
    try {
      await signInEmail(email, password);
      toast.success("Login realizado com sucesso.");
      navigate("/admin");
    } catch {
      toast.error("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
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
          <AlertTitle>{isDemoMode ? "Modo demonstração" : "Firebase Authentication"}</AlertTitle>
          <AlertDescription>
            {isDemoMode
              ? "Sem variáveis Firebase, o login é apenas local para testar o layout. Com Firebase configurado, use e-mail e senha de um usuário criado no Console."
              : "Acesso protegido por Firebase Auth. Crie usuários em Authentication no console do Firebase."}
          </AlertDescription>
        </Alert>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-center text-foreground">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Senha"
                required={!isDemoMode}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
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

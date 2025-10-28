import React from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import GraduationCapIcon from './icons/GraduationCapIcon';
import Button from './Button';

interface AwaitingProfileSetupProps {
  user: FirebaseUser;
}

const AwaitingProfileSetup: React.FC<AwaitingProfileSetupProps> = ({ user }) => {
  
  const handleCopyUID = () => {
    navigator.clipboard.writeText(user.uid);
    alert('UID copiado para a área de transferência!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <GraduationCapIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Login bem-sucedido!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Um último passo é necessário para ativar sua conta.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4 text-sm">
            <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Ação Necessária do Administrador</h2>
            <p className="text-slate-600 dark:text-slate-400">
                O perfil de permissões para o usuário <strong className="text-slate-900 dark:text-slate-100">{user.email}</strong> ainda não foi criado no banco de dados.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
                Por favor, siga estes passos no <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Console do Firebase</a>:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>Vá para a seção <strong>Firestore Database</strong>.</li>
                <li>Crie uma coleção chamada <code className="bg-slate-200 dark:bg-slate-700 p-1 rounded text-xs font-mono">users</code> (se não existir).</li>
                <li>Adicione um novo documento com o seguinte <strong>ID do Documento</strong>:</li>
                <div className="flex items-center gap-2 p-2 bg-slate-200 dark:bg-slate-700 rounded-md">
                    <pre className="text-slate-900 dark:text-slate-100 font-mono text-xs overflow-x-auto">{user.uid}</pre>
                    <button onClick={handleCopyUID} className="text-xs p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600">Copiar</button>
                </div>
                <li>Dentro deste documento, crie um campo:
                    <ul className="list-disc list-inside ml-4 mt-1">
                        <li>Nome do Campo: <code className="bg-slate-200 dark:bg-slate-700 p-1 rounded text-xs font-mono">role</code></li>
                        <li>Valor do Campo: <code className="bg-slate-200 dark:bg-slate-700 p-1 rounded text-xs font-mono">admin</code> ou <code className="bg-slate-200 dark:bg-slate-700 p-1 rounded text-xs font-mono">vocal_teacher</code></li>
                    </ul>
                </li>
            </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Verificar Novamente
          </Button>
          <Button
            onClick={() => auth.signOut()}
            variant="secondary"
            className="w-full"
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AwaitingProfileSetup;

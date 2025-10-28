import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Função para cadastrar um novo aluno no Firestore
export async function cadastrarAluno(dados: any) {
  await addDoc(collection(db, "alunos"), dados);
}

// Função para listar todos os alunos cadastrados
export async function listarAlunos() {
  const snapshot = await getDocs(collection(db, "alunos"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

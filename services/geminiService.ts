import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const suggestLessonContent = async (workshop: string, turma?: string): Promise<{topic: string; content: string}> => {
  try {
    const prompt = `Você é um especialista em pedagogia musical criando um plano de aula para o Instituto Novo Milênio.
    A aula é de ${workshop}${turma ? ` (turma: ${turma})` : ''}.

    Sua tarefa é gerar um título (tópico) criativo para a aula e o conteúdo completo do plano de aula.

    O conteúdo do plano de aula deve ser uma string em formato markdown com os seguintes tópicos:
    - **Objetivos da Aula:** (Liste 2 ou 3 objetivos claros e mensuráveis)
    - **Conteúdo Principal:** (Descreva os pontos-chave a serem abordados)
    - **Atividades Sugeridas:** (Sugira 1 ou 2 atividades práticas e envolventes)
    - **Materiais Necessários:** (Liste os recursos necessários)

    Retorne a resposta como um objeto JSON com duas chaves: "topic" (o título da aula) e "content" (a string markdown do plano de aula).`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              topic: {
                type: Type.STRING,
                description: "O título criativo e relevante para a aula."
              },
              content: {
                type: Type.STRING,
                description: "O conteúdo do plano de aula em formato markdown, seguindo a estrutura: Objetivos, Conteúdo Principal, Atividades Sugeridas, Materiais Necessários."
              }
            },
            required: ['topic', 'content']
          },
        },
    });
    
    // Fix: Trim the response text to handle potential leading/trailing whitespace before parsing.
    const jsonResponse = JSON.parse(response.text.trim());
    return jsonResponse;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha ao gerar sugestão de conteúdo.");
  }
};

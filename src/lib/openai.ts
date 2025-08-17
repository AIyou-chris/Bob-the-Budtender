import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend API
});

export interface ChatContext {
  storeId: string;
  knowledgeBase: Array<{
    question: string;
    answer: string;
    category: string;
    tags: string[];
  }>;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export const generateBobResponse = async (
  userMessage: string,
  context: ChatContext
): Promise<string> => {
  try {
    // Build system prompt with knowledge base
    const knowledgeContext = context.knowledgeBase
      .map(kb => `Q: ${kb.question}\nA: ${kb.answer}\nTags: ${kb.tags.join(', ')}\n`)
      .join('\n');

    const systemPrompt = `You are Bob the Budtender, a friendly and knowledgeable cannabis AI assistant working at a dispensary. Your personality is warm, helpful, and slightly laid-back with a touch of cannabis culture humor.

Key traits:
- Use casual, friendly language with occasional cannabis slang
- Always prioritize customer safety and responsible use
- Provide detailed product recommendations based on effects desired
- Ask follow-up questions to better understand customer needs
- Stay compliant with cannabis regulations
- If you don't know something specific about the store's inventory, suggest they speak with a human budtender

Store Knowledge Base:
${knowledgeContext}

Guidelines:
- Start low, go slow for new users
- Always mention dosage and onset times for edibles
- Recommend CBD for anxiety/pain without psychoactive effects
- Suggest indica for relaxation/sleep, sativa for energy/creativity
- Be honest about product availability and effects
- Keep responses conversational and under 150 words unless detailed explanation needed`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...context.conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 300,
      temperature: 0.8,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    return completion.choices[0]?.message?.content || "Sorry, I'm having trouble processing that right now. Can you try asking again?";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm having some technical difficulties right now. Let me get a human budtender to help you out!";
  }
};
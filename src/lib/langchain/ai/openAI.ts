import {ChatOpenAI} from "@langchain/openai"

export const getModelWithOpenAI = async (
  modelName: string = "gpt-3.5-turbo",
  temperature: number = 0.7,
  maxToken: number = 2024
) => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OpenAI_API_Key,
    modelName: modelName,
    temperature: temperature,
    maxTokens: maxToken,
  })
  return model
}

export default getModelWithOpenAI

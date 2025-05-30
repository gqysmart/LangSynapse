import {ChatOpenAI} from "@langchain/openai"
type OpenAIOptions = {
  modelName?: string
  temperature?: number
  maxTokens?: number
}
export const getModelWithOpenAI = async ({
  modelName = "gpt-3.5-turbo",
  temperature = 0.7,
  maxTokens = 2024,
}: OpenAIOptions) => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OpenAI_API_Key,
    modelName: modelName,
    temperature: temperature,
    maxTokens: maxTokens,
  })
  return model
}

export default getModelWithOpenAI



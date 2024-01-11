# Chat Models

Chat models are specialized versions of large language models designed to handle conversational contexts. They excel at generating human-like responses in interactive dialogue and maintaining context throughout a conversation, making them ideal for tasks like customer support, virtual assistance, and interactive applications. In contrast, Completion models are more suited for single-turn tasks that don't require maintaining a conversational history, such as text summarization, translation, or code generation. While both types of models can generate text based on the input they receive, Chat models are optimized for multi-turn dialogue and often exhibit a better understanding of nuanced conversational cues compared to their Completion counterparts.

## Google

### chat-bison

#### Parameters

| Parameter Name  | Streaming Supported | Type             | Description                                                                                                                                                                                                                                        | Min  | Max  | Default |
|-----------------|---------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|------|---------|
| prompts     | True                | ChatSession            | Text input to generate model response.         |     |     |        |
| temperature     | True                | float            | The temperature is used for sampling during the response generation. Controls the degree of randomness in token selection. Lower temperatures result in less randomness. Higher temperatures can lead to more diverse or creative results.          | 0    | 1    | 0       |
| maxOutputTokens | True                | int              | Maximum number of tokens that can be generated in the response. Specify a lower value for shorter responses and a higher value for longer responses. The maximum value may be lower for certain models.                                             | 1    | 2048 | 1024    |
| topK            | True                | int              | Top-K changes how the model selects tokens for output. Specify a lower value for less random responses and a higher value for more random responses.                                                                                                 | 0    | 40   | 0       |
| candidateCount  | False               | int              | Tokens are selected from most probable to least until the sum of their probabilities equals the top_p value.                                                                                                                                        | 1    | 8    | 1       |
| stopSequences   | True                | array of strings | Specifies a list of strings that tells the model to stop generating text if one of the strings is encountered in the response. Strings are case-sensitive.                                                                                           |      |      |         |
| topP            | True                | float            | Top-p changes how the model selects tokens for output. Tokens are selected from the most (see top-K) to least probable until the sum of their probabilities equals the top-P value.                                                                 | 0    | 1    | 0.95    |

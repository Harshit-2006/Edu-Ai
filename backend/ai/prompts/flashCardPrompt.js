const flashCardTopicPrompt = (UserProvidedTopic, totalQuestions)=>{
    const userPrompt = `Create exactly ${totalQuestions} question-answer pairs on the topic '${UserProvidedTopic}' Each pair must include:A clear and concise question that directly relates to important facts or concepts within the topic.A correctAnswer field containing a precise and accurate answer to the question.Format the output strictly as a JSON array of objects, with each object containing the fields: question and correctAnswer.Ensure the questions are diverse and relevant, covering key aspects of the topic without repetition.`;
    return userPrompt;
}

const flashCardTextPrompt = (userProvidedText, totalQuestions)=>{
    const userPrompt = `Extract exactly ${totalQuestions} question-answer pairs from the following text. Each pair must include:A clear and concise question based on a fact or detail explicitly mentioned in the text.A correctAnswer field containing a direct and accurate answer to the question.Format the output strictly as a JSON array of objects, with each object containing the fields: question and correctAnswer.Ensure the questions are well-formed and relevant to the provided text.Here is the input text:[${userProvidedText}]`;
    return userPrompt;
}


export {flashCardTopicPrompt, flashCardTextPrompt};
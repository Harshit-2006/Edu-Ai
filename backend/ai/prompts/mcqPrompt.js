const mcqTopicPrompt = (UserProvidedTopic, totalQuestions)=>{
    const userPrompt = `Create exactly ${totalQuestions} multiple-choice questions on the topic '${UserProvidedTopic}' Each question must include:A clear and concise question.Four options in an array, with one correct option and three plausible distractors.The correctAnswer field containing the correct option's text.Format the output strictly as a JSON array of objects, with each object containing the fields: question, options (array of 4 strings), and correctAnswer.`;
    return userPrompt;
}

const mcqTextPrompt = (userProvidedText, totalQuestions)=>{
    const userPrompt = `Based on the following text, create exactly ${userProvidedText} multiple-choice questions. Each question must include:A clear and concise question that directly relates to the information in the text.Four options in an array, with one correct option and three plausible distractors derived from the text.The correctAnswer field containing the correct option's text.Format the output strictly as a JSON array of objects, with each object containing the fields: question, options (array of 4 strings), and correctAnswer.Ensure the questions cover diverse information from the text. Avoid repetition.Here is the input text: [${totalQuestions}]`;
    return userPrompt;
}


export {mcqTopicPrompt, mcqTextPrompt};
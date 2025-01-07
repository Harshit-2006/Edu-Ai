// Function to process Google API response
const processGoogleResponse = (apiResponse) => {
    try {
        const rawContent = apiResponse.text;
        // Removing unnecessary JSON formatting markers
        const jsonString = rawContent.replace(/```json|```/g, '').trim();
        // Parse the cleaned string into a JavaScript object
        const mcqs = JSON.parse(jsonString);
        console.log("this is the response from processGoogleResponse.js file :",mcqs);
        // console.log("remember that the response is not returned from this file ");
        return mcqs; 
    } catch (error) {
        console.error('Error processing Google API response:', error);
        throw error; 
    }
};

export default processGoogleResponse;

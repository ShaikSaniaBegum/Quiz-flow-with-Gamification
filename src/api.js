const API_URL = "https://api.jsonserve.com/Uw5CrX";


export const fetchQuizData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.questions && Array.isArray(data.questions)) {
            return data.questions;
        }
    } catch (error) {
        console.error("API Fetch Error. Using mock data...");
    }

    return [
        {
            "description": "What is the capital of France?",
            "options": [
                { "description": "Paris", "is_correct": true },
                { "description": "Berlin", "is_correct": false },
                { "description": "Madrid", "is_correct": false },
                { "description": "Rome", "is_correct": false }
            ]
        },
        {
            "description": "Who developed JavaScript?",
            "options": [
                { "description": "Brendan Eich", "is_correct": true },
                { "description": "Guido van Rossum", "is_correct": false },
                { "description": "Bjarne Stroustrup", "is_correct": false },
                { "description": "James Gosling", "is_correct": false }
            ]
        }
    ];
};

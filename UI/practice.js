// document.addEventListener('DOMContentLoaded', function() {
//     setupTopicSearch();
// });

// let currentMCQs = [];
// let currentQuestionIndex = 0;

// function setupTopicSearch() {
//     const searchBtn = document.getElementById('searchBtn');
//     const topicInput = document.getElementById('topicInput');
    
//     searchBtn.addEventListener('click', () => handleTopicSearch());
//     topicInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             handleTopicSearch();
//         }
//     });
// }

// function handleTopicSearch() {
//     const topic = document.getElementById('topicInput').value.trim();
//     if (topic) {
//         loadMCQs(topic);
//     } else {
//         clearNotebook();
//     }
// }

// function loadMCQs(topic) {
//     const notebookViewer = document.getElementById('notebook-viewer');
//     clearNotebook();
//     notebookViewer.innerHTML = '<div class="loading-message">Loading practice problems...</div>';
    
//     fetch(`/api/mcqs?topic=${encodeURIComponent(topic)}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 notebookViewer.innerHTML = `<div class="error-message">${data.message}</div>`;
//                 return;
//             }
//             currentMCQs = data;
//             currentQuestionIndex = 0;
//             displayCurrentQuestion();
//         })
//         .catch(error => {
//             console.error('Error loading MCQs:', error);
//             notebookViewer.innerHTML = '<div class="error-message">Error loading practice problems. Please try again.</div>';
//         });
// }

// function displayCurrentQuestion() {
//     if (currentMCQs.length === 0) {
//         document.getElementById('notebook-viewer').innerHTML = '<div class="error-message">No questions found for this topic.</div>';
//         return;
//     }

//     const question = currentMCQs[currentQuestionIndex];
//     const notebookViewer = document.getElementById('notebook-viewer');
    
//     notebookViewer.innerHTML = `
//         <div class="mcq-container">
//             <div class="question-header">
//                 <span class="question-number">Question ${currentQuestionIndex + 1} of ${currentMCQs.length}</span>
//                 <span class="difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
//             </div>
//             <div class="question-content">
//                 <h3>${question.question}</h3>
//                 <div class="options">
//                     ${question.options.map((option, index) => `
//                         <div class="option" onclick="selectOption(${index})">
//                             <span class="option-label">${String.fromCharCode(65 + index)}.</span>
//                             <span class="option-text">${option}</span>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//             <div class="question-controls">
//                 <button class="btn prev-btn" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
//                     Previous
//                 </button>
//                 <button class="btn next-btn" onclick="nextQuestion()" ${currentQuestionIndex === currentMCQs.length - 1 ? 'disabled' : ''}>
//                     Next
//                 </button>
//                 <button class="btn submit-btn" onclick="submitAnswer()">
//                     Submit Answer
//                 </button>
//             </div>
//         </div>
//     `;
// }

// function selectOption(index) {
//     const options = document.querySelectorAll('.option');
//     options.forEach(option => option.classList.remove('selected'));
//     options[index].classList.add('selected');
// }

// function submitAnswer() {
//     const selectedOption = document.querySelector('.option.selected');
//     if (!selectedOption) {
//         alert('Please select an answer');
//         return;
//     }

//     const selectedIndex = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
//     const question = currentMCQs[currentQuestionIndex];
    
//     // Show the correct answer
//     const options = document.querySelectorAll('.option');
//     options.forEach((option, index) => {
//         if (index === question.correct_answer) {
//             option.classList.add('correct');
//         } else if (index === selectedIndex) {
//             option.classList.add('incorrect');
//         }
//     });

//     // Disable option selection after submission
//     options.forEach(option => option.style.pointerEvents = 'none');
// }

// function nextQuestion() {
//     if (currentQuestionIndex < currentMCQs.length - 1) {
//         currentQuestionIndex++;
//         displayCurrentQuestion();
//     }
// }

// function prevQuestion() {
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         displayCurrentQuestion();
//     }
// }

// function clearNotebook() {
//     const notebookViewer = document.getElementById('notebook-viewer');
//     notebookViewer.innerHTML = '';
//     currentMCQs = [];
//     currentQuestionIndex = 0;
// }







// // Global variables
// let currentMCQs = [];
// let currentQuestionIndex = 0;
// const API_KEY = 'AIzaSyDZ-wMPWyaGF5rzxUJVuXVDtOQ265xV0ds'; // Your API key

// // Utility functions
// window.clearNotebook = function() {
//     const notebookViewer = document.getElementById('notebook-viewer');
//     notebookViewer.innerHTML = '';
//     currentMCQs = [];
//     currentQuestionIndex = 0;
// };

// // Question display functions
// function displayCurrentQuestion() {
//     if (!currentMCQs.length) {
//         document.getElementById('notebook-viewer').innerHTML = 
//             '<div class="error-message">No questions available</div>';
//         return;
//     }

//     const question = currentMCQs[currentQuestionIndex];
//     const notebookViewer = document.getElementById('notebook-viewer');
    
//     notebookViewer.innerHTML = `
//         <div class="mcq-container">
//             <div class="question-header">
//                 <span class="question-number">Question ${currentQuestionIndex + 1} of ${currentMCQs.length}</span>
//                 <span class="difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
//             </div>
//             <div class="question-content">
//                 <h3>${question.question}</h3>
//                 <div class="options">
//                     ${question.options.map((option, index) => `
//                         <div class="option" onclick="selectOption(${index})">
//                             <span class="option-label">${String.fromCharCode(65 + index)}.</span>
//                             <span class="option-text">${option}</span>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//             <div class="question-controls">
//                 <button class="btn prev-btn" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
//                     Previous
//                 </button>
//                 <button class="btn next-btn" onclick="nextQuestion()" ${currentQuestionIndex === currentMCQs.length - 1 ? 'disabled' : ''}>
//                     Next
//                 </button>
//                 <button class="btn submit-btn" onclick="submitAnswer()">
//                     Submit Answer
//                 </button>
//             </div>
//         </div>
//     `;
// }

// // Interaction functions
// window.selectOption = function(index) {
//     document.querySelectorAll('.option').forEach(opt => 
//         opt.classList.remove('selected'));
//     document.querySelectorAll('.option')[index].classList.add('selected');
// };

// window.submitAnswer = function() {
//     const selected = document.querySelector('.option.selected');
//     if (!selected) return alert('Please select an answer');
    
//     const selectedIdx = [...document.querySelectorAll('.option')].indexOf(selected);
//     const correctIdx = currentMCQs[currentQuestionIndex].correct_answer;
    
//     document.querySelectorAll('.option').forEach((opt, idx) => {
//         if (idx === correctIdx) opt.classList.add('correct');
//         else if (idx === selectedIdx) opt.classList.add('incorrect');
//         opt.style.pointerEvents = 'none';
//     });
// };

// window.prevQuestion = function() {
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         displayCurrentQuestion();
//     }
// };

// window.nextQuestion = function() {
//     if (currentQuestionIndex < currentMCQs.length - 1) {
//         currentQuestionIndex++;
//         displayCurrentQuestion();
//     }
// };

// // API functions
// async function generateQuestions(topic) {
//     try {
//         const prompt = `Generate 3 GATE exam MCQs about ${topic}. Format as:
//         [{
//             "question": "...",
//             "options": ["...", "...", "...", "..."],
//             "correct_answer": 0,
//             "difficulty": "Easy"
//         }]`;
        
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{ text: prompt }]
//                 }]
//             })
//         });

//         if (!response.ok) throw new Error(`API error: ${response.status}`);
        
//         const data = await response.json();
//         const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (!content) throw new Error('Invalid response format');

//         // Extract JSON from response
//         const jsonStart = content.indexOf('[');
//         const jsonEnd = content.lastIndexOf(']') + 1;
//         return JSON.parse(content.slice(jsonStart, jsonEnd));
        
//     } catch (error) {
//         console.error('API Error:', error);
//         // Fallback to sample questions
//         return getSampleQuestions(topic);
//     }
// }

// function getSampleQuestions(topic) {
//     // Simple fallback data
//     return [{
//         question: `Sample GATE question about ${topic}`,
//         options: ["Option A", "Option B", "Option C", "Option D"],
//         correct_answer: 1,
//         difficulty: "Medium"
//     }];
// }

// // Main functions
// async function loadMCQs(topic) {
//     const viewer = document.getElementById('notebook-viewer');
//     viewer.innerHTML = '<div class="loading-message">Generating questions...</div>';
    
//     try {
//         currentMCQs = await generateQuestions(topic);
//         currentQuestionIndex = 0;
//         displayCurrentQuestion();
//     } catch (error) {
//         console.error('Error:', error);
//         viewer.innerHTML = `
//             <div class="error-message">
//                 Failed to load questions. Try "Data Structures" or "Algorithms".
//                 <br>Error: ${error.message}
//             </div>`;
//     }
// }

// function setupTopicSearch() {
//     document.getElementById('searchBtn').addEventListener('click', handleTopicSearch);
//     document.getElementById('topicInput').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') handleTopicSearch();
//     });
// }

// async function handleTopicSearch() {
//     const topic = document.getElementById('topicInput').value.trim();
//     if (topic) await loadMCQs(topic);
//     else clearNotebook();
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', setupTopicSearch);








// 3 try 

// Global variables
// let currentMCQs = [];
// let currentQuestionIndex = 0;
// const API_KEY = 'AIzaSyDZ-wMPWyaGF5rzxUJVuXVDtOQ265xV0ds'; // Replace with your actual API key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// // Utility functions
// window.clearNotebook = function() {
//     const notebookViewer = document.getElementById('notebook-viewer');
//     notebookViewer.innerHTML = '';
//     currentMCQs = [];
//     currentQuestionIndex = 0;
// };

// // Question display function
// function displayCurrentQuestion() {
//     if (!currentMCQs.length) {
//         document.getElementById('notebook-viewer').innerHTML = 
//             '<div class="error-message">No questions available</div>';
//         return;
//     }

//     const question = currentMCQs[currentQuestionIndex];
//     const notebookViewer = document.getElementById('notebook-viewer');
    
//     notebookViewer.innerHTML = `
//         <div class="mcq-container">
//             <div class="question-header">
//                 <span class="question-number">Question ${currentQuestionIndex + 1} of ${currentMCQs.length}</span>
//                 <span class="difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
//             </div>
//             <div class="question-content">
//                 <h3>${question.question}</h3>
//                 <div class="options">
//                     ${question.options.map((option, index) => `
//                         <div class="option" onclick="selectOption(${index})">
//                             <span class="option-label">${String.fromCharCode(65 + index)}.</span>
//                             <span class="option-text">${option}</span>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//             <div class="question-controls">
//                 <button class="btn prev-btn" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
//                     Previous
//                 </button>
//                 <button class="btn next-btn" onclick="nextQuestion()" ${currentQuestionIndex === currentMCQs.length - 1 ? 'disabled' : ''}>
//                     Next
//                 </button>
//                 <button class="btn submit-btn" onclick="submitAnswer()">
//                     Submit Answer
//                 </button>
//             </div>
//         </div>
//     `;
// }

// // Interaction functions
// window.selectOption = function(index) {
//     document.querySelectorAll('.option').forEach(opt => 
//         opt.classList.remove('selected'));
//     document.querySelectorAll('.option')[index].classList.add('selected');
// };

// window.submitAnswer = function() {
//     const selected = document.querySelector('.option.selected');
//     if (!selected) return alert('Please select an answer');
    
//     const selectedIdx = [...document.querySelectorAll('.option')].indexOf(selected);
//     const correctIdx = currentMCQs[currentQuestionIndex].correct_answer;
    
//     document.querySelectorAll('.option').forEach((opt, idx) => {
//         if (idx === correctIdx) opt.classList.add('correct');
//         else if (idx === selectedIdx) opt.classList.add('incorrect');
//         opt.style.pointerEvents = 'none';
//     });
// };

// window.prevQuestion = function() {
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         displayCurrentQuestion();
//     }
// };

// window.nextQuestion = function() {
//     if (currentQuestionIndex < currentMCQs.length - 1) {
//         currentQuestionIndex++;
//         displayCurrentQuestion();
//     }
// };

// // API function with robust error handling
// async function generateQuestions(topic) {
//     try {
//         const prompt = {
//             contents: [{
//                 parts: [{
//                     text: `Generate 3 multiple-choice questions about ${topic} for GATE examination.
//                     Each question must have:
//                     - Clear question text
//                     - 4 options (A, B, C, D)
//                     - Correct answer index (0-3)
//                     - Difficulty level (Easy/Medium/Hard)
                    
//                     Format response as a perfect JSON array like:
//                     [{
//                         "question": "What is...?",
//                         "options": ["Option A", "Option B", "Option C", "Option D"],
//                         "correct_answer": 1,
//                         "difficulty": "Medium"
//                     }]
//                     Return only the JSON array with no additional text.`
//                 }]
//             }],
//             generationConfig: {
//                 temperature: 0.7,
//                 topP: 0.9,
//                 topK: 40,
//                 maxOutputTokens: 2000
//             }
//         };

//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(prompt)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('API Error:', errorData);
//             throw new Error(`API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('API Response:', data);

//         const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (!content) throw new Error("No content in API response");

//         // Extract JSON from response
//         const jsonStart = content.indexOf('[');
//         const jsonEnd = content.lastIndexOf(']') + 1;
//         if (jsonStart === -1 || jsonEnd === 0) {
//             throw new Error("Invalid JSON format in response");
//         }

//         const jsonString = content.slice(jsonStart, jsonEnd);
//         const questions = JSON.parse(jsonString);

//         if (!Array.isArray(questions) || questions.length === 0) {
//             throw new Error("No valid questions generated");
//         }

//         return questions;

//     } catch (error) {
//         console.error('Question generation failed:', error);
//         throw error;
//     }
// }

// // Main function to load questions
// async function loadMCQs(topic) {
//     const viewer = document.getElementById('notebook-viewer');
//     viewer.innerHTML = '<div class="loading-message">Generating GATE questions...</div>';
    
//     try {
//         currentMCQs = await generateQuestions(topic);
//         currentQuestionIndex = 0;
//         displayCurrentQuestion();
//     } catch (error) {
//         console.error('Error:', error);
//         viewer.innerHTML = `
//             <div class="error-message">
//                 <h3>⚠️ Error Generating Questions</h3>
//                 <p>Please try:</p>
//                 <ol>
//                     <li>Checking your internet connection</li>
//                     <li>Verifying your API key at <a href="https://makersuite.google.com/app/apikey" target="_blank">Google MakerSuite</a></li>
//                     <li>Ensuring "Generative Language API" is enabled in <a href="https://console.cloud.google.com/apis" target="_blank">Google Cloud Console</a></li>
//                 </ol>
//                 <p><em>Technical details:</em> ${error.message}</p>
//                 <button class="retry-btn" onclick="location.reload()">Retry</button>
//             </div>`;
//     }
// }

// // Search functionality
// function setupTopicSearch() {
//     document.getElementById('searchBtn').addEventListener('click', handleTopicSearch);
//     document.getElementById('topicInput').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') handleTopicSearch();
//     });
// }

// async function handleTopicSearch() {
//     const topic = document.getElementById('topicInput').value.trim();
//     if (topic) {
//         await loadMCQs(topic);
//     } else {
//         clearNotebook();
//         document.getElementById('notebook-viewer').innerHTML = 
//             '<div class="error-message">Please enter a topic to search</div>';
//     }
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', setupTopicSearch);








// Global variables
let currentMCQs = [];
let currentQuestionIndex = 0;
const API_KEY = 'AIzaSyDZ-wMPWyaGF5rzxUJVuXVDtOQ265xV0ds'; // REPLACE THIS WITH YOUR REAL API KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

// Utility functions
window.clearNotebook = function() {
    const notebookViewer = document.getElementById('notebook-viewer');
    notebookViewer.innerHTML = '';
    currentMCQs = [];
    currentQuestionIndex = 0;
};

// Question display function
function displayCurrentQuestion() {
    if (!currentMCQs.length) {
        document.getElementById('notebook-viewer').innerHTML = 
            '<div class="error-message">No questions available</div>';
        return;
    }

    const question = currentMCQs[currentQuestionIndex];
    const notebookViewer = document.getElementById('notebook-viewer');
    
    notebookViewer.innerHTML = `
        <div class="mcq-container">
            <div class="question-header">
                <span class="question-number">Question ${currentQuestionIndex + 1} of ${currentMCQs.length}</span>
                <span class="difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
            </div>
            <div class="question-content">
                <h3>${question.question}</h3>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" onclick="selectOption(${index})">
                            <span class="option-label">${String.fromCharCode(65 + index)}.</span>
                            <span class="option-text">${option}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="question-controls">
                <button class="btn prev-btn" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                    Previous
                </button>
                <button class="btn next-btn" onclick="nextQuestion()" ${currentQuestionIndex === currentMCQs.length - 1 ? 'disabled' : ''}>
                    Next
                </button>
                <button class="btn submit-btn" onclick="submitAnswer()">
                    Submit Answer
                </button>
            </div>
        </div>
    `;
}

// Interaction functions
window.selectOption = function(index) {
    document.querySelectorAll('.option').forEach(opt => 
        opt.classList.remove('selected'));
    document.querySelectorAll('.option')[index].classList.add('selected');
};

window.submitAnswer = function() {
    const selected = document.querySelector('.option.selected');
    if (!selected) return alert('Please select an answer');
    
    const selectedIdx = [...document.querySelectorAll('.option')].indexOf(selected);
    const correctIdx = currentMCQs[currentQuestionIndex].correct_answer;
    
    document.querySelectorAll('.option').forEach((opt, idx) => {
        if (idx === correctIdx) opt.classList.add('correct');
        else if (idx === selectedIdx) opt.classList.add('incorrect');
        opt.style.pointerEvents = 'none';
    });
};

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
};

window.nextQuestion = function() {
    if (currentQuestionIndex < currentMCQs.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
};

// API function with latest endpoint
async function generateQuestions(topic) {
    try {
        const prompt = {
            contents: [{
                parts: [{
                    text: `Generate 3 GATE exam questions about ${topic}. Format as perfect JSON:
                    [{
                        "question": "What is...?",
                        "options": ["A","B","C","D"],
                        "correct_answer": 0,
                        "difficulty": "Medium"
                    }]`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.9
            }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prompt)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            throw new Error(`API Error: ${errorData.error.message || response.status}`);
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from response
        const jsonStart = content.indexOf('[');
        const jsonEnd = content.lastIndexOf(']') + 1;
        const jsonString = content.slice(jsonStart, jsonEnd);
        
        return JSON.parse(jsonString);

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Main function to load questions
async function loadMCQs(topic) {
    const viewer = document.getElementById('notebook-viewer');
    viewer.innerHTML = '<div class="loading-message">Generating questions...</div>';
    
    try {
        currentMCQs = await generateQuestions(topic);
        if (!currentMCQs || currentMCQs.length === 0) {
            throw new Error("No questions were generated");
        }
        currentQuestionIndex = 0;
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error:', error);
        viewer.innerHTML = `
            <div class="error-message">
                <h3>Failed to load questions</h3>
                <p>${error.message}</p>
                <p>Please ensure:</p>
                <ol>
                    <li>You have a valid API key</li>
                    <li>The Generative Language API is enabled</li>
                    <li>Your Google Cloud project has billing enabled</li>
                </ol>
                <button onclick="location.reload()">Try Again</button>
            </div>`;
    }
}

// Search functionality
function setupTopicSearch() {
    document.getElementById('searchBtn').addEventListener('click', handleTopicSearch);
    document.getElementById('topicInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleTopicSearch();
    });
}

async function handleTopicSearch() {
    const topic = document.getElementById('topicInput').value.trim();
    if (topic) {
        await loadMCQs(topic);
    } else {
        clearNotebook();
        document.getElementById('notebook-viewer').innerHTML = 
            '<div class="error-message">Please enter a topic</div>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', setupTopicSearch);
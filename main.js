#! /usr/bin/env node 
import * as readline from "readline";
function shffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function runQuiz(quiz, quizNumber) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(`Quiz ${quizNumber}: Press Enter to start the quiz...`, () => {
        let score = 0;
        const shuffledQuestions = shffleArray(quiz.question);
        askQuestion(0);
        function askQuestion(index) {
            if (index < shuffledQuestions.length) {
                const question = shuffledQuestions[index];
                console.log(`Question ${index + 1}: ${question.question}`);
                for (let j = 0; j < question.options.length; j++) {
                    console.log(`${j + 1}. ${question.options[j]}`);
                }
                rl.question("Enter your answer (1, 2, 3, etc.): ", (userAnswer) => {
                    const userAnswerIndex = parseInt(userAnswer) - 1;
                    if (userAnswerIndex === question.correctAAnswerIndex) {
                        console.log("Correct!");
                        score++;
                    }
                    else {
                        console.log("Incorrect! The correct answer is: " +
                            question.options[question.correctAAnswerIndex]);
                    }
                    askQuestion(index + 1);
                });
            }
            else {
                rl.close();
                const percentageScore = (score / shuffledQuestions.length) * 100;
                console.log(`Quiz ${quizNumber} Complete! Your Score:
   ${score}/${shuffledQuestions.length} (${percentageScore}%)`);
            }
        }
    });
}
const myQuiz = {
    question: [
        {
            question: "Is typescropt case Sensitive?",
            options: ["no", "someone tiem", "yes"],
            correctAAnswerIndex: 2,
        },
        {
            question: "What is output console.log(2 + 2)",
            options: ["3", "4", "error"],
            correctAAnswerIndex: 1,
        },
        {
            question: "console.log(knowledge)",
            options: ["babar", "error", "yes "],
            correctAAnswerIndex: 1,
        },
    ],
};
runQuiz(myQuiz, 1);

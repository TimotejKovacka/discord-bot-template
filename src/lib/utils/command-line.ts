import { Interface } from 'readline';

export function askYesNoQuestion(question: string, rl: Interface): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const askQuestion = () => {
      rl.question(question, (answer) => {
        const formattedAnswer = answer.trim().toLowerCase();

        if (formattedAnswer === 'y' || formattedAnswer === 'yes') {
          resolve(true);
        } else if (formattedAnswer === 'n' || formattedAnswer === 'no') {
          resolve(false);
        } else if (formattedAnswer === '') {
          console.log("You must enter a response. Please answer ('Yes','Y','y') or ('No','N','n').");
          askQuestion(); // ask again for empty input
        } else {
          console.log("Invalid response. Please answer ('Yes','Y','y') or ('No','N','n').");
          askQuestion(); // ask again for invalid input
        }
      });
    };

    askQuestion();
  });
}

export function askOptionalString(question: string, rl: Interface): Promise<string | undefined> {
  return new Promise((resolve) => {
    rl.question(question + ' (or leave blank): ', (answer) => {
      resolve(answer === '' ? undefined : answer.trim());
    });
  });
}

export function askRequiredString(question: string, rl: Interface): Promise<string> {
  return new Promise((resolve) => {
    const query = () => {
      rl.question(question, (answer) => {
        const trimmedAnswer = answer.trim();
        if (trimmedAnswer === '') {
          console.log('This field is required. Please enter a value.');
          query(); // Ask again
        } else {
          resolve(trimmedAnswer);
        }
      });
    };
    query();
  });
}

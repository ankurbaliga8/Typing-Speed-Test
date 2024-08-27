const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span ');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');



let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    let paragraph = [
        "Programming is both an art and a science.",
        "The best way to predict the future is to create it.",
        "Innovation distinguishes between a leader and a follower.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "Your time is limited, don't waste it living someone else's life.",
        "The secret of getting ahead is getting started.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Success usually comes to those who are too busy to be looking for it.",
        "The only place where success comes before work is in the dictionary."
    ];
    // Selects a random sentence from the array basically pick a random index
    let randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";

    // Loop through each character of the selected sentence
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    // css for orange at 1st index
    typingText.querySelectorAll('span')[0].classList.add('active');

    // This is the logic you can start typing without clicking on input field
    document.addEventListener('keydown', () => input.focus());
    // This is the logic you can start typing by clicking on the text (not input field)
    typingText.addEventListener('click', () => input.focus());


}

// Handle user input
function initTyping(event) {
    // get all the characters of the sentence
    const char = typingText.querySelectorAll('span');
    // get the character of that particular index in the input field (start from 0 obviously ( we defined it above charIndex = 0))
    const typedChar = input.value.charAt(charIndex);

    // logic for backspace
    if (event.inputType === 'deleteContentBackward' && charIndex > 0) {
        // fixed the bug of backspace active color
        char[charIndex].classList.remove('active');
        // decrement the index of the character
        charIndex--;


        if (char[charIndex].classList.contains('correct')) {
            char[charIndex].classList.remove('correct');
        } else if (char[charIndex].classList.contains('incorrect')) {
            char[charIndex].classList.remove('incorrect');
            // decrement the mistake
            mistake--;
            // show the mistake while backspacing
            mistakes.innerHTML = mistake;
        }

        //  logic for typing
    }
    else if (charIndex < char.length && timeLeft > 0) {
        //  imp logic to start the timer by using flag logic 
        // (initially it was false, when you typed !isTyping if loop is triggered 
        // then we make it true so that it doesn't trigger again)
        if (!isTyping) {
            isTyping = true;
            timer = setInterval(() => {
                // fixed bug:- work till we reach the end of the sentence or till we reach 0
                if (timeLeft > 0 && charIndex < char.length) {
                    timeLeft--;
                    time.innerHTML = timeLeft;
                    // calculate and show the wpm and cpm
                    wpm.innerHTML = Math.round((charIndex / 5) / ((maxTime - timeLeft) / 60));
                    cpm.innerHTML = Math.round((charIndex) / ((maxTime - timeLeft) / 60));


                }  // logic when we reach the end of the sentence or time is up
                else {
                    clearInterval(timer);
                    isTyping = false;
                    input.disabled = true;
                }
            }, 1000);
        }
        // what we typed character matches with the character of the sentence
        if (char[charIndex].innerHTML === typedChar) {
            // then highlight the character with green color
            char[charIndex].classList.add('correct');
        } else {
            // else highlight the character with red color
            char[charIndex].classList.add('incorrect');
            // increment the mistake
            mistake++;
        }
        // increment the index of the character
        charIndex++;
        // add orange color to the next character
        char[charIndex].classList.add('active');
        // show the mistake while typing
        mistakes.innerHTML = mistake;
    }

}
// load the paragraph when the page is loaded, orange color at 1st index, as we start typing trigger the input event)
loadParagraph();
// typing function is triggered when we start typing
input.addEventListener('input', initTyping);
// reload the page when the tryAgain is clicked
btn.addEventListener('click', () => { window.location.reload(); });



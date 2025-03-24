// JavaScript will go here

// Particle system code for moving particles
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold the particles
let particles = [];

// Particle class to define individual particles
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Random size for each particle
    this.speedX = Math.random() * 3 - 1.5; // Random horizontal speed
    this.speedY = Math.random() * 3 - 1.5; // Random vertical speed
    this.color = 'rgba(255, 255, 255, 0.5)'; // White color with transparency
  }

  // Method to update the position of the particle
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Recycle the particle back to the top if it goes off the screen
    if (this.size <= 0) {
      this.x = Math.random() * canvas.width;
      this.y = -10;
    }

    // Draw the particle
    this.draw();
  }

  // Method to draw the particle on the canvas
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

// Create particles
function createParticles(e) {
  const xPos = e.x;
  const yPos = e.y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(xPos, yPos));
  }
}

// Animate the particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(); // Update and draw each particle
  }

  // Remove particles that are too small
  particles = particles.filter(particle => particle.size > 0);

  requestAnimationFrame(animateParticles); // Loop the animation
}

// Event listener to create particles when mouse moves
window.addEventListener('mousemove', createParticles);

// Start the animation
animateParticles();

// Resize the canvas if the window size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Game logic for spelling game

let isSpeaking = false;
let currentWord = '';
let voices = window.speechSynthesis.getVoices();
let femaleVoice = voices.find(voice => voice.name === "Google UK English Female");

// Function to stop any ongoing speech
function stopSpeaking() {
  window.speechSynthesis.cancel();
}

// Function to play the voice for incorrect answers
function playIncorrectVoice() {
  stopSpeaking();  // Stop previous speech
  let message = "The word you typed is incorrect.";  // Message to say when the answer is wrong
  let speech = new SpeechSynthesisUtterance(message);
  speech.voice = femaleVoice;  // Use female voice
  window.speechSynthesis.speak(speech);
}

// Function to play the voice for correct answers
function playCorrectVoice() {
  stopSpeaking();  // Stop previous speech
  let message = "Your answer is correct.";  // Message to say when the answer is correct
  let speech = new SpeechSynthesisUtterance(message);
  speech.voice = femaleVoice;  // Use female voice
  window.speechSynthesis.speak(speech);
}

// Function to play the spelling voice, ensuring no overlap
function playSpellingVoice(word, callback) {
  if (isSpeaking) return; // Prevents overlap of voices

  stopSpeaking();  // Stop previous speech
  isSpeaking = true;
  let message = "Spell the word " + word;  // Message to say when it's time to spell the word
  let speech = new SpeechSynthesisUtterance(message);
  speech.voice = femaleVoice;  // Use female voice
  window.speechSynthesis.speak(speech);

  speech.onend = function () {
    isSpeaking = false;  // Allow the next voice to play once the current one ends
    if (callback) callback();  // Move to next step after speaking finishes

    // Repeat the word one more time for clarity
    let repeatSpeech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(repeatSpeech);
  };
}

// Checking the user's answer
function checkAnswer() {
  const userInput = document.getElementById('userInput').value;
  const correctAnswer = currentWord.toLowerCase();

  // Handle the user's answer
  if (userInput.toLowerCase() === correctAnswer) {
    playCorrectVoice();  // Play voice if correct answer
    document.getElementById('message').textContent = "";  // Clear previous messages
    setTimeout(nextWord, 2000); // Wait for 2 seconds before moving to the next word
  } else {
    // Show the correct word after a wrong answer
    document.getElementById('message').textContent = "The correct word is: " + correctAnswer;
    playIncorrectVoice();  // Play voice if incorrect answer
    setTimeout(nextWord, 2000); // Wait for 2 seconds before moving to the next word
  }

  // Clear the input after checking the answer
  document.getElementById('userInput').value = '';
}

// Function to move to the next word
function nextWord() {
  currentWord = getNextWord();  // Define this to get the next word in sequence
  playSpellingVoice(currentWord, function() {
    // After speaking the word, wait for the user to spell it
  });

  // Clear the message after next word
  document.getElementById('message').textContent = '';
}

// Simulate getting the next word (you could replace this with an actual list of words)
function getNextWord() {
  const words = ['cat', 'dog', 'apple', 'ball', 'tree', 'house', 'sun', 'moon', 'star', 'flower', 'bird', 'fish', 'book', 'cup', 'pen', 'desk', 'chair', 'shoe', 'hand', 'foot', 
  'window', 'door', 'car', 'bus', 'hat', 'sock', 'apple', 'banana', 'orange', 'keyboard', 'mouse', 'clock', 'doggy', 'kitty', 'parrot', 'rain', 'snow', 'cloud', 'computer', 'mountain', 'bicycle', 'universe', 'elephant', 'football', 'rainbow', 'island', 'jungle', 'forest', 'cupcake', 'orange', 'telephone', 'soccer', 'guitar', 
  'kangaroo', 'city', 'airport', 'travelling', 'swimming', 'candle', 'school', 'library', 'rocket', 'highway', 'volcano', 'giraffe', 'piano', 'robot', 'grape', 'lemon', 
  'education', 'vacation', 'adventure', 'rainstorm', 'butterfly', 'waterfall', 'compass', 'pyramid', 'parachute', 'treasure', 'mountain', 'hurricane', 'zebra', 'woodland',  'development', 'programming', 'algorithm', 'javascript', 'architecture', 'information', 'equilibrium', 'hypothesis', 'mathematics', 'philosophy', 'creativity', 'computation', 
  'experiment', 'processor', 'innovation', 'integrity', 'psychology', 'sociology', 'microbiology', 'neurology', 'chemistry', 'communication', 'database', 'statistics', 
  'equation', 'feedback', 'cipher', 'component', 'exponent', 'hypothesis', 'scalability', 'optimization', 'antibody', 'mathematics', 'parameter', 'strategy', 'feedback', 
  'reliability', 'debugging', 'synchronization', 'abstraction', 'complexity', 'resolution', 'software', 'cloud', 'digital', 'repository', 'technology', 'pneumonoultramicroscopicsilicovolcanoconiosis', 'supercalifragilisticexpialidocious', 'floccinaucinihilipilification', 'hippopotomonstrosesquipedaliophobia', 
  'antidisestablishmentarianism', 'triskaidekaphobia', 'dermatoglyphics', 'uncharacteristically', 'incomprehensibilities', 'anticonstitutionally', 'overcompensated', 
  'counterproductive', 'photoautotrophically', 'unconstitutional', 'unsystematically', 'microangiopathies', 'hippopotomonstrosesquipedaliophobia', 'intercontinental', 
  'thermodynamically', 'unbelievably', 'overindulgence', 'misunderstanding', 'epidemiologically', 'unbelievability', 'counterintuitively', 'disenfranchisement', 
  'spectrophotometrically', 'unforeseeably', 'subcompartmentalized', 'floccinaucinihilipilification', 'photoautotrophically', 'counterproductively', 'hypermetropia'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Initialize the game
currentWord = getNextWord();
playSpellingVoice(currentWord, function() {
  // After the first word is spoken, the game starts and waits for user input
});

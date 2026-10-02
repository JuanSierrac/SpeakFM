/* ════════════════════════════════════════
   Speak FM · data-a1.js
   Lecciones A1–A2  (solo lectura, sin listening)
   6 preguntas por lección
   ════════════════════════════════════════ */

/** Estado inicial de demo: ninguna lección completada. */
const MOCK_A1_PROGRESS = {
  completedLessonIds: [],
};

/**
 * Lecciones del nivel básico.
 * type: 'reading'  (listening eliminado)
 * Se desbloquean en orden (1 → 6).
 */
const A1_LESSONS = [
  {
    id: 1,
    type: 'reading',
    title: 'Hello',
    story: `
      <p>This is Maya. She is a
      <span class="word-highlight" data-word="journalist" data-def="Journalist: a person who writes news stories.">journalist</span>.</p>
      <p>Every day she says hello to people. She smiles. She asks simple questions.</p>
      <p>"Hello. My name is Maya. What is your name?"</p>
      <p>Today Maya is at an old
      <span class="word-highlight" data-word="radio" data-def="Radio: a machine that plays sound and news.">radio</span>
      station. She is ready to start a new story.</p>
      <p>Maya carries a small
      <span class="word-highlight" data-word="notebook" data-def="Notebook: a book for writing notes.">notebook</span>.
      She writes words in it every day.</p>
      <p>She looks around the station. Everything is
      <span class="word-highlight" data-word="quiet" data-def="Quiet: with little or no sound.">quiet</span>.
      She is not afraid. She is excited.</p>
    `,
    quiz: [
      { q: 'What is Maya\'s job?', options: ['Teacher', 'Journalist', 'Driver'], answer: 1 },
      { q: 'What does Maya say to people every day?', options: ['Goodbye', 'Hello', 'Sorry'], answer: 1 },
      { q: 'Where is Maya today?', options: ['At school', 'At an old radio station', 'At home'], answer: 1 },
      { q: 'What does Maya carry with her?', options: ['A camera', 'A small notebook', 'A map'], answer: 1 },
      { q: 'How does Maya feel at the station?', options: ['Afraid and sad', 'Excited and not afraid', 'Bored and tired'], answer: 1 },
      { q: 'What does Maya write in her notebook?', options: ['Songs', 'Words', 'Phone numbers'], answer: 1 },
    ],
  },
  {
    id: 2,
    type: 'reading',
    title: 'My name',
    story: `
      <p>Maya opens her notebook. She writes: "My name is Maya Reyes."</p>
      <p>She is from the city. She likes coffee. She does not like waiting.</p>
      <p>A man at the station says, "Nice to meet you." Maya says, "Nice to meet you too."</p>
      <p>The man's name is Carlos. He works at the station every day. He is
      <span class="word-highlight" data-word="friendly" data-def="Friendly: kind and pleasant to other people.">friendly</span>.</p>
      <p>Maya asks, "Do you know this station well?" Carlos says, "Yes. I have worked here for ten years."</p>
      <p>Maya writes his name in her
      <span class="word-highlight" data-word="notebook" data-def="Notebook: a book for writing notes.">notebook</span>.
      He is her first contact at the station.</p>
    `,
    quiz: [
      { q: 'What does Maya write first in her notebook?', options: ['A song', 'Her name', 'A phone number'], answer: 1 },
      { q: 'What does Maya like?', options: ['Waiting', 'Coffee', 'Rain'], answer: 1 },
      { q: 'What does Carlos say when he meets Maya?', options: ['Go away', 'Nice to meet you', 'See you later'], answer: 1 },
      { q: 'How long has Carlos worked at the station?', options: ['One year', 'Five years', 'Ten years'], answer: 2 },
      { q: 'How is Carlos described?', options: ['Unfriendly', 'Friendly', 'Quiet'], answer: 1 },
      { q: 'What does Maya write in her notebook after talking to Carlos?', options: ['His job', 'His name', 'His address'], answer: 1 },
    ],
  },
  {
    id: 3,
    type: 'reading',
    title: 'The radio',
    story: `
      <p>Maya looks at the radio. The lights are on. She hears a
      <span class="word-highlight" data-word="sound" data-def="Sound: something you can hear.">sound</span>.</p>
      <p>It is not music. It is a short sound, then a long sound.</p>
      <p>Maya says, "Hello? Is someone there?" Nobody answers. She
      <span class="word-highlight" data-word="listens" data-def="To listen: to pay attention to a sound.">listens</span>
      again.</p>
      <p>She puts her hand near the radio. She can feel a small
      <span class="word-highlight" data-word="vibration" data-def="Vibration: a small, fast movement back and forth.">vibration</span>.</p>
      <p>Maya writes in her notebook: "Strange sound. Short, then long. Repeats."</p>
      <p>She is
      <span class="word-highlight" data-word="curious" data-def="Curious: wanting to know or learn about something.">curious</span>.
      She wants to understand the sound. She decides to stay.</p>
    `,
    quiz: [
      { q: 'Are the radio lights on?', options: ['No', 'Yes', 'We do not know'], answer: 1 },
      { q: 'What kind of sound does Maya hear?', options: ['Music', 'A short then long sound', 'Someone talking'], answer: 1 },
      { q: 'What does Maya do after nobody answers?', options: ['She sleeps', 'She listens again', 'She leaves'], answer: 1 },
      { q: 'What does Maya feel near the radio?', options: ['Heat', 'A small vibration', 'Cold air'], answer: 1 },
      { q: 'What does Maya write in her notebook?', options: ['Carlos\'s name', 'Notes about the strange sound', 'The station address'], answer: 1 },
      { q: 'What does Maya decide to do?', options: ['Call for help', 'Stay and understand the sound', 'Turn off the radio'], answer: 1 },
    ],
  },
  {
    id: 4,
    type: 'reading',
    title: 'The message',
    story: `
      <p>Maya listens to the sound again. Short, short, short. Long. Short, short, short.</p>
      <p>She
      <span class="word-highlight" data-word="recognizes" data-def="To recognize: to know something because you have seen or heard it before.">recognizes</span>
      the pattern. It is Morse code. The letters are S-O-S.</p>
      <p>SOS means: help me. Someone is sending a
      <span class="word-highlight" data-word="signal" data-def="Signal: a sound or action used to send information.">signal</span>
      for help.</p>
      <p>Maya feels her heart beat fast. This is not a normal radio sound. Someone needs help.</p>
      <p>She checks the radio. The signal comes from a place in the old part of the city, near an
      <span class="word-highlight" data-word="archive" data-def="Archive: a place where old and important documents are kept.">archive</span>.</p>
      <p>Maya closes her notebook. She knows what to do next. Tomorrow, she will go there.</p>
    `,
    quiz: [
      { q: 'What is the pattern Maya hears?', options: ['A song', 'Morse code', 'Someone talking'], answer: 1 },
      { q: 'What do the letters S-O-S mean?', options: ['Hello there', 'Help me', 'Good night'], answer: 1 },
      { q: 'How does Maya feel when she understands the signal?', options: ['Bored', 'Her heart beats fast', 'She is happy and calm'], answer: 1 },
      { q: 'Where does the signal come from?', options: ['The new part of the city', 'The old part of the city near an archive', 'Outside the city'], answer: 1 },
      { q: 'Is the sound a normal radio sound?', options: ['Yes, it is normal', 'No, it is not normal', 'We do not know'], answer: 1 },
      { q: 'What does Maya plan to do tomorrow?', options: ['Call the police', 'Go to the place where the signal comes from', 'Leave the city'], answer: 1 },
    ],
  },
  {
    id: 5,
    type: 'reading',
    title: 'The archive',
    story: `
      <p>The next day, Maya goes to the old part of the city. She finds the
      <span class="word-highlight" data-word="archive" data-def="Archive: a place where old and important documents are kept.">archive</span>.</p>
      <p>It is a big, old building. The door is heavy. Inside, she smells old paper.</p>
      <p>A man is sitting at a desk. He looks at Maya. He does not smile.</p>
      <p>"I want to see the old files," says Maya. She shows her
      <span class="word-highlight" data-word="badge" data-def="Badge: a small card or sign that shows who you are or what you do.">badge</span>.
      "I am a journalist."</p>
      <p>The man hesitates. Then he says, "Follow me." He is not happy, but he takes her to a small room in the back.</p>
      <p>In the room, there is one
      <span class="word-highlight" data-word="folder" data-def="Folder: a cover used to hold documents together.">folder</span>
      on the table. Maya opens it. The first page says: <em>CLASSIFIED — 1987.</em></p>
    `,
    quiz: [
      { q: 'Where does Maya go the next day?', options: ['To the radio station', 'To the old archive', 'To Carlos\'s house'], answer: 1 },
      { q: 'What does the archive smell of?', options: ['Coffee', 'Old paper', 'Paint'], answer: 1 },
      { q: 'What does Maya show to the man at the desk?', options: ['Her passport', 'Her badge', 'A letter'], answer: 1 },
      { q: 'Is the man at the desk happy to help Maya?', options: ['Yes, he is very happy', 'No, he is not happy', 'He does not see her'], answer: 1 },
      { q: 'What is in the small room?', options: ['A computer', 'One folder on the table', 'Many people'], answer: 1 },
      { q: 'What does the first page of the folder say?', options: ['Hello Maya', 'CLASSIFIED — 1987', 'Open tomorrow'], answer: 1 },
    ],
  },
  {
    id: 6,
    type: 'reading',
    title: 'Tomorrow',
    story: `
      <p>Maya reads the folder. The words are difficult, but she understands the important parts.</p>
      <p>The radio station was used for something
      <span class="word-highlight" data-word="secret" data-def="Secret: something known only to a few people and not shared with others.">secret</span>
      in 1987. Many people did not know about it.</p>
      <p>Maya closes her notebook. It is late. She is
      <span class="word-highlight" data-word="tired" data-def="Tired: you need rest.">tired</span>,
      but she is also happy.</p>
      <p>"Tomorrow I will go back to the radio station," she says. "I want to find out more. I want to help."</p>
      <p>She turns off the radio at the archive. "Good night," she
      <span class="word-highlight" data-word="whispers" data-def="Whispers: speaks very quietly.">whispers</span>.
      The building is quiet.</p>
      <p>Maya walks out into the night. She has a big story. She has many questions. But she is not afraid. She is ready.</p>
    `,
    quiz: [
      { q: 'What was the radio station used for in 1987?', options: ['Music', 'Something secret', 'Weather reports'], answer: 1 },
      { q: 'How does Maya feel at the end?', options: ['Angry and sad', 'Tired but also happy', 'Lost and confused'], answer: 1 },
      { q: 'Where will Maya go tomorrow?', options: ['The beach', 'Back to the radio station', 'To a hotel'], answer: 1 },
      { q: 'What does Maya say before she leaves the archive?', options: ['Good morning', 'Good night', 'Help me'], answer: 1 },
      { q: 'Does Maya have many questions at the end?', options: ['No, she knows everything', 'Yes, she has many questions', 'She forgets her questions'], answer: 1 },
      { q: 'How does Maya feel about her story?', options: ['She is afraid', 'She is not afraid and is ready', 'She wants to stop'], answer: 1 },
    ],
  },
];

/** Número total de lecciones A1 (para validar el desbloqueo de B1). */
function a1LessonCount() {
  return A1_LESSONS.length;
}

function getA1Lesson(id) {
  return A1_LESSONS.find((l) => l.id === id);
}

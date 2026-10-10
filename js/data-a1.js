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
      <p>Sarah walks into a new
      <span class="word-highlight" data-word="coffee shop" data-def="Coffee shop: a place where people buy and drink coffee or tea.">coffee shop</span>
      near her apartment every morning.</p>
      <p>Today, a friendly barista smiles and says "Hello!" to her.</p>
      <p>Sarah orders a hot cup of tea and a fresh croissant.</p>
      <p>She sits by the window and watches people go to work.</p>
      <p>It is a
      <span class="word-highlight" data-word="peaceful" data-def="Peaceful: quiet and calm, without noise or worry.">peaceful</span>
      way to start her day.</p>
    `,
    quiz: [
      { q: 'Where does Sarah go every morning?', options: ['A bakery', 'A new coffee shop', 'A supermarket'], answer: 1 },
      { q: 'Who says "Hello!" to Sarah?', options: ['A friendly barista', 'Her neighbor', 'A bus driver'], answer: 0 },
      { q: 'What does Sarah order to drink?', options: ['Black coffee', 'Orange juice', 'A hot cup of tea'], answer: 2 },
      { q: 'Where does she sit?', options: ['Near the door', 'By the window', 'Outside'], answer: 1 },
      { q: 'How does she feel about her morning?', options: ['It is peaceful', 'It is stressful', 'It is boring'], answer: 0 },
      { q: 'What does she watch while sitting?', options: ['Cars passing by', 'People go to work', 'Television'], answer: 1 },
    ],
  },
  {
    id: 2,
    type: 'reading',
    title: 'My name',
    story: `
      <p>David is a new student in an evening
      <span class="word-highlight" data-word="English class" data-def="English class: a lesson where people learn the English language.">English class</span>.</p>
      <p>On the first day, the teacher asks everyone to introduce themselves.</p>
      <p>David stands up and says, "My name is David, and I am from Canada."</p>
      <p>He explains that he moved to the city two weeks ago for his new job.</p>
      <p>The other students
      <span class="word-highlight" data-word="welcome" data-def="To welcome: to greet someone nicely when they arrive.">welcome</span>
      him warmly.</p>
    `,
    quiz: [
      { q: 'What kind of class is David taking?', options: ['An evening English class', 'A morning Spanish class', 'A cooking class'], answer: 0 },
      { q: 'What does the teacher ask the students to do?', options: ['Read a book', 'Introduce themselves', 'Take a test'], answer: 1 },
      { q: 'Where is David from?', options: ['Australia', 'England', 'Canada'], answer: 2 },
      { q: 'When did David move to the city?', options: ['Two days ago', 'Two weeks ago', 'Two months ago'], answer: 1 },
      { q: 'Why did David move?', options: ['For a vacation', 'For university', 'For his new job'], answer: 2 },
      { q: 'How do the other students react?', options: ['They ignore him', 'They welcome him warmly', 'They leave the room'], answer: 1 },
    ],
  },
  {
    id: 3,
    type: 'reading',
    title: 'The radio',
    story: `
      <p>Mark loves listening to music while cooking dinner.</p>
      <p>He turns on the radio in his
      <span class="word-highlight" data-word="kitchen" data-def="Kitchen: a room where food is prepared and cooked.">kitchen</span>
      every evening at six o'clock.</p>
      <p>Today, the radio plays his favorite old rock song.</p>
      <p>He cooks pasta and
      <span class="word-highlight" data-word="sings" data-def="To sing: to make musical sounds with your voice.">sings</span>
      along loudly.</p>
      <p>Cooking is much more fun with good music.</p>
    `,
    quiz: [
      { q: 'What does Mark like to do while cooking dinner?', options: ['Watch television', 'Listen to music', 'Talk on the phone'], answer: 1 },
      { q: 'Where is the radio located?', options: ['In the living room', 'In the bedroom', 'In the kitchen'], answer: 2 },
      { q: 'What time does he turn on the radio?', options: ['At six o\'clock', 'At seven o\'clock', 'At eight o\'clock'], answer: 0 },
      { q: 'What is Mark cooking today?', options: ['Pizza', 'Pasta', 'Soup'], answer: 1 },
      { q: 'What kind of song plays on the radio?', options: ['A pop song', 'An old rock song', 'A jazz song'], answer: 1 },
      { q: 'How does he feel about cooking with music?', options: ['It is boring', 'It is difficult', 'It is much more fun'], answer: 2 },
    ],
  },
  {
    id: 4,
    type: 'reading',
    title: 'The message',
    story: `
      <p>Elena receives a text
      <span class="word-highlight" data-word="message" data-def="Message: a written piece of information sent to someone.">message</span>
      on her phone during lunch.</p>
      <p>It is from her brother, Luis.</p>
      <p>The message says, "Don't forget our mother's birthday party tonight at seven!"</p>
      <p>Elena quickly checks her clock and realizes she needs to buy a gift after work.</p>
      <p>She
      <span class="word-highlight" data-word="replies" data-def="To reply: to answer someone by writing or speaking.">replies</span>
      with a thumbs-up emoji and smiles.</p>
    `,
    quiz: [
      { q: 'When does Elena receive a text message?', options: ['During breakfast', 'During lunch', 'Late at night'], answer: 1 },
      { q: 'Who sends the message?', options: ['Her mother', 'Her friend', 'Her brother'], answer: 2 },
      { q: 'What event is taking place tonight?', options: ['A birthday party', 'A dinner with friends', 'A movie night'], answer: 0 },
      { q: 'What does Elena need to buy after work?', options: ['Groceries', 'A gift', 'A dress'], answer: 1 },
      { q: 'How does Elena reply?', options: ['With a voice note', 'With a thumbs-up emoji', 'With a long text'], answer: 1 },
      { q: 'What is Elena\'s reaction after reading it?', options: ['She gets angry', 'She smiles', 'She starts crying'], answer: 1 },
    ],
  },
  {
    id: 5,
    type: 'reading',
    title: 'The archive',
    story: `
      <p>Laura works as an assistant in a public
      <span class="word-highlight" data-word="library" data-def="Library: a building where books and public documents are kept.">library</span>.</p>
      <p>Her main job today is organizing old town history documents in the archive room.</p>
      <p>The room is quiet and smells like old paper.</p>
      <p>She finds an interesting photograph of the main street from fifty years ago.</p>
      <p>She carefully places it in a
      <span class="word-highlight" data-word="blue folder" data-def="Blue folder: a blue cover used to keep papers organized.">blue folder</span>.</p>
    `,
    quiz: [
      { q: 'Where does Laura work?', options: ['In a bookstore', 'In a public library', 'In a museum'], answer: 1 },
      { q: 'What is her main job today?', options: ['Cleaning the floor', 'Helping visitors find books', 'Organizing old documents in the archive'], answer: 2 },
      { q: 'What does the archive room smell like?', options: ['Old paper', 'Fresh coffee', 'Flowers'], answer: 0 },
      { q: 'What does Laura find?', options: ['An old map', 'An interesting photograph', 'A lost key'], answer: 1 },
      { q: 'What color is the folder where she places the photograph?', options: ['Red', 'Green', 'Blue'], answer: 2 },
      { q: 'How old is the photograph she finds?', options: ['Ten years old', 'Fifty years old', 'A hundred years old'], answer: 1 },
    ],
  },
  {
    id: 6,
    type: 'reading',
    title: 'Tomorrow',
    story: `
      <p>Tom is planning his
      <span class="word-highlight" data-word="weekend" data-def="Weekend: Saturday and Sunday, the days when people usually do not work.">weekend</span>.</p>
      <p>Tomorrow is Saturday, and he wants to relax.</p>
      <p>He plans to wake up late, go for a walk in the park, and meet his friends for lunch.</p>
      <p>In the evening, he wants to read a new novel.</p>
      <p>Tom is excited because he worked hard all week.</p>
    `,
    quiz: [
      { q: 'What day is tomorrow for Tom?', options: ['Friday', 'Saturday', 'Sunday'], answer: 1 },
      { q: 'What does Tom plan to do in the morning?', options: ['Wake up early', 'Wake up late and walk in the park', 'Go to the gym'], answer: 1 },
      { q: 'Who will Tom meet for lunch?', options: ['His coworkers', 'His family', 'His friends'], answer: 2 },
      { q: 'What does he want to do in the evening?', options: ['Watch a movie', 'Read a new novel', 'Go to a concert'], answer: 1 },
      { q: 'Why is Tom excited about tomorrow?', options: ['Because he worked hard all week', 'Because he is going on a trip', 'Because it is his birthday'], answer: 0 },
      { q: 'How does Tom feel about the upcoming day?', options: ['Sad', 'Excited', 'Worried'], answer: 1 },
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
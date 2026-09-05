/* ════════════════════════════════════════
   Speak FM · app.js
   ════════════════════════════════════════ */

/* ─── ESTADO GLOBAL ─── */
const state = {
  phase: 'onboarding',   // 'onboarding' | 'main'
  level: null,
  levelLocked: false,
  currentTab: 'historia',
  completedEps: [],
  savedWords: [],
  conversations: 0,
  currentEp: null,
};

/* ─── DATOS DE EPISODIOS ─── */
const EPISODES = [
  {
    id: 1,
    title: 'La señal',
    story: `
      <p>Maya Reyes arrives at the old radio station just as the last afternoon light falls on the metal antennas.
      She carries her recorder on one shoulder and a notebook filled with questions that nobody wants to answer.</p>
      <p>Inside, the console still glows. Someone was here recently. She notices a
      <span class="word-highlight" data-word="frequency" data-def="A radio frequency is the number of oscillations per second of an electromagnetic wave.">frequency</span>
      tuned to an
      <span class="word-highlight" data-word="abandoned" data-def="Abandoned: left behind, no longer used or occupied.">abandoned</span>
      band — static, but with a pattern underneath.</p>
      <p>"Who would broadcast here?" she
      <span class="word-highlight" data-word="mutters" data-def="To mutter: to speak quietly and indistinctly, often to oneself.">mutters</span>.
      She hits record. The pattern repeats: three short pulses, one long, three short. She
      <span class="word-highlight" data-word="recognizes" data-def="To recognize: to identify something from previous knowledge.">recognizes</span>
      it. Morse code. The letter S-O-S.</p>
      <p>Someone is calling for help on a frequency the world
      <span class="word-highlight" data-word="abandoned" data-def="Abandoned: left behind, no longer used or occupied.">abandoned</span>
      decades ago. Maya checks the signal's
      <span class="word-highlight" data-word="origin" data-def="Origin: the point where something begins, the source.">origin</span>.
      The coordinates point to the old
      <span class="word-highlight" data-word="archive" data-def="Archive: a collection of historical records or documents.">archive</span>
      downtown. She closes her notebook. Tomorrow, she goes there.</p>
    `,
    char: { name: 'Maya Reyes', role: 'Periodista investigadora', emoji: '🎙️' },
    charGreeting: "Hi. I wasn't expecting anyone here. You read my story? What did you think about the signal I found?",
    quiz: [
      {
        q: 'Where does Maya arrive at the beginning of the story?',
        options: ['The city harbour', 'An old radio station', 'A hotel lobby'],
        answer: 1,
      },
      {
        q: 'What message does Maya recognize in Morse code?',
        options: ['S-O-S', 'C-I-A', 'E-N-D'],
        answer: 0,
      },
      {
        q: 'Where do the signal coordinates point?',
        options: ['A shopping centre', 'The old archive downtown', 'A warehouse across the border'],
        answer: 1,
      },
    ],
    charGreetingC1: "You made it through the first transmission, then. Most people hear static and walk away. What did the pattern tell you — and what would you have done with those coordinates?",
    storyC1: `
      <p>Maya Reyes reaches the
      <span class="word-highlight" data-word="dilapidated" data-def="Dilapidated: in a state of disrepair or ruin as a result of age or neglect.">dilapidated</span>
      radio station as dusk drains the last colour from the antennas. The place has the air of a crime scene that nobody has bothered to tape off.</p>
      <p>Inside, the console is still warm. Whoever operated it left in a hurry — or wanted her to believe they had. She isolates a
      <span class="word-highlight" data-word="frequency" data-def="Frequency: here, a specific radio channel; the rate at which a wave oscillates.">frequency</span>
      that official charts list as
      <span class="word-highlight" data-word="decommissioned" data-def="Decommissioned: formally taken out of active service.">decommissioned</span>.
      Beneath the static sits a pattern too regular to be
      <span class="word-highlight" data-word="coincidental" data-def="Coincidental: happening by chance, without a causal connection.">coincidental</span>.</p>
      <p>She records it, then
      <span class="word-highlight" data-word="deciphers" data-def="To decipher: to succeed in interpreting something obscure or coded.">deciphers</span>
      three short pulses, one long, three short: Morse for S-O-S. A distress call on a band the world
      <span class="word-highlight" data-word="consigned" data-def="To consign: to send something away or relegate it, often permanently.">consigned</span>
      to silence decades ago.</p>
      <p>Triangulating the
      <span class="word-highlight" data-word="origin" data-def="Origin: the source or starting point of something.">origin</span>
      takes minutes. The coordinates fall on the municipal
      <span class="word-highlight" data-word="archive" data-def="Archive: a repository of historical records and documents.">archive</span>
      downtown — a building that, on paper, holds nothing but paper. Maya does not believe paper is all it holds.</p>
    `,
    quizC1: [
      {
        q: 'What leads Maya to conclude that someone used the console recently?',
        options: ['The antennas are still moving', 'The console is still warm', 'She finds a signed guestbook'],
        answer: 1,
      },
      {
        q: 'Why is the SOS on this particular band so unsettling?',
        options: [
          'The frequency was formally taken out of service decades ago',
          'Morse code is illegal to broadcast',
          'The station belongs to her newspaper',
        ],
        answer: 0,
      },
      {
        q: 'What inference does Maya draw from the coordinates?',
        options: [
          'The signal is a prank from the harbour',
          'The archive may conceal more than ordinary records',
          'Harlan Voss is waiting for her there',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'El archivo',
    story: `
      <p>The city archive smells of damp paper and old ink. Maya navigates through rows of metal shelves,
      looking for the file referenced in the signal coordinates.</p>
      <p>A clerk eyes her
      <span class="word-highlight" data-word="suspiciously" data-def="Suspiciously: with distrust or doubt about someone's motives.">suspiciously</span>.
      "Those files are
      <span class="word-highlight" data-word="restricted" data-def="Restricted: limited to authorised people only.">restricted</span>,"
      he says. Maya shows her press badge. He hesitates, then
      <span class="word-highlight" data-word="reluctantly" data-def="Reluctantly: unwillingly; doing something you don't want to do.">reluctantly</span>
      leads her to a back room.</p>
      <p>Inside is a single manila folder, thick with documents. The top page bears a
      <span class="word-highlight" data-word="classified" data-def="Classified: designated as secret or confidential by a government or authority.">classified</span>
      stamp — but the stamp is from 1987. The statute of limitations has expired. She can read it legally.</p>
      <p>What she finds changes everything she thought she knew about the old broadcast tower.</p>
    `,
    char: { name: 'Archivo · Clerk', role: 'Empleado del archivo municipal', emoji: '📁' },
    charGreeting: "You found the file, didn't you. Look, I already told the journalist — those documents were sealed for a reason. What exactly are you looking for?",
    quiz: [
      {
        q: 'What does the city archive smell of?',
        options: ['Fresh coffee and soap', 'Damp paper and old ink', 'Smoke and petrol'],
        answer: 1,
      },
      {
        q: 'Why does the clerk first refuse to help Maya?',
        options: ['The files are restricted', 'The archive is closed', 'He does not speak English'],
        answer: 0,
      },
      {
        q: 'Why can Maya legally read the classified folder?',
        options: ['The clerk gives her a special key', 'The stamp is from 1987 and the time limit has expired', 'The documents were never secret'],
        answer: 1,
      },
    ],
    charGreetingC1: "You saw the folder. Don't pretend you didn't. Sealed files have a way of staying sealed for reasons that outlive the stamp. What do you think they were trying to bury?",
    storyC1: `
      <p>The municipal archive smells of damp paper and the faintly sweet
      <span class="word-highlight" data-word="decay" data-def="Decay: the process of rotting or declining over time.">decay</span>
      of ink. Maya moves along the aisles with the coordinates memorised, aware that asking the wrong question here is itself a kind of confession.</p>
      <p>A clerk watches her with
      <span class="word-highlight" data-word="undisguised" data-def="Undisguised: not hidden; open and obvious.">undisguised</span>
      suspicion. "Those files are
      <span class="word-highlight" data-word="restricted" data-def="Restricted: limited to people with official permission.">restricted</span>,"
      he says, as if the word were a lock. Maya produces her press credentials. He
      <span class="word-highlight" data-word="capitulates" data-def="To capitulate: to give in after resistance; to yield.">capitulates</span>
      only after a long, unhappy silence, and escorts her to a windowless room.</p>
      <p>The manila folder is thicker than it has any right to be. A
      <span class="word-highlight" data-word="classified" data-def="Classified: officially designated as secret.">classified</span>
      stamp from 1987 still
      <span class="word-highlight" data-word="asserts" data-def="To assert: to state or insist on something firmly.">asserts</span>
      authority — but the statute of limitations has lapsed. The secrecy is theatre now. The contents are not.</p>
      <p>What she reads
      <span class="word-highlight" data-word="implicates" data-def="To implicate: to show that someone is involved in a crime or wrongdoing.">implicates</span>
      the old broadcast tower in something that was never meant to air.</p>
    `,
    quizC1: [
      {
        q: 'How does the clerk initially treat Maya’s request?',
        options: [
          'He is eager to help a journalist',
          'He treats “restricted” as a reason to refuse her',
          'He claims the archive burned down',
        ],
        answer: 1,
      },
      {
        q: 'Why does the 1987 stamp no longer function as a legal barrier?',
        options: [
          'Maya has a court order',
          'The time limit on secrecy has expired',
          'The clerk destroys the stamp',
        ],
        answer: 1,
      },
      {
        q: 'What is the essential revelation of the folder?',
        options: [
          'The tower was involved in activity that was never meant to be broadcast',
          'The archive is moving to a new building',
          'Maya’s press badge is fake',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 3,
    title: 'El informante',
    story: `
      <p>A voicemail arrives at 3 a.m. on Maya's burner phone: "You found the folder. Don't trust the tower's
      owner. Meet me at the harbor at noon. Come alone."</p>
      <p>The voice is
      <span class="word-highlight" data-word="distorted" data-def="Distorted: altered or twisted out of its original shape; here, electronically changed to hide identity.">distorted</span>,
      but the urgency is clear. Maya records the message, then
      <span class="word-highlight" data-word="deciphers" data-def="To decipher: to succeed in understanding something difficult or hard to read.">deciphers</span>
      a subtle background sound — seagulls and a foghorn. The harbor it is.</p>
      <p>At noon, a figure in a grey coat sits on a bench facing the water. He doesn't turn around when she
      approaches. "I was an
      <span class="word-highlight" data-word="engineer" data-def="Engineer: a person who designs, builds, or maintains engines, machines, or structures.">engineer</span>
      at the tower," he says. "I know what they were really
      <span class="word-highlight" data-word="broadcasting" data-def="To broadcast: to transmit a programme or information by radio or television.">broadcasting</span>."</p>
    `,
    char: { name: 'El Informante', role: 'Exingeniero (identidad desconocida)', emoji: '🕵️' },
    charGreeting: "You came alone. Good. I don't have much time. Ask me one thing — make it count.",
    quiz: [
      {
        q: 'When does the voicemail arrive?',
        options: ['At 3 a.m.', 'At noon', 'On Sunday morning'],
        answer: 0,
      },
      {
        q: 'Where must Maya meet the caller?',
        options: ['At the radio station', 'At the harbour at noon', 'In a hotel lobby'],
        answer: 1,
      },
      {
        q: 'Who does the man in the grey coat say he was?',
        options: ['The owner of the tower', 'A journalist', 'An engineer at the tower'],
        answer: 2,
      },
    ],
    charGreetingC1: "You came alone. If you hadn't, I'd already be gone. You get one question that matters. Don't waste it on small talk.",
    storyC1: `
      <p>The voicemail lands at 3 a.m. on a
      <span class="word-highlight" data-word="disposable" data-def="Disposable: intended to be used once and then thrown away; here, a cheap untraceable phone.">disposable</span>
      phone Maya keeps for sources who refuse to be named: "You found the folder. Do not trust the tower's owner. Harbour. Noon. Alone."</p>
      <p>The voice is electronically
      <span class="word-highlight" data-word="distorted" data-def="Distorted: altered so that the original form is hard to recognise.">distorted</span>,
      but the
      <span class="word-highlight" data-word="subtext" data-def="Subtext: an underlying meaning that is not stated directly.">subtext</span>
      is unmistakable. She replays the recording until a background layer
      <span class="word-highlight" data-word="resolves" data-def="To resolve: to become clear or distinguishable; to find a solution.">resolves</span>
      into seagulls and a foghorn. The meeting place is not a suggestion.</p>
      <p>At noon a figure in a grey coat sits with his back to the approach. He does not turn. "I was an
      <span class="word-highlight" data-word="engineer" data-def="Engineer: someone who designs or maintains technical systems.">engineer</span>
      at the tower," he says. "I know what they were actually
      <span class="word-highlight" data-word="transmitting" data-def="To transmit: to send out signals, messages, or broadcasts.">transmitting</span>
      — and it was never weather reports."</p>
    `,
    quizC1: [
      {
        q: 'Why does Maya use a disposable phone for this contact?',
        options: [
          'Her newspaper requires it for all calls',
          'It is for sources who refuse to be identified',
          'The harbour has no signal otherwise',
        ],
        answer: 1,
      },
      {
        q: 'How does she confirm the meeting place independently of the spoken words?',
        options: [
          'She traces the caller’s number',
          'She isolates seagulls and a foghorn in the recording',
          'The clerk tells her where to go',
        ],
        answer: 1,
      },
      {
        q: 'What does the engineer imply about the tower’s output?',
        options: [
          'It was used for something other than its public purpose',
          'It never broadcast anything at all',
          'It only transmitted Morse code legally',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 4,
    title: 'Fronteras',
    story: `
      <p>The investigation leads Maya across the border. The signal's origin has a second address —
      a warehouse in a quiet industrial town. She rents a car and drives.</p>
      <p>The warehouse looks
      <span class="word-highlight" data-word="derelict" data-def="Derelict: in a very poor condition as a result of disuse and neglect.">derelict</span>,
      but inside she finds
      <span class="word-highlight" data-word="evidence" data-def="Evidence: the available body of facts or information indicating whether a belief or proposition is true.">evidence</span>
      of recent activity: fresh tyre tracks, a half-eaten sandwich, warm coffee in a thermos.</p>
      <p>Someone was here an hour ago. Someone who didn't want to be found.</p>
    `,
    char: { name: 'Maya Reyes', role: 'Periodista investigadora', emoji: '🎙️' },
    charGreeting: "I'm across the border now. This warehouse... someone left in a hurry. What would you do in my situation?",
    quiz: [
      {
        q: 'Where does the investigation take Maya?',
        options: ['Back to the archive', 'Across the border, to a warehouse', 'To a shopping centre'],
        answer: 1,
      },
      {
        q: 'How does the warehouse look from the outside?',
        options: ['New and busy', 'Derelict', 'Like a radio studio'],
        answer: 1,
      },
      {
        q: 'What shows that someone was there recently?',
        options: ['A locked door and dust', 'Fresh tyre tracks, a sandwich and warm coffee', 'A Morse code message on the wall'],
        answer: 1,
      },
    ],
    charGreetingC1: "I'm on the other side of the border with a warehouse that was emptied an hour ago. If you were in my position — with evidence still warm — what would you risk next?",
    storyC1: `
      <p>The trail
      <span class="word-highlight" data-word="compels" data-def="To compel: to force or strongly oblige someone to do something.">compels</span>
      Maya across the border. A second address
      <span class="word-highlight" data-word="appended" data-def="Appended: added at the end of a document or list.">appended</span>
      to the signal's origin names a warehouse in a quiet industrial town. She hires a car and drives without telling her editor the details — a
      <span class="word-highlight" data-word="deliberate" data-def="Deliberate: done consciously and intentionally.">deliberate</span>
      omission.</p>
      <p>From the outside the building looks
      <span class="word-highlight" data-word="derelict" data-def="Derelict: abandoned and in very poor condition.">derelict</span>.
      Inside, the
      <span class="word-highlight" data-word="façade" data-def="Façade: a deceptive outward appearance that hides the truth.">façade</span>
      collapses: fresh tyre tracks, a sandwich abandoned mid-bite, coffee still warm in a thermos.</p>
      <p>Someone was here within the hour. Someone who knew they were being
      <span class="word-highlight" data-word="pursued" data-def="Pursued: followed in order to catch or find.">pursued</span>
      and chose speed over
      <span class="word-highlight" data-word="erasure" data-def="Erasure: the act of removing all traces of something.">erasure</span>.</p>
    `,
    quizC1: [
      {
        q: 'Why does Maya withhold details from her editor?',
        options: [
          'She forgets to call',
          'She omits them on purpose',
          'The editor has already fired her',
        ],
        answer: 1,
      },
      {
        q: 'What does “the façade collapses” mean in this context?',
        options: [
          'The warehouse wall physically falls down',
          'The appearance of abandonment is contradicted by recent activity',
          'Maya realises she is in the wrong country',
        ],
        answer: 1,
      },
      {
        q: 'What does the warm coffee suggest about the person who left?',
        options: [
          'They prioritised escaping quickly over covering their tracks',
          'They wanted Maya to find them easily',
          'They work night shifts at the archive',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 5,
    title: 'La ingeniera',
    story: `
      <p>Her name is Sofía Chen. She's the one who
      <span class="word-highlight" data-word="encrypted" data-def="Encrypted: converted into a coded form to prevent unauthorised access.">encrypted</span>
      the SOS inside the frequency. She built the whole system — and then
      <span class="word-highlight" data-word="dismantled" data-def="Dismantled: taken apart; disassembled into pieces.">dismantled</span>
      it when she realised what it was being used for.</p>
      <p>"I needed someone to find the signal," Sofía explains. "Someone outside the company.
      Someone who wouldn't bury it."</p>
      <p>She hands Maya a hard drive. On it: two years of
      <span class="word-highlight" data-word="intercepted" data-def="Intercepted: stopped and redirected something in the middle of its course.">intercepted</span>
      transmissions, with timestamps and coordinates.</p>
    `,
    char: { name: 'Sofía Chen', role: 'Ingeniera de sistemas', emoji: '👩‍💻' },
    charGreeting: "You found me. That took longer than I hoped. Did you listen to the full frequency recording? Tell me what you heard.",
    quiz: [
      {
        q: 'Who encrypted the SOS inside the frequency?',
        options: ['Harlan Voss', 'Sofía Chen', 'The archive clerk'],
        answer: 1,
      },
      {
        q: 'Why did Sofía dismantle the system?',
        options: ['She needed more money', 'She realised what it was being used for', 'The tower was too old'],
        answer: 1,
      },
      {
        q: 'What does Sofía give Maya?',
        options: ['A press badge', 'A hard drive with intercepted transmissions', 'A map of the harbour'],
        answer: 1,
      },
    ],
    charGreetingC1: "You found me later than I'd hoped, which means they nearly found me first. You listened to the frequency. Don't summarise it — tell me what you actually heard.",
    storyC1: `
      <p>Her name is Sofía Chen. She is the architect of the
      <span class="word-highlight" data-word="encrypted" data-def="Encrypted: converted into code so that only authorised people can read it.">encrypted</span>
      SOS nested inside the abandoned band — and the person who later
      <span class="word-highlight" data-word="dismantled" data-def="Dismantled: taken apart so it can no longer function.">dismantled</span>
      the apparatus once she grasped its true
      <span class="word-highlight" data-word="mandate" data-def="Mandate: an official instruction or intended purpose.">mandate</span>.</p>
      <p>"I needed an outsider," she says, without apology. "Someone the company could not
      <span class="word-highlight" data-word="coerce" data-def="To coerce: to force someone to do something by threats or pressure.">coerce</span>
      into burying the story. You were, frankly, a
      <span class="word-highlight" data-word="contingency" data-def="Contingency: a plan for a possible future event; something that may happen.">contingency</span>."</p>
      <p>She slides Maya a hard drive: two years of
      <span class="word-highlight" data-word="intercepted" data-def="Intercepted: caught and taken while in transit.">intercepted</span>
      transmissions, timestamped, geolocated, and — if the metadata holds —
      <span class="word-highlight" data-word="incontrovertible" data-def="Incontrovertible: impossible to deny or disprove.">incontrovertible</span>.</p>
    `,
    quizC1: [
      {
        q: 'What dual role did Sofía play in the system?',
        options: [
          'She both built the encrypted SOS and later took the system apart',
          'She only drove the silver sedan',
          'She owned the tower with Harlan Voss',
        ],
        answer: 0,
      },
      {
        q: 'Why did she want a journalist rather than an internal investigator?',
        options: [
          'Journalists work cheaper',
          'The company could not easily force an outsider to suppress the story',
          'Maya already had a court order',
        ],
        answer: 1,
      },
      {
        q: 'What makes the hard drive potentially decisive as evidence?',
        options: [
          'It contains two years of located, timed intercepts that are hard to deny',
          'It is made of gold',
          'It plays the SOS in Morse only',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 6,
    title: 'Contravigilancia',
    story: `
      <p>Maya realises she's been followed for three days. A silver sedan, always two cars behind.
      She
      <span class="word-highlight" data-word="devises" data-def="To devise: to plan or invent by careful thought.">devises</span>
      a plan to identify the driver.</p>
      <p>She enters a shopping centre through the main entrance, exits through the service bay, and circles
      back. The sedan is parked. The driver is on a phone. She photographs the
      <span class="word-highlight" data-word="licence" data-def="Licence plate: the metal plate on a vehicle displaying its registration number.">licence</span>
      plate.</p>
      <p>The plate comes back to a
      <span class="word-highlight" data-word="subsidiary" data-def="Subsidiary: a company owned or controlled by another company.">subsidiary</span>
      of the tower's parent corporation. She's getting close.</p>
    `,
    char: { name: 'Maya Reyes', role: 'Periodista investigadora', emoji: '🎙️' },
    charGreeting: "I know I'm being followed. I need to think this through carefully. What would you do to stay safe?",
    quiz: [
      {
        q: 'How long has Maya been followed?',
        options: ['For three days', 'For three hours', 'Since 1987'],
        answer: 0,
      },
      {
        q: 'What kind of car is following her?',
        options: ['A black van', 'A silver sedan', 'A red taxi'],
        answer: 1,
      },
      {
        q: 'Who does the licence plate belong to?',
        options: ['The city archive', 'A subsidiary of the tower’s parent corporation', 'Sofía Chen'],
        answer: 1,
      },
    ],
    charGreetingC1: "Three days of a silver sedan in the mirror is not paranoia; it's a pattern. I need a strategy that doesn't get me killed. How would you force them to show their hand?",
    storyC1: `
      <p>By the third day Maya can no longer
      <span class="word-highlight" data-word="rationalise" data-def="To rationalise: to invent a reasonable explanation for something that may not be reasonable.">rationalise</span>
      the silver sedan as coincidence. It sits two cars back with a
      <span class="word-highlight" data-word="discipline" data-def="Discipline: here, controlled, consistent behaviour.">discipline</span>
      that amateur followers rarely manage. She
      <span class="word-highlight" data-word="devises" data-def="To devise: to invent a plan through careful thought.">devises</span>
      a manoeuvre to unmask the driver without a confrontation she cannot win.</p>
      <p>She enters a shopping centre by the front, leaves through the service bay, and
      <span class="word-highlight" data-word="doubles" data-def="To double back: to return along the same route.">doubles</span>
      back. The sedan is parked. The driver is on a call, unguarded for seconds. She photographs the
      <span class="word-highlight" data-word="licence" data-def="Licence plate: the vehicle’s registration plate.">licence</span>
      plate.</p>
      <p>The registration
      <span class="word-highlight" data-word="traces" data-def="To trace: to find the origin or owner of something.">traces</span>
      to a
      <span class="word-highlight" data-word="subsidiary" data-def="Subsidiary: a company controlled by a larger parent company.">subsidiary</span>
      of the tower's parent corporation. Proximity, at last, has a name.</p>
    `,
    quizC1: [
      {
        q: 'What does Maya mean by refusing to “rationalise” the sedan?',
        options: [
          'She will not keep explaining it away as chance',
          'She cannot remember the car’s colour',
          'She sells her own car',
        ],
        answer: 0,
      },
      {
        q: 'What is the purpose of entering by the front and leaving by the service bay?',
        options: [
          'To go shopping unnoticed',
          'To break visual contact and then observe the follower',
          'To meet Sofía Chen',
        ],
        answer: 1,
      },
      {
        q: 'Why does the plate’s ownership matter strategically?',
        options: [
          'It links the surveillance to the same corporate structure as the tower',
          'It proves the driver is the archive clerk',
          'It shows Maya is imagining things',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 7,
    title: 'La negociación',
    story: `
      <p>The tower's owner, Mr. Harlan Voss, calls Maya directly. "Meet me. Alone. Let's discuss what
      you have before you do something you regret."</p>
      <p>Maya consults her editor, who advises
      <span class="word-highlight" data-word="caution" data-def="Caution: care taken to avoid danger or mistakes.">caution</span>.
      But Maya knows that sometimes the only way forward is
      <span class="word-highlight" data-word="through" data-def="Here used figuratively: completing something by going past the difficult part.">through</span>.</p>
      <p>She meets Voss in a hotel lobby, recorder hidden in her coat pocket. He offers money. Then threats.
      Maya stays
      <span class="word-highlight" data-word="composed" data-def="Composed: having one's feelings under control; calm and self-controlled.">composed</span>
      and walks out with everything on tape.</p>
    `,
    char: { name: 'Harlan Voss', role: 'Dueño de la torre', emoji: '🤵' },
    charGreeting: "So you came. Wise. I think we can reach an arrangement that benefits everyone. What is it that you actually want?",
    quiz: [
      {
        q: 'Who calls Maya directly?',
        options: ['The archive clerk', 'Mr. Harlan Voss, the tower’s owner', 'Sofía Chen'],
        answer: 1,
      },
      {
        q: 'Where does Maya meet Voss?',
        options: ['In a hotel lobby', 'At the harbour', 'Inside the warehouse'],
        answer: 0,
      },
      {
        q: 'What does Maya do during the meeting?',
        options: ['She accepts the money', 'She stays composed and records everything', 'She destroys the hard drive'],
        answer: 1,
      },
    ],
    charGreetingC1: "You came. That suggests you understand leverage. Let's not insult each other with theatrics. What is the minimum you would accept to walk away?",
    storyC1: `
      <p>Harlan Voss, the tower's owner, calls Maya on a line she had not given him. "Meet me. Alone. Let us discuss what you think you have — before you do something
      <span class="word-highlight" data-word="irrevocable" data-def="Irrevocable: impossible to reverse or undo.">irrevocable</span>."</p>
      <p>Her editor
      <span class="word-highlight" data-word="counsel" data-def="To counsel: to give professional advice.">counsels</span>
      <span class="word-highlight" data-word="caution" data-def="Caution: care taken to avoid danger or mistakes.">caution</span>.
      Maya hears the warning and files it. Some stories cannot be
      <span class="word-highlight" data-word="negotiated" data-def="To negotiate: to try to reach an agreement through discussion.">negotiated</span>
      from a distance; they have to be walked through.</p>
      <p>In the hotel lobby Voss offers money, then
      <span class="word-highlight" data-word="intimidation" data-def="Intimidation: the act of frightening someone into doing what you want.">intimidation</span>.
      Maya remains
      <span class="word-highlight" data-word="composed" data-def="Composed: calm and in control of one’s feelings.">composed</span>,
      the recorder buried in her coat, and leaves with an
      <span class="word-highlight" data-word="unedited" data-def="Unedited: not cut or altered; complete as originally recorded.">unedited</span>
      record of both.</p>
    `,
    quizC1: [
      {
        q: 'What is implied by Voss calling a number Maya never gave him?',
        options: [
          'He has access to information about her that she did not volunteer',
          'Hotels give out journalists’ numbers',
          'Maya published the number in the paper',
        ],
        answer: 0,
      },
      {
        q: 'How does Maya treat her editor’s advice?',
        options: [
          'She ignores it completely and never meets Voss',
          'She notes the caution but still goes through with the meeting',
          'She lets the editor attend instead',
        ],
        answer: 1,
      },
      {
        q: 'What is the strategic value of remaining composed?',
        options: [
          'It lets her capture both the bribe and the threats without escalating',
          'It convinces Voss to sell the tower',
          'It makes the clerk reopen the archive',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 8,
    title: 'Al aire',
    story: `
      <p>The story runs on Sunday. By Monday morning, three
      <span class="word-highlight" data-word="regulatory" data-def="Regulatory: relating to official rules that control an industry or activity.">regulatory</span>
      agencies have opened
      <span class="word-highlight" data-word="investigations" data-def="Investigations: formal inquiries carried out by officials to discover facts.">investigations</span>.</p>
      <p>Maya sits in the empty radio station where it all started. She tunes to the old frequency one last time.
      There's nothing there now — just clean, open air.</p>
      <p>She smiles. Someone needed to find the signal. She did. That was enough.</p>
      <p><em>— Fin de The Frequency —</em></p>
    `,
    char: { name: 'Maya Reyes', role: 'Periodista investigadora', emoji: '🎙️' },
    charGreeting: "The story is out. It's over — or maybe it's just beginning. How did you feel reading The Frequency from beginning to end?",
    quiz: [
      {
        q: 'When does Maya’s story run?',
        options: ['On Friday', 'On Sunday', 'At 3 a.m.'],
        answer: 1,
      },
      {
        q: 'What happens by Monday morning?',
        options: ['The tower is sold', 'Three regulatory agencies open investigations', 'Maya leaves the country'],
        answer: 1,
      },
      {
        q: 'What does Maya hear on the old frequency at the end?',
        options: ['Another SOS', 'Harlan Voss speaking', 'Nothing — just clean, open air'],
        answer: 2,
      },
    ],
    charGreetingC1: "It's out. The frequency is quiet, which is a kind of verdict. Reading it through to the end — did it feel like closure, or like the first hour of something larger?",
    storyC1: `
      <p>The investigation runs on Sunday. By Monday, three
      <span class="word-highlight" data-word="regulatory" data-def="Regulatory: relating to official rules that govern an industry.">regulatory</span>
      agencies have opened
      <span class="word-highlight" data-word="inquiries" data-def="Inquiries: formal investigations to establish facts.">inquiries</span>
      that Voss can neither buy nor
      <span class="word-highlight" data-word="postpone" data-def="To postpone: to delay until a later time.">postpone</span>.</p>
      <p>Maya returns to the empty station where the first pulse found her. She tunes the
      <span class="word-highlight" data-word="decommissioned" data-def="Decommissioned: taken out of official service.">decommissioned</span>
      band one last time. There is no pattern now — no SOS, no
      <span class="word-highlight" data-word="residue" data-def="Residue: a small amount of something that remains.">residue</span>
      of whoever needed to be heard. Only clean, unclaimed air.</p>
      <p>She allows herself a thin smile. Someone had to
      <span class="word-highlight" data-word="corroborate" data-def="To corroborate: to confirm or support a claim with evidence.">corroborate</span>
      the signal. She did. For a journalist, that is not a small ending.</p>
      <p><em>— Fin de The Frequency —</em></p>
    `,
    quizC1: [
      {
        q: 'What makes Monday more significant than Sunday in this ending?',
        options: [
          'Sunday is when Maya rests',
          'Official agencies begin formal inquiries the next morning',
          'The warehouse burns down on Monday',
        ],
        answer: 1,
      },
      {
        q: 'How should we read the silence on the old frequency?',
        options: [
          'As evidence that the distress call is no longer being sent',
          'As proof that Maya imagined the first episode',
          'As Voss broadcasting a confession',
        ],
        answer: 0,
      },
      {
        q: 'What does Maya consider “not a small ending” for a journalist?',
        options: [
          'Having confirmed and brought the signal into public view',
          'Buying the radio station',
          'Accepting Voss’s money after all',
        ],
        answer: 0,
      },
    ],
  },
];

/* ─── INSIGNIAS ─── */
const INSIGNIAS = [
  { id: 'primera_lectura', name: 'Primera señal', emoji: '📡', cond: () => state.completedEps.length >= 1 },
  { id: 'mitad',           name: 'En frecuencia', emoji: '🎚️', cond: () => state.completedEps.length >= 4 },
  { id: 'completo',        name: 'Al aire',        emoji: '🏆', cond: () => state.completedEps.length === 8 },
  { id: 'vocabulario',     name: 'Lexicón',        emoji: '📖', cond: () => state.savedWords.length >= 5 },
  { id: 'conversador',     name: 'Interlocutor',   emoji: '💬', cond: () => state.conversations >= 3 },
];

/* ════════════════════════════════════════
   PERSISTENCIA (localStorage)
   ════════════════════════════════════════ */
function loadState() {
  const saved = localStorage.getItem('speakfm_state');
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.warn('Error al cargar el estado guardado:', e);
    }
  }
  // Si ya hay un nivel guardado, queda fijado (evita mezclar progresos B1/C1)
  if (state.level) state.levelLocked = true;
}

function saveState() {
  localStorage.setItem('speakfm_state', JSON.stringify(state));
}

/* ════════════════════════════════════════
   DIAL ANIMADO
   ════════════════════════════════════════ */
function pctToAngle(pct) {
  // aguja: -130deg (0%) → +130deg (100%)
  return -130 + (pct / 100) * 260;
}

function updateDials(pct) {
  const angle = pctToAngle(pct);
  const label = `${Math.round(pct)}% SINTONIZADO`;

  const mainNeedle = document.getElementById('mainNeedle');
  const diarioNeedle = document.getElementById('diarioDialNeedle');
  if (mainNeedle)   mainNeedle.style.transform   = `translateX(-50%) rotate(${angle}deg)`;
  if (diarioNeedle) diarioNeedle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

  const mainPct   = document.getElementById('mainPct');
  const diarioPct = document.getElementById('diarioPct');
  if (mainPct)   mainPct.textContent   = label;
  if (diarioPct) diarioPct.textContent = label;
}

function calcPct() {
  const epPct    = (state.completedEps.length / 8) * 70;
  const wordPct  = Math.min(state.savedWords.length / 10, 1) * 20;
  const convoPct = Math.min(state.conversations / 5, 1) * 10;
  return Math.min(epPct + wordPct + convoPct, 100);
}

/* ════════════════════════════════════════
   ONBOARDING
   ════════════════════════════════════════ */
function isC1() {
  return state.level === 'avanzado';
}

function episodeStory(ep) {
  return isC1() ? ep.storyC1 : ep.story;
}

function episodeQuiz(ep) {
  return isC1() ? ep.quizC1 : ep.quiz;
}

function episodeGreeting(ep) {
  return isC1() ? ep.charGreetingC1 : ep.charGreeting;
}

function applyLevelLockUI() {
  const locked = !!state.levelLocked && !!state.level;
  document.querySelectorAll('.level-opt').forEach(o => {
    o.classList.toggle('selected', o.dataset.level === state.level);
    o.classList.toggle('unavailable', locked && o.dataset.level !== state.level);
  });
  document.getElementById('levelLockNote')?.classList.toggle('visible', locked);
  if (state.level) {
    document.getElementById('btnSintonizar').classList.add('enabled');
  }
}

function selectLevel(el) {
  const chosen = el.dataset.level;
  if (state.levelLocked && state.level && chosen !== state.level) {
    showToast('No puedes cambiar de nivel: se borraría tu progreso');
    return;
  }

  document.querySelectorAll('.level-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.level = chosen;
  document.getElementById('btnSintonizar').classList.add('enabled');
  updateDials(10);
}

function sintonizar() {
  if (!state.level) return;
  state.levelLocked = true;
  state.phase = 'main';
  saveState();
  applyLevelLockUI();
  showMainPhase();
  showToast('¡Frecuencia sintonizada! Episodio 1 desbloqueado 📻');
}

/* ════════════════════════════════════════
   TRANSICIÓN ONBOARDING → MAIN
   ════════════════════════════════════════ */
function showMainPhase() {
  document.getElementById('screen-onboarding').classList.remove('active');
  document.getElementById('tabNav').style.display      = 'flex';
  document.getElementById('epBadge').style.display     = 'block';
  document.getElementById('btnHome').classList.add('visible');

  buildEpList();
  buildDiario();
  buildPractica();
  switchTab('historia');
  updateDials(calcPct());
}

/* ════════════════════════════════════════
   VOLVER AL INICIO
   ════════════════════════════════════════ */
function goHome() {
  openModal();
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('visible');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('visible');
}

function confirmGoHome() {
  closeModal();

  // Ocultar fase main
  document.getElementById('tabNav').style.display  = 'none';
  document.getElementById('epBadge').style.display = 'none';
  document.getElementById('btnHome').classList.remove('visible');

  // Ocultar todas las pantallas main
  ['historia', 'practica', 'diario', 'reader'].forEach(id => {
    document.getElementById(`screen-${id}`)?.classList.remove('active');
  });

  // Volver a onboarding SIN borrar progreso
  state.phase = 'onboarding';
  saveState();

  const onboarding = document.getElementById('screen-onboarding');
  onboarding.classList.add('active');

  // Restaurar selección de nivel si ya había uno
  applyLevelLockUI();
  if (state.level) {
    updateDials(calcPct() > 10 ? 10 : calcPct());
  } else {
    updateDials(0);
  }

  showToast('Bienvenido de nuevo 👋');
}

// Cerrar modal haciendo clic fuera
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
});

/* ════════════════════════════════════════
   NAVEGACIÓN ENTRE TABS
   ════════════════════════════════════════ */
function switchTab(tab) {
  state.currentTab = tab;

  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  ['historia', 'practica', 'diario'].forEach(t => {
    document.getElementById(`screen-${t}`).classList.toggle('active', t === tab);
  });

  // Ocultar lector si estaba abierto
  document.getElementById('screen-reader').classList.remove('active');

  if (tab === 'diario')   buildDiario();
  if (tab === 'practica') buildPractica();
  hideQuiz();
}

/* ════════════════════════════════════════
   LISTA DE EPISODIOS
   ════════════════════════════════════════ */
function buildEpList() {
  const list = document.getElementById('epList');
  list.innerHTML = '';

  const note = document.getElementById('epListNote');
  if (note) {
    note.textContent = isC1()
      ? 'Nivel C1: cada frecuencia tiene una historia avanzada. Para desbloquear la siguiente, responde las preguntas de comprensión. Si fallas, puedes volver a intentarlo.'
      : 'Nivel B1–B2: cada frecuencia tiene una historia. Para desbloquear la siguiente, responde las preguntas de comprensión. Si fallas, puedes volver a intentarlo.';
  }

  EPISODES.forEach(ep => {
    const unlocked  = ep.id === 1 || state.completedEps.includes(ep.id - 1);
    const completed = state.completedEps.includes(ep.id);
    const isFirst   = ep.id === 1 && !completed;

    const div = document.createElement('div');
    div.className = [
      'ep-item',
      !unlocked  ? 'locked'    : '',
      completed  ? 'completed' : '',
      isFirst    ? 'active-ep' : '',
    ].filter(Boolean).join(' ');

    const lockNote = !unlocked
      ? 'Bloqueada'
      : (needsQuiz() && !completed ? 'Lee y responde para continuar' : '');

    div.innerHTML = `
      <div class="ep-num">${completed ? '✓' : ep.id}</div>
      <div class="ep-title">${ep.title}${lockNote ? `<div class="ep-sub">${lockNote}</div>` : ''}</div>
    `;

    if (unlocked) div.onclick = () => openEpisode(ep.id);
    list.appendChild(div);
  });
}

/* ════════════════════════════════════════
   LECTOR DE EPISODIO
   ════════════════════════════════════════ */
function needsQuiz() {
  return state.level === 'intermedio' || state.level === 'avanzado';
}

function quizLabel() {
  return isC1() ? 'COMPRENSIÓN · C1' : 'COMPRENSIÓN · B1–B2';
}

function hideQuiz() {
  const panel = document.getElementById('quizPanel');
  panel.classList.remove('visible');
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('btnSubmitQuiz').style.display = '';
  document.getElementById('btnRetryQuiz').style.display = 'none';
  document.getElementById('quizForm').innerHTML = '';
}

function renderQuiz(ep) {
  const quiz = episodeQuiz(ep);
  const form = document.getElementById('quizForm');
  form.innerHTML = quiz.map((item, qi) => `
    <div class="quiz-item" data-q="${qi}">
      <div class="quiz-q">${qi + 1}. ${item.q}</div>
      ${item.options.map((opt, oi) => `
        <label class="quiz-opt">
          <input type="radio" name="q${qi}" value="${oi}" required />
          <span>${opt}</span>
        </label>
      `).join('')}
    </div>
  `).join('');
}

function scrollToStory() {
  document.getElementById('readerBody').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showQuiz() {
  const ep = EPISODES.find(e => e.id === state.currentEp);
  hideQuiz();
  renderQuiz(ep);
  document.querySelector('#quizPanel .quiz-eyebrow').textContent = quizLabel();
  document.getElementById('quizPanel').classList.add('visible');
  document.getElementById('readerActions').style.display = 'none';
  document.getElementById('quizPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitQuiz() {
  const ep = EPISODES.find(e => e.id === state.currentEp);
  const quiz = episodeQuiz(ep);
  const answers = quiz.map((_, qi) => {
    const selected = document.querySelector(`input[name="q${qi}"]:checked`);
    return selected ? Number(selected.value) : null;
  });

  if (answers.some(a => a === null)) {
    showToast('Responde todas las preguntas antes de comprobar');
    return;
  }

  let correct = 0;
  quiz.forEach((item, qi) => {
    const block = document.querySelector(`.quiz-item[data-q="${qi}"]`);
    const isRight = answers[qi] === item.answer;
    block.classList.remove('correct', 'wrong');
    block.classList.add(isRight ? 'correct' : 'wrong');
    if (isRight) correct++;
  });

  document.querySelectorAll('#quizForm input').forEach(inp => {
    inp.disabled = true;
    inp.closest('.quiz-opt').classList.add('disabled');
  });

  const feedback = document.getElementById('quizFeedback');
  const allCorrect = correct === quiz.length;

  if (allCorrect) {
    feedback.className = 'quiz-feedback visible pass';
    feedback.textContent = '¡Frecuencia sintonizada! Has comprendido la historia. La siguiente frecuencia está desbloqueada.';
    document.getElementById('btnSubmitQuiz').style.display = 'none';
    document.getElementById('btnRetryQuiz').style.display = 'none';
    setTimeout(() => finishEpisode(), 900);
  } else {
    feedback.className = 'quiz-feedback visible fail';
    feedback.textContent = `Has acertado ${correct} de ${quiz.length}. Revisa la historia y vuelve a intentarlo. Las respuestas correctas no se muestran todavía.`;
    document.getElementById('btnSubmitQuiz').style.display = 'none';
    document.getElementById('btnRetryQuiz').style.display = 'block';
    showToast('Aún no. Puedes intentarlo de nuevo');
  }
}

function retryQuiz() {
  const ep = EPISODES.find(e => e.id === state.currentEp);
  renderQuiz(ep);
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('btnSubmitQuiz').style.display = '';
  document.getElementById('btnRetryQuiz').style.display = 'none';
}

function openEpisode(id) {
  const ep = EPISODES.find(e => e.id === id);
  state.currentEp = id;

  document.getElementById('screen-historia').classList.remove('active');
  document.getElementById('screen-reader').classList.add('active');
  document.getElementById('readerEpLabel').textContent = `FRECUENCIA ${ep.id} DE 8`;
  document.getElementById('readerTitle').textContent   = ep.title;
  document.getElementById('readerBody').innerHTML      = episodeStory(ep);

  hideQuiz();
  const actions = document.getElementById('readerActions');
  actions.style.display = 'flex';

  const btn = document.getElementById('btnComplete');
  const already = state.completedEps.includes(id);

  if (already) {
    btn.textContent    = '✓ Ya sintonizada';
    btn.style.opacity  = '0.6';
    btn.onclick        = null;
  } else if (needsQuiz()) {
    btn.textContent    = 'Responder preguntas →';
    btn.style.opacity  = '1';
    btn.onclick        = showQuiz;
  } else {
    btn.textContent    = 'Marcar como leído ✓';
    btn.style.opacity  = '1';
    btn.onclick        = completeEpisode;
  }

  attachWordHighlights();
}

function attachWordHighlights() {
  const tip = document.getElementById('tooltip');

  document.querySelectorAll('.word-highlight').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const word = el.dataset.word;
      const def  = el.dataset.def;
      tip.innerHTML = `<strong>${word}</strong>${def}`;
      tip.classList.add('visible');
      moveTip(e);

      // Guardar en vocabulario si es nueva
      if (!state.savedWords.find(w => w.word === word)) {
        state.savedWords.push({ word, def, ep: state.currentEp });
        saveState();
      }
    });

    el.addEventListener('mousemove', moveTip);
    el.addEventListener('mouseleave', () => tip.classList.remove('visible'));
  });
}

function moveTip(e) {
  const tip = document.getElementById('tooltip');
  tip.style.left = (e.clientX + 14) + 'px';
  tip.style.top  = (e.clientY - 10) + 'px';
}

function completeEpisode() {
  finishEpisode();
}

function finishEpisode() {
  const id = state.currentEp;
  if (!state.completedEps.includes(id)) {
    state.completedEps.push(id);
    saveState();
  }

  const nextEp = Math.min(id + 1, 8);
  document.getElementById('epBadge').textContent = `EP.${nextEp}/8`;

  if (id < 8) {
    showToast(`Frecuencia ${id} sintonizada. Episodio ${nextEp} desbloqueado 📻`);
  } else {
    showToast('Has sintonizado todas las frecuencias 🏆');
  }

  updateDials(calcPct());
  goBack();
  buildEpList();
  buildPractica();
}

function goBack() {
  hideQuiz();
  document.getElementById('readerActions').style.display = 'flex';
  document.getElementById('screen-reader').classList.remove('active');
  document.getElementById('screen-historia').classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'historia');
  });
}

/* ════════════════════════════════════════
   PRÁCTICA – CHAT CON PERSONAJES
   ════════════════════════════════════════ */
let chatHistory = [];

function buildPractica() {
  const container = document.getElementById('practicaContent');

  if (state.completedEps.length === 0) {
    container.innerHTML = `
      <div class="practica-locked-card">
        <div class="eyebrow">PRÁCTICA</div>
        <h3>Todavía no hay escenas disponibles</h3>
        <p>Completa el Episodio 1 en la pestaña "Historia" para desbloquear tu primera conversación con un personaje.</p>
      </div>`;
    return;
  }

  chatHistory = [];
  const lastId = Math.max(...state.completedEps);
  const ep     = EPISODES.find(e => e.id === lastId);

  container.innerHTML = `
    <div class="chat-card" id="chatCard">
      <div class="chat-header">
        <div class="chat-avatar">${ep.char.emoji}</div>
        <div>
          <div class="chat-char-name">${ep.char.name}</div>
          <div class="chat-char-role">${ep.char.role} · Ep. ${ep.id}</div>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="msg char">${episodeGreeting(ep)}</div>
      </div>
      <div class="chat-input-area">
        <input class="chat-input" id="chatInput" type="text" placeholder="Reply in English…" />
        <button class="chat-send" onclick="sendMessage()">Send</button>
      </div>
    </div>`;

  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;

  input.value = '';
  addMsg(text, 'user');
  addMsg('…', 'typing');
  input.disabled = true;

  const lastId = Math.max(...state.completedEps);
  const ep     = EPISODES.find(e => e.id === lastId);

  chatHistory.push({ role: 'user', content: text });

  fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: `You are ${ep.char.name}, ${ep.char.role} from the story "The Frequency" in the Speak FM English learning app.
Stay in character. Speak only in English. Keep responses to 2–4 sentences.
The learner's level is ${isC1() ? 'C1 (advanced)' : 'B1–B2 (intermediate)'}. Match that register: ${isC1() ? 'use precise, idiomatic English without simplifying unduly' : 'use natural but accessible English'}.
If the user writes in Spanish, gently encourage them to try in English and give a simple example.
Story context: ${episodeGreeting(ep)}`,
      messages: chatHistory,
    }),
  })
  .then(r => r.json())
  .then(data => {
    removeTyping();
    input.disabled = false;
    const reply = data.content?.map(c => c.text || '').join('')
      || "I'm not sure how to respond right now. Try asking me something about the story!";
    chatHistory.push({ role: 'assistant', content: reply });
    addMsg(reply, 'char');
    state.conversations++;
    saveState();
    updateDials(calcPct());
  })
  .catch(() => {
    removeTyping();
    input.disabled = false;
    const fallbacks = [
      "That's interesting. Tell me more about what you think.",
      "I see. And how does that connect to what you read in the story?",
      "Good point. What would you do in my situation?",
      "Hmm. Let me think about that. What do you think I should do next?",
    ];
    const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    chatHistory.push({ role: 'assistant', content: reply });
    addMsg(reply, 'char');
    state.conversations++;
    saveState();
    updateDials(calcPct());
  });
}

function addMsg(text, cls) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className  = `msg ${cls}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const msgs   = document.getElementById('chatMessages');
  const typing = msgs?.querySelector('.msg.typing');
  if (typing) typing.remove();
}

/* ════════════════════════════════════════
   DIARIO
   ════════════════════════════════════════ */
function buildDiario() {
  // Estadísticas
  document.getElementById('statEpisodes').textContent = `${state.completedEps.length}/8`;
  document.getElementById('statWords').textContent    = state.savedWords.length;
  document.getElementById('statConvos').textContent   = state.conversations;

  // Pastillas de episodios
  const badgesWrap = document.getElementById('epBadges');
  badgesWrap.innerHTML = '';
  EPISODES.forEach(ep => {
    const done = state.completedEps.includes(ep.id);
    const pill = document.createElement('div');
    pill.className   = `ep-pill${done ? ' done' : ''}`;
    pill.textContent = `Ep.${ep.id}`;
    badgesWrap.appendChild(pill);
  });

  // Vocabulario
  const vocabWrap = document.getElementById('vocabContent');
  if (state.savedWords.length === 0) {
    vocabWrap.innerHTML = `<div class="vocab-empty">Aún no hay palabras guardadas. Completa un episodio para empezar tu diario.</div>`;
  } else {
    const list = document.createElement('div');
    list.className = 'vocab-list';
    state.savedWords.forEach(w => {
      const entry = document.createElement('div');
      entry.className = 'vocab-entry';
      entry.innerHTML = `
        <span class="vocab-word">${w.word}</span>
        <span class="vocab-def">${w.def}</span>
        <span class="vocab-ep-tag">Ep.${w.ep}</span>
      `;
      list.appendChild(entry);
    });
    vocabWrap.innerHTML = '';
    vocabWrap.appendChild(list);
  }

  // Insignias
  const grid = document.getElementById('insigniasGrid');
  grid.innerHTML = '';
  INSIGNIAS.forEach(ins => {
    const earned = ins.cond();
    const div    = document.createElement('div');
    div.className = `insignia${earned ? ' earned' : ''}`;
    div.title     = earned ? '¡Obtenida!' : 'Bloqueada';
    div.innerHTML = `
      <div class="insignia-icon">${ins.emoji}</div>
      <div class="insignia-name">${ins.name}</div>
    `;
    grid.appendChild(div);
  });

  updateDials(calcPct());
}

/* ════════════════════════════════════════
   TOAST DE NOTIFICACIONES
   ════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ════════════════════════════════════════
   INICIALIZACIÓN
   ════════════════════════════════════════ */
loadState();

if (state.phase === 'main') {
  // Restaurar interfaz de fase main
  document.getElementById('tabNav').style.display  = 'flex';
  document.getElementById('epBadge').style.display = 'block';
  document.getElementById('btnHome').classList.add('visible');

  applyLevelLockUI();

  buildEpList();
  buildDiario();
  buildPractica();
  switchTab('historia');
  updateDials(calcPct());

  // Badge de episodio actual
  const nextEp = state.completedEps.length > 0
    ? Math.min(Math.max(...state.completedEps) + 1, 8)
    : 1;
  document.getElementById('epBadge').textContent = `EP.${nextEp}/8`;

} else {
  // Fase onboarding
  updateDials(0);
  applyLevelLockUI();
}

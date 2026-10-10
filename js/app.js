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
  a1Completed: [],       // lecciones A1–A2 completadas (IDs)
  a1Advanced: false,     // true cuando el usuario avanzó de A1 a B1
  savedWords: [],
  conversations: 0,
  currentEp: null,
  currentA1Lesson: null, // ID de la lección A1 actualmente abierta
  lives: 3,
  livesRestoreAt: null,  // timestamp (ms) en el que las 3 vidas vuelven
};

const MAX_LIVES = 3;
const LIFE_RESTORE_MS = 12 * 60 * 60 * 1000;

/* ─── DATOS DE EPISODIOS ─── */
const EPISODES = [
  {
    id: 1,
    title: 'The Startup Pitch',
    titleC1: 'The Autonomous Fleet',
    story: `
      <p>Elena adjusted her blazer and looked around the crowded boardroom. For months, she and her small tech team had poured countless hours into developing an
      <span class="word-highlight" data-word="application" data-def="Application: a computer program designed for a particular purpose.">application</span>
      that streamlined local supply chains.</p>
      <p>Now, the moment of truth had arrived: pitching to a panel of skeptical
      <span class="word-highlight" data-word="venture capitalists" data-def="Venture capitalists: investors who provide capital to startup companies.">venture capitalists</span>.</p>
      <p>As she began speaking, her initial nerves dissipated, replaced by a steady confidence in her product's
      <span class="word-highlight" data-word="viability" data-def="Viability: ability to work successfully or survive.">viability</span>
      and market potential.</p>
      <p>By the time she concluded with a compelling call to action, the room erupted into thoughtful nods.</p>
      <p>She knew the journey was only beginning, but this milestone proved that
      <span class="word-highlight" data-word="perseverance" data-def="Perseverance: persistence in doing something despite difficulty.">perseverance</span>
      truly pays off.</p>
    `,
    char: { name: 'Elena', role: 'Fundadora de Startup', emoji: '💻' },
    charGreeting: "Hi there! I just finished pitching my application to investors. Have you ever had to present an important idea in front of a tough audience?",
    quiz: [
      { q: 'What was the main purpose of Elena\'s presentation?', options: ['To recruit new software developers', 'To pitch to venture capitalists for funding', 'To demonstrate a new video game'], answer: 1 },
      { q: 'How did Elena feel at the very beginning of her pitch?', options: ['Completely overconfident and arrogant', 'Nervous, though it quickly turned into steady confidence', 'Indifferent and bored'], answer: 1 },
      { q: 'What does the application focus on streamlining?', options: ['Local supply chains', 'International air travel', 'Public transportation schedules'], answer: 0 },
      { q: 'How did the panel react when she finished?', options: ['They immediately walked out of the room', 'They laughed and dismissed her idea', 'They nodded thoughtfully in approval'], answer: 2 },
      { q: 'What did this milestone validate for Elena?', options: ['That perseverance pays off', 'That she should change her career path', 'That pitching is unnecessary for startups'], answer: 0 },
      { q: 'Who was present in the boardroom listening to her?', options: ['Her family members', 'A panel of skeptical venture capitalists', 'Local high school students'], answer: 1 },
    ],
    charGreetingC1: "The corridor ran on quiet algorithmic authority tonight. When freight trajectories are fully autonomous, where should human engineers still intervene?",
    storyC1: `
      <p>As dusk settled over the logistics corridor, the central dispatch terminal hummed with quiet
      <span class="word-highlight" data-word="algorithmic" data-def="Algorithmic: governed by a set of computational rules or procedures.">algorithmic</span>
      authority. Autonomous freight vehicles synchronized their trajectories through dense vehicular traffic, anticipating urban bottlenecks via real-time
      <span class="word-highlight" data-word="telemetry" data-def="Telemetry: the automatic transmission of measurements from remote sources.">telemetry</span>.</p>
      <p>Engineers in the control room monitored the
      <span class="word-highlight" data-word="decentralized" data-def="Decentralized: distributed across many nodes rather than controlled from one centre.">decentralized</span>
      mesh network, ensuring zero
      <span class="word-highlight" data-word="latency" data-def="Latency: delay between a signal being sent and received.">latency</span>
      during high-speed handoffs.</p>
      <p>The transition from human-piloted transport to fully autonomous fleets had fundamentally revolutionized regional commerce, converting unpredictable transit corridors into hyper-efficient digital
      <span class="word-highlight" data-word="arteries" data-def="Arteries: here, major routes that carry traffic, like blood vessels in a body.">arteries</span>.</p>
    `,
    quizC1: [
      { q: 'What environment did the autonomous freight vehicles navigate?', options: ['Rural farmland paths', 'A dense logistics corridor with vehicular traffic', 'Mountainous off-road terrain'], answer: 1 },
      { q: 'How did the vehicles anticipate urban bottlenecks?', options: ['Through real-time telemetry and algorithmic coordination', 'By calling human traffic controllers manually', 'By stopping every few miles to check maps'], answer: 0 },
      { q: 'What was the primary duty of the engineers in the control room?', options: ['Driving the trucks remotely via joysticks', 'Monitoring the decentralized mesh network for zero latency', 'Repairing broken mechanical engines on-site'], answer: 1 },
      { q: 'What did high-speed handoffs require from the network?', options: ['Zero latency to ensure seamless transitions', 'Frequent manual overrides by operators', 'Complete disconnection from the internet'], answer: 0 },
      { q: 'How had the transition to autonomous fleets impacted regional commerce?', options: ['It caused massive shipping delays and financial losses', 'It fundamentally revolutionized commerce by converting corridors into digital arteries', 'It made transport completely dependent on weather conditions'], answer: 1 },
      { q: "What term best describes the central dispatch terminal's authority?", options: ['Chaotic and unpredictable', 'Quiet algorithmic authority', 'Outdated and inefficient'], answer: 1 },
    ],
  },
  {
    id: 2,
    title: 'Urban Gardening',
    titleC1: 'Deep Ocean Acoustics',
    story: `
      <p>Living in a high-rise apartment in the bustling city center left Marcus craving a connection to nature.</p>
      <p>To remedy this, he decided to transform his narrow balcony into a thriving urban garden.</p>
      <p>He spent his weekends researching
      <span class="word-highlight" data-word="drought-tolerant" data-def="Drought-tolerant: plants that can survive with very little water.">drought-tolerant</span>
      plants, installing vertical wooden pallets, and setting up an automated drip-irrigation system.</p>
      <p>Despite initial setbacks with pests and unpredictable weather, his herbs and cherry tomatoes eventually flourished.</p>
      <p>Tending to the greenery became his daily ritual—a tranquil sanctuary amidst the chaotic rhythm of city life.</p>
    `,
    char: { name: 'Marcus', role: 'Jardinero Urbano', emoji: '🌱' },
    charGreeting: "Hello! My balcony garden finally grew some cherry tomatoes. Do you enjoy growing plants or keeping a green space at home?",
    quiz: [
      { q: 'What inspired Marcus to start his urban garden?', options: ['A desire to sell vegetables for profit', 'A craving for a connection to nature while living in a high-rise', 'An assignment for a biology class'], answer: 1 },
      { q: 'What feature did he install to manage watering efficiently?', options: ['An automated drip-irrigation system', 'A manual sprinkler hose', 'Rainwater collection barrels'], answer: 0 },
      { q: 'What initial challenges did Marcus face?', options: ['Financial bankruptcy and eviction', 'Pests and unpredictable weather', 'Lack of sunlight entirely'], answer: 1 },
      { q: 'What plants successfully flourished on his balcony?', options: ['Giant oak trees and ferns', 'Herbs and cherry tomatoes', 'Cacti and tropical orchids'], answer: 1 },
      { q: 'What did the balcony garden ultimately become for him?', options: ['A noisy workshop for carpentry', 'A tranquil sanctuary to unwind and clear his mind', 'A storage space for old furniture'], answer: 1 },
      { q: 'When did he spend time researching and setting up the garden?', options: ['During his weekday lunch breaks', 'Late at night after work', 'Over the weekends'], answer: 2 },
    ],
    charGreetingC1: "Four thousand metres down, the bathyscaphe was mapping trenches we have barely named. What would you listen for first in that acoustic dark?",
    storyC1: `
      <p>Submerged beneath four thousand meters of crushing
      <span class="word-highlight" data-word="hydrostatic" data-def="Hydrostatic: relating to the pressure exerted by a fluid at rest.">hydrostatic</span>
      pressure, the autonomous
      <span class="word-highlight" data-word="bathyscaphe" data-def="Bathyscaphe: a deep-diving submersible used for ocean exploration.">bathyscaphe</span>
      mapped uncharted abyssal trenches.</p>
      <p>Acoustic sensors captured the ethereal, low-frequency vocalizations of
      <span class="word-highlight" data-word="cetaceans" data-def="Cetaceans: the order of marine mammals that includes whales, dolphins and porpoises.">cetaceans</span>
      echoing across oceanic basins. Marine biologists back on the surface analyzed the
      <span class="word-highlight" data-word="spectrograms" data-def="Spectrograms: visual graphs of how a sound's frequencies change over time.">spectrograms</span>,
      deciphering migratory patterns that had remained elusive for decades.</p>
      <p>This acoustic monitoring infrastructure proved indispensable for understanding how
      <span class="word-highlight" data-word="anthropogenic" data-def="Anthropogenic: caused or produced by human activity.">anthropogenic</span>
      noise pollution disrupts deep-sea ecosystems.</p>
    `,
    quizC1: [
      { q: 'At what depth was the autonomous bathyscaphe operating?', options: ['Four hundred meters below sea level', 'Four thousand meters beneath hydrostatic pressure', 'Ten thousand meters in a shallow bay'], answer: 1 },
      { q: 'What did the acoustic sensors capture during the descent?', options: ['The low-frequency vocalizations of cetaceans', 'Seismic tremors from underwater volcanoes', 'Commercial shipping propeller sounds exclusively'], answer: 0 },
      { q: 'Who analyzed the spectrograms back on the surface?', options: ['Aerospace engineers', 'Marine biologists', 'Meteorological forecasters'], answer: 1 },
      { q: 'What long-standing mystery did the spectrograms help decipher?', options: ['Ancient shipwreck locations', 'Elusive marine migratory patterns', 'Deep-sea thermal vent temperatures'], answer: 1 },
      { q: 'Why was the acoustic monitoring infrastructure deemed indispensable?', options: ['For tracking illegal fishing boats visually', 'For understanding how anthropogenic noise disrupts deep-sea ecosystems', 'For finding sunken treasure fleets'], answer: 1 },
      { q: 'What kind of pressure characterized the abyssal environment?', options: ['Crushing hydrostatic pressure', 'Negligible atmospheric pressure', 'Fluctuating tidal pressure'], answer: 0 },
    ],
  },
  {
    id: 3,
    title: 'The Midnight Shift',
    titleC1: 'The Restoration Atelier',
    story: `
      <p>As the city plunged into deep slumber, Julian sat quietly at his mahogany desk inside the municipal archive.</p>
      <p>Surrounded by towering stacks of yellowed documents dating back to the early twentieth century, he meticulously digitized historical architectural blueprints.</p>
      <p>The work required immense concentration, as a single keystroke error could miscategorize decades of urban development records.</p>
      <p>Although the solitary hours were exhausting, Julian found a profound sense of purpose in preserving the fragile legacy of his hometown.</p>
    `,
    char: { name: 'Julian', role: 'Archivero Nocturno', emoji: '📜' },
    charGreeting: "Working the night shift in the archive gives you a totally different perspective on history. Have you ever explored old historical records?",
    quiz: [
      { q: 'What was Julian\'s primary task during his shift?', options: ['Restoring old oil paintings', 'Digitizing historical architectural blueprints', 'Patrolling city streets as a security guard'], answer: 1 },
      { q: 'What time of day did Julian work?', options: ['During the busy afternoon rush', 'Early morning before sunrise', 'Late at night while the city slept'], answer: 2 },
      { q: 'Why did the job require immense concentration?', options: ['Because errors could miscategorize urban records', 'Because the computer systems were ancient and slow', 'Because his supervisor was constantly watching him'], answer: 0 },
      { q: 'How did Julian view the solitary and exhausting hours?', options: ['As a meaningless waste of time', 'As a chance to sleep on the job', 'As a profound purpose in preserving his town\'s legacy'], answer: 2 },
      { q: 'What era did the documents originate from?', options: ['The early twentieth century', 'The twenty-first century', 'The Renaissance period'], answer: 0 },
      { q: 'Where was Julian\'s desk located?', options: ['Inside a municipal archive', 'At a downtown public library', 'In a university computer lab'], answer: 0 },
    ],
    charGreetingC1: "The craquelure was extensive, and one careless solvent pass would have ruined the imprimatura. Where do you draw the line between restoration and overpainting?",
    storyC1: `
      <p>Inside the softly illuminated atelier, conservator Julian inspected a sixteenth-century oil painting suffering from extensive
      <span class="word-highlight" data-word="craquelure" data-def="Craquelure: a network of fine cracks in the paint or varnish of an old painting.">craquelure</span>
      and varnish
      <span class="word-highlight" data-word="oxidation" data-def="Oxidation: chemical reaction with oxygen that degrades a material over time.">oxidation</span>.</p>
      <p>Using a binocular microscope and surgical micro-solvents, he meticulously removed centuries of grime without compromising the delicate
      <span class="word-highlight" data-word="imprimatura" data-def="Imprimatura: a thin, tinted ground layer applied to a canvas before painting.">imprimatura</span>
      beneath. Every micro-restoration decision demanded rigorous historical alignment and ethical
      <span class="word-highlight" data-word="restraint" data-def="Restraint: self-control; refusing to do more than is strictly necessary.">restraint</span>.</p>
      <p>When the restoration was finally unveiled, the painting's
      <span class="word-highlight" data-word="chromatic" data-def="Chromatic: relating to colour or a range of colours.">chromatic</span>
      brilliance re-emerged, honoring the original master's vision across half a millennium.</p>
    `,
    quizC1: [
      { q: 'What specific damage was affecting the sixteenth-century oil painting?', options: ['Water saturation and torn canvas edges', 'Extensive craquelure and varnish oxidation', 'Complete paint flaking due to fire damage'], answer: 1 },
      { q: 'What tools did Julian use to examine and treat the artwork?', options: ['Digital rendering tablets and laser scanners', 'Binocular microscope and surgical micro-solvents', 'Heavy chemical strippers and coarse brushes'], answer: 1 },
      { q: 'What layer beneath the grime did he take care not to compromise?', options: ['The delicate imprimatura', 'The modern wooden frame', 'The certificate of authenticity'], answer: 0 },
      { q: 'What did every micro-restoration decision demand from the conservator?', options: ['Speed and commercial efficiency', 'Rigorous historical alignment and ethical restraint', 'Bold artistic interpretation and repainting'], answer: 1 },
      { q: 'What happened when the restoration was officially unveiled?', options: ["The painting's chromatic brilliance re-emerged", 'The colors faded into total obscurity', 'Critics claimed it was an obvious forgery'], answer: 0 },
      { q: "Across how many years did the restored work honor the master's vision?", options: ['A single decade', 'One hundred years', 'Half a millennium'], answer: 2 },
    ],
  },
  {
    id: 4,
    title: 'Culinary Heritage',
    titleC1: 'Quantum Cryptography',
    story: `
      <p>Every Sunday afternoon, Sofia's kitchen filled with the rich, aromatic scents of slow-simmering sofrito and tender plantains.</p>
      <p>Standing side-by-side with her grandmother, she learned the intricate techniques behind traditional Caribbean coastal dishes.</p>
      <p>While contemporary dining trends favored fast-paced fusion concepts, Sofia believed that preserving authentic culinary heritage was a vital form of storytelling.</p>
      <p>As she deftly folded dough for empanadas, she realized that food was a living bridge connecting her present identity to ancestral roots.</p>
    `,
    char: { name: 'Sofia', role: 'Chef Tradicional', emoji: '🍳' },
    charGreeting: "Hello! Cooking family recipes always reminds me of where I come from. Do you have a favorite traditional dish from your culture?",
    quiz: [
      { q: 'What dishes and aromas characterized Sunday afternoons in Sofia\'s kitchen?', options: ['Italian pasta and baked lasagna', 'Slow-simmering sofrito and tender plantains', 'French pastries and creamy soups'], answer: 1 },
      { q: 'How were these traditional recipes originally passed down?', options: ['Through printed cookbooks and magazines', 'Via online cooking blogs and videos', 'Orally through generations'], answer: 2 },
      { q: 'What contrast does Sofia note regarding modern dining trends?', options: ['They favor fast-paced fusion concepts', 'They are too expensive for most people', 'They completely ignore the use of spices'], answer: 0 },
      { q: 'Why does Sofia consider preserving heritage cooking important?', options: ['As a way to open a restaurant chain', 'As a vital form of storytelling', 'To win international culinary awards'], answer: 1 },
      { q: 'What deeper meaning did Sofia attach to food while cooking?', options: ['It is a living bridge to her ancestral roots', 'It is solely a biological necessity for survival', 'It is a competitive sport'], answer: 0 },
      { q: 'Who was teaching Sofia these intricate culinary techniques?', options: ['Her professional chef instructor', 'Her grandmother', 'Her older brother'], answer: 1 },
    ],
    charGreetingC1: "Any interception collapses the quantum state. If confidentiality rests on physics rather than passwords, what still keeps you awake at night?",
    storyC1: `
      <p>Within the subterranean physics laboratory, Dr. Vance oversaw the calibration of a quantum key distribution rig. Photons polarized in
      <span class="word-highlight" data-word="superposition" data-def="Superposition: a quantum state in which a particle exists in multiple states at once until measured.">superposition</span>
      states were transmitted across optical fibers to secure institutional data channels against quantum decryption threats.</p>
      <p>Any malicious
      <span class="word-highlight" data-word="interception" data-def="Interception: the act of catching or diverting something while it is in transit.">interception</span>
      inevitably collapsed the quantum state, leaving an unmistakable
      <span class="word-highlight" data-word="cryptographic" data-def="Cryptographic: relating to coded communication designed to keep information secret.">cryptographic</span>
      footprint.</p>
      <p>This paradigm shift in cybersecurity replaced mathematical complexity with
      <span class="word-highlight" data-word="immutable" data-def="Immutable: unable to be changed; permanent.">immutable</span>
      laws of quantum mechanics, promising absolute
      <span class="word-highlight" data-word="confidentiality" data-def="Confidentiality: the state of keeping information private and restricted.">confidentiality</span>
      for future global communications.</p>
    `,
    quizC1: [
      { q: 'What equipment was Dr. Vance calibrating in the subterranean lab?', options: ['A particle accelerator ring', 'A quantum key distribution rig', 'A nuclear fusion containment vessel'], answer: 1 },
      { q: 'In what states were the transmitted photons polarized?', options: ['Superposition states', 'Binary linear states', 'Thermal plasma states'], answer: 0 },
      { q: 'What was the primary purpose of transmitting these photons across optical fibers?', options: ['To increase internet bandwidth speeds for public users', 'To secure institutional data channels against quantum threats', 'To test fiber optic cable tensile strength'], answer: 1 },
      { q: 'What happens during any malicious interception of the quantum channel?', options: ['The data downloads twice as fast', 'The quantum state collapses, leaving a cryptographic footprint', 'The optical fibers melt from thermal overload'], answer: 1 },
      { q: 'What did this cybersecurity paradigm shift replace mathematical complexity with?', options: ['Immutable laws of quantum mechanics', 'Stronger password encryption algorithms', 'Biometric facial recognition barriers'], answer: 0 },
      { q: 'What ultimate promise does this technology hold for global communications?', options: ['Absolute confidentiality', 'Instantaneous global broadcasting', 'Zero maintenance overhead'], answer: 0 },
    ],
  },
  {
    id: 5,
    title: 'The Remote Collaboration',
    titleC1: 'The Architectural Biome',
    story: `
      <p>Working across three different time zones, Liam’s multinational development squad faced constant logistical hurdles.</p>
      <p>Team members in Tokyo, Berlin, and Vancouver had to synchronize schedules meticulously to ensure seamless code deployment.</p>
      <p>Instead of letting communication barriers hinder progress, Liam implemented asynchronous workflows and transparent documentation standards.</p>
      <p>Ultimately, the distributed team discovered that distance could foster stronger global synergy than a traditional office.</p>
    `,
    char: { name: 'Liam', role: 'Lider de Desarrollo Remoto', emoji: '🌐' },
    charGreeting: "Managing a team across Tokyo, Berlin, and Vancouver is quite a puzzle! Have you ever worked on a project with people from around the world?",
    quiz: [
      { q: 'What major challenge did Liam\'s development squad face?', options: ['Frequent hardware failures across devices', 'Logistical hurdles across three different time zones', 'Language barriers between local clients'], answer: 1 },
      { q: 'How did Liam overcome communication barriers?', options: ['By forcing everyone to work nocturnal hours', 'By implementing asynchronous workflows and documentation', 'By canceling all team meetings permanently'], answer: 1 },
      { q: 'What was one direct benefit of this cultural shift?', options: ['Reduction of redundant meetings', 'Increased office rental budgets', 'Faster coffee breaks'], answer: 0 },
      { q: 'What did the new approach empower developers to do?', options: ['Take autonomous ownership of their modules', 'Work completely isolated without sharing code', 'Ignore project deadlines entirely'], answer: 0 },
      { q: 'What conclusion did the distributed team reach about distance?', options: ['It makes software development impossible', 'It fosters stronger global synergy with intentional frameworks', 'It requires everyone to relocate to the same city'], answer: 1 },
      { q: 'Which cities were home to the team members?', options: ['London, Paris, and Rome', 'New York, Sydney, and Madrid', 'Tokyo, Berlin, and Vancouver'], answer: 2 },
    ],
    charGreetingC1: "The eco-dome is a closed-loop metabolic system now. If a building can sequester carbon and purify its own greywater, what should cities still demand of architects?",
    storyC1: `
      <p>Designed to mimic natural forest canopies, the experimental eco-dome integrated living
      <span class="word-highlight" data-word="mycelium" data-def="Mycelium: the root-like fungal network used here as a living building composite.">mycelium</span>
      composite panels with
      <span class="word-highlight" data-word="photovoltaic" data-def="Photovoltaic: converting sunlight directly into electrical energy.">photovoltaic</span>
      skin membranes.</p>
      <p>Indoor microclimates were dynamically regulated by intelligent HVAC algorithms that reacted to sunlight intensity and human occupancy metrics. The structure operated as a closed-loop metabolic system, purifying its own greywater and
      <span class="word-highlight" data-word="sequestering" data-def="To sequester: to capture and store something, especially carbon dioxide.">sequestering</span>
      carbon dioxide directly from the ambient air.</p>
      <p>It stood as a monumental testament to
      <span class="word-highlight" data-word="regenerative" data-def="Regenerative: designed to restore or renew rather than merely reduce harm.">regenerative</span>
      architecture, proving that human habitations could actively heal degraded urban
      <span class="word-highlight" data-word="ecosystems" data-def="Ecosystems: communities of living organisms interacting with their environment.">ecosystems</span>.</p>
    `,
    quizC1: [
      { q: 'What natural structure did the experimental eco-dome mimic?', options: ['Desert canyon caves', 'Natural forest canopies', 'Coral reef formations'], answer: 1 },
      { q: "What innovative materials were used for the dome's skin and panels?", options: ['Living mycelium composite panels and photovoltaic skins', 'Reinforced steel girders and tinted glass panes', 'Plastic polymers and aluminum sheets'], answer: 0 },
      { q: 'How were indoor microclimates regulated within the facility?', options: ['By manual window opening by residents', 'By intelligent HVAC algorithms reacting to sunlight and occupancy', 'By subterranean geothermal pipes alone'], answer: 1 },
      { q: 'What metabolic capability did the closed-loop system possess?', options: ['Purifying its own greywater and sequestering carbon dioxide', 'Generating organic food crops inside living rooms', 'Manufacturing its own building replacement materials'], answer: 0 },
      { q: 'What overarching architectural philosophy did the structure represent?', options: ['Brutalist minimalist design', 'Regenerative architecture', 'Industrial retrofitting'], answer: 1 },
      { q: 'What broader ecological impact was the habitation designed to achieve?', options: ['Actively heal degraded urban ecosystems', 'Displace surrounding wildlife habitats', 'Increase local atmospheric temperatures'], answer: 0 },
    ],
  },
  {
    id: 6,
    title: 'Weekend Trek',
    titleC1: 'Alpine Glaciology',
    story: `
      <p>The crisp autumn air bit sharply at Mateo’s cheeks as he ascended the rugged mountain trail.</p>
      <p>Opting for a challenging detour off the beaten path, he navigated steep rocky outcrops and dense pine thickets.</p>
      <p>Halfway up the ridge, thick fog rolled in unexpectedly, obscuring the panoramic view and testing his navigational instincts.</p>
      <p>Relying on his compass and topographic map, he calmly adjusted his pace and stayed the course until reaching the summit.</p>
    `,
    char: { name: 'Mateo', role: 'Montañista y Explorador', emoji: '⛰️' },
    charGreeting: "Getting lost in the mountain fog was quite a scare, but map reading saved the day. Do you like outdoor adventures and hiking?",
    quiz: [
      { q: 'What kind of weather and environment did Mateo experience initially?', options: ['Tropical heat and sandy dunes', 'Crisp autumn air on a rugged mountain trail', 'Heavy tropical rainfall in a rainforest'], answer: 1 },
      { q: 'What unexpected obstacle occurred halfway up the ridge?', options: ['Thick fog rolled in and obscured the view', 'A flash flood blocked the trail', 'He ran completely out of drinking water'], answer: 0 },
      { q: 'How did Mateo handle the sudden reduction in visibility?', options: ['He panicked and called emergency services immediately', 'He turned back and abandoned the hike', 'He relied on his compass and topographic map'], answer: 2 },
      { q: 'What reward awaited him after breaching the cloud line?', options: ['A hidden mountain cabin with food', 'A breathtaking vista of golden foliage in the sunlight', 'A meeting with fellow hikers'], answer: 1 },
      { q: 'What overall lesson did the grueling hike reinforce?', options: ['Mateo should never hike alone again', 'Staying calm and prepared makes challenges worthwhile', 'Mountains are too dangerous to explore'], answer: 1 },
      { q: 'What type of path did Mateo choose to take?', options: ['A paved tourist walk', 'A challenging detour off the beaten path', 'A shortcut through a local farm'], answer: 1 },
    ],
    charGreetingC1: "The ice wall is retreating faster than the models. If these frozen archives vanish, what record of the past millennia do we actually lose?",
    storyC1: `
      <p>Climbing onto the receding tongue of the glacier, glaciologist Dr. Thorne drove ice-core drills deep into ancient
      <span class="word-highlight" data-word="firn" data-def="Firn: compacted granular snow that is an intermediate stage between snow and glacial ice.">firn</span>
      layers. The extracted cylindrical samples contained trapped atmospheric bubbles preserving
      <span class="word-highlight" data-word="isotopic" data-def="Isotopic: relating to variants of an element used to reconstruct past climate conditions.">isotopic</span>
      records of past millennia.</p>
      <p>Laboratory mass
      <span class="word-highlight" data-word="spectrometry" data-def="Spectrometry: analysis of matter by measuring the mass of its particles or ions.">spectrometry</span>
      revealed accelerating melt rates directly correlated with industrial
      <span class="word-highlight" data-word="greenhouse" data-def="Greenhouse gases: atmospheric gases that trap heat and warm the planet.">greenhouse</span>
      gas emissions.</p>
      <p>Standing before the retreating ice wall, she recognized the grim reality: these frozen
      <span class="word-highlight" data-word="archives" data-def="Archives: here, ice that stores historical climate information.">archives</span>
      were vanishing faster than computational models could predict.</p>
    `,
    quizC1: [
      { q: 'Where did Dr. Thorne drive her ice-core drills?', options: ['Onto the receding tongue of a glacier into ancient firn layers', 'Into frozen lake ice during winter freeze', 'Inside a high-altitude artificial cold chamber'], answer: 0 },
      { q: 'What did the extracted cylindrical ice samples contain?', options: ['Fossilized remains of ancient aquatic plants', 'Trapped atmospheric bubbles preserving isotopic records', 'Traces of modern microplastics and industrial slag'], answer: 1 },
      { q: 'What analytical technique did laboratory technicians use on the samples?', options: ['Mass spectrometry', 'Electron microscopy', 'Carbon dating via infrared lasers'], answer: 0 },
      { q: 'What did the analysis reveal about current glacial melt rates?', options: ['They were slowing down due to natural cooling cycles', 'They were accelerating and correlating with greenhouse emissions', 'They remained completely stable over the last century'], answer: 1 },
      { q: 'What emotion or realization struck Dr. Thorne before the ice wall?', options: ['Excitement over new funding opportunities', 'The grim reality that frozen archives were vanishing rapidly', 'Indifference toward historical climate shifts'], answer: 1 },
      { q: 'How did the actual melt rate compare to computational models?', options: ['It was vanishing faster than models could predict', 'It was precisely matching computer simulations', 'It was slower than theoretical predictions'], answer: 0 },
    ],
  },
  {
    id: 7,
    title: 'The Community Library',
    titleC1: 'The Neuroethics Symposium',
    story: `
      <p>Nestled in a revitalized industrial district, the neighborhood's public library had evolved far beyond a mere repository for books.</p>
      <p>Under the guidance of director Clara, it served as a vibrant community hub offering free coding bootcamps and maker-spaces.</p>
      <p>Clara firmly believed that equitable access to modern technology was essential for bridging socioeconomic divides.</p>
      <p>Seeing teenagers building robots alongside retirees learning digital literacy reinforced her conviction that libraries remain vital societies.</p>
    `,
    char: { name: 'Clara', role: 'Directora de Biblioteca', emoji: '📚' },
    charGreeting: "Our library now teaches coding and robotics to everyone in the neighborhood. What community spaces do you find most valuable?",
    quiz: [
      { q: 'Where was the community library located?', options: ['In a rural agricultural village', 'In a revitalized industrial district', 'Inside a commercial shopping mall'], answer: 1 },
      { q: 'Besides storing books, what modern amenities did the library offer?', options: ['Free coding bootcamps and a maker-space with 3D printers', 'A full-service restaurant and coffee lounge', 'Indoor sports courts and a swimming pool'], answer: 0 },
      { q: 'Who was the director guiding these initiatives?', options: ['Sarah', 'Elena', 'Clara'], answer: 2 },
      { q: 'What was Clara\'s core philosophy regarding the library?', options: ['It should focus exclusively on historical literature', 'Equitable access to technology bridges socioeconomic divides', 'It should charge high membership fees to cover costs'], answer: 1 },
      { q: 'What scene reinforced Clara\'s conviction about modern libraries?', options: ['Teenagers building robots alongside retirees learning digital skills', 'The library building remaining completely empty all day', 'People complaining about noisy computer equipment'], answer: 0 },
      { q: 'What type of spaces did Clara promote for learning?', options: ['Isolated individual cubicles', 'Collaborative learning spaces', 'Strict, silent study halls'], answer: 1 },
    ],
    charGreetingC1: "We were arguing under those vaulted ceilings about rewriting the seat of consciousness. Without an ethical consensus, should bidirectional interfaces even leave the lab?",
    storyC1: `
      <p>Beneath the vaulted ceilings of the university amphitheater,
      <span class="word-highlight" data-word="neuroethicists" data-def="Neuroethicists: specialists who study the ethics of brain science and neural technology.">neuroethicists</span>
      debated the implications of bidirectional neural interfaces. Proponents argued that direct brain-computer integration would eradicate cognitive deficits and enhance human memory capacity.</p>
      <p>Critics, however, raised urgent concerns regarding cognitive liberty, corporate data harvesting of neural
      <span class="word-highlight" data-word="telemetry" data-def="Telemetry: remote measurement and transmission of data; here, brain-activity data.">telemetry</span>,
      and erosion of personal identity.</p>
      <p>The symposium underscored an unprecedented philosophical crisis: humanity was on the verge of modifying the very seat of
      <span class="word-highlight" data-word="consciousness" data-def="Consciousness: the state of being aware of oneself and one's surroundings.">consciousness</span>
      without an ethical
      <span class="word-highlight" data-word="consensus" data-def="Consensus: general agreement among a group of people.">consensus</span>.</p>
    `,
    quizC1: [
      { q: "What technology was at the center of the symposium's debate?", options: ['Artificial intelligence language models', 'Bidirectional neural interfaces', 'Genetic gene-editing CRISPR therapies'], answer: 1 },
      { q: 'What potential benefits did proponents highlight?', options: ['Eradicating cognitive deficits and enhancing human memory', 'Achieving instantaneous teleportation of thoughts', 'Eliminating the need for human sleep entirely'], answer: 0 },
      { q: 'What major ethical concern did critics raise regarding neural telemetry?', options: ['Corporate data harvesting of brain activity', 'High manufacturing costs for medical clinics', 'Physical discomfort during surgical implantation'], answer: 0 },
      { q: 'What philosophical concept did critics argue was under threat?', options: ['Financial market stability', 'Cognitive liberty and personal identity', 'Traditional educational curricula'], answer: 1 },
      { q: 'What unprecedented crisis did the symposium underscore?', options: ['Modifying the seat of consciousness without ethical consensus', 'A severe shortage of neurosurgeons worldwide', 'Power grid failures in research hospitals'], answer: 0 },
      { q: 'Where was this academic symposium hosted?', options: ['Inside a corporate tech incubator boardroom', 'Beneath the vaulted ceilings of a university amphitheater', 'At an international government defense summit'], answer: 1 },
    ],
  },
  {
    id: 8,
    title: 'Creative Burnout',
    titleC1: 'Linguistic Preservation',
    story: `
      <p>After weeks of staring at blank canvases and wrestling with uninspired watercolor strokes, Lucas realized he was suffering from severe creative burnout.</p>
      <p>His usual passion for painting had curdled into a suffocating obligation, draining his artistic enthusiasm.</p>
      <p>Instead of forcing himself to produce work, he made a conscious decision to step away from the easel entirely for a fortnight.</p>
      <p>By relinquishing the pressure to constantly perform, his creative spark quietly and naturally reignited.</p>
    `,
    char: { name: 'Lucas', role: 'Artista Plástico', emoji: '🎨' },
    charGreeting: "Taking a break from painting was the best thing I could do to beat creative burnout. Have you ever had to step back to recharge your passion?",
    quiz: [
      { q: 'What problem was Lucas experiencing with his art?', options: ['He lost all his painting equipment in a fire', 'He was suffering from severe creative burnout', 'He was too successful and had too many commissions'], answer: 1 },
      { q: 'How had his passion for painting transformed?', options: ['Into a suffocating obligation that drained his enthusiasm', 'Into a lucrative business venture', 'Into a hobby he shared with thousands of students'], answer: 0 },
      { q: 'What radical step did he take to address the issue?', options: ['He enrolled in a masterclass in Europe', 'He stepped away from the easel entirely and took a break', 'He switched completely to digital graphic design'], answer: 1 },
      { q: 'What activities did he engage in during his break?', options: ['Exploring botanical gardens and sketching without pressure', 'Working long hours at a corporate design agency', 'Competing in regional art competitions'], answer: 0 },
      { q: 'What was the ultimate result of relinquishing performance pressure?', options: ['He quit art forever and started writing code', 'His creative spark naturally and quietly reignited', 'He realized he preferred photography over painting'], answer: 1 },
      { q: 'How long was his period of stepping away to explore other things?', options: ['A single weekend', 'A full year', 'A fortnight'], answer: 2 },
    ],
    charGreetingC1: "The last fluent speakers sat with me while the multi-trackers ran. If a language vanishes, what part of human cognitive diversity actually disappears?",
    storyC1: `
      <p>Deep in the remote rainforest settlement,
      <span class="word-highlight" data-word="ethnolinguist" data-def="Ethnolinguist: a scholar who studies the relationship between language and culture.">ethnolinguist</span>
      Dr. Alistair recorded the final fluent speakers of an endangered tonal language. Utilizing portable acoustic multi-trackers, she cataloged complex
      <span class="word-highlight" data-word="morphosyntactic" data-def="Morphosyntactic: relating to how word forms and sentence structure work together.">morphosyntactic</span>
      structures before oral traditions vanished entirely.</p>
      <p>The indigenous elders shared oral histories embedded with sophisticated botanical
      <span class="word-highlight" data-word="taxonomies" data-def="Taxonomies: systems for classifying and naming living things.">taxonomies</span>
      unknown to Western science.</p>
      <p>Her
      <span class="word-highlight" data-word="archival" data-def="Archival: relating to the long-term storage of records and documents.">archival</span>
      repository became an invaluable cultural ark, ensuring that a unique window into human cognitive diversity would survive digital
      <span class="word-highlight" data-word="posterity" data-def="Posterity: all future generations of people.">posterity</span>.</p>
    `,
    quizC1: [
      { q: "What was Dr. Alistair's professional background?", options: ['Cultural anthropologist', 'Ethnolinguist', 'Evolutionary biologist'], answer: 1 },
      { q: 'What specific subjects was she recording in the rainforest?', options: ['Animal mating calls and insect vibrations', 'The final fluent speakers of an endangered tonal language', 'Environmental acoustic noise pollution levels'], answer: 1 },
      { q: 'What equipment did she use to catalog the language?', options: ['Portable acoustic multi-trackers', 'Satellite video recording gear', 'Handwritten parchment notebooks only'], answer: 0 },
      { q: 'What scientific knowledge was embedded within the elders\' oral histories?', options: ['Advanced metallurgical smelting formulas', 'Sophisticated botanical taxonomies unknown to Western science', 'Maritime celestial navigation maps'], answer: 1 },
      { q: 'What did her resulting archival repository act as?', options: ['A commercial dictionary for ecotourism businesses', 'An invaluable cultural ark for cognitive diversity', 'A legal document for land ownership claims'], answer: 1 },
      { q: 'What ultimate assurance did her fieldwork provide?', options: ['That the language would survive for digital posterity', 'That the rainforest would receive government logging protection', 'That local schools would adopt Western curricula'], answer: 0 },
    ],
  },
];

/* ─── INSIGNIAS ─── */
const INSIGNIAS = [
  { id: 'primera_lectura', name: 'First signal', emoji: '📡', cond: () => state.completedEps.length >= 1 },
  { id: 'mitad',           name: 'On frequency', emoji: '🎚️', cond: () => state.completedEps.length >= 4 },
  { id: 'completo',        name: 'On air',        emoji: '🏆', cond: () => state.completedEps.length === 8 },
  { id: 'vocabulario',     name: 'Lexicón',        emoji: '📖', cond: () => state.savedWords.length >= 5 },
  { id: 'conversador',     name: 'Interlocutor',   emoji: '💬', cond: () => state.conversations >= 3 },
];

/* ════════════════════════════════════════
   PERSISTENCIA (Firestore + firebase)
   ════════════════════════════════════════ */

let currentUser = null;

function userProfilePayload(user) {
  return {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    lastLoginAt: Date.now(),
  };
}

window.syncCloudUser = async function(user) {
  currentUser = user || null;
  const loginBtn = document.getElementById('btnLogin');
  if (loginBtn) {
    loginBtn.textContent = user ? (user.displayName || user.email || 'Sesión activa') : 'Entrar con Google';
  }
  if (!user) return;

  await loadState();
  if (typeof window.saveStateCloud === 'function') {
    await window.saveStateCloud(user.uid, {
      ...serializableState(),
      ...userProfilePayload(user),
    });
  }
  refreshUIFromState();
};

window.grantPurchasedLives = async function() {
  if (!currentUser) return;
  await loadState();
  refreshUIFromState();
};

function serializableState() {
  return JSON.parse(JSON.stringify(state));
}

function applyLoadedState() {
  if (state.level) state.levelLocked = true;
  if (!Array.isArray(state.a1Completed)) state.a1Completed = [];
  if (!Array.isArray(state.completedEps)) state.completedEps = [];
  if (!Array.isArray(state.savedWords)) state.savedWords = [];
  if (typeof state.a1Advanced !== 'boolean') state.a1Advanced = false;
  if (typeof state.conversations !== 'number') state.conversations = 0;
  if (typeof state.lives !== 'number' || state.lives < 0 || state.lives > MAX_LIVES) {
    state.lives = MAX_LIVES;
  }
  if (state.livesRestoreAt != null && typeof state.livesRestoreAt !== 'number') {
    state.livesRestoreAt = null;
  }
  restoreLivesIfDue();
}

async function loadState() {
  if (currentUser && typeof window.loadStateCloud === 'function') {
    const cloud = await window.loadStateCloud(currentUser.uid);
    if (cloud) Object.assign(state, cloud);
  }
  applyLoadedState();
}

function saveState() {
  if (currentUser && typeof window.saveStateCloud === 'function') {
    const extra = userProfilePayload(currentUser);
    window.saveStateCloud(currentUser.uid, { ...serializableState(), ...extra }).catch((err) => {
      console.error('Firestore save', err);
    });
  }
}

function refreshUIFromState() {
  applyLevelLockUI();
  renderLives();
  updateDials(calcPct());
  if (state.phase === 'main' && state.level) {
    showMainPhase();
  }
}

/* ════════════════════════════════════════
   VIDAS (3 por ciclo de 12 h)
   ════════════════════════════════════════ */
function restoreLivesIfDue() {
  if (state.lives >= MAX_LIVES) {
    state.lives = MAX_LIVES;
    if (state.livesRestoreAt) {
      state.livesRestoreAt = null;
      saveState();
    }
    return false;
  }
  if (state.livesRestoreAt && Date.now() >= state.livesRestoreAt) {
    state.lives = MAX_LIVES;
    state.livesRestoreAt = null;
    saveState();
    return true;
  }
  return false;
}

function formatLivesCountdown() {
  const remain = Math.max(0, (state.livesRestoreAt || 0) - Date.now());
  const totalSec = Math.ceil(remain / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = n => String(n).padStart(2, '0');
  if (h > 0) return `${h} h ${pad(m)} min`;
  return `${pad(m)}:${pad(s)}`;
}

function livesWaitMessage() {
  restoreLivesIfDue();
  if (state.lives > 0) return '';
  if (state.livesRestoreAt) {
    return `Sin vidas. Se restablecen en ${formatLivesCountdown()}`;
  }
  return 'Sin vidas. Espera 12 horas para que se restablezcan';
}

function canSpendLife() {
  restoreLivesIfDue();
  return state.lives > 0;
}

function consumeLife() {
  restoreLivesIfDue();
  if (state.lives <= 0) return false;
  if (!state.livesRestoreAt) {
    state.livesRestoreAt = Date.now() + LIFE_RESTORE_MS;
  }
  state.lives -= 1;
  saveState();
  renderLives();
  return true;
}

function livesLeftLabel() {
  if (state.lives <= 0) {
    return ` Sin vidas: se restablecen en ${formatLivesCountdown()}`;
  }
  return ` · ${state.lives} vida${state.lives === 1 ? '' : 's'} restante${state.lives === 1 ? '' : 's'}`;
}

function renderLives() {
  restoreLivesIfDue();
  const heartsEl = document.getElementById('livesHearts');
  const timerEl  = document.getElementById('livesTimer');
  if (!heartsEl) return;

  heartsEl.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i++) {
    const span = document.createElement('span');
    span.className = 'life-heart' + (i < state.lives ? '' : ' empty');
    span.textContent = '♥';
    heartsEl.appendChild(span);
  }

  if (timerEl) {
    if (state.lives < MAX_LIVES && state.livesRestoreAt) {
      timerEl.textContent = formatLivesCountdown();
    } else {
      timerEl.textContent = '';
    }
  }
}

function startLivesTicker() {
  renderLives();
  setInterval(() => {
    const restored = restoreLivesIfDue();
    renderLives();
    if (restored) showToast('¡Tus 3 vidas se restablecieron!');
  }, 1000);
}

/* ════════════════════════════════════════
   DIAL ANIMADO
   ════════════════════════════════════════ */
function pctToAngle(pct) {
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
  if (isBasico() && !state.a1Advanced) {
    const total   = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
    const a1Pct   = (state.a1Completed.length / total) * 80;
    const wordPct = Math.min(state.savedWords.length / 10, 1) * 20;
    return Math.min(a1Pct + wordPct, 100);
  }
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

function episodeTitle(ep) {
  return isC1() ? (ep.titleC1 || ep.title) : ep.title;
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
  if (isBasico()) {
    showToast('¡Frecuencia sintonizada! Lección 1 desbloqueada 📻');
  } else {
    showToast('¡Frecuencia sintonizada! Episodio 1 desbloqueado 📻');
  }
}

/* ════════════════════════════════════════
   TRANSICIÓN ONBOARDING → MAIN
   ════════════════════════════════════════ */
function showMainPhase() {
  document.getElementById('screen-onboarding').classList.remove('active');
  document.getElementById('tabNav').style.display      = 'flex';
  document.getElementById('epBadge').style.display     = 'block';
  document.getElementById('btnHome').classList.add('visible');

  applyListeningTabVisibility();

  if (isBasico() && !state.a1Advanced) {
    const total = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
    document.getElementById('epBadge').textContent = `A1 ${state.a1Completed.length}/${total}`;
  }

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

  document.getElementById('tabNav').style.display  = 'none';
  document.getElementById('epBadge').style.display = 'none';
  document.getElementById('btnHome').classList.remove('visible');

  ['historia', 'practica', 'diario', 'reader'].forEach(id => {
    document.getElementById(`screen-${id}`)?.classList.remove('active');
  });

  state.phase = 'onboarding';
  saveState();

  const onboarding = document.getElementById('screen-onboarding');
  onboarding.classList.add('active');

  applyLevelLockUI();
  if (state.level) {
    updateDials(calcPct() > 10 ? 10 : calcPct());
  } else {
    updateDials(0);
  }

  showToast('Bienvenido de nuevo 👋');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
});

/* ════════════════════════════════════════
   NAVEGACIÓN ENTRE TABS
   ════════════════════════════════════════ */
function switchTab(tab) {
  if (tab === 'listening' && state.level === 'basico' && !state.a1Advanced) {
    showToast('El listening se desbloquea al avanzar al nivel B1–B2');
    tab = 'historia';
  }

  state.currentTab = tab;

  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  ['historia', 'practica', 'diario', 'listening'].forEach(t => {
    const el = document.getElementById(`screen-${t}`);
    if (el) el.classList.toggle('active', t === tab);
  });

  const screenReader = document.getElementById('screen-reader');
  if (screenReader) screenReader.classList.remove('active');
  const screenListenPlayer = document.getElementById('screen-listen-player');
  if (screenListenPlayer) screenListenPlayer.classList.remove('active');

  if (tab === 'diario')    buildDiario();
  if (tab === 'practica')  buildPractica();
  if (tab === 'listening') buildListeningHub();
  if (tab === 'historia' && isBasico() && !state.a1Advanced) buildEpList();
  hideQuiz();
}

/* ════════════════════════════════════════
   HELPERS DE NIVEL
   ════════════════════════════════════════ */
function isBasico() {
  return state.level === 'basico';
}

function applyListeningTabVisibility() {
  const tabListening = document.getElementById('tabListening');
  if (!tabListening) return;
  const hide = (state.level === 'basico') && !state.a1Advanced;
  tabListening.style.display = hide ? 'none' : '';
}

function allA1Done() {
  const total = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
  return state.a1Completed.length >= total;
}

/* ════════════════════════════════════════
   LISTA DE EPISODIOS / LECCIONES A1
   ════════════════════════════════════════ */
function buildEpList() {
  const list = document.getElementById('epList');
  list.innerHTML = '';

  if (isBasico()) {
    const note = document.getElementById('epListNote');
    if (note) {
      note.textContent = 'Nivel A1–A2: lee cada historia y responde las 6 preguntas para desbloquear la siguiente lección. Completa todas para avanzar al nivel B1–B2.';
    }

    A1_LESSONS.forEach(lesson => {
      const unlocked  = lesson.id === 1 || state.a1Completed.includes(lesson.id - 1);
      const completed = state.a1Completed.includes(lesson.id);
      const isFirst   = lesson.id === 1 && !completed;

      const div = document.createElement('div');
      div.className = [
        'ep-item',
        !unlocked  ? 'locked'    : '',
        completed  ? 'completed' : '',
        isFirst    ? 'active-ep' : '',
      ].filter(Boolean).join(' ');

      const lockNote = !unlocked
        ? '🔒 Bloqueada'
        : (!completed ? 'Lee y responde para continuar' : '');

      div.innerHTML = `
        <div class="ep-num">${completed ? '✓' : lesson.id}</div>
        <div class="ep-title">${lesson.title}${lockNote ? `<div class="ep-sub">${lockNote}</div>` : ''}</div>
      `;

      if (unlocked) div.onclick = () => openA1Lesson(lesson.id);
      list.appendChild(div);
    });

    buildAdvanceButton();
    return;
  }

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
      <div class="ep-title">${episodeTitle(ep)}${lockNote ? `<div class="ep-sub">${lockNote}</div>` : ''}</div>
    `;

    if (unlocked) div.onclick = () => openEpisode(ep.id);
    list.appendChild(div);
  });
}

/* ════════════════════════════════════════
   BOTÓN "AVANZAR AL SIGUIENTE NIVEL" (A1 → B1)
   ════════════════════════════════════════ */
function buildAdvanceButton() {
  const wrap = document.getElementById('advanceWrap');
  if (!wrap) return;

  const done  = allA1Done();
  const total = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
  const count = state.a1Completed.length;

  wrap.innerHTML = `
    <div class="advance-card${done ? ' advance-unlocked' : ''}">
      <div class="advance-icon">${done ? '🚀' : '🔒'}</div>
      <div class="advance-info">
        <div class="advance-title">${done ? 'Nivel B1–B2 desbloqueado' : 'Avanzar al siguiente nivel'}</div>
        <div class="advance-sub">
          ${done
            ? 'Has completado todas las lecciones A1–A2. ¡Estás listo para B1–B2!'
            : `Completa todas las lecciones para desbloquear B1–B2 (${count}/${total} completadas)`}
        </div>
      </div>
      <button
        class="btn-advance${done ? '' : ' btn-advance-locked'}"
        ${done ? '' : 'disabled'}
        onclick="${done ? 'advanceToB1()' : ''}"
      >
        ${done ? 'Avanzar a B1–B2 →' : '🔒 Bloqueado'}
      </button>
    </div>
  `;
}

function advanceToB1() {
  if (!allA1Done()) {
    showToast('Completa todas las lecciones A1 primero');
    return;
  }
  state.level       = 'intermedio';
  state.a1Advanced  = true;
  state.levelLocked = true;
  saveState();

  applyListeningTabVisibility();

  const nextEp = 1;
  const badge  = document.getElementById('epBadge');
  if (badge) badge.textContent = `EP.${nextEp}/8`;

  applyLevelLockUI();
  buildEpList();
  buildDiario();
  buildPractica();
  showToast('¡Nivel B1–B2 desbloqueado! Bienvenido a la siguiente frecuencia 📻');
}

/* ════════════════════════════════════════
   LECTOR DE LECCIÓN A1
   ════════════════════════════════════════ */
function openA1Lesson(id) {
  const lesson = getA1Lesson(id);
  if (!lesson) return;
  state.currentA1Lesson = id;

  document.getElementById('screen-historia').classList.remove('active');
  document.getElementById('screen-reader').classList.add('active');
  document.getElementById('readerEpLabel').textContent = `LECCIÓN ${lesson.id} DE ${a1LessonCount()}`;
  document.getElementById('readerTitle').textContent   = lesson.title;
  document.getElementById('readerBody').innerHTML      = lesson.story || '';

  attachWordHighlights();

  hideQuiz();
  const actions = document.getElementById('readerActions');
  actions.style.display = 'flex';

  const btn     = document.getElementById('btnComplete');
  const already = state.a1Completed.includes(id);

  if (already) {
    btn.textContent   = '✓ Ya completada';
    btn.style.opacity = '0.6';
    btn.onclick       = null;
  } else {
    btn.textContent   = 'Responder preguntas →';
    btn.style.opacity = '1';
    btn.onclick       = showA1Quiz;
  }
}

function showA1Quiz() {
  const lesson = getA1Lesson(state.currentA1Lesson);
  if (!lesson) return;
  if (!state.a1Completed.includes(lesson.id) && !canSpendLife()) {
    showToast(livesWaitMessage());
    return;
  }
  hideQuiz();
  renderA1Quiz(lesson);
  document.querySelector('#quizPanel .quiz-eyebrow').textContent = 'COMPRENSIÓN · A1–A2';
  document.getElementById('quizPanel').classList.add('visible');
  document.getElementById('readerActions').style.display = 'none';
  document.getElementById('quizPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderA1Quiz(lesson) {
  const form = document.getElementById('quizForm');
  form.innerHTML = lesson.quiz.map((item, qi) => `
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

function submitA1Quiz() {
  const lesson = getA1Lesson(state.currentA1Lesson);
  if (!lesson) return;
  if (!state.a1Completed.includes(lesson.id) && !canSpendLife()) {
    showToast(livesWaitMessage());
    return;
  }
  const quiz    = lesson.quiz;
  const answers = quiz.map((_, qi) => {
    const sel = document.querySelector(`input[name="q${qi}"]:checked`);
    return sel ? Number(sel.value) : null;
  });

  if (answers.some(a => a === null)) {
    showToast('Responde todas las preguntas antes de comprobar');
    return;
  }

  let correct = 0;
  quiz.forEach((item, qi) => {
    const block   = document.querySelector(`.quiz-item[data-q="${qi}"]`);
    const isRight = answers[qi] === item.answer;
    block.classList.remove('correct', 'wrong');
    block.classList.add(isRight ? 'correct' : 'wrong');
    if (isRight) correct++;
  });

  document.querySelectorAll('#quizForm input').forEach(inp => {
    inp.disabled = true;
    inp.closest('.quiz-opt').classList.add('disabled');
  });

  const feedback   = document.getElementById('quizFeedback');
  const allCorrect = correct === quiz.length;

  if (allCorrect) {
    feedback.className   = 'quiz-feedback visible pass';
    feedback.textContent = '¡Perfecto! Has completado esta lección. La siguiente está desbloqueada.';
    document.getElementById('btnSubmitQuiz').style.display = 'none';
    document.getElementById('btnRetryQuiz').style.display  = 'none';
    setTimeout(() => finishA1Lesson(), 900);
  } else {
    feedback.className   = 'quiz-feedback visible fail';
    feedback.textContent = `Has acertado ${correct} de ${quiz.length}. Revisa la historia e inténtalo de nuevo.`;
    document.getElementById('btnSubmitQuiz').style.display = 'none';
    document.getElementById('btnRetryQuiz').style.display  = 'block';
    showToast('Aún no. Puedes intentarlo de nuevo');
  }
}

function retryA1Quiz() {
  const lesson = getA1Lesson(state.currentA1Lesson);
  if (!lesson) return;
  renderA1Quiz(lesson);
  document.getElementById('quizFeedback').className   = 'quiz-feedback';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('btnSubmitQuiz').style.display = '';
  document.getElementById('btnRetryQuiz').style.display  = 'none';
}

function finishA1Lesson() {
  const id = state.currentA1Lesson;
  if (!state.a1Completed.includes(id)) {
    if (!consumeLife()) {
      showToast(livesWaitMessage());
      return;
    }
    state.a1Completed.push(id);
    saveState();
  }

  const total = a1LessonCount();
  const done  = state.a1Completed.length;

  const badge = document.getElementById('epBadge');
  if (badge) badge.textContent = `A1 ${done}/${total}`;

  if (done >= total) {
    showToast('¡Has completado todas las lecciones A1! Desbloquea el nivel B1–B2 📻' + livesLeftLabel());
  } else {
    showToast(`Lección ${id} completada. ${total - done} lección${total - done !== 1 ? 'es' : ''} restante${total - done !== 1 ? 's' : ''}` + livesLeftLabel());
  }

  updateDials(calcPct());
  goBackA1();
}

function goBackA1() {
  hideQuiz();
  document.getElementById('readerActions').style.display = 'flex';
  document.getElementById('screen-reader').classList.remove('active');
  document.getElementById('screen-historia').classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'historia');
  });
  buildEpList();
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
  if (ep && !state.completedEps.includes(ep.id) && !canSpendLife()) {
    showToast(livesWaitMessage());
    return;
  }
  hideQuiz();
  renderQuiz(ep);
  document.querySelector('#quizPanel .quiz-eyebrow').textContent = quizLabel();
  document.getElementById('quizPanel').classList.add('visible');
  document.getElementById('readerActions').style.display = 'none';
  document.getElementById('quizPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitQuiz() {
  if (isBasico() && state.currentA1Lesson !== null) {
    submitA1Quiz();
    return;
  }
  const ep = EPISODES.find(e => e.id === state.currentEp);
  if (ep && !state.completedEps.includes(ep.id) && !canSpendLife()) {
    showToast(livesWaitMessage());
    return;
  }
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
  if (isBasico() && state.currentA1Lesson !== null) {
    retryA1Quiz();
    return;
  }
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
  document.getElementById('readerTitle').textContent   = episodeTitle(ep);
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
    if (!consumeLife()) {
      showToast(livesWaitMessage());
      return;
    }
    state.completedEps.push(id);
    saveState();
  }

  const nextEp = Math.min(id + 1, 8);
  document.getElementById('epBadge').textContent = `EP.${nextEp}/8`;

  if (id < 8) {
    showToast(`Frecuencia ${id} sintonizada. Episodio ${nextEp} desbloqueado 📻` + livesLeftLabel());
  } else {
    showToast('Has sintonizado todas las frecuencias 🏆' + livesLeftLabel());
  }

  updateDials(calcPct());
  goBack();
  buildEpList();
  buildPractica();
}

function goBack() {
  if (isBasico()) {
    goBackA1();
    return;
  }
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

  if (isBasico() && !state.a1Advanced) {
    const total = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
    const done  = state.a1Completed.length;
    container.innerHTML = `
      <div class="practica-locked-card">
        <div class="eyebrow">PRÁCTICA</div>
        <h3>${done === 0 ? 'Todavía no hay escenas disponibles' : `${done} de${total} lecciones completadas`}</h3>
        <p>La práctica de conversación se desbloquea cuando avances al nivel B1–B2. Completa las ${total} lecciones A1–A2 en la pestaña "Historia" para acceder.</p>
        ${done > 0 ? `<div class="a1-progress-mini"><div class="a1-progress-bar" style="width:${Math.round((done/total)*100)}%"></div></div>` : ''}
      </div>`;
    return;
  }

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
      system: `You are ${ep.char.name}, ${ep.char.role} from the story in the Speak FM English learning app.
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
  if (isBasico() && !state.a1Advanced) {
    const total = typeof a1LessonCount === 'function' ? a1LessonCount() : 6;
    document.getElementById('statEpisodes').textContent = `${state.a1Completed.length}/${total}`;
  } else {
    document.getElementById('statEpisodes').textContent = `${state.completedEps.length}/8`;
  }
  document.getElementById('statWords').textContent    = state.savedWords.length;
  document.getElementById('statConvos').textContent   = state.conversations;

  const badgesWrap = document.getElementById('epBadges');
  badgesWrap.innerHTML = '';
  EPISODES.forEach(ep => {
    const done = state.completedEps.includes(ep.id);
    const pill = document.createElement('div');
    pill.className   = `ep-pill${done ? ' done' : ''}`;
    pill.textContent = `Ep.${ep.id}`;
    badgesWrap.appendChild(pill);
  });

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
loadState().then(() => {
  refreshUIFromState();
  startLivesTicker();
});
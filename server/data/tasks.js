const taskData = [
  {
    title: 'Build Your First Budget',
    category: 'Money',
    difficulty: 'Easy',
    timeNeeded: '45 min',
    icon: '💰',
    summary: 'Know where every dollar goes so your paycheck stops disappearing by the 20th.',
    steps: [
      'Add up your monthly take-home pay (what actually lands in your account after taxes).',
      'List your fixed costs: rent, utilities, phone, insurance, loan payments, and subscriptions.',
      'Look through the last 2–3 months of bank statements to estimate variable costs like groceries, gas, and eating out.',
      'Try the 50/30/20 rule as a starting point: 50% needs, 30% wants, 20% savings and debt payoff.',
      'Set up an automatic transfer to savings on payday so saving happens before spending.',
      'Track spending for a month in a spreadsheet or budgeting app.',
      'Review at the end of the month and adjust categories that were way off.'
    ],
    proTip: 'Build a small "oops" fund of $500–$1,000 first. It keeps a flat tire from landing on a credit card.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-01T10:00:00'
  },
  {
    title: 'Check Your Credit Score',
    category: 'Money',
    difficulty: 'Easy',
    timeNeeded: '15 min',
    icon: '📊',
    summary: 'Your credit affects apartments, car loans, and even some job offers. Checking it is free and does not hurt it.',
    steps: [
      'Go to AnnualCreditReport.com, the official free site for reports from Equifax, Experian, and TransUnion.',
      'Verify your identity and pull your reports from all three bureaus.',
      'Check that every account listed is actually yours and that balances look right.',
      'Look for late payments, collections, or hard inquiries you do not recognize.',
      'Get your actual score for free through your bank, credit card app, or a free service like Credit Karma.',
      'If you find an error, file a dispute directly with the bureau that shows it (online is fastest).',
      'Set a reminder to check again every few months.'
    ],
    proTip: 'Checking your own credit is a "soft inquiry" and never lowers your score.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-01T10:05:00'
  },
  {
    title: 'Negotiate a Bill Down',
    category: 'Money',
    difficulty: 'Medium',
    timeNeeded: '30 min',
    icon: '📞',
    summary: 'Internet, phone, and insurance bills are often negotiable. One phone call can save hundreds a year.',
    steps: [
      'Pull up your current bill and note what you pay and what plan you are on.',
      'Look up what competitors charge for the same service, and what new customers get from your current provider.',
      'Call customer service and ask for the retention or loyalty department.',
      'Politely explain that you are considering switching and share the competitor price you found.',
      'Ask directly: "What can you do to lower my bill?"',
      'If the first offer is weak, thank them and ask if there are any other promotions available.',
      'Get the new price and how long it lasts in writing, like a confirmation email.'
    ],
    proTip: 'Be kind to the representative. They have discretion, and friendly callers get better deals.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-01T10:10:00'
  },
  {
    title: 'File Your Taxes',
    category: 'Paperwork',
    difficulty: 'Medium',
    timeNeeded: '2 hrs',
    icon: '🧾',
    summary: 'A step-by-step walkthrough for filing a simple U.S. federal and state tax return on your own.',
    steps: [
      'Gather your documents: W-2s from employers, 1099s for freelance or bank interest, and 1098-E for student loan interest.',
      'Check if you qualify for IRS Free File (IRS.gov/freefile). Many people with moderate income can file for free.',
      'Pick your filing status, usually "Single" if you are unmarried with no dependents.',
      'Enter your income from each form exactly as it appears.',
      'Choose the standard deduction unless your itemized deductions are larger (for most first-time filers, they are not).',
      'Review for typos, especially your Social Security number and bank routing number.',
      'E-file and choose direct deposit for the fastest refund.',
      'Save a PDF copy of your return and keep your records for at least 3 years.'
    ],
    proTip: 'The deadline is usually April 15. If you need more time, file an extension, but any tax you owe is still due by the deadline.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-02T09:00:00'
  },
  {
    title: 'Sign a Lease Without Regrets',
    category: 'Paperwork',
    difficulty: 'Medium',
    timeNeeded: '1 hr',
    icon: '🔑',
    summary: 'Read your lease like a pro so you know what you are agreeing to before you hand over a deposit.',
    steps: [
      'Confirm the basics: monthly rent, due date, lease start and end dates, and security deposit amount.',
      'Find the late fee policy and grace period.',
      'Check who pays which utilities and who handles repairs and maintenance.',
      'Read the rules on subletting, guests, pets, and breaking the lease early.',
      'Look for automatic renewal clauses and how much notice you must give before moving out.',
      'Walk through the unit before move-in and photograph every scratch, stain, or dent with a timestamp.',
      'Ask for any promises (like "we will paint before you move in") to be written into the lease.',
      'Keep a signed copy of the lease and your move-in photos somewhere safe.'
    ],
    proTip: 'Email your move-in photos to your landlord. It creates a dated record that helps you get your deposit back.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-02T09:30:00'
  },
  {
    title: 'Do Laundry Without Ruining Clothes',
    category: 'Home',
    difficulty: 'Easy',
    timeNeeded: '1 hr',
    icon: '🧺',
    summary: 'No more pink socks or shrunken sweaters. The basics of washing and drying clothes the right way.',
    steps: [
      'Check care labels for anything that is hand wash only, dry clean only, or "do not tumble dry."',
      'Sort into loads: whites, darks, and colors. Wash towels separately from clothes.',
      'Empty all pockets. Tissues and pens can wreck a whole load.',
      'Use cold water for most loads. It prevents shrinking and fading. Save hot water for towels and sheets.',
      'Measure detergent using the cap line. More soap does not mean cleaner clothes.',
      'Pick the right cycle: "normal" for everyday items and "delicate" for anything thin or stretchy.',
      'Dry on low or medium heat, or hang dry anything you do not want to shrink.',
      'Clean the dryer lint trap every single time.'
    ],
    proTip: 'Turn jeans and graphic tees inside out before washing to keep their color and prints looking new.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-03T11:00:00'
  },
  {
    title: 'Unclog a Drain',
    category: 'Home',
    difficulty: 'Easy',
    timeNeeded: '20 min',
    icon: '🚿',
    summary: 'Fix a slow sink or shower drain yourself before calling a plumber.',
    steps: [
      'Remove the drain stopper or cover (most twist or pull straight out).',
      'Pull out visible hair and gunk with gloves or a cheap plastic drain snake.',
      'Pour very hot (not boiling) water down the drain to loosen grease and soap scum.',
      'Pour in 1/2 cup baking soda, then 1 cup vinegar. Cover the drain and wait 15 minutes.',
      'Flush with more hot water.',
      'If it is still slow, use a plunger: fill the sink with a few inches of water, seal the plunger over the drain, and plunge firmly 10–15 times.',
      'If none of that works, call your landlord or a plumber.'
    ],
    proTip: 'Never mix chemical drain cleaners with other cleaners, and never plunge after using one. The fumes and splashes are dangerous.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-03T11:30:00'
  },
  {
    title: 'Book a Doctor\'s Appointment',
    category: 'Health',
    difficulty: 'Easy',
    timeNeeded: '15 min',
    icon: '🩺',
    summary: 'Find a doctor who takes your insurance, make the call, and show up prepared.',
    steps: [
      'Log in to your health insurance website or app and search for in-network primary care doctors near you.',
      'Read reviews and check that the doctor is accepting new patients.',
      'Call or book online. Say you are a new patient and ask for a "new patient visit" or "annual physical."',
      'Have your insurance card ready. They will ask for your member ID and group number.',
      'Write down any symptoms, medications, and questions you want to ask before the visit.',
      'Arrive 15 minutes early to fill out new patient paperwork.',
      'After the visit, check your insurance statement (EOB) to make sure you were billed correctly.'
    ],
    proTip: 'Most insurance plans cover one preventive checkup per year at no cost to you. Use it!',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-04T08:00:00'
  },
  {
    title: 'Meal Prep for the Week',
    category: 'Kitchen',
    difficulty: 'Medium',
    timeNeeded: '2 hrs',
    icon: '🥗',
    summary: 'Cook once on Sunday and eat well all week while spending way less on takeout.',
    steps: [
      'Pick 2–3 simple recipes that reheat well, like grain bowls, stir-fry, chili, or sheet-pan chicken and veggies.',
      'Write a grocery list based on those recipes and check what you already have.',
      'Shop with the list and stick to it.',
      'Start whatever takes longest first: rice or grains on the stove and proteins in the oven.',
      'Chop vegetables while things cook.',
      'Let food cool, then portion into containers for 4 days of meals.',
      'Refrigerate what you will eat in the next 3–4 days and freeze the rest.'
    ],
    proTip: 'Cook ingredients, not just meals. Plain rice, chicken, and roasted veggies can become tacos, bowls, or salads all week.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-04T12:00:00'
  },
  {
    title: 'Jump-Start a Car',
    category: 'Car',
    difficulty: 'Medium',
    timeNeeded: '20 min',
    icon: '🔋',
    summary: 'Dead battery? Here is the safe order for connecting jumper cables to get back on the road.',
    steps: [
      'Park the working car close to the dead car (not touching) and turn both cars off.',
      'Attach one RED clamp to the dead battery\'s positive (+) terminal.',
      'Attach the other RED clamp to the good battery\'s positive (+) terminal.',
      'Attach one BLACK clamp to the good battery\'s negative (-) terminal.',
      'Attach the last BLACK clamp to unpainted metal on the dead car\'s engine block, away from the battery.',
      'Start the working car and let it run for 2–3 minutes.',
      'Try starting the dead car. If it will not start, wait a few more minutes and try again.',
      'Once running, remove the clamps in reverse order and drive for at least 20 minutes to recharge.'
    ],
    proTip: 'Keep a portable jump starter pack in your trunk so you do not need a second car.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-05T14:00:00'
  },
  {
    title: 'Change a Flat Tire',
    category: 'Car',
    difficulty: 'Hard',
    timeNeeded: '45 min',
    icon: '🛞',
    summary: 'Swap a flat for your spare safely, using the tools already in your trunk.',
    steps: [
      'Pull over somewhere flat and safe, away from traffic. Turn on your hazard lights and parking brake.',
      'Grab the spare tire, jack, and lug wrench (usually under the trunk floor).',
      'Remove the hubcap if there is one, then loosen each lug nut about half a turn counterclockwise while the tire is still on the ground.',
      'Place the jack at the jack point shown in your owner\'s manual and raise the car until the flat is about 6 inches off the ground.',
      'Finish removing the lug nuts and pull the flat tire straight off.',
      'Line up the spare with the bolts, push it on, and hand-tighten the lug nuts.',
      'Lower the car, then tighten the lug nuts fully in a star pattern.',
      'Put the flat and tools back in the trunk and get the tire repaired or replaced soon.'
    ],
    proTip: 'Small "donut" spares are temporary. Stay under 50 mph and do not drive more than about 70 miles on one.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-05T15:00:00'
  },
  {
    title: 'Write a Résumé',
    category: 'Career',
    difficulty: 'Medium',
    timeNeeded: '2 hrs',
    icon: '📄',
    summary: 'Build a clean one-page résumé that gets past the 6-second skim.',
    steps: [
      'Start with a simple, readable template. One page, clear headings, no photos.',
      'Put your name, email, phone, city, and LinkedIn or portfolio link at the top.',
      'List experience in reverse chronological order (most recent first).',
      'Write 2–4 bullet points per role that start with action verbs like "built," "led," or "improved."',
      'Add numbers wherever you can: "Served 100+ customers a day" beats "Served customers."',
      'Include education, relevant projects, and a short skills section.',
      'Tailor the keywords to each job description you apply for.',
      'Proofread, have a friend proofread, then export and send it as a PDF.'
    ],
    proTip: 'Name your file "FirstName-LastName-Resume.pdf" so it is easy for recruiters to find.',
    submittedBy: 'Adulting 101 Team',
    submittedOn: '2026-09-06T10:00:00'
  }
]

export default taskData

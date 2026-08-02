const speakFancyData = {
  // PART 1: INTERVIEW VARIATIONS
  part1: [
    {
      id: "p1_set1",
      category: "School Life & Learning",
      framework: "Mini-TAD (Transition -> Answer -> Details)",
      timeLimit: "20-30 seconds per prompt",
      questions: [
        "What is your favorite subject at school?",
        "How do you usually travel to school every day?",
        "What school club or sport do you enjoy participating in?"
      ]
    },
    {
      id: "p1_set2",
      category: "Free Time & Hobbies",
      framework: "Mini-TAD (Transition -> Answer -> Details)",
      timeLimit: "20-30 seconds per prompt",
      questions: [
        "What activity do you enjoy doing during the weekend?",
        "Do you prefer watching movies or listening to music in your free time?",
        "What sport or game do you like to play with your friends?"
      ]
    },
    {
      id: "p1_set3",
      category: "Family & Community",
      framework: "Mini-TAD (Transition -> Answer -> Details)",
      timeLimit: "20-30 seconds per prompt",
      questions: [
        "How do you usually help your parents or family at home?",
        "How do you spend quality time with your family or cousins?",
        "Have you ever participated in a community activity like a gotong-royong?"
      ]
    },
    {
      id: "p1_set4",
      category: "Daily Habits & Technology",
      framework: "Mini-TAD (Transition -> Answer -> Details)",
      timeLimit: "20-30 seconds per prompt",
      questions: [
        "How often do you use your smartphone after school?",
        "What local food do you enjoy eating with your family?",
        "What place near your house do you like to visit when you want to relax?"
      ]
    }
  ],

  // PART 2: INDIVIDUAL LONG TURN
  part2: [
    {
      id: "p2_var1",
      topic: "A Local Market or Place You Visit",
      framework: "TAD + REES",
      timeLimit: "1 minute",
      prompt: "Talk about a local place or market you enjoy visiting.",
      subPrompts: [
        "What the place is (e.g., a local tamu, beach, or river)",
        "Where it is located",
        "Who you usually go there with",
        "Why you enjoy visiting it"
      ]
    },
    {
      id: "p2_var2",
      topic: "A Community Activity You Participated In",
      framework: "TAD + REES",
      timeLimit: "1 minute",
      prompt: "Talk about a community or school activity you participated in.",
      subPrompts: [
        "What the activity was (e.g., a gotong-royong, Teachers' Day, or sports day)",
        "When and where it took place",
        "What task or role you did during the activity",
        "Why it was a memorable experience for you"
      ]
    },
    {
      id: "p2_var3",
      topic: "An Online Tool or App Used for Learning",
      framework: "TAD + REES",
      timeLimit: "1 minute",
      prompt: "Talk about an online platform or app you use for schoolwork.",
      subPrompts: [
        "What the app or platform is (e.g., WhatsApp, YouTube, or educational apps)",
        "How often you use it",
        "What you use it for",
        "Why it is helpful for your studies"
      ]
    },
    {
      id: "p2_var4",
      topic: "A Traditional Dish or Food You Recommend",
      framework: "TAD + REES",
      timeLimit: "1 minute",
      prompt: "Talk about a local food or dish you would recommend.",
      subPrompts: [
        "What the food is (e.g., Hinava or home-cooked meals)",
        "What it tastes like",
        "Where people can find or try it",
        "Why you would recommend it to others"
      ]
    },
    {
      id: "p2_var5",
      topic: "A Useful Skill You Would Like to Learn",
      framework: "TAD + REES",
      timeLimit: "1 minute",
      prompt: "Talk about a useful skill you would like to master.",
      subPrompts: [
        "What the skill is (e.g., cooking, public speaking, or repairing gadgets)",
        "Why you want to learn it",
        "How you plan to learn it",
        "How it will help you in the future"
      ]
    }
  ],

  // PART 3: COLLABORATIVE DISCUSSION
  part3: [
    {
      id: "p3_var1",
      topic: "Ways Students Can Stay Healthy and Active",
      framework: "Interactive TAD-REES",
      discussionTimeLimit: "2 minutes",
      decisionTimeLimit: "1 minute",
      centralQuestion: "What are the best ways students can maintain good health?",
      mindMapBubbles: [
        "Exercising regularly or playing sports",
        "Eating balanced meals and avoiding fast food",
        "Getting enough sleep every night",
        "Drinking plenty of water daily",
        "Reducing time spent on smartphone screens"
      ],
      decisionPhase: "Decide together which is the most effective way for secondary school students to stay healthy."
    },
    {
      id: "p3_var2",
      topic: "Ways Students Can Save Money",
      framework: "Interactive TAD-REES",
      discussionTimeLimit: "2 minutes",
      decisionTimeLimit: "1 minute",
      centralQuestion: "What are the ways students can manage and save their money?",
      mindMapBubbles: [
        "Bringing home-cooked food to school",
        "Using public transport or walking to school",
        "Buying second-hand books or study materials",
        "Tracking daily spending habits",
        "Avoiding buying unnecessary items"
      ],
      decisionPhase: "Decide together which is the easiest way for students to start saving money."
    },
    {
      id: "p3_var3",
      topic: "Ways to Protect the Local Environment",
      framework: "Interactive TAD-REES",
      discussionTimeLimit: "2 minutes",
      decisionTimeLimit: "1 minute",
      centralQuestion: "How can local communities keep their area clean and green?",
      mindMapBubbles: [
        "Organizing regular gotong-royong activities",
        "Using proper rubbish bins instead of littering",
        "Reducing single-use plastics",
        "Planting trees and flowers around homes",
        "Recycling paper, plastic, and cans"
      ],
      decisionPhase: "Decide together which action brings the greatest benefit to the local environment."
    },
    {
      id: "p3_var4",
      topic: "Benefits of Participating in School Co-curricular Activities",
      framework: "Interactive TAD-REES",
      discussionTimeLimit: "2 minutes",
      decisionTimeLimit: "1 minute",
      centralQuestion: "Why is joining co-curricular activities important for students?",
      mindMapBubbles: [
        "Making new friends from different classes",
        "Building self-confidence in public speaking",
        "Learning how to work effectively in a team",
        "Staying physically active and healthy",
        "Learning time management skills"
      ],
      decisionPhase: "Decide together which benefit is the most valuable for a student's future."
    }
  ]
};

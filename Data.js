// ==========================================
// SPEAK FANCY DATA SET
// ==========================================

const SPEAK_FANCY_DATA = {
  part1Lessons: [
    {
      id: "p1_set1",
      category: "School Life & Learning",
      questions: [
        "What is your favorite subject at school?",
        "How do you usually travel to school every day?",
        "What school club or sport do you enjoy participating in?"
      ]
    },
    {
      id: "p1_set2",
      category: "Free Time & Hobbies",
      questions: [
        "What activity do you enjoy doing during the weekend?",
        "Do you prefer watching movies or listening to music in your free time?",
        "What sport or game do you like to play with your friends?"
      ]
    },
    {
      id: "p1_set3",
      category: "Family & Community",
      questions: [
        "How do you usually help your parents or family at home?",
        "How do you spend quality time with your family or cousins?",
        "Have you ever participated in a community activity like a gotong-royong?"
      ]
    },
    {
      id: "p1_set4",
      category: "Daily Habits & Technology",
      questions: [
        "How often do you use your smartphone after school?",
        "What local food do you enjoy eating with your family?",
        "What place near your house do you like to visit when you want to relax?"
      ]
    }
  ],

  part2Lessons: [
    {
      id: "p2_var1",
      topic: "A Local Market or Place You Visit",
      prompt: "Talk about a local place or market you enjoy visiting.",
      subPrompts: [
        "What the place is",
        "Where it is located",
        "Who you usually go there with",
        "Why you enjoy visiting it"
      ]
    },
    {
      id: "p2_var2",
      topic: "A Community Activity You Participated In",
      prompt: "Talk about a community or school activity you participated in.",
      subPrompts: [
        "What the activity was",
        "When and where it took place",
        "What task or role you did",
        "Why it was a memorable experience"
      ]
    },
    {
      id: "p2_var3",
      topic: "An Online Tool or App Used for Learning",
      prompt: "Talk about an online platform or app you use for schoolwork.",
      subPrompts: [
        "What the app or platform is",
        "How often you use it",
        "What you use it for",
        "Why it is helpful for your studies"
      ]
    },
    {
      id: "p2_var4",
      topic: "A Traditional Dish or Food You Recommend",
      prompt: "Talk about a local food or dish you would recommend.",
      subPrompts: [
        "What the food is",
        "What it tastes like",
        "Where people can find or try it",
        "Why you would recommend it"
      ]
    },
    {
      id: "p2_var5",
      topic: "A Useful Skill You Would Like to Learn",
      prompt: "Talk about a useful skill you would like to master.",
      subPrompts: [
        "What the skill is",
        "Why you want to learn it",
        "How you plan to learn it",
        "How it will help you in the future"
      ]
    }
  ],

  part3Lessons: [
    {
      id: "p3_var1",
      topic: "Ways Students Can Stay Healthy and Active",
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

// Aliases for short property names
SPEAK_FANCY_DATA.part1 = SPEAK_FANCY_DATA.part1Lessons;
SPEAK_FANCY_DATA.part2 = SPEAK_FANCY_DATA.part2Lessons;
SPEAK_FANCY_DATA.part3 = SPEAK_FANCY_DATA.part3Lessons;

// Assign globally to all possible variable variants
window.APP_DATA = SPEAK_FANCY_DATA;
window.Data = SPEAK_FANCY_DATA;
window.DATA = SPEAK_FANCY_DATA;
window.speakFancyData = SPEAK_FANCY_DATA;
window.SPEAK_FANCY_DATA = SPEAK_FANCY_DATA;

if (typeof window.Config === "undefined") {
  window.Config = {};
}
window.Config.part1Lessons = SPEAK_FANCY_DATA.part1Lessons;
window.Config.part2Lessons = SPEAK_FANCY_DATA.part2Lessons;
window.Config.part3Lessons = SPEAK_FANCY_DATA.part3Lessons;
window.Config.part1 = SPEAK_FANCY_DATA.part1Lessons;
window.Config.part2 = SPEAK_FANCY_DATA.part2Lessons;
window.Config.part3 = SPEAK_FANCY_DATA.part3Lessons;

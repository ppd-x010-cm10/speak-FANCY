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
    }
  ]
};

// Add aliases for short property names
SPEAK_FANCY_DATA.part1 = SPEAK_FANCY_DATA.part1Lessons;
SPEAK_FANCY_DATA.part2 = SPEAK_FANCY_DATA.part2Lessons;
SPEAK_FANCY_DATA.part3 = SPEAK_FANCY_DATA.part3Lessons;

// Assign to all possible global window variable names
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

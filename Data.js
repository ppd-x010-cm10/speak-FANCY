const sampleData = {
  // PART 1
  part1: [
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

  // PART 2
  part2: [
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

  // PART 3
  part3: [
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

// Create aliases so all possible property names work seamlessly
sampleData.part1Lessons = sampleData.part1;
sampleData.part2Lessons = sampleData.part2;
sampleData.part3Lessons = sampleData.part3;

// Attach to all possible global window variables
window.Data = sampleData;
window.DATA = sampleData;
window.speakFancyData = sampleData;
window.SPEAK_FANCY_DATA = sampleData;

if (typeof window.Config === "undefined") {
  window.Config = {};
}
window.Config.part1Lessons = sampleData.part1;
window.Config.part2Lessons = sampleData.part2;
window.Config.part3Lessons = sampleData.part3;

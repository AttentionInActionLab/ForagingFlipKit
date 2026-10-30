window.config = {
  fullscreen: true,
  
  // These are some general settings of the patch display.
  patch: {
    size: [1920, 1080],
    indicate_points: "both",
    point_indicator_html: "%%",
    points_display_html: "Points: %%",
    next_patch_click_html: "Next",
  },
  
  // After reaching max_points, the experiment terminates.
  max_points: 50,
  
  // Positions of the elements on the screen
  grid: {
    columns: 10,
    rows: 8,
    hspacing: 180,
    vspacing: 180,
    hjitter: 40,
    vjitter: 40,
    hoffset: 45,
    voffset: 45,
  },
  
  // How quick the stimuli move. Set to 0 for static
  movement_speed: 30,
  
  patch_types: [
    {
      id: "A",
      name: "ConditionA",
      background_color: "#0A00AA",
      travel_time: 1000,
      intro: "<p>Welcome to condition A!</p>",
      elements: [
        {
          role: "target",
          amount: 25,
          points: 1,
          images: ["disk-green.svg", "disk-yellow.svg"],
          trial_ends_when_all_collected: true
        },
        {
          role: "distractor",
          amount: 25,
          points: -5,
          images: ["disk-blue.svg", "disk-red.svg"],
          collectible: true
        }
      ]
    },
    {
      id: "B",
      name: "ConditionB",
      intro: "<p>Welcome to condition B!</p>",
      background_color: "#0AAA00",
      travel_time: 1000,
      elements: [
        {
          role: "target",
          amount: 25,
          points: 1,
          images: ["disk-blue.svg", "disk-red.svg"],
          trial_ends_when_all_collected: true
        },
        {
          role: "distractor",
          amount: 25,
          points: -5,
          images: ["disk-yellow.svg", "disk-green.svg"],
          collectible: true
        }
      ]
    }
  ],

  design: {
    sequences: [
      "ABAB",
      "BABA"
    ],
    selection_method: "participant",

    // Show a feedback screen every 2 patches
    inter_trial_screen: {
      every_n_patches: 2,
      html: "You have collected {{points}} of {{max_points}} points!<br>Current Rate: {{rate}} Points/Minute.",
      button_text: "Continue"
    }
  },

  data: {
    mode: "offline"
  },

  pre_experiment: {
    skip_all: false,
    consent: true,
    instructions: true,
  }
};

window.config = {
  "fullscreen": true,
  
  // These are some general settings of the patch display. 
  // If you don't need the points displays or a next button you can just delete their lines
  "patch": {
    "size": [1920, 1080],               // This is the reference resolution
    "indicate_points": "both",          // Show negative, positive, or both points floating up (or none)
    "point_indicator_html": "%%",       // The points that float up when an element is clicked
    "points_display_html": "Points: %%",// The points displayed on the upper left of the screen
    "next_patch_click_html": "Next",    // The "next" patch button
  },
  
  // After reachting max_points, the experiment terminates. If you don't want a limit, delete this line
  "max_points": 5,  
  
  // When to show feedback and what to say
  "feedback": {
    "enabled": true,
    "every_n_patches": 3,
    "text": "You have collected {{points}} of {{max_points}} points!<br>Current Rate: {{rate}} Points/Minute."
  },
  
  // Positions of the elements on the screen
  "grid": {
    "columns": 10,
    "rows": 8,
    "hspacing": 180, // Space between elements
    "vspacing": 180,
    "hjitter": 40,   // Random jitter
    "vjitter": 40,
    "hoffset": 45,   // Offset
    "voffset": 45,
  },
  
  // How quick the stimuli move. Set to 0 for static
  "movement_speed": 30,
  
  "patch_types": [
    {
      "id": "A",
      "name": "ConditionA",
      "background_color": "#0A00AA",
      "travel_time": 1000,
      "intro": "<p>Welcome to condition A!</p>",
      "elements": [
        {
          "role": "target",
          "amount": 25,
          "points": 1,
          "images": [
            "disk-green.svg",
            "disk-yellow.svg",
          ],
          "collectible": true,
          "trial_ends_when_all_collected": true
        },
        {
          "role": "distractor",
          "amount": 25,
          "points": -5,
          "images": [
            "disk-blue.svg",
            "disk-red.svg"
          ],
          "collectible": true
        }
      ]
    },
    {
      "id": "B",
      "name": "ConditionB",
      "intro": "<p>Welcome to condition B!</p>",
      "background_color": "#0AAA00",
      "travel_time": 1000,
      "intro": "",
      "elements": [
        {
          "role": "target",
          "amount": 25,
          "points": 1,
          "images": [
            "disk-blue.svg",
            "disk-red.svg"
          ],
          "collectible": true,
          "trial_ends_when_all_collected": true
        },
        {
          "role": "distractor",
          "amount": 25,
          "points": -5,
          "images": [
            "disk-yellow.svg",
            "disk-green.svg"
          ],
          "collectible": true
        }
      ]
    }
  ],
  "patch_repetitions": 1000,
  "blocks": {
    "enabled": true,
    "sequences": [
      "ABAB",
      "BABA"
    ],
    "selection_method": "participant",
    "show_condition_intro": "never"
  },
  "data": {
    "mode": "offline"
  },
  "pre_experiment": {
    "skip_all" : false,
    "consent": true,
    "instructions": true,
  }
};

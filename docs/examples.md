# Example Configurations

The best way to learn how to build your own experiment is to look at how others are built. 

Below are two distinct example configurations. To use them, simply copy the code and replace the contents of your main `config.js` file.

---

## Example 1: Classic Intermixed Foraging
**Concept:** This is a straightforward foraging setup. Participants must find positive targets (green disks) while avoiding negative distractors (red disks). There is only one environment (Patch A) that repeats 20 times.

```javascript
window.config = {
  "fullscreen": { "fullscreen_mode": true },
  "patch": {
    "size": [1920, 1080],
    "indicate_points": "both",
    "point_indicator_html": "<div id='point-indicator-html' class='point-indicator'><font size=+4 color='#FFFFFF'>%%</font></div>",
    "points_display_html": "<div id='points-display-html' class='points-display'><font size=+4 color='#FFFFFF'>Points: %% </font></div>",
    "next_patch_click_html": "<div id='next-patch-click-html' class='next-click'><font size='+4' color='#FFFFFF'>Next</font></div>",
    "countdown_html": "<div id='countdown-html' class='countdown-display'><font size=+4 color='#FFFFFF'>Time left: %%s</font></div>"
  },
  "points": { "max_points": 100 },
  "feedback": {
    "enabled": true,
    "every_n_patches": 5,
    "text": "Score: {{points}} / {{max_points}}"
  },
  "grid": {
    "columns": 10, "rows": 8,
    "hspacing": 150, "vspacing": 150,
    "hjitter": 20, "vjitter": 20,
    "hoffset": 50, "voffset": 50
  },
  "animation": { "speed": 30 },
  "patch_repetitions": 20,
  "blocks": { 
    "enabled": false,
    "sequences": [],
    "selection_method": "participant",
    "show_condition_intro": "never"
  },
  "patch_types": [
    {
      "id": "A",
      "name": "Classic_Foraging",
      "background_color": "#2c3e50",
      "travel_time": 1000,
      "intro": "<h2>Find the green disks!</h2>",
      "elements": [
        {
          "role": "target",
          "amount": 20,
          "points": 2,
          "images": ["disk-green.svg"],
          "collectible": true,
          "trial_ends_when_all_collected": true
        },
        {
          "role": "distractor",
          "amount": 20,
          "points": -5,
          "images": ["disk-red.svg"],
          "collectible": true
        }
      ]
    }
  ],
  "data": { "mode": "offline" },
  "pre_experiment": {
    "skip_all": false,
    "consent": true,
    "instructions": true
  }
};
```

## Example 2: Blocked Design with Two Conditions
**Concept:** This configuration demonstrates how to group trials into specific sequences (Blocks). Participants will complete four trials of Condition A (Squares), followed by four trials of Condition B (Circles).

window.config = {
  "fullscreen": { "fullscreen_mode": true },
  "patch": {
    "size": [1920, 1080],
    "indicate_points": "both",
    "point_indicator_html": "<div id='point-indicator-html' class='point-indicator'><font size=+4 color='#FFFFFF'>%%</font></div>",
    "points_display_html": "<div id='points-display-html' class='points-display'><font size=+4 color='#FFFFFF'>Points: %% </font></div>",
    "next_patch_click_html": "<div id='next-patch-click-html' class='next-click'><font size='+4' color='#FFFFFF'>Next</font></div>",
    "countdown_html": "<div id='countdown-html' class='countdown-display'><font size=+4 color='#FFFFFF'>Time left: %%s</font></div>"
  },
  "points": { "max_points": 50 },
  "feedback": {
    "enabled": true,
    "every_n_patches": 4,
    "text": "Score: {{points}} / {{max_points}}"
  },
  "grid": {
    "columns": 12, "rows": 10,
    "hspacing": 120, "vspacing": 120,
    "hjitter": 20, "vjitter": 20,
    "hoffset": 50, "voffset": 50
  },
  "animation": { "speed": 30 },
  "patch_repetitions": 8, // Ignored because blocks are enabled
  
  // Here is where the blocking magic happens
  "blocks": {
    "enabled": true,
    "sequences": [
      "AAAABBBB", // Participant 0 gets this order
      "BBBBAAAA"  // Participant 1 gets this order
    ],
    "selection_method": "participant",
    "show_condition_intro": "first_in_block" // Only shows intro when the letter changes
  },
  
  "patch_types": [
    {
      "id": "A",
      "name": "Square_Condition",
      "background_color": "#2c3e50", 
      "travel_time": 1000,
      "intro": "<h1>Block 1: Find the Squares!</h1>",
      "elements": [
        {
          "role": "target",
          "amount": 15,
          "points": 1,
          "images": ["square-blue.svg"], 
          "collectible": true,
          "trial_ends_when_all_collected": true
        }
      ]
    },
    {
      "id": "B",
      "name": "Circle_Condition",
      "background_color": "#34495e",
      "travel_time": 1000,
      "intro": "<h1>Block 2: Find the Circles!</h1>",
      "elements": [
        {
          "role": "target",
          "amount": 15,
          "points": 1,
          "images": ["circle-blue.svg"],
          "collectible": true,
          "trial_ends_when_all_collected": true
        }
      ]
    }
  ],
  "data": { "mode": "offline" },
  "pre_experiment": {
    "skip_all": false,
    "consent": true,
    "instructions": true
  }
};
```

## Example 3: Conjunction Foraging with Practice and Breaks
**Concept:** Directly inspired by Thornton & Kristjánsson (2014), this task requires participants to look for a conjunction of features (e.g., Red Squares AND Green Disks). It also demonstrates how to set up a **Practice Phase** before the main experiment, and how to trigger an automatic **Rest Break** halfway through.

```javascript
window.config = {
  "fullscreen": { "fullscreen_mode": true },
  "patch": {
    "size": [1920, 1080],
    "indicate_points": "both",
    "points_display_html": "<div id='points-display-html' class='points-display'><font size=+4 color='#FFFFFF'>Points: %% </font></div>",
    "next_patch_click_html": "<div id='next-patch-click-html' class='next-click'><font size='+4' color='#FFFFFF'>Next</font></div>"
  },
  "points": { "max_points": 200 },
  "grid": {
    "columns": 10, "rows": 8,
    "hspacing": 150, "vspacing": 150,
    "hjitter": 20, "vjitter": 20,
    "hoffset": 50, "voffset": 50
  },
  
  // 1. Setup Practice (Runs before the main blocks)
  "practice": {
    "enabled": true,
    "sequences": ["A"], // Just one practice trial
    "selection_method": "participant",
    "log_data": true,
    "phase_label": "practice"
  },

  // 2. Setup the Main Task (4 trials total)
  "blocks": {
    "enabled": true,
    "sequences": ["AAAA"], 
    "selection_method": "participant",
    "show_condition_intro": "never"
  },

  // 3. Setup a Rest Break (Triggers after 2 patches)
  "breaks": {
    "enabled": true,
    "show_between_blocks": false, 
    "after_every_n_patches": 2,   
    "duration_ms": null, // null means self-paced break         
    "message_html": "<div style='text-align:center;'><font size='+4' color='#FFFFFF'>Take a short break!<br>Click to continue.</font></div>"
  },

  "patch_types": [
    {
      "id": "A",
      "name": "Conjunction_Task",
      "background_color": "#2c3e50",
      "travel_time": 1000,
      "elements": [
        {
          "role": "target",
          "amount": 20, // 10 Red Squares + 10 Green Disks
          "points": 1,
          "images": ["square-red.svg", "disk-green.svg"], 
          "collectible": true,
          "trial_ends_when_all_collected": true
        },
        {
          "role": "distractor",
          "amount": 20, // 10 Green Squares + 10 Red Disks
          "points": -1,
          "images": ["square-green.svg", "disk-red.svg"],
          "collectible": true
        }
      ]
    }
  ],
  "data": { "mode": "offline" }
};
```

window.config = {
  "fullscreen": {
    "fullscreen_mode": true
  },
  "patch": {
    "size": [
      1920,
      1080
    ],
    "indicate_points": "both",
    "point_indicator_html": "<div id='point-indicator-html' class='point-indicator'><font size=+4 face='Comic Sans MS' color='#FFFFFF'>%%</font></div>",
    "points_display_html": "<div id='points-display-html' class='points-display'><font size=+4 face='Comic Sans MS' color='#FFFFFF'>Punkte: %% </font></div>",
    "next_patch_click_html": "<div id='next-patch-click-html' class='next-click' style='z-index: 99999'><font size='+4' face='Comic Sans MS' color='#FFFFFF' style='position:absolute; left:-40px'>Weiter!!!!</font></div>",
    "background_color": "#000000"
  },
  "points": {
    "max_points": 20
  },
  "feedback": {
    "enabled": true,
    "every_n_patches": 3,
    "text": "Sie haben {{points}} von {{max_points}} Punkten gesammelt.<br>Aktuelle Rate: {{rate}} Punkte/Minute."
  },
  "grid": {
    "columns": 10,
    "rows": 8,
    "hspacing": 180,
    "vspacing": 180,
    "hjitter": 40,
    "vjitter": 40,
    "hoffset": 45,
    "voffset": 45,
    "on_used_up": "nothing",
    "on_patch_done": "reset"
  },
  "animation": {
    "speed": 30
  },
  "patches": [
    {
      "id": "A",
      "name": "OnlyConditionA",
      "background_color": "#0A00AA",
      "travel_time": 1000,
      "intro": "<p>Welcome to condition A!</p>",
      "elements": [
        {
          "type": "target",
          "amount": 25,
          "points": 1,
          "images": [
            "disk-green.svg",
            "disk-yellow.svg",
          ],
          "collectible": true
        },
        {
          "type": "distractor",
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
      "name": "OnlyConditionB",
      "intro": "<p>Welcome to condition B!</p>",
      "background_color": "#0AAA00",
      "travel_time": 1500,
      "intro": "",
      "elements": [
        {
          "type": "target",
          "amount": 25,
          "points": 2,
          "images": [
            "disk-blue.svg",
            "disk-red.svg"
          ],
          "collectible": true
        },
        {
          "type": "distractor",
          "amount": 25,
          "points": -20,
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
    "enabled": false,
    "sequences": [
      "ABAB",
      "BABA"
    ],
    "selection_method": "participant",
    "show_condition_intro": "never"
  },
  "consent": {
    "show_consent": false,
    "show_instructions": true,
    "show": true,
    "instructions": true
  },
  "data": {
    "mode": "offline"
  },
  "design_type": "blocked"
};

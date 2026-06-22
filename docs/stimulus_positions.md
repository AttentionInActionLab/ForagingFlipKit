# Stimulus positions

## Random Jittered Grid Locations

The stimulus positions are defined on the config file top level like this:

```javascript
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
```

This will create a virtual 10 by 8 grid with 180 pixels distance between the grid cells (horizontally and vertically). The positions have some random jitter and the are shifted by 45 pixels rightward and downward.

When a stimulus element is placed, a random position which is not used so far is drawn from the grid. When you have fewer elements than grid cells, some (random) will remain empty. When you have more elements than grid cells, the superfluous elements will appear in the screen center (usually this means you have to increase the number of columns and/or rows).

Which elements are assigned to which grid cells is random, so each trial uses a new random arrangement. However, see the section "Repeated Positions" below for more details.

## Repeated Positons

However, for creating contextual-cueing-style experiments, the random position generator can be configured in two ways: positions can either be randomized independently for each trial, or generated once per participant and then repeated across trials.

For each set of elements, you can set "positions" to "novel" (random in each trial) or "repeated" (the same within each trial, but random across partiipants) or "repeated-1", "repeated-2", "repeated-3", "repeated-4" to access up to four different "repeated" positions.


### Example: Creating a contectual cuing experiment


Here is an example with three patch types: A (repeated-1), B (repeated-2), X (novel)

```javascript
  patch_types: [{
      id: "A",
      name: "Repeated 1",
      background_color: "#000000",
      elements: [{
          role: "target",
          positions: "repeated-1",
          amount: 2,
          images: ["disk-green.svg"],
          trial_ends_when_all_collected: true
        },
        {
          role: "distractor",
          positions: "repeated-1",
          amount: 2,
          images: ["disk-yellow.svg"],
        }
      ]
    },
    {
      id: "B",
      name: "Repeated 2",
      background_color: "#000000",
      stimulus_positions: "repeated-2",
      elements: [{
          role: "target",
          positions: "repeated-2",
          amount: 2,
          images: ["disk-blue.svg"],
          trial_ends_when_all_collected: true
        },
        {
          role: "distractor",
          positions: "repeated-2",
          amount: 2,
          images: ["disk-yellow.svg"],
        },
      ],
    },

    {
      id: "X",
      name: "Novel",
      background_color: "#000000",
      stimulus_positions: "novel",
      elements: [{
          role: "target",
          positions: "novel",
          amount: 2,
          images: ["disk-red.svg"],
          trial_ends_when_all_collected: true
        },
        {
          role: "distractor",
          positions: "novel",
          amount: 2,
          images: ["disk-yellow.svg"],
        }
      ]
    }
  ],
```

To make it more obvious for testing, the targets in the repeated-1 condition are green, in repeated-2 they are blue, and in the novel condition they are red. (In a real experiment, you would probably not make their appearance any different.)


To turn this into a propper contexual cuing experiment, we need to create propper blocks that contain repeated and novel trials. For this you can make use of the possibility to add arbitrary JavaScript code to the config file. At the very top of the config file (before window.config = ...) you can define a functions (and run it) like this, which creates a random trial sequence for every participants, considering typical contraints:

```javascript
function makeCCBlock() {
  while (true) {
  
    // Patch types we want in a block
    const a = ['A','A','B','B','X','X','X','X'];

    // Shuffle ...
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.random() * (i + 1) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }

    // Avoid "AA" and "BB" repetitions within a block
    const bad = a.some((v, i) =>
      (v === 'A' && a[i + 1] === 'A') ||
      (v === 'B' && a[i + 1] === 'B')
    );
    if (!bad) return a.join('');
  }
}

// Create a sequence of 5 blocks
const trial_sequence = Array.from({ length: 5 }, makeCCBlock).join('');
console.log("This participant has sequence: " + trial_sequence);
```

The sequence can then be assigned at the usual location:
 
```javascript
"blocks": {
  "enabled": true,
  "sequences": [trial_sequence],
    "selection_method": "participant",
    "show_condition_intro": "never"
},
```


If you want feedback or a break between blocks, set the following:

```javascript
  "feedback": {
    "enabled": true,
    "every_n_patches": 8,
    "text": "You have collected {{points}} of {{max_points}} points!   
     <br>Current Rate: {{rate}} Points/Minute."
  },
```

Set "every_n_patches" to match your block length.

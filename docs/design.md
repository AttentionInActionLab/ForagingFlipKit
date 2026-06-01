# Experimental Design

Currently the ForagingFlipKit supports fully intermixed designs and designs with specified patch type order. 

Importantly, experimental conditions are constructed of different "patch_types" and hence, the patch_types have to be set up first. You can check the examples to see how different patch types with different target and distractor elements and other attributes can be created in the patch_types list. Each condition has to be labeled with single letter ID, as in the example below:

```javascript
  "patch_types": [
    {
      "id": "A",
      "name": "ConditionA",
      // Further entries including the lists of elements. See examples.
    },
    {
      "id": "B",
      "name": "ConditionB",
      // Further entries including the lists of elements. See examples.
    }
  ],
```

In the example above we have defined two patch_types "A" and "B" which we could run randomly intermixed or in some blocked order. This is currently controlled over the ``patch_repetitions``and ``blocks``entries in the config:

```javascript
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
```

# Fully Intermixed

```javascript
  "patch_repetitions": 1000,
  "blocks": {
    "enabled": false,
    "sequences": [],
    "selection_method": "participant",
    "show_condition_intro": "every"
  },
```

For a fully intermixed design, just set the desired number of patch repetitions. In the example above, each patch type "A" and "B" will be repeated 1000 times but in a randomly shuffled order. Note that "blocks / enabled" has to be set to ```false```. Otherwise the blocking described below is performed.


# Blocked designs

```javascript
  "patch_repetitions": 1000,
  "blocks": {
    "enabled": true,
    "sequences": [
    	"AAAABBBBAAAABBBB",
    	"BBBBAAAABBBBAAAA"
    ],
    "selection_method": "participant",
    "show_condition_intro": "first_in_block"
  },
```

If "blocks / enabled" is set to ```true```, the patch types are not presented randomly but instead follow the sequences specified in the "sequences" attribute. In the example above, four trials of type "A" are presented, followed by four "B" trials, etc. 

If "selection_method" is set to "participant", the paticipant number will be used to pick one of the sequences. Currently, participant number 0 gets the first sequence, number 1 the second, and so on. If the participant number exeeds the number of elements in the list, the selection cycles back to the start (e.g. number 2 would get the first sequence again, number 3 the second, and so on).

If "selection_method" is set to "random" a random sequence is picked for every participant.

If you set "show_condition_intro" to first "first_in_block", the "intro" string defined in the patch type is only shown for the first of a block of same-type trials. E.g., here only the first, fifth, nineth, and thirteenth trial would be preceeded by the intro.

 # Interaction with Practice and Breaks

When designing your experimental blocks, keep in mind how they interact with the practice sessions and rest periods:

* **Practice First:** If `practice` is enabled, the practice sequence will always run completely *before* the main sequences defined above begin.
* **Automated Breaks:** If you set `"show_between_blocks": true` in your break settings, the system will detect transitions in your sequence (e.g., the jump from `A` to `B` in `"AAAABBBBAAAA"`) and automatically insert a rest screen for the participant at that exact moment.

For a detailed guide on how to inject a practice phase and configure self-paced or timed rest screens between these blocks, please head over to the [Blocks and Breaks](Blocks-and-Breaks.md) section.

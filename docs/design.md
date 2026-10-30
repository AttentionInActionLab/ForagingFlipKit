# Experimental Design

The experimental design determines the order in which patch types are presented to participants.

First, define your experimental conditions using `patch_types`. Each patch type needs a unique ID, which is then used to specify the experimental sequence.

For example:

```javascript
patch_types: [
  {
    id: "A",
    name: "ConditionA",
    // Further entries, including the lists of elements.
  },
  {
    id: "B",
    name: "ConditionB",
    // Further entries, including the lists of elements.
  }
],
```

Once your patch types are defined, you can specify their presentation order in the `design` section:

```javascript
design: {
  sequences: [
    "AABBAABB",
    "BBAABBAA"
  ],
  selection_method: "participant",
  show_condition_intro: "never"
},
```

**Each letter represents one individual trial (patch).** In this example, we define two alternative sequences:

- The first sequence presents two A trials followed by two B trials, and repeats this pattern.
- The second sequence presents two B trials followed by two A trials, and repeats this pattern.

The two sequences are assigned to different participants: participant 1 receives the first sequence, participant 2 the second sequence, participant 3 the first sequence again, and so on.

You can define as many alternative sequences as you need. The `selection_method` setting determines how they are assigned to participants.

## Specifying sequences

The simplest way to specify a sequence is to write the condition IDs in the desired order:

```javascript
design: {
  sequences: [
    "AABBAABB",
    "BBAABBAA"
  ],
  selection_method: "participant"
},
```

You can define as many different sequences as you need. Each participant is assigned one of these sequences; participants do not complete all the listed sequences.

### Repeating sequences

If you want to repeat a sequence, you don't need to write it out multiple times. Use `*` followed by the number of repetitions:

```javascript
design: {
  sequences: [
    "(AABB)*3"
  ]
},
```

This is equivalent to:

```text
AABBAABBAABB
```

You can also repeat longer sequences:

```javascript
sequences: [
  "(AAABBB)*4"
],
```

### Randomizing sequences

There are two additional operators for randomizing the order of conditions.

**Shuffle all repetitions (`~`)**

Use `~` to repeat a sequence and then shuffle all the resulting trials:

```javascript
sequences: [
  "(AABB)~3"
],
```

This creates six A trials and six B trials, in a randomly shuffled order.

**Shuffle within each repetition (`^`)**

Use `^` to shuffle the conditions independently within each repetition:

```javascript
sequences: [
  "(AABB)^3"
],
```

This creates three repetitions of two A trials and two B trials, with the order of the four trials randomized separately in each repetition.

In short:

| Syntax | Meaning |
|---|---|
| `(AABB)*3` | Repeat AABB three times in the same order |
| `(AABB)~3` | Repeat AABB three times, then shuffle all trials |
| `(AABB)^3` | Repeat AABB three times, shuffling within each repetition |

### Creating blocks

You can use the `|` character to mark the end of a block. The marker is placed directly in the sequence:

```javascript
sequences: [
  "AAAABBBB|AAAABBBB|"
],
```

This defines two blocks. Each block contains four A trials followed by four B trials.

You can combine block markers with repetition:

```javascript
sequences: [
  "(AAAABBBB|)*3"
],
```

This creates three blocks, each containing four A trials followed by four B trials.

You can also combine block markers with randomization:

```javascript
sequences: [
  "(AB|)~4"
],
```

This creates four blocks. Each block contains one A trial and one B trial, with their order randomized across the sequence.

The block structure is retained when using `~` or `^`.

**Important:** A block marker triggers the inter-trial screen, which can be used as a pause between blocks. You can also configure the same screen to appear periodically, independently of explicit block markers. See the section on inter-trial screens for details.

## Selecting sequences

If you specify more than one sequence, the `selection_method` setting determines how a sequence is assigned to each participant.

**Participant-based selection**

```javascript
selection_method: "participant"
```

This assigns sequences based on participant number:

- Participant 1 gets the first sequence.
- Participant 2 gets the second sequence.
- Participant 3 gets the third sequence, and so on.

If there are more participants than sequences, assignment cycles back to the beginning. For example, with two sequences, participant 3 gets the first sequence again.

**Random selection**

```javascript
selection_method: "random"
```

A sequence is selected randomly for each participant.

## Condition introductions

Each patch type can have an `intro` entry containing HTML that is displayed before its trials.

The `show_condition_intro` setting determines when these introductions are shown:

```javascript
show_condition_intro: "never"
```

Never show condition introductions.

```javascript
show_condition_intro: "every"
```

Show the introduction before every trial.

```javascript
show_condition_intro: "first_in_block"
```

Show the introduction only before the first trial of a consecutive series of trials of the same condition.

For example, with the sequence:

```text
AAAABBBB|AAAABBBB|
```

and `show_condition_intro: "first_in_block"`, the introduction is shown before the first A trial and the first B trial in each block.

The default setting is `"never"`.

## Advanced: Using arrays instead of sequence strings

The compact sequence syntax is convenient when using single-character condition IDs. If you need multi-character IDs or want to define a sequence explicitly, you can use arrays instead.

For example:

```javascript
design: {
  sequences: [
    [
      "Condition1",
      "Condition2",
      "Condition1",
      "Condition2"
    ]
  ],
  selection_method: "participant"
},
```

In this case, the entries refer directly to the patch type IDs rather than single-character symbols.

You can also use the reserved value `"<Break>"` to insert a block break:

```javascript
design: {
  sequences: [
    [
      "Condition1",
      "Condition2",
      "<Break>",
      "Condition2",
      "Condition1"
    ]
  ]
},
```

This is the advanced alternative to writing `"AB|BA"` in the compact syntax.

For most experiments, the compact string syntax is easier to read and is recommended.

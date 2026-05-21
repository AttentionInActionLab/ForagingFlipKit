# Experimental Design Guide

This document provides a concise overview of common experimental designs and how to think about implementing them with ForagingFlipKit. It is intended as a reference when planning and configuring new experiments (e.g., via `config.js` and the `stimuli/` directory).

## Purpose
## (1) Understand the design options (within-, between-, mixed designs, blocks, conditions, counterbalancing, etc.), and
## (2) translate those options into a ForagingFlipKit configuration (i.e., into config.js, plus organizing stimuli).

**1. Core Concepts: What you can vary in an experiment**
When designing a study, think in terms of factors and levels:

A factor = a variable you manipulate (e.g., “difficulty”, “set size”, “condition type”).
A level = a value of that factor (e.g., difficulty ∈ {easy, hard}). 
Design options describe how participants are assigned to factor levels.

## 1. Types of Experimental Designs

### 1.1 Between-Subjects Design
Each participant experiences only one level of a given independent variable (IV), one level of a factor.
**Example:** Factor: “Feedback” with levels {feedback, no-feedback}.
Participant A: only sees feedback trials.
Participant B: only sees no-feedback trials.

**Use when**
- Exposure to one condition would likely influence behavior in others (e.g. feedback, instructions, strategies)  
- The task would become too long if each participant did all conditions
- 
### 1.2 Within-Subjects Design (Repeated Measures)
Each participant experiences all levels of a factor.
**Example:** Factor: “Difficulty” with levels {easy, hard}.
Every participant gets both easy and hard trials, maybe intermixed or in blocks.

**Use when**
- Conditions can safely be repeated within the same participant  
- You want efficient comparisons across multiple levels

## **1.3 Mixed Design (Between × Within)**
Some factors are between-subjects, others are within-subjects.
**Example:** Factor A (between-subject): “Training type” ∈ {visual, auditory}. Factor B (within-subject): “Difficulty” ∈ {easy, hard}.
Every participant is assigned one training type, but does both difficulties.
This is often the most flexible structure for complex experiments.

**Use when**
...

## 2.Structural Levels: Participants, Blocks, Trials

ForagingFlipKit experiments can be thought of in three layers:

- **Participant**  
  The unit assigned to between-subjects conditions (e.g., `group = feedback` vs `group = noFeedback`).

- **Block**  
  A sequence of trials, often sharing certain properties (e.g., all `easy` trials, or a mix with a specific ratio).

- **Trial**  
  A single task instance (e.g., one display, one decision, one response), with its condition parameters and stimuli.

Typical hierarchy:

> Participant → Blocks → Trials

Experimental design is the set of rules that define:
- Which participants go into which groups  
- Which blocks they see, in what order  
- Which trials and stimuli appear in each block
  
---

## 3. Design Workflow: From Idea to Implementation

Use this as a checklist when planning a new experiment.

### 3.1 Define Variables

For each experiment:

1. **Research question**  
  - What are you testing?
    
2. **Independent variables (IVs)**  
   For each IV:
   - Name (e.g. `difficulty`, `displayType`, `feedback`)  
   - Levels (e.g. `easy` / `hard`, `static` / `dynamic`)  
   - Design type: `between-subjects` or `within-subjects`

3. **Dependent variables (DVs)**  
   - What you measure: e.g. response time, accuracy, number of targets found
   - How they are computed: e.g. median RT per condition, error rate per block
     
4. **Control variables**  
   - Constants that should not vary unintentionally (e.g. display size, number of distractors)

---

### 3.2 Decide Design Type per Factor

For each IV, choose:

- **Within-subjects** if:
  - It can vary across trials or blocks within a participant
  - You want efficient comparisons and can manage order effects

- **Between-subjects** if:
  - It represents a global condition (e.g., instructions, feedback regime, training)
  - It might cause strong carryover effects if switched mid-experiment

- **Mixed** if:
  - Some factors are best treated as global (between) and others as trial-level (within)

Example table:

| Factor       | Levels               | Design type       |
|-------------|----------------------|-------------------|
| difficulty  | `easy`, `hard`       | within-subjects   |
| displayType | `static`, `dynamic`  | between-subjects  |
| feedback    | `on`, `off`          | between-subjects  |

---

### 3.3 Map Factors to Blocks and Trials

- **Within-subjects factors**  
  - Often implemented as:
    - Different blocks (e.g. Block 1: `easy`, Block 2: `hard`), and/or  
    - Different trial types within the same block (each trial labeled with condition)

- **Between-subjects factors**  
  - Implemented as:
    - A single configuration chosen once per participant (e.g. `group = 'static'`)  
    - Global parameters that apply to all trials for that participant

---

## 4. Counterbalancing and Randomization

### 4.1 Between-Subjects: Group Assignment

- Assign participants to between-subjects conditions:
  - Randomly (e.g., 50/50 split between two groups), or  
  - According to a pre-defined schedule (to keep group sizes balanced)

- Always record group information with each participant’s data (e.g. `groupId`, `feedbackCondition`)

### 4.2 Within-Subjects: Order Effects

- To reduce order effects:
  - Counterbalance the order of blocks (e.g., half see `easy → hard`, half see `hard → easy`), or  
  - Randomize block order per participant

- Record order information (e.g. `blockOrder = "easy-hard"`)

### 4.3 Stimulus Randomization

- Randomize:
  - Trial order within a block  
  - Which specific stimulus is used on each trial (from a condition-specific pool)  
- Ensure each condition has sufficient trials per participant for analysis

---

## 5. Practical Notes

### 5.1 Number of Trials and Participants

- Within-subjects designs:
  - Fewer participants are needed, but each must complete more trials  
- Between-subjects designs:
  - More participants are needed, but per-participant time can be shorter  
- Mixed designs:
  - Aim for balanced group sizes and enough trials per condition for each participant

The exact numbers depend on the research question and expected effect sizes.

### 5.2 Session Length and Fatigue

- Estimate session duration from:
  - Average trial duration × number of trials  
- In many attention tasks, 15–30 minutes is a reasonable range
- Use practice blocks and short breaks between blocks if needed

### 5.3 Data Logging

For later analysis, ensure that exported data include at least:

- Participant ID  
- Between-subjects factor levels (e.g. `displayType`, `feedback`)  
- Within-subjects factor levels per trial (e.g. `difficulty`, `setSize`)  
- Block number and trial number (For concrete implementation patterns (e.g. practice blocks and breaks between blocks), see: [Implementing practice blocks and breaks](implementation/practice-and-breaks.md))
- Stimulus identifiers  
- Dependent variables (e.g. response time, accuracy)

---

## 6. How to Use This Guide When Building a New Experiment

When designing a new ForagingFlipKit experiment:

1. Fill in the variables list (Section 3.1)  
2. Decide which factors are within-/between-subjects (Section 3.2)  
3. Decide how those factors map onto blocks and trials (Section 3.3)  
4. Plan randomization and counterbalancing (Section 4)  
5. Implement these decisions in `config.js`:
   - Between-subjects factors → group-level configuration  
   - Within-subjects factors → block/trial parameters  
6. Organize your `stimuli/` folder to match your conditions (e.g. by difficulty, type, or group)

This guide is intended as a compact reference so that experimenters can see the available design options and choose an appropriate structure before editing `config.js`.

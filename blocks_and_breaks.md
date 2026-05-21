## Implementing Practice Blocks and Breaks

You can improve usability and data quality by adding:

- **Practice blocks** (unlogged or separately logged trials) before the main experiment  
- **Short breaks** between main blocks

Below is a conceptual pattern for doing this in your configuration and task logic.

---

### 1. Practice Blocks

**Idea:**  
Practice blocks use the same task structure as main blocks, but:
- Often have fewer trials (e.g. 5)
- May use simpler or representative stimuli
- Can optionally be excluded from main analyses

**Design decisions:**
- How many practice blocks
- How many practice trials (e.g. 24)
- Whether to give extra feedback or hints

**Conceptual configuration:**
- Distinguish practice vs main blocks in your design:

Participant
 ├─ Practice block (short, optional)
 ├─ Main block 1
 ├─ Break
 ├─ Main block 2
 └─ ...

### Example structure in config terms (conceptual):
blocks:
  - type: "practice"
    name: "practice_block"
    nTrials: 20
    difficulty: "mixed"
    feedback: "detailed"

  - type: "main"
    name: "main_block_1"
    nTrials: 60
    difficulty: "easy"
    feedback: "normal"

  - type: "main"
    name: "main_block_2"
    nTrials: 60
    difficulty: "hard"
    feedback: "normal"

---

### 2. Breaks Between Blocks

**Idea**  
Breaks reduce fatigue and help participants maintain performance over longer sessions.

**Design decisions**

For breaks, specify:

- After which blocks you show a break
- Whether breaks are:
  - Time-limited (e.g. 30 seconds), or
  - Self-paced (continue on key press / button click) → most popular
- What is shown during the break:
  - Simple text (e.g. “You can take a short break now.”)  
  - Optional progress information (e.g. “Block 1 of 4 complete”)

**Conceptual behaviour**
Run block 1
→ Show break screen (e.g. "Short break – press any key to continue")
→ Run block 2
→ (Optional) further breaks
→ End screen

### Example structure in config terms (conceptual)
blocks:
  - type: "practice"
    name: "practice_block"
    nTrials: 20
    difficulty: "mixed"
    feedback: "detailed"
    showBreakAfter: false

  - type: "main"
    name: "main_block_1"
    nTrials: 60
    difficulty: "easy"
    feedback: "normal"
    showBreakAfter: true   # show a break after this block

---

#### Trial-level logging (practice vs main)

Each trial entry should include:

- A phase label: `phase = "practice"` or `phase = "main"`  
- Block identifiers  
- Condition fields  
- Outcome measures

# Example trial log entries (conceptual)

# Practice trial
{
  "eventType": "trial",
  "participantId": "P001",
  "trialIndex": 1,
  "blockIndex": 0,
  "blockName": "practice_block",
  "phase": "practice",          # practice vs main
  "blockType": "practice",      # optional, redundant with phase
  "condition": {
    "difficulty": "mixed",
    "displayType": "static"
  },
  "responseTime": 782,
  "correct": true
}

# Main trial
{
  "eventType": "trial",
  "participantId": "P001",
  "trialIndex": 25,
  "blockIndex": 1,
  "blockName": "main_block_1",
  "phase": "main",              # practice vs main
  "blockType": "main",          # optional
  "condition": {
    "difficulty": "easy",
    "displayType": "static"
  },
  "responseTime": 621,
  "correct": false
}

# Example break log entry (conceptual)

{
  "eventType": "break",         # distinguishes from "trial"
  "participantId": "P001",
  "breakIndex": 0,
  "afterBlockIndex": 1,         # break occurs after block 1
  "afterBlockName": "main_block_1",
  "startTime": "2024-01-01T10:05:00Z",
  "endTime": "2024-01-01T10:06:00Z",
  "durationMs": 60000,
  "breakConfig": {
    "mode": "keypress",         # "keypress" | "button" | "timeout"
    "message": "Short break – press any key to continue.",
    "showProgress": true
  }
}

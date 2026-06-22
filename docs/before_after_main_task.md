# Before/after the main task

This page describes how to add screens, questionnaires, etc. before or after the main task. You can add arbitrary jspsych trials, see here: [jsPsych v6.3 documentation](https://www.jspsych.org/6.3/). Note that

jspsych-image-button-response, jspsych-html-button-response, jspsych-survey-text, jspsych-survey-multi-choice, jspsych-instructions and jssych-survey-likert are automatically importet. Other plugins may need manual import via the config file.

The most commone use case it probably a questionnaire before or after the experiment. Here is example code to add one:

```javascript
"before_main_task": [{
    // A short introductory text could be placed here.
    type: "html-button-response",
    stimulus: <h2>Please answer a few questions first</h2>.
                 <br><br><p>Any HTML text can be placed here</p,
    choices: ["Next"]
  },
  { // The first page starts here
    type: "survey-likert",
    preamble: "<h3>How do you like the weather today?</h3>",
    questions: [{
        prompt: "It is much too hot today.",
        labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
        required: true
      },
      {
        prompt: "Too hot today it is!",
        labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
        required: true
      },
      {
        prompt: "I'm freezing!!!",
        labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
        required: true
      }],
    },
    { // The second page starts here
      type: "survey-multi-choice",
      preamble: "<h3>Fruit and Vegetables</h3>",
      questions:
      [{
        prompt: "The best fruit is ...",
        options: ["Apple", "Banana", "Pear", "Carrot"],
        horizontal: true,
      },
      {
        prompt: "The best vegetable is ...",
        options: ["Apple", "Banana", "Pear", "Carrot"],
        horizontal: true,
      }]
    }
  ],
```

The questions above will be shown before the experiment. To show some afterward, just assign a list of jsPsych trials to ``after_main_task``




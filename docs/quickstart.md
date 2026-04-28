# Getting Started

Welcome! This framework is designed for **zero setup** — no installation, no dependencies, no build step.

Everything runs locally in your browser using plain HTML and JavaScript.

---

## 🚀 Quick Start

You can run your first experiment in under a minute:

### 1. Download the project

* Go to the GitHub repository
* Click the green **Code** button
* Select **Download ZIP**

---

### 2. Extract the archive

Unzip the downloaded file to any location on your computer.

---

### 3. Run the experiment

Open the following file in your browser:

```text id="d0l3s7"
start-experiment.html
```

👉 This file is the **entry point** of the framework.
When you open it, the experiment is executed directly in your browser.

---

## 💡 Key Idea

This framework is intentionally simple:

* No installation required
* No package manager
* No server
* Everything runs **locally in the browser**

Experiments are configured and executed through simple files — just open them like any other HTML file.

---

## 📁 Project Structure (simplified)

```text id="x9h2kd"
project/
├── start-experiment.html   # Entry point (runs the experiment)
├── config.js               # Main configuration file
├── core/                   # Framework logic (no need to modify)
├── stimuli/                # Images used in the experiment
├── examples/               # Example configurations
└── tools/                  # Optional GUI tools (experimental)
```

### Overview

* **start-experiment.html**
  → Launches the experiment when opened in a browser

* **config.js**
  → The central place where you define and customize your experiment

* **core/**
  → Contains the framework logic
  → You typically **do not need to modify anything here**

* **stimuli/**
  → Place your experiment images here
  → (e.g. visual stimuli used during trials)

* **examples/**
  → Contains example configurations you can use as a starting point

* **tools/**
  → Contains GUI-based helper tools (also HTML + JS)
  → Includes an experimental config editor (may be unstable)

---

## 🧪 Creating Your Own Experiment

The simplest workflow:

1. Open `config.js`
2. Modify the configuration to define your experiment
3. Replace or add images in the `stimuli/` folder
4. Open `start-experiment.html` in your browser

👉 That’s it — no build step required. Just refresh the page after changes.

---

## ⚠️ Notes

* Use a modern browser (Chrome, Firefox, Edge, Safari)
* Some browsers may restrict certain features when opening local files
* If something doesn’t work, try a different browser

---

## ➡️ Next Steps

* Explore the example configurations in `examples/` (sorry, still empty at the moment ... will be added soon :-) )
* Experiment with modifying `config.js`
* Try the tools in the `tools/` directory (experimental)

---

Enjoy experimenting 🎉

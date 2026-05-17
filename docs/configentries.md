# Config Entries

This file documents the entries in the config file, explaning what they mean and which values they can take.

---

## fullscreen
###  ``fullscreen_mode``
* true: Shows the fullscreen dialog, after consent and instruction screens
* false: Disables the fullscreen dialog.

## patch
### ``size``
* ``[X, Y]``: ``X`` is the width and ``Y`` is the height; This is the reference resolution. The real resolution might differ as the display is always scaled to the full screen size
### ``point_indicator_html``
* An string with an HTML div with id='point-indicator-html' class='point-indicator' that contains placeholder ``%%``, which is replaced by the points of the clicked item. See default config / examples.
* ``null`` disables the display.
### ``points-display-html``
* An string with an HTML div with id='point-display-html' class='points-display' that contains placeholder ``%%``, which is replaced by the current total of points. See default config / examples.
* !!! warning
   Due to bug the only way to disable the points display is to keep the HTML string (as in the default / examples) but delete the placeholder ``XX`` 
### ``next-patch-click-html``
* An string with an HTML div with id='next-patch-click-html' class='next-click' that contains HTML/Text for a link that leads to the next patch. See default config / examples.
### ``countdown-html``
* An string with an HTML div with id='countdown-html' class='countdown-display' that contains placeholder ``%%`` which will be replaced with the remaining time in seconds. See [Time Limits](timelimits.md) for how to use the countdown.
 
### ``indicate_points``
* ``"none"``: No point indicators are shown when an item is collected
* ``"both"``: Both positive and negative points are indicated
* ``"negative"``: Only negative points are indicated
* ``"positive"``: Only positive points are 


## patch_types 
(list of items with the following entries)

### ``sound_events``
* List of form ``[{time : 0, sound  : 'tone.mp3', loop: true}, 
                /*more entries of this form*/]``
                ``time`` is time in milliseconds relative to the trial start when the sound is to be played; ``sound`` is the filename of an audio file located in the "stimulus" folder; ``loop`` can be set to true or false to determine whether the sound is looped. See [Audio](audio.md) for more info.

### ``elements``
(list of items with the following entries)

### ``role``
* ``"target"``
* ``"distractor"``
### ``amount``
* An integer number that defines how many items of this type will be instantiated
### ``points``
* An integer number (positive or negative) of points to be added when the item is collected.

### ``images``
* A list of the form ``["disk-green.svg", "disk-yellow.svg", /* potentially more entries */]`` with filenames of image files located in the "stimulus" folder. When an element is instantiated, a images are picked randomly (but in a balanced fashion) from this list.

### ``click_sounds``
* A list of the form ``["error1.mp3", "error2.mp3", /* potentially more entries */]`` with filenames of audio files located in the "stimulus" folder. When an item is clicked, a random sound of the ones from the list is played. See [Audio](audio.md) for more info.

### ``collectible``
* ``true``: The item is removed from the screen when clicked.
* ``false``: The item remains on the screen when clicked.

### ``trial_ends_when_all_collected``
* ``true``: When all items that have this attribute set to true are collected, the trial is ended.
* ``false``: Collecting all of these items does not affect trial termination 

## blocks
### ``enabled``
* ``true``: The design sequences explained below will be used
* ``false``: All patch types will be shown intermixed
### ``sequences``
* List of the form 
  ```
  [
    "ABAB",
    "BABA"
  ]```
where "A" and "B" refer to patch type IDs. Multiple lines can be used to represent alternative orders for different participants. For more details see [Experimental Design](design.md) for details.

## Top-level entries
### ```patch_repetitions```
* Number of repetitions of each trial type. This value is ignroed, if blocks.enabled is set to ``true`` (see above).







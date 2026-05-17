# Audio
Concerning audio, there are currently two types of sounds: Click sounds that are played when elements are clicked, and "sound events" that start at defined time. The latter can also be used to play a background music / sound throughout the trial. 

## Click sounds
Click sounds are defined in the same way as the stimulus images, as a list possible audio files. In the example below, the list contains only a single sound that is played ad an error signal when a distractor is clicked.

```javascript
      /* We are inside an item of the patch_types list */
      "elements": [
        {
          "role": "distractor",
          "amount": 25,
          "click_sounds": ["error.mp3"],
          "points": 1,
          "images": [
            "disk-green.svg",
            "disk-yellow.svg",
          ],
          "collectible": true
        },
        /* potentially further entries here */
       ]
```

## Sound events
Sound events are defined on the patch_type level:

```javascript
  "patch_types": [
    {
      "id": "A",
      "name": "ConditionA",
      "background_color": "#0A00AA",
      "travel_time": 1000,
      "sound_events": [{time : 0, sound  : 'music.mp3', loop: true}],
      "intro": "<p>Welcome to condition A!</p>",
      "elements": [/* this is where the list
                   of elements would be */]
    }
  ],
```

The example above shows how background music (``sound: "music.mp3"``) is played right from the start of the trial (``time: 0``) and looped (``loop: true``).

When a trial is finished, all playing sound events are stopped so that there is no overlap with sounds the upcoming trial might start.  







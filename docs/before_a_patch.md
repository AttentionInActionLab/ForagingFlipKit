# Before a Patch

This page describes events that can occur before a patch is started!

## Instructions before the patch starts

This can be achieved via the "intro" attribute of a patch type.

TODO: A better explanation will follow!

## Images before the patch starts

![Screenshot with an apple](screenshots/screenshot-pre-trial-image.jpg)

If you want to display an image before the patch starts, you can use the "pre_trial" attribute in the patch_type.

```javascript
"patch_types": [
  {
    "id": "A",
    "name": "ConditionA",
    "background_color": "#0A00AA",
    "intro": "<p>Welcome!</p>",
    "pre_trial": {"image": "apple.jpg"},
    // Further entries go here ....
```
 
In the example above, an image of an apple is diplayed before the trial (don't ask why....). The apple.jpg needs to be located in the "stimuli" folder. A "continue" button terminates the screen to start the patch. 


If instead you want the screen to stop automatically, you can define a time. In the example below, the image terminates after 3 seconds:

```javascript
 "pre_trial": {"image": "apple.jpg", "time": 3000},
```
 

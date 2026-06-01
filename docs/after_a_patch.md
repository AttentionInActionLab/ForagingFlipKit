# After a Patch

If you want to record a judgment right after a patch, you can add a post_trial attribute to the patch_type:  

```javascript
"patch_types": [
  {
    "id": "A",
    "name": "ConditionA",
    "background_color": "#0A00AA",
    "intro": "<p>Welcome!</p>",
    "post_trial": {
      "html": "Who did this make you feel?",
      "choices": ["Good", "Bad", "I want to sleep now"]
     },
    // Further entries go here ....
```

This will show some buttons. Note that you can also use something like "<img src='stimuli/some_image.png'>" inside the choices to put images on the buttons.

 

# NewUI Concept

This document outlines ideas for enhancing the Productivity Calculator interface.

## Current Functionality
The existing app lets therapists input their start time, scheduled therapy hours and minutes, and desired productivity percentage. After each input change the JavaScript recalculates the "perfect end time." The interface is functional but fairly plain.

## Usability Goals for Version 2
1. **Reduce cognitive load:** Group related inputs so users can quickly scan and understand the form.
2. **Provide instant feedback:** Show the computed end time prominently and update it as the user types.
3. **Improve mobile experience:** Use responsive layout techniques and larger touch targets.
4. **Offer guidance:** Include brief hints or placeholders for each field to clarify expected input.
5. **Encourage exploration:** Allow users to try different productivity percentages without reloading.

## UI Concepts
- Move the input fields into a Bootstrap card with a clear heading like "Work Day Setup." Each field would have a label and inline description.
- Display the calculated end time in a contrasting color inside another card labeled "Your End Time." This emphasizes the output.
- Add a persistent navigation bar with links back to the original version and to help resources.
- Use larger buttons or sliders for setting hours and minutes on mobile devices.
- Consider an optional dark mode toggle for users working in low-light environments.

These concepts keep the existing simple workflow but aim to make the app more approachable and user friendly.

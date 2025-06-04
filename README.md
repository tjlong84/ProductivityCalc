# ProductivityCalc

This repository now contains **two** versions of the Productivity Calculator. The
original implementation lives at the root of the project while a reworked
prototype for **version&nbsp;2** is found in the `version2/` folder. Both are static
web apps that calculate when a therapist should end their day based on their
scheduled therapy time and productivity goal.

The purpose of this branch is to prototype and test the version&nbsp;2 interface and
features while still keeping the original version intact for reference.

ProductivityCalc helps therapists determine when they should finish their work
day. By providing a start time, the amount of scheduled therapy time, and a
desired productivity percentage, the page displays the time you need to clock
out in order to meet that productivity goal.

## How It Works

The calculator lives entirely in the browser. The form on `index.html` collects:

- **Start Time** – the beginning of your day (defaults to 7:00 AM).
- **Scheduled Therapy Time** – split into hours and minutes.
- **Productivity Goal** – entered as a percentage (85% by default).

When any of these values change, `script.js` recomputes the ideal end time. The script converts the inputs to decimal hours, divides the scheduled therapy time by the productivity percentage, and adds the result to the start time. The output is formatted in 12‑hour time and shown next to “Perfect end time.”

`index.html` uses Bootstrap for layout and includes a small Firebase snippet for analytics, although the app does not require a backend to function.

## Usage

Open `index.html` in any modern web browser. Adjust the values to match your schedule and productivity target. The calculated end time updates automatically.

## Development

No build steps are necessary; the project consists of static HTML and JavaScript files:

- `index.html` – user interface and Firebase configuration.
- `script.js` – calculation logic and event handlers.

Clone or download the repository and open `index.html` to experiment locally. You can modify the styles or JavaScript as needed.

## Version 2 Prototype

The `version2/` directory contains an experimental redesign. Major differences from the original include:

- **Modernized UI** using Bootstrap cards and a cleaner layout.
- **Range slider** and plus/minus buttons for adjusting productivity goals.
- **Quick time adjustment buttons** to add or subtract common increments.
- **Live progress ring** with countdown and a display of completed versus remaining time.
- **Color theme options** for the ring, stored in `localStorage`.
- **Optional dark mode** with the preference stored in `localStorage`.

Version&nbsp;2 is still being iterated on, so behavior or styling may change. The classic version remains in the project root for comparison.

## License

This project is provided as-is with no specified license.

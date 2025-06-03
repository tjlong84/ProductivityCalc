# ProductivityCalc

ProductivityCalc is a small single-page web application that helps therapists determine when they should finish their work day. By providing a start time, the amount of scheduled therapy time, and a desired productivity percentage, the page displays the time you need to clock out in order to meet that productivity goal.

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

## License

This project is provided as-is with no specified license.

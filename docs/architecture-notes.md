# Architecture Notes
## How does Chymist start up?
Let's trace through the code from package.json.
Electron looks at the `main` key in package.json to find the initial file to execute. If you look in package.json, `main` is set to **`src/browser/main.js`**.
### src/browser/main.js
- parses the command line arguments
- fires up the transpilers
- and loads **`src/browser/app.js`**.
### src/browser/app.js
- reparses the command line arguments
- set up error printer for the browser thread
- load application object from **`src/browser/Application.js`**
- start application
- log start time
### src/browser/Application.js
Holds a list of open windows, and acts as the centeral Event hub.

- opens windows
- performs window-creation calling out to AppWindow in **`src/browser/AppWindow.js`**
- performs menu-creation calling out to AppMenu in **`src/browser/AppMenu.js`**
- performs window-array push and pop
### src/browser/AppWindow.js
Interfaces with BrowserWindow for us and prepares all the necessary settings and logic for it to load correctly.
This includes:

- getting a bootstrapScript (**`src/renderer/main.js`**)
- setting up the `web-preferences` key
- merging settings together
- creating the BrowserWindow

It also shows the window:

- gets the target path to the static HTML file (**`static/index.html`**)
- creates a URL to the HTML file with important settings in a JSON.stringified querystring
- loads the URL
- shows it

And manages it:

*wip put things here*
### src/browser/AppMenu.js
Loads and builds the application menu from CSON menu-descriptor files.
*wip put things here*
### static/index.html
Blank HTML file that loads **`static/index.js`**
### static/index.js
Loads bootstrapScript (**`src/renderer/main.js`**) from the querystring and wires up error handling
### static/index.js
*wip put things here*

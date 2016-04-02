# Contributing to Chymist

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Chymist,
which is hosted in the [Chymist Organization](https://github.com/chymist) on GitHub.
These are just guidelines, not rules, use your best judgment and feel free to
propose changes to this document in a pull request.

## Submitting Issues

* You can create an issue [here](https://github.com/chymist/chymist/issues/new), but
  before doing that please read the notes below on debugging and submitting issues,
  and include as many details as possible with your report.
* Include the version of Chymist you are using and the OS.
* Include screenshots and animated GIFs whenever possible; they are immensely
  helpful.
* Include the behavior you expected and other places you've seen that behavior
  such as Emacs, vi, google {docs,sheets}, etc.
* Check the dev tools (`ctrl-shift-d`) for errors to include. If the dev tools
  are open _before_ the error is triggered, a full stack trace for the error
  will be logged. If you can reproduce the error, use this approach to get the
  full stack trace and include it in the issue.
* On Mac, check Console.app for stack traces to include if reporting a crash.
* Perform a [cursory search](https://github.com/issues?q=+is%3Aissue+user%3Achymist)
  to see if a similar issue has already been submitted.

## Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](https://github.com/airbnb/javascript),
  and [CSS](https://github.com/styleguide/css) styleguides.
* Include thoughtfully-worded, well-structured [Mocha](https://mochajs.org/) tests in the `./tests` folder.
  We use [should.js](https://github.com/shouldjs/should.js) for assertions.
  Run them using `npm test`. See the [Test Styleguide](#test-styleguide) below.
* Document new code based on the [Documentation Styleguide](#documentation-styleguide).
* End files with a newline.
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
    * Built in Chymist and Electron Modules
    * Local Modules (using relative paths)
* Place class properties in the following order:
    * Class methods and properties
    * Instance methods and properties
* Avoid platform-dependent code:
    * Use `require('fs-plus').getHomeDirectory()` to get the home directory.
    * Use `path.join()` to concatenate filenames.
    * Use `os.tmpdir()` rather than `/tmp` when you need to reference the
      temporary directory.
* Using a plain `return` when returning explicitly at the end of a function.
    * Not `return null`, `return undefined`, `null`, or `undefined`

## Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Mac OS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

## Specs Styleguide

- Include thoughtfully-worded, well-structured [Mocha](https://mochajs.org/) tests in the `./tests` folder.
- Use [should.js](https://github.com/shouldjs/should.js) for assertions.

## Documentation Styleguide

* Use [AtomDoc](https://github.com/atom/atomdoc).
* Use [Markdown](https://daringfireball.net/projects/markdown).
* Reference methods and classes in markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName::methodName}`
    * Reference class methods with `{ClassName.methodName}`

### Example

```js
/* Public: Disable the package with the given name.
   * `name`    The {String} name of the package to disable.
   * `options` (optional) The {Object} with disable options (default: {}):
     * `trackTime`     A {Boolean}, `true` to track the amount of time taken.
     * `ignoreErrors`  A {Boolean}, `true` to catch and ignore errors thrown.
   * `callback` The {Function} to call after the package has been disabled.

   Returns `undefined`. */
function disablePackage(name, options, callback) {
```

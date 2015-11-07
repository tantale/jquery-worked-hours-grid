# jQuery Worked Hours Grid plugin [![Build Status](https://secure.travis-ci.org/tantale/jquery-worked-hours-grid.png?branch=master)](https://travis-ci.org/tantale/jquery-worked-hours-grid)

jQuery plugin used to calculate worked durations in worked hours grids.

* Free software: [MIT License](http://tantale.mit-license.org/)
* History: [HISTORY.md](https://github.com/tantale/jquery-worked-hours-grid/blob/master/HISTORY.md)
* How to contribute: [CONTRIBUTING.md](https://github.com/tantale/jquery-worked-hours-grid/blob/master/CONTRIBUTING.md)

## Demo

See the `demo` subdirectory.

## Usage

1. Include jQuery:

  ```html
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
  ```

2. Include plugin's code:

  ```html
  <script src="dist/jquery.worked-hours-grid.min.js"></script>
  ```

3. Create a HTML table to represent worked hours of the week:

  | Days      | Morning        | Afternoon      |  Duration     |
  |:----------|:--------------:|:--------------:|:--------------|
  | Monday    |                | 14:00 to 17:45 |  **3h 45min** |
  | Tuesday   | 8:30 to 12:30  | 14:00 to 17:45 |  **7h 45min** |
  | Wednesday | 8:30 to 12:30  | 14:00 to 17:45 |  **7h 45min** |
  | Thursday  | 8:30 to 12:30  | 14:00 to 17:45 |  **7h 45min** |
  | Friday    | 8:30 to 12:30  | 14:00 to 17:45 |  **7h 45min** |
  | Saturday  | 8:30 to 12:30  |                |  **4h**       |
  | Sunday    |                |                |               |
  | **Total** |                |                | **38h 30min** |

  The default configuration use:
  * `.row` class to select a row of time ranges and duration sum (HTML `<tr>`),
  * `.range` class to select each time range in a row (HTML `<span>` with two `<input>`, one for start, one for end time),
  * `.start` class to select the start time (HTML `<input>`) in each range,
  * `.end` class to select the end time (HTML `<input>`) in each range,
  * `.sum` class to select the sum field (HTML `<td>`) in each row,
  * `.total` class to select the total field (HTML `<td>`) in the grid (footer row).

4. Call the plugin:

  ```javascript
  $("#element").workedHoursGrid({
      units: {
          hours: "h",
          minutes: "min",
          seconds: "s"
      },
      selectors: {
          row: ".row",
          range: ".range",
          start: ".start",
          end: ".end",
          sum: ".sum",
          total: ".total"
      }
  });
  ```

## Team

jQuery Worked Hours Grid plugin was created by Laurent LAPORTE, with help from these [contributors](https://github.com/tantale/jquery-worked-hours-grid/graphs/contributors).

### Credits

* [Zeno Rocha](http://zenorocha.com) and [Addy Osmani](http://addyosmani.com) for creating [jquery-boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate).
* [Audrey Roy](http://www.audreymroy.com) for creating [cookiecutter-jquery](https://github.com/audreyr/cookiecutter-jquery).


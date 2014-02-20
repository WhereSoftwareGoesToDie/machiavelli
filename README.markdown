Machiavelli
=========

Machiavelli is a Ruby on Rails application for taking any arbitrarily defined data source, and feeding it into any arbitrarily defined graphing library.

It does this by defining a set of data sources, or "backends", and a set of charting libraries, or "graphs".

#### Backends
A backend is a flatfile or json feed from a website. For Machiavelli to work it's magic, it needs to know two things about any particular backend:
 * How to get a list of sources - or metrics -  available for graphing, and
 * A stream of data-points for any particular metric, in the form `[{epoch, y}, ..]`

Machiavelli currently has modules supporting the following backend types:
 * Graphite
 * "Simple" json feed
 * flatfile (csv)

### Graphs
Once a metric source has been obtained, it can be fed to a graph. This is done by a series of ruby classes, views and javascript files in order to manipulate and display the data. These can be toggled on the fly in the user interface, as required.

Machiavelli includes these graphing libraries:
 * Cubism (for horizon charts)
 * Rickshaw (for standard, and stacked charts).

See the Dependencies second of this file for more information about these libraries.

Installation
--

Ensure Ruby 1.9.3 or higher, and Redis are installed locally. Then, clone and execute like any standard Ruby on Rails application:

```sh
git clone <repo>
bundle install
bundle exec rails server
```

The default configuration settings include a simple data source, a itty bitty Sinatra application that can be run along side a default installation of Machiavelli to demo the application. Run this by executing:
```sh
ruby simple_endpoint.rb
```
Then, just navigate to `http://localhost:3000` in your favourite browser, and you're on your way.

Usage
--

After loading the Machiavelli page for the first time, no metrics are available to display. Clicking the "Refresh" button on the top navigation bar iterates over all the configuration settings and pulls all available metrics to be graphed into the left hand side bar.

Then, any metric can be added or removed from the page by clicking it's link.

The filter bar can be used to narrow down the list of available metrics (those that aren't already graphed) for ease of selection. Entering a substring matching multiple metrics and pressing enter will add all matches to the page.

The buttons on the top navigation bar can be used to toggle the date range, and graphing style to use. Depending on the view being used, hovering can show more detail, and sliders can be used to zoom to specific points in time.


Invoking Backends
--

Adding a backend to a Machiavelli instance is as simple as adding it to the `backends` stanza in `config/settings.yml`.

By default, every backend requires:
 * `type` - the name of the library in `lib/backend/` to be invoked
 * `settings` - a hash of settings to pass to the library. See each library for details.

Multiple backends of the same type can be invoked at once by adding an `alias` setting. The backend type, or alias, will appear in the metrics listing in Machiavelli.

Creating New Backends
--

( description pending )


Optional Settings
--

Machiavelli will accept any `config/settings.yml` overwrites of the following values:

<dl>
<dt>`tooltips` </dt>
<dd> default `off`.</dd>
<dd>Set to true for tooltips for the basic user interface</dd>

<dt> `cubism_color` </dt>
<dd> default `#006d2c` ("Cubism" green).</dd>
<dd>Set a base colour for the darkest horizon colouring.</dd>

<dt> `redis_host`, `redis_port` </dt>
<dd> default `127.0.0.1`, `6379` </dd>
<dd>Set an alternative redis server for metrics caching.</dd>

<dt>  `metrics_key` </dt>
<dd> default `Machiavelli.Backend.Metrics` </dd>
<dd>Set a base key for metric name caching in Redis.</dd>

Dependencies
--

Machiavelli makes use of the following projects and code libraries under their associated licences:

 * [Rickshaw](https://github.com/shutterstock/rickshaw), available under the MIT Licence.
  - we use a slightly patched version, availble [here](https://github.com/glasnt/rickshaw)
 * [Cubism](https://github.com/square/cubism), available under the Apache 2.0 Licence.
 * [D3](https://github.com/mbostock/d3), available under the BSD3 Licence.
 * [Bootstrap](https://github.com/twbs/bootstrap/), available under the MIT Licence.
 * [jQuery](https://github.com/jquery/jquery), available under the MIT Licence.
 * [Underscore](https://github.com/jashkenas/underscore), available under the MIT Licence.
 * [Font Awesome](https://github.com/FortAwesome/Font-Awesome/), by Dave Gandy - http://fontawesome.io
 * [SBAdmin2 Theme](https://github.com/IronSummitMedia/startbootstrap/tree/master/templates/sb-admin-v2), available under the Apache 2.0 Licence.

Machiavelli is written in [Ruby on Rails](https://github.com/rails/rails), licensed under the MIT Licence.

Licence
--

Machiavelli is available under a BSD3 licence, see [LICENCE](LICENCE) for more information.

For dependent libraries, see the Dependencies section of this file.

[Graphite](https://github.com/graphite-project/) is available under the Apache 2.0 Licence.

[Redis](https://github.com/antirez/redis) is available under a BSD3 Licence.



-------------


> Before all else, be graphed
- Machiavelli (apocryphal)


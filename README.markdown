# Machiavelli

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/) 
[![Release Status](http://img.shields.io/github/release/machiavellian/machiavelli.svg?style=flat-square)](http://github.com/machiavellian/machiavelli/releases/latest)
[![Travis Status](http://img.shields.io/travis/machiavellian/machiavelli/master.svg?style=flat-square)](https://travis-ci.org/machiavellian/machiavelli)
[![Coverage Status](http://img.shields.io/coveralls/machiavellian/machiavelli.svg?style=flat-sqaure)](https://coveralls.io/r/machiavellian/machiavelli)
[![Documentation Coverage](http://inch-ci.org/github/machiavellian/machiavelli.svg)](http://inch-ci.org/github/machiavellian/machiavelli)

Machiavelli is a generic time-series dataset visualisation tool, written in Ruby on Rails, and using d3.js-family libraries.

By detailing the information required to get data out of it's data **store**, and optional information about the humanization about the **source** of this data, Machiavelli can compare and correlate an abstract number of arbitary data metrics. 

[See the Linux Conf AU 2015 talk on Machiavelli](https://www.youtube.com/watch?v=My65wJ-sBVc)

## Demonstration

Live demo coming soon

## Local deployment

Machiavelli comes bundled with a demonstration data store that has been configured in [development configuration](https://github.com/machiavellian/machiavelli/blob/master/config/settings/development.yml), which is used by default when running Rails using it's internal server. 

To see Machiavelli in action, it's as simple as: 

```
git clone https://github.com/machiavellian/machiavelli
cd machiavelli
bundle install
bundle exec rails server
```



## Acknowledgements

Machiavelli originally started as a project by [Anchor Systems](http://anchor.com.au) by [Katie McLaughlin](https://github.com/glasnt). Further development on the project sponsored by [Bulletproof Networks](https://bulletproof.net)


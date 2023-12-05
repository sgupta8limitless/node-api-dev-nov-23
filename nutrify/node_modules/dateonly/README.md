# dateonly #

#### A JavaScript class that stores a date without a time. ####

## About ##

`DateOnly` is a data type that will only store a date, without an associated time. This allows you to work with dates without having to worry about time zones shifting the date.

A simple example is a person's birthday - a birthday is not a single moment in time, but rather a full day.  `DateOnly` is the perfect data type to represent such data.

## Installation ##

```javascript
npm install dateonly
```

## Usage ##

```javascript
// CommonJS
var DateOnly = require('dateonly');
```

```javascript
// AMD
require(['DateOnly'], function(DateOnly) { ... });
```

```javascript
// Script Tag
var DateOnly = window.DateOnly;
```

```javascript
var DateOnly = require('dateonly');
var myBirthday = new DateOnly('7/4/1980');
```
## API ##
```javascript
new DateOnly(defaultValue)
```

__defaultValue__: __`undefined`__

If nothing is passed into the `DateOnly` constructor, it will default to today's date.

__defaultValue__: __`Date`__

If a `Date` object is passed in, the `DateOnly` instance will be set to the `Date`'s date.

__defaultValue__: __`String`__

If a `String` is passed in, it will be passed to the `Date` constructor, and that new `Date` instance will then be used to set the `DateOnly`'s date.

__defaultValue__: __`Number`__

If a `Number` is passed in, it will be passed to the `Date` constructor, and that new `Date` instance will then be used to set the `DateOnly`'s date.

---

```javascript
new DateOnly().setDate(date)
```

Sets the `date` portion of the `DateOnly` instance.

__date__: __`Number`__

The number to set the date to.  No validation is performed.

__Example:__

```javascript
var date = new DateOnly('1/1/2000');
date.setDate(20);
console.log(date); // { date: 20, month: 0, year: 2000 }
date.setDate(80);
console.log(date); // { date: 80, month: 0, year: 2000 }
```

---

```javascript
new DateOnly().getDate()
```

Gets the `date` portion of the `DateOnly` instance.

---

```javascript
new DateOnly().setMonth(month)
```

Sets the `month` portion of the `DateOnly` instance.  As with the `Date` object, January === 0.

__month__: __`Number`__

The number to set the month to.  No validation is performed.

---

```javascript
new DateOnly().getMonth()
```

Gets the `year` portion of the `DateOnly` instance.

---

```javascript
new DateOnly().setFullYear(year)
```

Sets the `year` portion of the `DateOnly` instance.

__month__: __`Number`__

The number to set the year to.  No validation is performed.

---

```javascript
new DateOnly().getFullYear()
```

Gets the `year` portion of the `DateOnly` instance.

---

```javascript
new DateOnly().getDay()
```

Gets the day of the week of the `DateOnly` instance.  As with the `Date` object, Sunday === 0.

---

```javascript
new DateOnly().toDate()
```

Returns the `Date` representation of the `DateOnly` instance.

__Example:__

```javascript
var dateOnly = new DateOnly('1/1/2000');
dateOnly.toDate() instanceof Date // true
dateOnly.toDate();                // Sat Jan 01 2000 00:00:00 GMT-0600 (CST)
```

---

```javascript
new DateOnly().valueOf() | new DateOnly().toJSON()
```

Returns the numeric representation of the `DateOnly` instance, of the form `YYYYMMDD`.

__Example:__

```javascript
var dateOnly = new DateOnly('7/15/2000');
dateOnly.valueOf() // 20000615
dateOnly.toJSON()  // 20000615
```

---

```javascript
new DateOnly().toString()
```

Returns the date string of the `DateOnly` instance.  This is equivalent to calling `new DateOnly().toDate().toDateString()`.

__Example:__

```javascript
var dateOnly = new DateOnly('7/4/2000');
dateOnly.toString() // 'Tue Jul 04 2000'
```

---

If you are using Mongo and Mongoose, there is a package that will allow you to store and query `DateOnly` properties that can be found [here](https://github.com/boblauer/mongoose-dateonly).

##Test
npm test

# Momoa
![CI](https://github.com/itaibo/momoa/actions/workflows/ci.yml/badge.svg)

Operations with JSONs

## Usage
Install the package:
```sh
npm install momoa
```

### Enlist JSON Array

```js
import Momoa from 'momoa';

// Initialize class with a JSON array
const momoa = new Momoa([{ test: 1 }, { test: 2 }, { test: 3 }]);

// Output a String with one object per line
const multilineString = momoa.enlist().end();

console.log(multilineString);

```

Output would be:

```txt
{"test":1}
{"test":2}
{"test":3}

```


### Gzip results

```js
import Momoa from 'momoa';

// Initialize class with a JSON array
const momoa = new Momoa([{ test: 1 }, { test: 2 }, { test: 3 }]);

// Output a Buffer of the one object per line string, gzipped
const gzipped = await momoa.enlist().gzip().end();

console.log(gzipped);

```

Output would be:

```txt
<Buffer 1f 8b 08 00 00 00 00 00 00 13 ab 56 2a 49 2d 2e 51 b2 32 ac e5 e5 aa 86 b2 8d 90 d8 c6 40 36 00 64 7b 12 18 24 00 00 00>
```

#### Special thanks
This post showed me a solution for chaining async functions: [Chaining async functions without using 'then'](https://dev.to/avanishpai/chaining-async-functions-like-jquery-214h)

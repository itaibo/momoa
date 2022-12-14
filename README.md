# Momoa
![CI](https://github.com/itaibo/momoa/actions/workflows/ci.yml/badge.svg)

Operations with JSONs

## Usage
Install the package:
```sh
npm install momoa
```

Then import it in your application and start an instance
```js
import Momoa from 'momoa';
const momoa = new Momoa();
```

### Enlist JSON Array

```js
const multilineString = await momoa.enlist([{ test: 1 }, { test: 2 }, { test: 3 }]).output();
console.log(multilineString);
```

Output would be:

```txt
{"test":1}
{"test":2}
{"test":3}

```

### Unlist JSON String

```js
const array = await momoa.unlist("{\"test\":1}").json();
console.log(array);
```

Output would be:

```json
[
  { "test": 1 }
]
```


### Gzip results

```js
const gzipped = await momoa.enlist([{ test: 1 }, { test: 2 }, { test: 3 }]).gzip().end();
console.log(gzipped);
```

Output would be:

```txt
<Buffer 1f 8b 08 00 00 00 00 00 00 13 ab 56 2a 49 2d 2e 51 b2 32 ac e5 e5 aa 86 b2 8d 90 d8 c6 40 36 00 64 7b 12 18 24 00 00 00>
```

### UnGzip

```js
const uncompressed = await momoa.ungzip(BUFFER).end();
console.log(uncompressed);
```

Output would be:

```txt
{"test":1}
{"test":2}
{"test":3}

```

#### Special thanks
Chaining async functions: [Proxymise](https://www.npmjs.com/package/proxymise)

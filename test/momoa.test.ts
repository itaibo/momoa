import Momoa from '../src/index';

const results: {[key: string]: any} = {
	multiLineString: null,
	gzipped: null,
};

function removeLineBreaks(input: any) {
	return input.replace(/(\r\n|\n|\r)/gm, "")
};

test('enlist()', async () => {
	const momoa = new Momoa();
	const result = await momoa.enlist([{ test: 1 }, { test: 2 }]).end();

	expect(removeLineBreaks(result)).toBe("{\"test\":1}{\"test\":2}");

	results.multiLineString = result;
});

test('gzip()', async () => {
	const momoa = new Momoa();
	const result = await momoa.enlist([{ test: 1 }]).gzip().end();

	expect(Buffer.isBuffer(result)).toBe(true);

	results.gzipped = result;
});

test('unlist()', async () => {
	const momoa = new Momoa();
	const result = await momoa.unlist(results.multiLineString).json();

	expect(result).toStrictEqual([{ test: 1 }, { test: 2 }]);
});

test('ungzip()', async () => {
	const momoa = new Momoa();
	const result = await momoa.ungzip(results.gzipped).output();

	expect(removeLineBreaks(result)).toBe("{\"test\":1}");
});

test('Chained methods', async () => {
	const array = [{ test: 1 }, { test: 2 }];

	const momoa = new Momoa();
	const result = await momoa.enlist(array).unlist().json();

	expect(result).toStrictEqual(array);
});

test('Full chained methods', async () => {
	const array = [{ test: 1 }, { test: 2 }];

	const momoa = new Momoa();
	const result = await momoa.enlist(array).gzip().ungzip().unlist().json();

	expect(result).toStrictEqual(array);
});

import Momoa from '../src';

function removeLineBreaks(input: String) {
	return input.replace(/(\r\n|\n|\r)/gm, "")
};

test('enlist()', () => {
	const momoa = new Momoa([{ test: 1 }, { test: 2 }]);
	const result = momoa.enlist().end();

	expect(removeLineBreaks(result)).toBe("{\"test\":1}{\"test\":2}");
});

test('gzip()', async () => {
	const momoa = new Momoa([{ test: 1 }]);
	const result = await momoa.enlist().gzip().end();

	expect(Buffer.isBuffer(result)).toBe(true);
});

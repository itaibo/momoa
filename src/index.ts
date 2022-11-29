// @ts-ignore
import proxymise from 'proxymise';
import node_gzip from 'node-gzip';
const { gzip: nodeGzip, ungzip: nodeUngzip } = node_gzip;

export interface MomoaInterface {
	_json?: Array<Object>;
	_output?: String | Buffer;

	enlist?: Function;
	unlist?: Function;
	gzip?: Function;
	ungzip?: Function;

	end: Function;
	json: Function;
	output: Function;
};

class Momoa {
	_json: Array<Object>;
	_output?: String | Buffer;

	constructor () {};

	enlist = async (json?: Array<Object>): Promise<MomoaInterface> => {
		json = json || this._json;

		if (!json) throw new Error('Missing input');

		let output = '';

		for (const item of json) {
			output += JSON.stringify(item) + "\r\n";
		}

		this._json = json;
		this._output = output;

		return this;
	};

	unlist = async (string?: String): Promise<MomoaInterface> => {
		// @ts-ignore
		string = string || this._output;

		if (!string) throw new Error('Missing input');

		// @ts-ignore
		const lines = string.split("\r\n");

		const jsonArray: Array<Object> = [];

		for (let line of lines) {
			line = line.trim();

			if (!line) continue;

			const jsonObject = JSON.parse(line);

			jsonArray.push(jsonObject);
		}

		this._json = jsonArray;
		this._output = string;

		return this;
	};

	gzip = async (string?: String): Promise<MomoaInterface> => {
		// @ts-ignore
		string = string || this._output;

		if (!string) throw new Error('Missing input');

		// @ts-ignore
		const compressed = await nodeGzip(string);

		// @ts-ignore
		this._output = compressed;

		return this;
	};

	ungzip = async (buffer?: Buffer): Promise<MomoaInterface> => {
		// @ts-ignore
		buffer = buffer || this._output;

		if (!buffer) throw new Error('Missing input');

		// @ts-ignore
		const uncompressed = await nodeUngzip(buffer);
		const string = uncompressed.toString();

		this._output = string;

		return this;
	};

	end(): String | Buffer | undefined {
		return this._output;
	}

	json(): Array<Object> {
		return this._json;
	}

	output(): String | Buffer | undefined {
		return this._output;
	}
};

export default proxymise(Momoa);

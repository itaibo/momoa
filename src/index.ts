import { gzip as nodeGzip } from 'node-gzip';

export interface MomoaInterface {
	json: Array<Object>;
	output?: String | Buffer;
	enlist: Function;
	gzip: Function;
	end: Function;
};

export default class Momoa {
	json: Array<Object>;
	output?: String | Buffer;
	_queue: any;
	_paused: Boolean;

	constructor (json: Array<Object>) {
		this.json = json;
		this.output = undefined;
		this._queue = []
		this._paused = false;
	};

	async executeTask(task: {[key: string]: any}) {
		// @ts-ignore
		return this[task.fn].apply(this, task.args);
	}

	async executeQueue() {
		if (this._paused) return;
		
		this._paused = true;

		while (this._queue.length) {
			const task = this._queue[0];
			this._paused = true;
			await this.executeTask(task);
			this._queue.shift();
		}

		this._paused = false;
	}

	enqueueTask(fnReference: String) {
		this._queue.push({ fn: fnReference });
		this.executeQueue();
		return this;
	} 

	enlist(json?: Array<Object>): MomoaInterface {
		json = json || this.json;

		let output = '';

		for (const item of json) {
			output += JSON.stringify(item) + "\r\n";
		}

		this.json = json;
		this.output = output;

		return this;
	};

	gzip() {
		return this.enqueueTask('_gzip');
	};

	_gzip(): MomoaInterface  {
		if (!this.output) throw new Error('Missing output');
		// @ts-ignore
		const compressed = nodeGzip(this.output);

		// @ts-ignore
		this.output = compressed;

		return this;
	};

	end():String | Buffer | undefined {
		return this.output;
	}
};

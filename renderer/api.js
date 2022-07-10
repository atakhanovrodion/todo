export default class Api {
	constructor() {
		this.collections = [
			{ name: "test", tasks: [] },
			{ name: "test1", tasks: [] },
		];
	}

	addColletion(collection) {
		this.collections.push(collection);
	}

	async testFunc() {
		setTimeout(() => {
			console.log(this.collections);
		}, 500);
	}

	async getCollectionsNames() {
		const data = this.collections.map((item) => item.name);
		setTimeout(() => data, 500);
	}

	getCollection(collection) {
		const id = this.collections.findIndex((item) => item.name === collection);
		return this.collections[id];
	}
}

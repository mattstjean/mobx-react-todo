import {observable, action, reaction, toJS} from 'mobx';

export default class TagStore {
    @observable tags = new Map();

    @action
    addTag (title) {
        // if tag already exists, update count
        if (this.tags.has(title)) {
            var newCount = this.tags.get(title) + 1;
            this.tags.set(title, newCount);
        } else {
            // otherwise, add it to the tag map with a count of 1
            this.tags.set(title, 1);
        }
    }

    @action
    removeTag (title) {
        // if tag count > 1, simply update count
        if (this.tags.has(title) && this.tags.get(title) > 1) {
            var newCount = this.tags.get(title) - 1;
            this.tags.set(title, newCount);
        } else if (this.tags.get(title) === 1) {
            this.tags.delete(title);
        }
    }

    subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			tags => window.fetch && fetch('/api/tags', {
				method: 'post',
				body: JSON.stringify({tags}),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

    toJS() {
		return toJS(this.tags);
    }

	static fromJS(tagMap) {
		const tagStore = new TagStore();
        tagStore.tags = observable.map(tagMap);
        
		return tagStore;
	}
}
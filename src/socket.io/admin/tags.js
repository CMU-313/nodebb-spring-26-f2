'use strict';

const topics = require('../../topics');

const Tags = module.exports;

Tags.create = async function (socket, data) {
	if (!data) {
		throw new Error('[[error:invalid-data]]');
	}

	await topics.createEmptyTag(data.tag);
};

Tags.rename = async function (socket, data) {
	if (!Array.isArray(data) && !(data && Array.isArray(data.tags))) {
		throw new Error('[[error:invalid-data]]');
	}

	if (data && Array.isArray(data.tags) && data.cid) {
		await topics.renameTagsInCategory(data.tags, data.cid);
		return;
	}

	await topics.renameTags(Array.isArray(data) ? data : data.tags);
};

Tags.deleteTags = async function (socket, data) {
	if (!data || !Array.isArray(data.tags)) {
		throw new Error('[[error:invalid-data]]');
	}

	if (data.cid) {
		await topics.deleteTagsFromCategory(data.tags, data.cid);
		return;
	}

	await topics.deleteTags(data.tags);
};

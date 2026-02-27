'use strict';

const topics = require('../../topics');
const categories = require('../../categories');

const tagsController = module.exports;

tagsController.get = async function (req, res) {
	const selectedCid = parseInt(req.query.cid, 10) || 0;
	let [tags, categoryData] = await Promise.all([
		topics.getTags(0, 199),
		categories.getAllCategoryFields(['cid', 'name']),
	]);

	if (selectedCid > 0) {
		tags = await topics.getCategoryTagsData(selectedCid, 0, 199);
	}

	categoryData = categoryData.map((category) => {
		category.selected = parseInt(category.cid, 10) === selectedCid;
		return category;
	});

	res.render('admin/manage/tags', {
		tags: tags,
		categories: categoryData,
		selectedCid: selectedCid,
	});
};

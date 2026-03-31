
/* eslint-disable strict */
//var request = require('request');

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
	const TRANSLATOR_API = process.env.TRANSLATOR_API || 'http://127.0.0.1:5000';

	try {
		const content = postData && postData.content ? String(postData.content) : '';
		const url = `${TRANSLATOR_API}/?content=${encodeURIComponent(content)}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Translator service returned ${response.status}`);
		}

		const data = await response.json();
		const isEnglish = Boolean(data && data.is_english);
		const translatedContent = (data && typeof data.translated_content === 'string') ? data.translated_content : '';
		return [isEnglish, translatedContent];
	} catch (err) {
		return [true, ''];
	}
};

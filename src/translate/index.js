/* eslint-disable strict */
//var request = require('request');

const translatorApi = module.exports;
const DEFAULT_TRANSLATOR_API = 'http://17313-team17.s3d.cmu.edu:5000';

translatorApi.translate = async function (postData) {
	const content = (postData && typeof postData.content === 'string') ? postData.content : '';
	const translatorApiBase = process.env.TRANSLATOR_API || DEFAULT_TRANSLATOR_API;

	if (!content) {
		return [true, content];
	}

	try {
		const url = new URL('/', translatorApiBase);
		url.searchParams.set('content', content);

		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`Translator service returned ${response.status}`);
		}

		const data = await response.json();
		const isEnglish = typeof data.is_english === 'boolean' ? data.is_english : true;
		const translatedContent = typeof data.translated_content === 'string' ? data.translated_content : content;
		return [isEnglish, translatedContent];
	} catch (err) {
		return [true, content];
	}
};

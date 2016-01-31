Package.describe({
	summary: "RPG Companion - Character",
	version: "0.0.1",
	documentation: null
});

Package.onUse(function (api) {

	api.use([
		'react',
		'aldeed:collection2',
		'underscore'
	], ['client', 'server']);

	api.addFiles([
		'schema.js',
		'collections.js',
	], ['client', 'server']);

	api.addFiles([
		'components/edit.jsx',
		'components/list.jsx'
	], 'client');

	api.addFiles([
		'server/publish.js',
		'server/methods.js'
	], 'server');

	api.export('Character');
});

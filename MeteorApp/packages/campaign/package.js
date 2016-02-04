Package.describe({
    summary: "RPG Companion - Campaign",
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
        'lib/schema.js',
        'lib/collections.js',
        'lib/campaign.js'
    ], ['client', 'server']);

    api.addFiles([
        'server/publish.js',
        'server/methods.js'
    ], 'server');

    api.export('Campaign');
});

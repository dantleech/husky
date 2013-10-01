require.config({
    baseUrl: '../../'
});

require(['lib/husky'], function(Husky) {
    'use strict';

    var fakeServer = sinon.fakeServer.create(),
        app = Husky({ debug: { enable: true }}),
        _ = app.sandbox.util._;

    fakeServer.respondWith('GET', '/navigation', [200, { 'Content-Type': 'application/json' },
        '{"title":"Root","hasSub":true,"id":"5242c58c3a494","sub":{"items":[{"title":"Audits","icon":"check","action":"audit","hasSub":false,"type":"content","id":"5242c58c3a4f2"},{"title":"Profiles","icon":"adjust-alt","action":"profile","hasSub":false,"type":"content","id":"5242c58c3a53e"},{"title":"Portals","icon":"caution","hasSub":true,"id":"52f258bc2e47f","action":"/navigation/portals"},{"title":"Contacts","icon":"contact-book","hasSub":true,"id":"5242c58c3a591","sub":{"items":[{"title":"People","icon":"parents","action":"contacts\/people","hasSub":false,"type":"content","id":"5242c58c3a5f6"},{"title":"Companies","icon":"bank","action":"contacts\/companies","hasSub":false,"type":"content","id":"5242c58c3a64c"}]}},{"title":"Settings","icon":"cogwheels","hasSub":true,"id":"5242c58c3a69b","sub":{"items":[{"title":"Translate","icon":"book-open","action":"settings\/translate","hasSub":false,"type":"content","id":"5242c58c3a6dd"}]}}]}}'
    ]);

    fakeServer.respondWith('GET', '/navigation/portals', [200, { 'Content-Type': 'application/json' },
        '{"header": { "title":"Portals" }, "sub":{"items":[{"title":"Products","icon":"check","id":"products","hasSub":true,"action":"/portals/products"},{"title":"Portal 1","icon":"caution","id":"portal_1","hasSub":false,"action":"/portals/products","type":"content"}]}}'
    ]);

    fakeServer.respondWith('GET', '/portals/products', [200, { 'Content-Type': 'application/json' },
        '{"sub":{"items":[{"title":"Produkt 1","id":"product_1","hasSub":true,"action":"/portals/products/product_1"},{"title":"Produkt 4","id":"product_4","hasSub":false,"type":"content","action":"/portals/products/product_1/product_2/product_3/product_4/content"}]}}'
    ]);

    fakeServer.respondWith('GET', '/portals/products/product_1', [200, { 'Content-Type': 'application/json' },
        '{"sub":{"items":[{"title":"Produkt 2","id":"product_2","hasSub":true,"action":"/portals/products/product_1/product_2"}]}}'
    ]);

    fakeServer.respondWith('GET', '/portals/products/product_1/product_2', [200, { 'Content-Type': 'application/json' },
        '{"sub":{"items":[{"title":"Produkt 3","id":"product_3","hasSub":true,"action":"/portals/products/product_1/product_2/product_3"}]}}'
    ]);

    fakeServer.respondWith('GET', '/portals/products/product_1/product_2/product_3', [200, { 'Content-Type': 'application/json' },
        '{"sub":{"items":[{"title":"Produkt 4","id":"product_4","hasSub":false,"type":"content","action":"/portals/products/product_1/product_2/product_3/product_4/content"}]}}'
    ]);

    app.start().then(function() {
        app.logger.log('Aura started...');

        setTimeout(function() {
            fakeServer.respond();
        }, 100);

        var sizeChanged = function(event) {
            $('#content').css('margin-left', event.data.navWidth + 45);
        }, showColumn = function() {
            setTimeout(function() {
                app.sandbox.emit('navigation.item.column.show', {
                    data: {
                        "displayOption": "content",
                        "header": {
                            "displayOption": "link",
                            "action": "/back"
                        },
                        "sub": {
                            "items": [
                                {
                                    "title": "Details",
                                    "id": "details",
                                    "hasSub": false,
                                    "type": "content",
                                    "action": "/details"
                                },
                                {
                                    "title": "Settings",
                                    "id": "settings",
                                    "hasSub": false,
                                    "type": "content",
                                    "action": "/settings"
                                }
                            ]
                        }
                    }
                });
            }, 10);
        };

        app.sandbox.on('navigation.item.selected', function(event) {
                $('#print').html(event.item.action);

                setTimeout(function() {
                    fakeServer.respond();
                }, 500);
            }
        );

        app.sandbox.on('navigation.item.content.show', function(event) {
            sizeChanged(event);

            if (event.item.action === '/portals/products/product_1/product_2/product_3/product_4/content') {
                showColumn();
            }
        });

        app.sandbox.on('navigation.size.changed', function(event) {
            sizeChanged(event);
        });

        $('#load').on('click', showColumn);
    });

})
;
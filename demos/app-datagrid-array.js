require.config({
    baseUrl: '../'
});

require(['lib/husky'], function(Husky) {

    'use strict';

    var data = [],
        app = Husky({ debug: { enable: true }});

    data[0] = { id: 2, translations: [], locale: 'English', code: 'code 1'};
    data[1] = { id: 4, translations: [], locale: 'Deutsch', code: 'code 2'};

    app.start([
        {
            name: 'datagrid@husky', options: {
            el: '#datagrid',
            pagination: false,
            autoRemoveHandling: false,
            tableHead: [
                {content: 'Content 2', width: "60%"},
                {content: 'Code', width: "20%"},
                {content: 'Remove', width: "10%"}
            ],
            excludeFields: ['id', 'translations'],
            data: {
                items: data
            },
            template: {
                row: [
                    '<tr <% if (!!id) { %> data-id="<%= id %>"<% } %> >',
                        '<td>',
                            '<label>',
                                '<input type="radio" class="custom-radio" name="catalogue-radio">',
                                '<span class="custom-radio-icon"></span>',
                            '</label>',
                        '</td>',
                        '<td>',
                            '<input class="form-element" type="text" id="locale<%= id %>" value="<%= locale %>"/>',
                        '</td>',
                        '<td>',
                            '<input class="form-element" type="text" id="code<%= id %>" value="<%= code %>"/>',
                        '</td>',
                        '<td class="remove-row">',
                            '<span class="icon-remove"></span>',
                        '</td>',
                    '</tr>'].join('')
            }
        }
        }
    ]).then(function() {
        app.logger.log('Aura started...');

        $('#add-row').on('click', function() {
            app.sandbox.emit('data-grid.row.add', { id: "", locale: "", translations: [], code: "" });
        });

        app.sandbox.on('data-grid.row.remove-click', function(event, item) {
            app.logger.log('remove-clicked: ' + item);
            app.logger.log(item);

            if (typeof item === 'number') {
                app.sandbox.emit('data-grid.row.remove', item);
            } else {
                app.sandbox.emit('data-grid.row.remove', event);
            }
        });

        app.sandbox.on('data-grid.item.select', function(item) {
            app.logger.log('Husky.Ui.DataGrid item select: ' + item);
        });

        app.sandbox.on('data-grid.item.deselect', function(item) {
            app.logger.log('Husky.Ui.DataGrid item deselect: ' + item);
        });

        app.sandbox.on('data-grid.item.click', function(item) {
            app.logger.log('Husky.Ui.DataGrid item click: ' + item);
        });

    });
});

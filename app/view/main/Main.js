/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Pruebas.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',
        'Ext.layout.Fit'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        }
    },

    tabBarPosition: 'bottom',

    items: [
        // TODO - Replace the content of this view to suit the needs of your application.
        {
            title: 'Home',
            iconCls: 'x-fa fa-home',
            bind: {
                padding: '30 60',
                html: '<h1>Home</h1>'
            },
        },{
            title: 'Users',
            iconCls: 'x-fa fa-user',
            layout: 'fit',
            items: [{
                xtype: 'userGrid',
                reference: 'usersList'
            }]
        },{
            title: 'Groups',
            iconCls: 'x-fa fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        },{
            title: 'Settings',
            iconCls: 'x-fa fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }
    ]
});

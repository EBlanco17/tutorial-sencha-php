Ext.define('app.view.users.UserGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'userGrid',
    controller: 'user',
    
    requires: [
       'Pruebas.store.Users',
    ],

    title: 'Personal',

    store: {
        type: 'users'
    },
    items:[{
        
        xtype: 'segmentedbutton',
        docked: 'bottom',
        reference: 'buttons',
        forceSelection: true,
        defaults: {
            flex: 1
        },
        items: [ {
            text: '10',
            value: 10
        }, {
            text: '30',
            value: 30
        }, {
            text: '60',
            value: 60
        }, {
            text: '100',
            value: 100
        }],
        listeners: {
            change: 'onAutoPagingChange'
        }
    }],
    columns: [{ 
        text: 'Name',
        dataIndex: 'user_name',
        width: 300,
        cell: {
            userCls: 'bold'
        }
    },{
        text: 'First Names',
        dataIndex: 'firstnames',
        width: 150

    },{
        text: 'Last Names',
        dataIndex: 'lastnames',
        width: 150}
    
    ,{
        text: 'Email',
        dataIndex: 'email',
        width: 230 
    }],

    listeners: {
        select: 'onItemSelected'
    }
});
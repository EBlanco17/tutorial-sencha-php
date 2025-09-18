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
        cell: {
            userCls: 'bold'
        },
        width: 320,
    },
    {
        text: 'First Names',
        dataIndex: 'firstnames',
        width: 150,

    },
    {
        text: 'Last Names',
        dataIndex: 'lastnames',
       width: 150,
    },
    {
        text: 'Email',
        dataIndex: 'email',
        responsiveConfig: {
            'desktop': {
                minWidth: 300
            },
            'phone': {
                minWidth: 40,
                maxWidth: 50
            }
        }
        
    },
    {
        text: 'Mobile Number',
        dataIndex: 'mobilenumber',
        width: 150,
        responsiveConfig: {
            'desktop': {
                minWidth: 150
            },
            'phone': {
                hidden: true
            }
        }
    },
    {
        
        hideable: false,

        cell: {
            tools: {
                approve: {
                    iconCls: 'x-fa fa-edit blue',
                    handler: 'onEditClick',
                },
                decline: {
                    iconCls: 'x-fa fa-trash red',
                    handler: 'onDeleteClick',
                    weight: 1
                }
            }
        }
    }],

    listeners: {
        select: 'onItemSelected'
    }
});
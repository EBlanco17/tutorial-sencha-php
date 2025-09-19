Ext.define('app.view.users.UserGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'userGrid',
    controller: 'user',
    requires: [
       'Pruebas.store.Users',
    //    'Ext.grid.plugin.filterbar.FilterBar'
    ],
    title: 'Personal',
    // plugins: {
    //         gridfilterbar: true
    //     },
rowNumbers: true,
    store: {
        type: 'users'
    },
    items:[{
        xtype: 'textfield',
        reference: 'globalSearch',
        placeholder: 'Buscar...',
        margin: 10,
        docked: 'top',
        listeners: {
            change: 'onGlobalSearch'
        }
    },{
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
            text: 'Todo',
            value: 1000
        }],
        listeners: {
            change: 'onAutoPagingChange'
        }
    }],
    columns: [{ 
        text: 'Name',
        dataIndex: 'user_name',
        // filterType: 'string',
        cell: {
            userCls: 'bold'
        },
        width: 320,
    },
    {
        text: 'First Names',
        dataIndex: 'firstnames',
        // filterType: 'string',
        width: 150,

    },
    {
        text: 'Last Names',
        dataIndex: 'lastnames',
        // filterType: 'string',
       width: 150,
    },
    {
        text: 'Email',
        dataIndex: 'email',
        // filterType: 'string',
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
        filterType: 'string',
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
                    tooltip: 'Editar',
                },
                decline: {
                    iconCls: 'x-fa fa-trash red',
                    handler: 'onDeleteClick',
                    tooltip: 'Eliminar'
                }
            }
        }
    }],

    listeners: {
        select: 'onItemSelected'
    }
});
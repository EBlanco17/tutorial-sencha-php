Ext.define('Pruebas.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.users',

    model: 'Pruebas.model.Users',
        
    pageSize: 10,
    proxy: {
        type: 'ajax',
        url: 'api/controller/FacturacionUserSelectedController.php', // Ruta al archivo PHP
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        pageParam: 'page',
        limitParam: 'limit'
    },
    autoLoad: true,
});

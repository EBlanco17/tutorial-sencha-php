Ext.define('app.view.users.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',


    onItemSelected: function(grid, record) {
        Ext.Msg.alert('Selected', record[0].data.user_name); 
    },
    
    onAutoPagingChange: function (segmented, value) {
        var grid = this.getView(),
            store = grid.getStore();

        store.setAutoLoad(true);
        store.setPageSize(value);

        store.loadPage(1);
        grid.refresh();
        
    },

    onEditClick: function (grid, info) {
        // Crea el panel de edición
        var panel = Ext.create('app.view.Edit');
        panel.getViewModel().set('user', info.record.data);

        // Muestra el panel en un dialog
        Ext.Viewport.add({
            xtype: 'dialog',
            layout: 'fit',
            width: 650,
            height: 600,
            items: [panel]
        }).show();

    },

    onDeleteClick: function (grid, info) {
        let userName = info.record.get('user_name');
        Ext.Msg.confirm('Eliminar', '¿Estás seguro de que deseas eliminar este usuario? ' + userName, function (choice) {
            if (choice === 'yes') {
                Ext.Msg.alert('Eliminado', userName + ' ha sido eliminado.');
            }
        });
    }
});
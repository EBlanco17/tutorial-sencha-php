Ext.define('app.view.users.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',


    onItemSelected: function (sender, record) {
       
    },
    
    onAutoPagingChange: function (segmented, value) {
        var grid = this.getView(),
            store = grid.getStore();

        store.setAutoLoad(true);
        store.setPageSize(value);

        store.loadPage(1);
        grid.refresh();
        
    }
});
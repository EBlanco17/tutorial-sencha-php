Ext.define('app.view.editUser.EditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.edituser',

    onSaveClick: function (btn) {
        var dialog = btn.up('dialog');
        var formPanel = dialog.down('edituserpanel');
        var values = formPanel.getValues();

        Ext.Ajax.request({
            url:'api/controller/FacturacionUserSelectedController.php',
            method: 'PUT',
            jsonData: values,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response) {
                Ext.toast('Usuario actualizado correctamente.');

                var userGrid = Ext.ComponentQuery.query('userGrid')[0];
                if (userGrid) {
                    userGrid.getStore().reload();
                }
                dialog.destroy();
            },
            failure: function(response) {
                Ext.toast('Error al actualizar el usuario.');
            }
        });
        


        dialog.destroy();
    },

    onCancelClick: function (btn) {
        var dialog = btn.up('dialog');
        dialog.destroy();
    }
});
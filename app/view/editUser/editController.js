Ext.define('app.view.editUser.EditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.edituser',

    onSaveClick: function(btn) {
    var dialog = btn.up('dialog');
    var formPanel = dialog.down('edituserpanel');
    var datos = formPanel.getViewModel().get('user');

    Ext.Ajax.request({
        url: 'api/controller/FacturacionUserSelectedController.php',
        method: 'PUT',
        jsonData: datos,
        success: function(response) {
            var resp = Ext.decode(response.responseText);
            if (resp && resp.code === 200) {
                Ext.toast('Usuario actualizado correctamente', 2000);
                var userGrid = Ext.ComponentQuery.query('userGrid')[0];
                if (userGrid) {
                    userGrid.getStore().reload();
                }
                dialog.destroy();
                
            } else {
                Ext.Msg.alert('Error', resp.message || 'No se pudo actualizar');
            }
        },
        failure: function(response) {
            Ext.Msg.alert('Error', 'Error de comunicación con el servidor');
        }
    });
},

    onCancelClick: function (btn) {
        var dialog = btn.up('dialog');
        dialog.destroy();
    }
});
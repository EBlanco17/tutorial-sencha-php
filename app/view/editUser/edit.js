Ext.define('app.view.edit', {
    extend: 'Ext.form.Panel',
    xtype: 'edituserpanel',
    controller: 'edituser',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.TextArea'
    ],

    bodyPadding: 40,
    scrollable: 'y',
    title: 'Editar Usuario',
    autoSize: true,

    defaults: {
        labelAlign: 'placeholder',
        xtype: 'textfield'
    },

    items: [{
    label: 'Usuario',
    name: 'user_name',
    readOnly: true,
    enabled: false,
    editable: false
}, {
    label: 'Nombres',
    name: 'firstnames'
}, {
    label: 'Apellidos',
    name: 'lastnames'
}, {
    label: 'Email',
    name: 'email'
},
{
    label: 'Celular',
    name: 'mobilenumber'
}],
    buttons: [{
        text: 'Guardar',
        handler: 'onSaveClick'
    }, {
        text: 'Cancelar',
        handler: 'onCancelClick'
    }]

});
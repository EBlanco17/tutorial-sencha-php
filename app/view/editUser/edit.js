Ext.define('app.view.Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'edituserpanel',
    controller: 'edituser',
    viewModel: 'edituser',
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
        bind: '{user.user_name}',
        readOnly: true
    }, {
        label: 'Nombres',
        name: 'firstnames',
        bind: '{user.firstnames}'
    }, {
        label: 'Apellidos',
        name: 'lastnames',
        bind: '{user.lastnames}'
    }, {
        label: 'Email',
        name: 'email',
        bind: '{user.email}'
    }, {
        label: 'Celular',
        name: 'mobilenumber',
        bind: '{user.mobilenumber}'
    }],
    buttons: [{
        text: 'Guardar',
        handler: 'onSaveClick'
    }, {
        text: 'Cancelar',
        handler: 'onCancelClick'
    }]

});
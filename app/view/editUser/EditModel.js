Ext.define('app.view.editUser.EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.edituser',

    data: {
        user: {
            user_name: '',
            firstnames: '',
            lastnames: '',
            email: '',
            mobilenumber: ''
        }
    }
});
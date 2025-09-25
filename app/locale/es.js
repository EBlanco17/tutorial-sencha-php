Ext.define('Pruebas.locale.es', {
    singleton: true,

    translate: function (value) {
        return this.dictionary[value] || value;
    },

    dictionary: {
        'Selected': 'Seleccionado',
        'Eliminar': 'Eliminar',
        'Editar': 'Editar',
        'Name': 'Nombre',
        'Email': 'Correo electrónico',
        'Mobile Number': 'Número de teléfono',
        'First Names': 'Nombres',
        'Last Names': 'Apellidos',
        'User Name': 'Nombre de usuario',
        'Home': 'Inicio',
        'Groups': 'Grupos',
        'Users': 'Usuarios',
        'Settings': 'Configuración',
        'Yes': 'Sí',
        'No': 'No',
    
    }
});
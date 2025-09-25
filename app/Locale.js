Ext.define('Pruebas.Locale', {
    singleton: true,

    requires: [
        'Pruebas.locale.*'
    ],

    translate: function (value) {
        return Pruebas.locale[Ext.manifest.profile] !== undefined 
        ? Pruebas.locale[Ext.manifest.profile].translate(value)
            : value;
    }
});
/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Pruebas.Application',

    name: 'Pruebas',

    requires: [
        // This will automatically load all classes in the Pruebas namespace
        // so that application classes do not need to require each other.
        'Pruebas.*'
    ],

    // The name of the initial view to create.
    mainView: 'Pruebas.view.main.Main'
});

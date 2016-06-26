$(document).ready(function() {
    //basic example
    console.log('ready');
    var target = $('#target1');
    var options = [];
    var alertA = {
        enable: true,
        text: 'alertA',
        callback: function() {
            alert('alertA');
        }
    };
    var alertB = {
        enable: true,
        text: 'alertB',
        callback: function() {
            alert('alertB');
        }
    };
    var disabled = {
        enable: false,
        text: 'disabled text',
        callback: function() {
            alert('not gonna work');
        }
    };

    options.push(alertA);
    options.push(alertB);
    options.push(disabled);

    ContextMenu.bindContextMenu(target, options);

    //class name example
    target = $('#target2');
    options = [];
    alertA = {
        enable: true,
        text: 'alertA custom',
        callback: function() {
            alert('alertA custom');
        }
    };
    alertB = {
        enable: true,
        text: 'alertB custom',
        callback: function() {
            alert('alertB custom');
        }
    };
    disabled = {
        enable: false,
        text: 'disabled text custom',
        callback: function() {
            alert('not gonna work');
        }
    };

    options.push(alertA);
    options.push(alertB);
    options.push(disabled);

    ContextMenu.bindContextMenu(target, options, 'custom-class-name');
});


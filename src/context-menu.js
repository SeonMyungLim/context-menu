'use strict';


(function() {
    var ctx = {};
    ctx.createDom = function() {
        var that = this;
        this.dom = $('<ul>', {
            id: 'contextmenu'
        });

        $('body').append(this.dom);

        disableContextMenu(this.dom);

        $(document).mousedown(function(e) {
            that.hide();
        });
    };

    ctx.show = function(options, className, e) {
        if (!this.dom) this.createDom();
        if (options.length === 0) return;
        var that = this;
        if (className !== undefined) {
            this._className = className;
            this.dom.addClass(className);
        }

        var parent = this.dom;

        parent.empty();

        for (var i=0, len=options.length; i<len; i++) {
            var option = options[i];
            var text = option.text;
            var enable = option.enable !== false;

            var elem = $('<li>', {
                class: enable ? 'menuAble' : 'menuDisable'
            });

            parent.append(elem);

            elem.text(text);

            if (enable && option.callback) {
                (function(elem, cb) {
                    elem.mousedown(function(e){
                        e.preventDefault();
                        that.hide();
                        cb(e);
                    });
                })(elem, option.callback);
            }
        }

        parent.css('display', 'block');
        this.position(e);
    };

    ctx.position = function(e) {
        var pos = { x: e.clientX, y: e.clientY };
        var dom = this.dom;
        dom.css({
            left: 0,
            top: 0
        });
        var width = dom.width();
        var height = dom.height();

        var win = $(window);
        var winWidth = win.width();
        var winHeight = win.height();

        if (pos.x + width > winWidth)
            pos.x -= width + 3;
        if (pos.y + height > winHeight)
            pos.y -= height;

        dom.css({
            left: pos.x,
            top: pos.y
        });

    };

    ctx.hide = function() {
        this.dom.empty();
        this.dom.css('display', 'none');
        if (this._className) {
            this.dom.removeClass(this._className);
            delete this._className;
        }
    };

    ctx.bindContextMenu = function(elem, options, className) {
        var that = this;
        elem = $(elem);
        disableContextMenu(elem);
        elem.contextmenu(function(e) {
            that.show(options, className, e);
        });
    };

    function disableContextMenu(dom) {
        dom.contextmenu(function(e) {
            e.preventDefault();
        });
    }

    window.ContextMenu = ctx;
})();


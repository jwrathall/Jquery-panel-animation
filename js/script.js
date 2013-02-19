
        function panel() {
            this.height = '';
            this.width = '';
            this.position = '';
            this.clear = function () {
                this.height = '';
                this.width = '';
                this.position = '';
            };
        }

        var activePanel = new panel();

        $(function () {
		
            $('.topic-detail').hide();

            var panel = {
                'position': '0',
                'height': '0',
                'width': '0'
            };

            $('.topic-box')
                .hover(function (ev) {
                    _mouseEnter($(this));
                }, function (ev) {
                    _mouseLeave($(this));
                });
                /*A big thank you to http://wearelanding.com/ 
                  I sifted through their code a ton 'cause I really liked the effect.
                */
            var expand = function () {
                var _this = $(this);
				console.log(_this)
                var _parent = _this.parent();

                activePanel.clear();
                activePanel.height = _this.height();
                activePanel.width = _this.width();
                activePanel.position = _this.position();

                _parent.css('overflow', 'hidden');
                $('.turnon', _this).hide();
                _this
                    .addClass('maximize')
                    .unbind('click')
                    .css({ 'top': activePanel.position.top, 'left': activePanel.position.left })
                    .stop()
                    .css('cursor', 'auto')
                    .animate({
                        height: 370,
                        width: 760,
                        top: 20,
                        left: 30,
                        backgroundColor: "#d7d7d7"
                    }, 1000, "easeOutQuint", function () {
                        _this.find('.turnoff').animate({
                            marginTop: '-10px'
                        }, 200);
                        _this.find('.topic-detail').show();
                    });

                return false;
            };

            $('.topic-box').not('.maximize').bind('click', expand);

            $('.turnoff').hover(function () {
                $(this).css('cursor', 'pointer').find('.btn-close').animate({ backgroundColor: "#6eb4cd" });

            }, function () {
                $(this).css('cursor', 'auto').find('.btn-close').animate({ backgroundColor: "#3299BB" }); ;
            });

            $('.turnoff').click(function () {
                var _parent = $(this).parent();
                _parent
                    .animate({
                        height: activePanel.height,
                        width: activePanel.width,
                        top: activePanel.position.top,
                        left: activePanel.position.left,
                        backgroundColor: "#BCBCBC"
                    }, 1000, "easeInOutBack", function () {
                        if (_parent.is('.maximize')) {
                            _parent.removeClass('maximize');
                        }
                        $('.turnon', _parent).show();
                    })
                    .bind('click', expand)
                    .find('.topic-detail').hide();
                $(this).animate({
                    marginTop: '-47px'
                }, 200);
                return false;
            });

            function _mouseEnter(_this) {
                _this.css('cursor', 'pointer');
                _this.animate({
                    backgroundColor: "#d7d7d7"
                });
            }

            function _mouseLeave(_this) {
                if (!(_this.is('.maximize'))) {
                    _this.css('cursor', 'auto');
                    _this.animate({
                        backgroundColor: "#BCBCBC"
                    });
                }
            }
        });

(function(ionic) {

  // Get transform origin poly
  var d = document.createElement('div');
  var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
              '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'];

  var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
  for(var i = 0; i < transformKeys.length; i++) {
    if(d.style[transformKeys[i]] !== undefined) {
      TRANSFORM_ORIGIN = transformKeys[i];
      break;
    }
  }

  var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
              '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'];
  var TRANSITION = 'webkitTransition';
  for(var i = 0; i < transitionKeys.length; i++) {
    if(d.style[transitionKeys[i]] !== undefined) {
      TRANSITION = transitionKeys[i];
      break;
    }
  }

  var SwipeableCardView = ionic.views.View.inherit({
    /**
     * Initialize a card with the given options.
     */
    initialize: function(opts) {
      opts = ionic.extend({
      }, opts);

      ionic.extend(this, opts);

      this.el = opts.el;

      this.parentWidth = this.el.parentNode.offsetWidth;
      this.width = this.el.offsetWidth;

      this.startX = this.startY = this.x = this.y = 0;

      this.bindEvents();
    },

    /**
     * Set the X position of the card.
     */
    setX: function(x) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px,' + this.y + 'px, 0)';
      this.x = x;
      this.startX = x;
    },

    /**
     * Set the Y position of the card.
     */
    setY: function(y) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px,' + y + 'px, 0)';
      this.y = y;
      this.startY = y;
    },

    /**
     * Set the Z-Index of the card
     */
    setZIndex: function(index) {
      this.el.style.zIndex = index;
    },

    /**
     * Set the width of the card
     */
    setWidth: function(width) {
      this.el.style.width = width + 'px';
    },

    /**
     * Set the height of the card
     */
    setHeight: function(height) {
      this.el.style.height = height + 'px';
    },

    /**
     * Set the duration to run the pop-in animation
     */
    setPopInDuration: function(duration) {
      this.cardPopInDuration = duration;
    },

    /**
     * Transition in the card with the given animation class
     */
    transitionIn: function(animationClass) {
      var self = this;

      this.el.classList.add(animationClass + '-start');
      this.el.classList.add(animationClass);
      this.el.style.display = 'block';
      setTimeout(function() {
        self.el.classList.remove(animationClass + '-start');
      }, 100);
    },

    /**
     * Disable transitions on the card (for when dragging)
     */
    disableTransition: function(animationClass) {
      this.el.classList.remove(animationClass);
    },

    /**
     * Swipe a card out programatically
     */
    swipe: function() {
      this.transitionOut();
    },

    /**
     * Snap the card back to its original position
     */
    snapBack: function() {
      this.onSnapBack(this.x, this.y, this.rotationAngle);
    },

    isUnderThreshold: function() {
      return Math.abs(this.thresholdAmount) < this.minThreshold;
    },

    /**
     * Animation to fly the card away
    */
    animateFlyAway: function(e) {

      // is animation triggered by drag or click?
      var draggable = (e !== undefined);

      var self = this;

      self.updateIndex();
      self.onTransitionOut(self.thresholdAmount);

      // defaults for animation triggered by click
      var defaults = {
        thresholdAmount: 0,
        rotationAngle: -0.5,
        deltaX: -400,
        deltaY: 400,
        velocityX: 0.1,
        targetX: -1000,
        targetY: -1000,
        duration: 0.4
      }

      this.rotationAngle = this.rotationAngle || defaults.rotationAngle;
      this.thresholdAmount = this.thresholdAmount || defaults.thresholdAmount;

      var deltaX = (draggable) ? e.gesture.deltaX : defaults.deltaX;
      var deltaY = (draggable) ? e.gesture.deltaY : defaults.deltaY;

      var angle = Math.atan(deltaX / deltaY);

      var targetX;
      if(draggable) {
        targetX = (this.x > 0) ? (this.parentWidth / 2) + (this.width) : - (this.parentWidth + this.width);
      } else {
        targetX = defaults.targetX;
      }

      // Target Y is just the "opposite" side of the triangle of targetX as the adjacent edge (sohcahtoa yo)
      var targetY;
      if(draggable) {
        targetY = targetX / Math.tan(angle);
      } else {
        targetY = defaults.targetY;
      }

      // Fly out
      var rotateTo = this.rotationAngle;

      var velocityX = (draggable) ? e.gesture.velocityX : defaults.velocityX;

      var duration = (draggable) ? (0.3 - Math.min(Math.max(Math.abs(velocityX)/10, 0.05), 0.2)) : defaults.duration;

      ionic.requestAnimationFrame(function() {
        self.el.style.transform = self.el.style.webkitTransform = 'translate3d(' + targetX + 'px, ' + targetY + 'px,0) rotate(' + self.rotationAngle + 'rad)';
        self.el.style.transition = self.el.style.webkitTransition = 'all ' + duration + 's ease-in-out';
      });

      // Trigger destroy after card has swiped out
      setTimeout(function() {
        self.onDestroy && self.onDestroy();
      }, duration * 1000);

    },

    /**
     * Fly the card out or animate back into resting position.
    */
    transitionOut: function(e) {
      var self = this;

      if(this.isUnderThreshold()) {
        self.onSnapBack(this.x, this.y, this.rotationAngle);
        return;
      }

      self.animateFlyAway(e);

    },

    /**
     * Bind drag events on the card.
     */
    bindEvents: function() {
      var self = this;
      ionic.onGesture('dragstart', function(e) {
        ionic.requestAnimationFrame(function() { self._doDragStart(e) });
      }, this.el);

      ionic.onGesture('drag', function(e) {
        ionic.requestAnimationFrame(function() { self._doDrag(e) });
        // Indicate we want to stop parents from using this
        e.gesture.srcEvent.preventDefault();
      }, this.el);

      ionic.onGesture('dragend', function(e) {
        ionic.requestAnimationFrame(function() { self._doDragEnd(e) });
      }, this.el);
    },

    // Rotate anchored to the left of the screen
    _transformOriginLeft: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'left center';
      this.rotationDirection = 1;
    },

    _transformOriginRight: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'right center';
      this.rotationDirection = -1;
    },

    _doDragStart: function(e) {
      e.preventDefault();
      if(this.el.currentIndex !== 0) return;
      var width = this.el.offsetWidth;
      var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
      var distance = Math.abs(point - e.gesture.touches[0].pageX);// - window.innerWidth/2);

      this.touchDistance = distance * 10;
    },

    _doDrag: function(e) {
      e.preventDefault();

      if(this.el.currentIndex !== 0) return;
      if(this.drag === 'false') return;

      var o = e.gesture.deltaX / -1000;

      this.rotationAngle = Math.atan(o);

      this.x = this.startX + (e.gesture.deltaX * 0.8);
      this.y = this.startY + (e.gesture.deltaY * 0.8);

      this.el.style.transform = this.el.style.webkitTransform = 'translate3d(' + this.x + 'px, ' + this.y  + 'px, 0) rotate(' + (this.rotationAngle || 0) + 'rad)';

      this.thresholdAmount = (this.x / (this.parentWidth/2));

      var self = this;
      setTimeout(function() {
        self.onPartialSwipe(self.thresholdAmount);
      });
    },
    _doDragEnd: function(e) {
      if(this.el.currentIndex !== 0) return;
      this.transitionOut(e);
    }
  });


  angular.module('ionic.contrib.ui.tinderCards2', ['ionic'])

  .directive('tdCard', ['$timeout', function($timeout) {
    /**
     * A simple non-linear fade function for the text on each card
     */
    var fadeFn = function(t) {
      // Speed up time to ramp up quickly
      t = Math.min(1, t * 3);

      // This is a simple cubic bezier curve.
      // http://cubic-bezier.com/#.11,.67,.41,.99
      var c1 = 0.11,
          c2 = 0.67,
          c3 = 0.41,
          c4 = 0.99;

      return Math.pow((1 - t), 3)*c1 + 3*Math.pow((1 -  t), 2)*t*c2 + 3*(1 - t)*t*t*c3 + Math.pow(t, 3)*c4;
    };

    return {
      restrict: 'E',
      template: '<div class="td-card" ng-transclude></div>',
      require: '^tdCards',
      transclude: true,
      scope: {
        drag: '@',
        minThreshold: '@',
        beforeShow: '&',
        onSwipeLeft: '&',
        onSwipeRight: '&',
        onTransitionLeft: '&',
        onTransitionRight: '&',
        onTransitionOut: '&',
        onPartialSwipe: '&',
        onSnapBack: '&',
        onDestroy: '&'
      },
      controller: ['$scope', '$element', function($scope, $element) {
        // Emits event 'removeCard' which should have a listener in a parent scope
        $scope.$parent.onClickTransitionOut = function(card) {
          var element = $scope.$parent.swipeCard;
          element.onClickTransitionOut();
          $scope.$emit('removeCard', element, card);
        }

      }],
      compile: function(element, attr) {
        return function($scope, $element, $attr, swipeCards) {
          var el = $element[0];
          var leftText = el.querySelector('.no-text');
          var rightText = el.querySelector('.yes-text');

          // Force hardware acceleration for animation - better performance on first touch
          el.style.transform = el.style.webkitTransform = 'translate3d(0px, 0px, 0px)';

          // Instantiate our card view
          var swipeableCard = new SwipeableCardView({
            el: el,
            leftText: leftText,
            rightText: rightText,
            drag: $scope.drag,
            minThreshold: $scope.minThreshold || 0.4,
            updateIndex: function() {
              swipeCards.updateIndex();
            },
            beforeShow: function() {
              $timeout(function() {
                $scope.beforeShow();
              })
            },
            onPartialSwipe: function(amt) {
              swipeCards.partial(amt);
              var self = this;
              $timeout(function() {
                if (amt < 0) {
                  if (self.leftText) self.leftText.style.opacity = fadeFn(-amt);
                  if (self.rightText) self.rightText.style.opacity = 0;
                } else {
                  if (self.leftText) self.leftText.style.opacity = 0;
                  if (self.rightText) self.rightText.style.opacity = fadeFn(amt);
                }
                $scope.onPartialSwipe({amt: amt});
              });
            },
            onSwipeRight: function() {
              $timeout(function() {
                $scope.onSwipeRight();
              });
            },
            onSwipeLeft: function() {
              $timeout(function() {
                $scope.onSwipeLeft();
              });
            },
            onTransitionRight: function() {
              $timeout(function() {
                $scope.onTransitionRight();
              });
            },
            onTransitionLeft: function() {
              $timeout(function() {
                $scope.onTransitionLeft();
              });
            },
            onTransitionOut: function(amt) {
              swipeCards.snapFirstCard();
              if (amt < 0) {
                swipeableCard.onTransitionLeft();
              } else {
                swipeableCard.onTransitionRight();
              }
              $timeout(function() {
                $scope.onTransitionOut({amt: amt});
              });
            },
            onClickTransitionOut: function() {
              var self = this;
              self.animateFlyAway();

              swipeCards.partial(1);
            },
            onDestroy: function() {
              $timeout(function() {
                $scope.onDestroy();
              });
            },
            onSnapBack: function(startX, startY, startRotation) {
              var leftText = el.querySelector('.yes-text');
              var rightText = el.querySelector('.no-text');

              var animation = collide.animation({
                // 'linear|ease|ease-in|ease-out|ease-in-out|cubic-bezer(x1,y1,x2,y2)',
                // or function(t, duration),
                // or a dynamics configuration (see below)
                duration: 500,
                percent: 0,
                reverse: false
              })

              .easing({
                type: 'spring',
                frequency: 15,
                friction: 250,
                initialForce: false
              })

              .on('step', function(v) {
                //Have the element spring over 400px
                el.style.transform = el.style.webkitTransform = 'translate3d(' + (startX - startX*v) + 'px, ' + (startY - startY*v) + 'px, 0) rotate(' + (startRotation - startRotation*v) + 'rad)';
                if (rightText) rightText.style.opacity = 0;
                if (leftText) leftText.style.opacity = 0;
              })
              .start();

              $timeout(function() {
                $scope.onSnapBack();
              });

            },
          });

          $scope.$parent.swipeCard = swipeableCard;

          swipeableCard.beforeShow && swipeableCard.beforeShow();

        }
      }
    }
  }])

  .directive('tdCards', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'E',
      template: '<div class="td-cards" ng-transclude></div>',
      transclude: true,
      scope: {},
      controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
        var cards;

        var existingCards, card;

        var i, j;

        var sortCards = function() {

          existingCards = $element[0].querySelectorAll('td-card');

          for(i = 0; i < existingCards.length; i++) {

            card = existingCards[i];
            card.currentIndex = i;

            if(!card) continue;

            if(i > 0) {

              (function(j) {
                $timeout(function() {
                  var top = (j * 25);
                  var scale = Math.max(0, (1 - (j / 10)));
                  var animation = collide.animation({
                    duration: 800,
                    percent: 0,
                    reverse: false
                  })

                  .easing({
                    type: 'spring',
                    frequency: 5,
                    friction: 250,
                    initialForce: false
                  })

                  .on('step', function(v) {
                    existingCards[j].style.transform = existingCards[j].style.webkitTransform = 'translate3d(0, ' + top*v + 'px, 0) scale('+ scale*v +')';
                  })
                  .start();
                }, 100 * j);
              })(i);

            }
            card.style.zIndex = (existingCards.length - i);
          }
        };

        $timeout(function() {
          sortCards();
        });

        var bringCardUp = function(card, amt, max, i) {
          var position, newTop;
          position = card.style.transform || card.style.webkitTransform;
          newTop = Math.max(max - 25, Math.min(max, max - (max * Math.abs(amt))));
          newScale = (1 - (Math.max(i - 1, Math.min(i, i - (i * Math.abs(amt)))) / 10));
          card.style.transform = card.style.webkitTransform = 'translate3d(0, ' + newTop + 'px, 0) scale('+ newScale+')';
        };

        this.partial = function(amt) {
          cards = $element[0].querySelectorAll('td-card');

          var max = Math.min(cards.length, 10);
          for(var i = 1; i < cards.length; i++){
            bringCardUp(cards[i], amt, 25 * i, i);
          }
        };

        this.snapFirstCard = function() {
          card = $element[0].querySelectorAll('td-card')[1];
          bringCardUp(card, 0, 0, 0);
        };

        this.updateIndex = function() {
          cards = $element[0].querySelectorAll('td-card');
          for(var i = 1; i < cards.length; i++){
            cards[i].currentIndex -= 1;
          }
        }

      }]
    }
  }])

  .factory('TDCardDelegate', ['$rootScope', function($rootScope) {
    return {
      popCard: function($scope, isAnimated) {
        $rootScope.$emit('tdCard.pop', isAnimated);
      },
      getSwipeableCard: function($scope) {
        return $scope.swipeCard;
      }
    }
  }]);

})(window.ionic);
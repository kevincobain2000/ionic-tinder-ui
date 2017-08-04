angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope
                                , $log
                                , $rootScope
                                , $ionicModal
                                , $ionicSlideBoxDelegate
                                , $ionicActionSheet
                                , $ionicPopup
                                , TDCardDelegate
                                , $timeout) {
  $scope.like = like
  $scope.info = info
  $scope.slideHasChanged = slideHasChanged
  $scope.showProfile = showProfile
  $scope.showEditProfile = showEditProfile
  $scope.showSettings = showSettings
  $scope.showActionSheet = showActionSheet
  $scope.slideTo = slideTo
  $scope.deviceHeight  = window.innerHeight;

  $scope.myToggle = true;

  $scope.slideIndex = 0

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     // template: 'Are you sure you want to eat this ice cream?',
     templateUrl:'templates/popups/select-countries.html',
     cssClass: 'animated bounceInUp dark-popup',
     okType: 'button-small button-dark bold',
     okText: 'Save',
     cancelType: 'button-small'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
  };

  // $scope.showConfirm()

  function slideTo(index){
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.$watch(function(scope) { return scope.slideIndex },
    function(newValue, oldValue) {
      switch(newValue) {
        case 0:
        case 2:
          $ionicSlideBoxDelegate.enableSlide(false);
          break;
      }
    }
  );


  var cardTypes = [
    { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
    // { image: 'http://lorempixel.com/500/500/' },
    // { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
    // { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
  ];


  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    discards: [],
    liked: [],
    disliked: []
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
    itsAMatch();
  };

  function like(param){
    $log.info(param)
  }
  function info(){
    $log.info('info popup');
  }

  $scope.onTouch = function(){
    $ionicSlideBoxDelegate.enableSlide(false);
    console.log('touched');
  }
  $scope.onRelease = function(){
    $ionicSlideBoxDelegate.enableSlide(true);
    console.log('released');
  }

  function slideHasChanged(index){
    console.log('slideHasChanged')
    $scope.slideIndex = index
  }

  // showProfile();
  function showProfile() {
    $ionicModal.fromTemplateUrl('templates/modals/profile.html', {
      scope: $scope,
      animation: 'animated _zoomOut',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalProfile = modal;
      $scope.modalProfile.show();
      $scope.hideProfile = function(){
        $scope.modalProfile.hide();
      }
    });
  };

  function itsAMatch() {
    $ionicModal.fromTemplateUrl('templates/modals/match.html', {
      scope: $scope,
      animation: 'animated _fadeOut',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalMatch = modal;
      $scope.modalMatch.show();
      $scope.hideMatch = function(){
        $scope.modalMatch.hide();
      }
    });
  };

    function showActionSheet() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Mute Notifications' }
         , { text: 'Report as Spam' }
         , { text: 'Unmatch Ben' }
         , { text: "Show Ben's Profile" }
       ],
       cancelText: '<span class="color-white">Cancel</span>',
       cssClass: 'tinder-actionsheet',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
       }
     });
  }

  function showEditProfile() {
    $ionicModal.fromTemplateUrl('templates/modals/edit-profile.html', {
      scope: $scope,
      animation: 'slide-in-up',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalSettings = modal;
      $scope.modalSettings.show();
      $scope.hideSettings = function(){
        $scope.modalSettings.hide();
      }
    });
  };


  function showSettings() {
    $ionicModal.fromTemplateUrl('templates/modals/settings.html', {
      scope: $scope,
      animation: 'slide-in-up',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalSettings = modal;
      $scope.modalSettings.show();
      $scope.hideSettings = function(){
        $scope.modalSettings.hide();
      }
    });
  };
})

.controller('MatchCtrl', ['$scope', '$rootScope', '$state',
  '$stateParams', 'MockService', '$ionicActionSheet',
  '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
  function($scope, $rootScope, $state, $stateParams, MockService,
    $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

    // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://ionicframework.com/img/docs/venkman.jpg',
      username: 'Venkman'
    }

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      username: 'Marty'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      console.log('UserMessages $ionicView.enter');

      getMessages();

      $timeout(function() {
        // footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        // scroller = document.body.querySelector('#userMessagesView .scroll-content');
        // txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function() {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      });
    }


    $scope.$watch('input.message', function(newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();

      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

      //});
    };

    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
    }

    $scope.onMessageHold = function(e, itemIndex, message) {
      console.log('onMessageHold');
      console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [{
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }],
        buttonClicked: function(index) {
          switch (index) {
            case 0: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
            case 1: // Delete
              // no server side secrets here :~)
              $scope.messages.splice(itemIndex, 1);
              $timeout(function() {
                viewScroll.resize();
              }, 0);

              break;
          }

          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function(msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };

    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function(e, ta) {
      console.log('taResize');
      if (!ta) return;

      var taHeight = ta[0].offsetHeight;
      console.log('taHeight: ' + taHeight);

      if (!footerBar) return;

      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px';
    });

}])

// services
.factory('MockService', ['$http', '$q',
  function($http, $q) {
    var me = {};

    me.getUserMessages = function(d) {
      /*
      var endpoint =
        'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
      return $http.jsonp(endpoint).then(function(response) {
        return response.data;
      }, function(err) {
        console.log('get user messages error, err: ' + JSON.stringify(
          err, null, 2));
      });
      */
      var deferred = $q.defer();

         setTimeout(function() {
        deferred.resolve(getMockMessages());
        }, 1500);

      return deferred.promise;
    };

    me.getMockMessage = function() {
      return {
        userId: '534b8e5aaa5e7afc1b23e69b',
        date: new Date(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      };
    }

    return me;
  }
])


// Following are untouched

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

function getMockMessages() {
  return {"messages":[{"_id":"535d625f898df4e80e2a125e","text":"Ionic has changed the game for hybrid app development.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-04-27T20:02:39.082Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"535f13ffee3b2a68112b9fc0","text":"I like Ionic better than ice cream!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-04-29T02:52:47.706Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"546a5843fd4c5d581efa263a","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-17T20:19:15.289Z","read":true,"readDate":"2014-12-01T06:27:38.328Z"},{"_id":"54764399ab43d1d4113abfd1","text":"Am I dreaming?","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-26T21:18:17.591Z","read":true,"readDate":"2014-12-01T06:27:38.337Z"},{"_id":"547643aeab43d1d4113abfd2","text":"Is this magic?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-26T21:18:38.549Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"547815dbab43d1d4113abfef","text":"Gee wiz, this is something special.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:27:40.001Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781c69ab43d1d4113abff0","text":"I think I like Ionic more than I like ice cream!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T06:55:37.350Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Yea, it's pretty sweet","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"5478df86ab43d1d4113abff4","text":"Wow, this is really something huh?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T20:48:06.572Z","read":true,"readDate":"2014-12-01T06:27:38.339Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Create amazing apps - ionicframework.com","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-29T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"}],"unread":0};
}

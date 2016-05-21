angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope
                                , $log
                                , $rootScope
                                , $ionicModal
                                , $ionicSlideBoxDelegate
                                , $ionicActionSheet
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

  $scope.myToggle = true;

  $scope.slideIndex = 1


  function slideTo(index){
    $ionicSlideBoxDelegate.slide(index);
  }

  var cardTypes = [
    { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
    { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' },
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

  $timeout(function(){
    // $scope.cards = [1]
  }, 3000)

  function showProfile() {
    $ionicModal.fromTemplateUrl('templates/modals/profile.html', {
      scope: $scope,
      animation: 'animated bounceInUp',
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
      animation: 'animated bounceInUp',
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
});

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope
                                , $log
                                , $rootScope
                                , $ionicModal
                                , $ionicSlideBoxDelegate
                                , $ionicActionSheet
                                , $timeout) {
  $scope.like = like
  $scope.info = info
  $scope.slideHasChanged = slideHasChanged
  $scope.showProfile = showProfile
  $scope.showEditProfile = showEditProfile
  $scope.showSettings = showSettings
  $scope.showActionSheet = showActionSheet

  $scope.myToggle = true;

  $scope.slideIndex = 1


  function like(param){
    $log.info(param)
  }
  function info(){
    $log.info('info popup');
  }


  function slideHasChanged(index){
    $scope.slideIndex = index
  }

  $timeout(function(){
    $scope.cards = [1]
  }, 3000)

  function showProfile() {
    $ionicModal.fromTemplateUrl('templates/modals/profile.html', {
      scope: $scope,
      animation: 'animated fadeIn',
      hideDelay:920
    }).then(function(modal) {
      $scope.modalProfile = modal;
      $scope.modalProfile.show();
      $scope.hideProfile = function(){
        $scope.modalProfile.hide();
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

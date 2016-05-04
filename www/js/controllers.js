angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope
                                , $log
                                , $rootScope
                                , $ionicModal
                                , $ionicSlideBoxDelegate
                                , $timeout) {
  $scope.like = like
  $scope.info = info
  $scope.slideHasChanged = slideHasChanged
  $scope.showMyProfile = showMyProfile


  function like(param){
    $log.info(param)
  }
  function info(){
    $log.info('info popup');
  }

  function slideHasChanged(index){
  }

  $timeout(function(){
    $scope.cards = [1]
  }, 1000)

  showMyProfile();
  function showMyProfile() {
    $ionicModal.fromTemplateUrl('templates/modals/my-profile.html', {
      scope: $scope,
      animation: 'animated fadeIn',
      hideDelay:920
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideMyProfile = function(){
        $scope.modal.hide();
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

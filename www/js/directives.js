angular.module('starter.directives', [])
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        console.log('no scroll')
        e.preventDefault();
      });
    }
  }
})
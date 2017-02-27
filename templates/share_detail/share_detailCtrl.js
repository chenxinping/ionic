/**
 * Created by Administrator on 2017/1/22.
 */
myapp.controller("share_detailCtrl", function ($scope,$http,$stateParams) {
    // 准备商品数据
    $scope.books = [];
    var url = "data/share_inset.json";   // 请求的url
    $http.get(url)
        .success(function (response) {
            angular.forEach(response.books, function (restaurant) {
                $scope.books.push(restaurant);
            });
            // 解析参数，查找匹配商品显示
            $scope.book = {};
            angular.forEach($scope.books,function(book){
                if(book.name == $stateParams.name){
                    //console.log($stateParams.text);
                    $scope.book = book;
                    return false;
                }
            });
        });
});
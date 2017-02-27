/**
 * Created by Administrator on 2017/1/22.
 */
myapp.controller("informationCtrl", function ($scope,$http,$stateParams) {
    // 准备商品数据
    $scope.books = [];
    var url = "data/information.json";   // 请求的url
    $http.get(url)
        .success(function (response) {
            angular.forEach(response.infos, function (restaurant) {
                $scope.books.push(restaurant);
            });
            // 解析参数，查找匹配商品显示
            $scope.inn = {};
            angular.forEach($scope.books,function(book){
                if(book.name == $stateParams.name){
                    //console.log($stateParams.name);
                    $scope.inn = book;
                    return false;
                }
            });
        });
});
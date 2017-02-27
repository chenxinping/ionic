
myapp.controller("masterCtrl",function($scope,$http,$ionicScrollDelegate){
    // 创建一些scope变量
    $scope.page = 0;    // 用来保存当前请求的页码
    $scope.total = 1;   // 用来保存总页数
    $scope.infos = [];

    // 加载餐馆的方法
    $scope.getRestaurants = function () {
        $scope.page++;  // 页数++

        var url = "data/information.json";   // 请求的url
        $http.get(url)
            .success(function (response) {
                angular.forEach(response.infos, function (info) {
                    $scope.infos.push(info);
                });

                // 更新总页面数，基于API发送的值
                $scope.total = response.totalPages; // 示例数据中为30页
            })
            .finally(function () {
                // 广播事件，告诉无限滚动组件everything is done
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
    };

    $scope.getRestaurants();    // 加载时，从API加载第一页餐馆数据

    $scope.show=function(){
        if($scope.infos.length>18){
            return true;
        }else {
            return false;
        }
    };
    $scope.top=function(){
        $scope.infos.length=18;
        $ionicScrollDelegate.scrollTop(true);
    };

});
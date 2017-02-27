myapp.controller("shareCtrl",function($scope,$http,$ionicScrollDelegate){
    // 创建一些scope变量
    $scope.page = 0;    // 用来保存当前请求的页码
    $scope.page1 = 0;    // 用来保存当前请求的页码
    $scope.total = 1;   // 用来保存总页数
    $scope.tota2 = 1;   // 用来保存总页数
    $scope.pics1 = [];
    $scope.pics2 = [];

    // 加载餐馆的方法
    $scope.getRestaurants = function () {
        $scope.page++;  // 页数++

        var url = "data/share_pic1.json";   // 请求的url
        $http.get(url)
            .success(function (response) {
                angular.forEach(response.pics1, function (pic) {
                    $scope.pics1.push(pic);
                });

                // 更新总页面数，基于API发送的值
                $scope.total = response.totalPages; // 示例数据中为30页
            })
            .finally(function () {
                // 广播事件，告诉无限滚动组件everything is done
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
    };
    $scope.pics = function () {
        $scope.page1++;  // 页数++

        var url = "data/share_pic2.json";   // 请求的url
        $http.get(url)
            .success(function (response) {
                angular.forEach(response.pics2, function (pic) {
                    $scope.pics2.push(pic);
                });

                // 更新总页面数，基于API发送的值
                $scope.tota2 = response.totalPages; // 示例数据中为30页
            })
            .finally(function () {
                // 广播事件，告诉无限滚动组件everything is done
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
    };
    $scope.getRestaurants();
    $scope.pics();
});
/**
 * Created by Administrator on 2017/1/21.
 */
myapp.controller("mujiCtrl",function($scope,$http,$ionicScrollDelegate){
        //声明一个数组，保存购买的商品项-充当购物车的购物筐
        $scope.cart=[];

        //添加商品到购物车的方法
        $scope.add=function(muji){
            for(var i=0;i<$scope.cart.length;i++){
                var item=$scope.cart[i];
                //判断购物车中是否已经有了该商品
                if(item.product.title==muji.title){
                    //说明购物车中已经有了该商品，将该商品的购买数量+1
                    item.number++;
                    return;     //添加商品过程结束
                }
            }
            //如果代码执行到这里，说明购物车中没有要添加的商品
            //构造一个购买项item，加入到购物筐中
            $scope.cart.push({product:muji,number:1});
            console.log(muji)

        };
        $scope.remove=function(title){
            //遍历购物筐，找到要删除的商品
            for(var i=0;i<$scope.cart.length;i++){
                var item=$scope.cart[i];
                //判断购物车中是否已经有了该商品
                if(item.product.title==title){
                    //说明找到了要删除的商品，将该商品从数组中删除
                    $scope.cart.splice(i,1);
                    return;     //结束
                }
            }
        };
        //获得购物车中索引商品的方法
        $scope.findAll=function(){
            return $scope.cart;

        };

        $scope.cart=$scope.findAll();      //获得购物车中所有购买的商品

        //计算购物车中商品的总数量
        $scope.count=function(){
            var total=0;
            angular.forEach($scope.cart,function(item){
                total+=item.number;     //累加每种商品的购买数量
            });
            return total;
        };
        //计算购物车中商品的总金额
        $scope.money=function(){
            var total=0;
            angular.forEach($scope.cart,function(item){
                total+=item.number*item.product.price;     //累加每种商品的购买金额
            });
            return total;
        };



        // 创建一些scope变量
        $scope.page = 0;    // 用来保存当前请求的页码
        $scope.total = 1;   // 用来保存总页数
        $scope.mujis = [];

        // 加载餐馆的方法
        $scope.getRestaurants = function () {
            $scope.page++;  // 页数++

            var url = "data/product.json";   // 请求的url
            $http.get(url)
                .success(function (response) {
                    angular.forEach(response.mujis, function (restaurant) {
                        $scope.mujis.push(restaurant);
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
            if($scope.mujis.length>10){
                return true;
            }else {
                return false;
            }
        };
        $scope.top=function(){
            $scope.mujis.length=10;
            $ionicScrollDelegate.scrollTop(true);
        };



    });
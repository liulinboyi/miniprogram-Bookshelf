let $navs = {  //作用收集每个页面的实例App；
};
let $router =(path,className)=>{    //每个页面实例都会有个name字段，进行$navs匹配

setTimeout(()=>{
    wx.navigateTo({
      url:path
    });
  },150);

$navs[className].preLoad();   //匹配到新页面的实例，调用preLoad函数，不影响正常跳转。
   
};
export default {
  $navs:$navs,
  $router:$router
};
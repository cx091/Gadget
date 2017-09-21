// 定义组件
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'+
              '<a v-link="{ path: \'/foo/foo1\' }">Go to Foo1</a>'+
              '<a v-link="{ path: \'/foo/foo2\' }">Go to Foo2</a>'+
              '<router-view></router-view>'
})

var Bar = {
    template: '<p>This is bar!</p>'
}


var Foo1 = {
     template: '<p>This is FOO1 {{$route.path}}</p>',
     ready(){
       // console.log(this.$route.path)
       //console.log(this.$route.query)
       // console.log(this.$route.matched)
       console.log(this.$route.auth)
       //$route.router
     }
}

var Foo2 = {
    template: `<p>This is FOO2</p><button @click="go">GOBar</button>`,
    methods:{
      go(){
       this.$route.router.go('/bar')
      }
    }
}

var User = {
    template: `<p>This is User,当前登录用户：{{$route.params.userId}}</p>`
}

// 路由器需要一个根组件。
// 这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({
   data(){
      return {userId:"yangj"}
   }
});

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter({
  // hashbang:false
  //root:'/foo',
  linkActiveClass:'link-active'
})

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
//{ name: 'user', params: { userId: 123 }}
router.map({
    '/foo': {
        component: Foo,
        subRoutes:{
          '/foo1':{
             component: Foo1,
             auth:true 
          },
          '/foo2':{
             component: Foo2
          }
        }
    },
    '/bar': {
        component: Bar
    },
    '/user/:userId':{
       name:'user',
       component: User
    }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
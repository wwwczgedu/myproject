  <template>
      <div id="app">
          <MenuComponent></MenuComponent>
          <HomeComponent></HomeComponent>

      </div>
  </template>

  <script>
      import MenuComponent from './components/MenuComponent.vue'
      import HomeComponent from './components/HomeComponent.vue'
      export default {
          name: 'app',
          data () {
              return {
                  msg: 'index'
              }
          },
          components:{
              MenuComponent,
              HomeComponent

          }
      }
  </script>

  <style>
  #app {
    font-family: "Source Code Pro",Consolas,'HelveticaWeb',Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>

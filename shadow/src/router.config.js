/**
 * Created by Administrator on 2017/4/23 0023.
 */
import GraphicComponent from './components/graphic.vue';
import DetailPage from './components/DetailPage.vue';
import ChapterComponent1 from './components/chapter1.vue';
export default {
    routes: [
        { path: '/', component: GraphicComponent },
        {
            path: '/:color',
            component: ChapterComponent1,
            children:[
                {
                    path: ':item', component: DetailPage
                }
            ]
        },
        { path:'*', redirect:'/'}
    ]
}
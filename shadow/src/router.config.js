/**
 * Created by Administrator on 2017/4/23 0023.
 */
import GraphicComponent from './components/graphic.vue';
import DetailPage from './components/DetailPage.vue';
import ChapterComponent1 from './components/chapter1.vue';
import Resource from './components/resource.vue';
import Book from './components/book.vue';
import Movie from './components/movie.vue';
import BookDetail from './components/bookDetail.vue';
export default {
    routes: [
        { path: '/', component: GraphicComponent },
        {
            path: '/resource',
            component: Resource ,
            children:[
                {
                    path: 'book',
                    component: Book,
                    children:[
                        //
                        {
                            path: 'page/:page',
                            component: BookDetail,
                            children:[
                                {
                                    path: ':bookId',
                                    component: BookDetail
                                }
                            ]
                        }
                        //
                        // {
                        //     path: ':bookId',
                        //     component: BookDetail
                        // }
                    ]
                },
                {
                    path:'movie',
                    component:Movie,
                    children:[
                        //
                        {
                            path: 'page/:page',
                            component: Movie
                        }
                    ]
                }
            ]
        },
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
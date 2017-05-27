<template>
    <nav aria-label="Page navigation" v-if="bookTotal">
        <ul class="pagination">
            <li>
                <router-link :to="bookPage==1?'/resource/'+resourceRoute+'/page/1':'/resource/'+resourceRoute+'/page/'+(+bookPage-1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </router-link>
            </li>
            <li :class="bookPage==1?'active':''"><router-link :to="'/resource/'+resourceRoute+'/page/'+1">1</router-link></li>
            <li v-if="bookPage>4?true:false"><a href="javaScript:;">...</a></li>
            <li :class="bookPage==(bookPage<=4?'2':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-3:bookPage-1)?'active':''"><router-link :to="'/resource/'+resourceRoute+'/page/'+(bookPage<=4?'2':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-3:bookPage-1)">{{bookPage<=4?'2':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-3:bookPage-1}}</router-link></li>
            <li :class="bookPage==(bookPage<=4?'3':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-2:bookPage)?'active':''"><router-link :to="'/resource/'+resourceRoute+'/page/'+(bookPage<=4?'3':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-2:bookPage)">{{bookPage<=4?'3':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-2:bookPage}}</router-link></li>
            <li :class="bookPage==(bookPage<=4?'4':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-1:+bookPage+1)?'active':''"><router-link :to="'/resource/'+resourceRoute+'/page/'+(bookPage<=4?'4':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-1:+bookPage+1)">{{bookPage<=4?'4':bookPage>=Math.ceil(bookTotal/4)-3?Math.ceil(bookTotal/4)-1:+bookPage+1}}</router-link></li>
            <li v-if="bookPage>Math.ceil(bookTotal/4)-4?false:true"><a href="javaScript:;">...</a></li>
            <li :class="bookPage==Math.ceil(bookTotal/4)?'active':''"><router-link :to="'/resource/'+resourceRoute+'/page/'+(Math.ceil(bookTotal/4))">{{Math.ceil(bookTotal/4)}}</router-link></li>
            <li>
                <router-link :to="bookPage==Math.ceil(bookTotal/4)?'/resource/'+resourceRoute+'/page/'+Math.ceil(bookTotal/4):'/resource/'+resourceRoute+'/page/'+(+bookPage+1)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:''
            }
        },
        computed:mapGetters([
            'resourceRoute',
        ]),
        props:{
            bookPage:{
                default: function () {
                    return {
                        bookPage
                    }
                }
            },
            bookTotal:{
                default: function () {
                    return {
                        bookTotal
                    }
                }
            },

        }
    }
</script>
<style>

</style>
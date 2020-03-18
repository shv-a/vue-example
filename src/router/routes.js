import IndexComponent from '@/components/pages/Office/index';
import Video from '@/components/pages/Office/Video/Video';

export default [
    {
        path: '/',
        name: 'index',
        component: IndexComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/video',
        name: 'Video',
        component: Video,
        meta: {
            requiresAuth: true
        }
    },
    // {
    //     path: '*',
    //     component: NotFound
    // }
]

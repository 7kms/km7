import App from './app'
import Main from './main/index'
import Article from './article/index'
import About from './about/index'

const routes = [
    {
        component: App,
        path: '/:category?',
        routes: [
            { 
                path: '/about',
                component: About
            },
            { 
                path: '/:category?',
                exact: true,
                component: Main
            },
            {
                path: '/:category/:id',
                exact: true,
                component: Article
            }
        ]
    }
]

export default routes
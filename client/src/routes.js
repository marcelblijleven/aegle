import Home from './components/Home.vue'
import ServiceCard from './components/ServiceCard.vue'

const routes = [
    { path: '/', component: Home, props: true },
    { 
        name: 'service',
        path: '/services/:id', 
        component: ServiceCard, 
        props: true 
    },
]

export default routes

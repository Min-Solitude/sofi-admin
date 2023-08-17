import React from 'react'
import MainLayout from '../layouts'
import { Route } from '../configs'

const routes: Route[] = [
    {
        path: '/',
        component: React.lazy(() => import('./Home')),
        layout: MainLayout
    },
    {
        path: '/about',
        component: React.lazy(() => import('./About')),
        layout: MainLayout
    },
    {
        path: '/meeting',
        component: React.lazy(() => import('./Meeting')),
        layout: MainLayout
    },
    {
        path: '/meeting/room/:idRoom',
        component: React.lazy(() => import('./Meeting/components/Room')),
        layout: MainLayout
    },
    {
        path: '/auth',
        component: React.lazy(() => import('./Auth')),
        layout: null
    }
]

export default routes

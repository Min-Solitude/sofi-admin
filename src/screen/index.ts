import React from 'react'
import MainLayout from '../layouts'
import { Route } from '../configs'

const routes: Route[] = [
    {
        path: '/',
        component: React.lazy(() => import('./Lofi')),
        layout: MainLayout
    },
    {
        path: '/forum',
        component: React.lazy(() => import('./Home')),
        layout: MainLayout
    },
    {
        path: '/about',
        component: React.lazy(() => import('./About')),
        layout: MainLayout
    },
    {
        path: '/auth',
        component: React.lazy(() => import('./Auth')),
        layout: null
    }
]

export default routes

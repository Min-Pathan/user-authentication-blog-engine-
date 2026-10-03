
import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ContactPage from '../pages/ContactPage'
import AboutPage from '../pages/AboutPage'
import BlogsPage from '../pages/BlogsPage'
import BlogDetailsPage from '../pages/BlogDetailsPage'

import DashboardLayout from "../layouts/DashboardLayout.jsx";

import ProtectedRoute from './ProtectedRoute.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from '../pages/ResetPasswordPage.jsx'

// Dashboard pages are code-split so public visitors only
// download them when they actually open the dashboard.
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage.jsx"));
const MyBlogsPage = lazy(() => import("../pages/dashboard/MyBlogsPage.jsx"));
const CreateBlogPage = lazy(() => import("../pages/dashboard/CreateBlogPage.jsx"));
const EditBlogPage = lazy(() => import("../pages/dashboard/EditBlogPage.jsx"));
const ProfilePage = lazy(() => import('../pages/dashboard/ProfilePage.jsx'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path='/' element={<HomePage />} />
                <Route
                    path="/blogs"
                    element={<BlogsPage />}
                />

                <Route
                    path="/blogs/:id"
                    element={<BlogDetailsPage />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard"
                    element={<DashboardLayout />}
                >
                    <Route
                        index
                        element={<DashboardPage />}
                    />

                    <Route
                        path="my-blogs"
                        element={<MyBlogsPage />}
                    />
                    <Route
                        path="create"
                        element={<CreateBlogPage />}
                    />

                    <Route
                        path="blogs/:id/edit"
                        element={<EditBlogPage />}
                    />
                    <Route
                        path="profile"
                        element={<ProfilePage />}
                    />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes

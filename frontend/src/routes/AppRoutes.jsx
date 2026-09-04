
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

import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import MyBlogsPage from "../pages/dashboard/MyBlogsPage.jsx";

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
                    path="*"
                    element={<NotFoundPage />}
                />
            </Route>
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
            </Route>
        </Routes>
    )
}

export default AppRoutes

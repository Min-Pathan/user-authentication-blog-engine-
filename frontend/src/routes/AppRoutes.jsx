
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ContactPage from '../pages/ContactPage'
import AboutPage from '../pages/AboutPage'
import BlogsPage from '../pages/BlogsPage'

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
        </Routes>
    )
}

export default AppRoutes

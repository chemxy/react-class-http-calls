import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import RootPage from './pages/RootPage';
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
        {
            path: '/',
            element: <RootPage/>,
            errorElement: <ErrorPage/>,
            children: [
                {path: '', element: <EventsPage/>},
                {path: 'events', element: <EventsPage/>},
                {path: 'events/:eventId', element: <EventDetailPage/>},
                {path: 'events/new', element: <NewEventPage/>},
                {path: 'admin', element: <AdminPage/>},
            ],
        },
    ])
;

function App() {
    return <RouterProvider router={router}/>;
}

export default App;

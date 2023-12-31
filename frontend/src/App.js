import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: 'events', element: <EventsPage/>},
            {path: 'events/:eventId', element: <EventDetailPage/>},
            {path: 'events/new', element: <NewEventPage/>}
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;

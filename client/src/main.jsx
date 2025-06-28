import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import routes from './routes.jsx';
import './index.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
	</StrictMode>
);

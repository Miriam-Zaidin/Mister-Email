import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex';
import { AboutUs } from './pages/AboutUs';
import { EmailDetails } from './pages/EmailDetails';
import EmailCompose from './cmps/EmailCompose';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        {/* <Route path="/email" element={<Navigate replace to="/email/:inbox" />} /> */}

                        <Route path="/email/:folder" element={<EmailIndex />}>
                            <Route path="/email/:folder/:emailId" element={<EmailDetails />} />
                        </Route>

                    </Routes>
                </main>
                {/* <AppFooter /> */}
            </section>
        </Router >
    )
}

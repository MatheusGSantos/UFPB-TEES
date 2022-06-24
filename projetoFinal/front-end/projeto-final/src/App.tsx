import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndexer from "./routes";
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => (
    <Router>
        <AppProvider>
            <RoutesIndexer />
        </AppProvider>

        <GlobalStyle />
    </Router>
);

export default App;

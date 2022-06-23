import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndexer from "./routes";
import GlobalStyle from './styles/global';

const App: React.FC = () => (
    <Router>
        <RoutesIndexer />

        <GlobalStyle />
    </Router>
);

export default App;

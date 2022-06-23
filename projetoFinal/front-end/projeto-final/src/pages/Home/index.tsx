import React from "react";
import { Container, Content } from "./styles";

const Home: React.FC = () => {
    return (
        <Container>
            <nav>
                <div>
                    <h3>Authenticated</h3>
                    <div id="status-indicator" />
                </div>
            </nav>
            <Content>
                <div className="section-container">
                    <section>a</section>
                    <section>b</section>
                </div>
                <div className="section-container">
                    <section>c</section>
                    <section>d</section>
                </div>
            </Content>
        </Container>
    );
};

export default Home;

import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Welcome = ({ title }) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">{title}</h1>
          <p className="lead">Mobile Pervasive Group 1 Project</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

Welcome.defaultProps = {
  title: "Welcome!",
};

export default Welcome;

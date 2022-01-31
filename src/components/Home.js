import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Home() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);

  const URL = `https://remotemore-github-api.herokuapp.com/api/github/userinfo/${username}/repos`;

  const fetchRepos = async () => {
    const response = await fetch(URL);
    const reponseData = await response.json();
    setRepos(reponseData);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepos();
  };

  return (
    <Container>
      <Row className="my-5">
        <Col xs={9}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                // value={username}
                type="search"
                placeholder="GitHub Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>

        <Col xs={3}>
          <Button onClick={handleSubmit} variant="dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <h1>{username && ` ${username}'s Repos`}</h1>
        </Col>
      </Row>
      <div className="repo-list-wrapper">
        {repos &&
          repos.map((repo) => (
            <Row
              key={repo.id}
              className="repo-list"
              style={{ borderBottom: "1px solid #404040" }}
            >
              <Col className="py-3">
                <a style={{ textDecoration: "none" }} href={`${repo.html_url}`}>
                  <h2 style={{ fontWeight: "700" }}>{repo.name}</h2>
                </a>
              </Col>
            </Row>
          ))}
      </div>
    </Container>
  );
}

export default Home;

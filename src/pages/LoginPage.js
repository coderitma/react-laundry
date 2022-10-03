
import axios from "axios";
import { useState } from "react"
import { Button, Card, Col, Container, Form, Row, Toast } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


const ToastError = ({message, type}) => {
  const [show, setShow] = useState(true)
  return (
    <Toast show={show} onClose={() => setShow(false)}>
      <Toast.Header>
        <strong className="me-auto">{type}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}


const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = (e) => {
    setIsFailed(false)
    e.preventDefault();
    const payload = { username, password }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.post('http://localhost:3001/user/signin', payload, config)
      .then(response => {
        localStorage.setItem("token", `JWT ${response.data.token}`);
        navigate('/')
      })
      .catch(error => {
        setIsFailed(true)
        setErrorMessage(error.message);
        console.log(error)
      })
  }


  return (
    <>
    { isFailed && <ToastError isFailed={isFailed} message={errorMessage} type={"Error"} /> }
    <Container className="d-flex vh-100">
      
      <Row className="m-auto align-self-center">
        <Col>
          <Card className="shadow">
            <Card.Img variant="top" src="https://picsum.photos/180/100" />
            <Card.Body>
              <Card.Title>Loondry App</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" 
                    placeholder="Masukan username" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder="Masukan password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
    
    
  )
}

export default LoginPage
import React, { useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SideMenu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

        
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container fluid>
            <Row>
              <Col>
                <Navbar.Brand onClick={handleShow} href="#">Loondri App</Navbar.Brand>
              </Col>
            </Row>
          </Container>
        </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Loondri App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h5>Master</h5>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Master Barang</Nav.Link>
            <Nav.Link eventKey="link-1">Master User</Nav.Link>
          </Nav>
          <h5>Transaksi</h5>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/transaksi">Terima Cucian</Nav.Link>
          </Nav>
          <h5>Laporan</h5>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Laporan Transaksi</Nav.Link>
            <Nav.Link eventKey="link-1">Laporan Pelanggan</Nav.Link>
          </Nav>
          <h5>Config</h5>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">My Profile</Nav.Link>
            <Nav.Link eventKey="link-1">About App</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideMenu
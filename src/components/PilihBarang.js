import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Col, Container, Row, Form, Button, Table, Modal } from "react-bootstrap"


const PilihBarang = ({ show, handleClose, getBarang }) => {
  const [daftarBarang, setDaftarBarang] = useState([]);

  useEffect(() => getDaftarBarang(), [])

  const getDaftarBarang = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    }
    
    axios.get('http://localhost:3001/barang', config)
      .then(response => {
        setDaftarBarang(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pilih Barang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* search in here */}
        <Table striped hover>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarBarang.map((barang, index) => (
              <tr key={index}>
                <td>{barang.nama}</td>
                <td>
                  <Button onClick={() => getBarang(barang)} variant="secondary">Pilih</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PilihBarang
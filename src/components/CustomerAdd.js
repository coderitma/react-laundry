import { Card, Form } from "react-bootstrap"

const CustomerAdd = ({ handleTerima, terima }) => {
  return (
    <Card className="mb-4 shadow">
      <Card.Body>
        <Card.Title>Customer</Card.Title>
        <Form.Group className="mb-3">
          <Form.Label>Nama Customer</Form.Label>
          <Form.Control 
            onChange={handleTerima}
            value={terima.namaCustomer}
            name="namaCustomer" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nomor HP</Form.Label>
          <Form.Control
            onChange={handleTerima}
            value={terima.nomorHP}
            name="nomorHP"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control 
            onChange={handleTerima}
            value={terima.alamat}
            name="alamat"
            as={'textarea'} rows={5} />
        </Form.Group>
      </Card.Body>
    </Card>
  )
}


export default CustomerAdd
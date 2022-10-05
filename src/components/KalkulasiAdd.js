import { Card, Form } from "react-bootstrap"

const KalkulasiAdd = ({ handleTerima, terima }) => {
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Kalkulasi</Card.Title>
        <Form.Group className="mb-3">
          <Form.Label>Tanggal terima</Form.Label>
          <Form.Control 
            onChange={handleTerima}
            value={terima.tanggalTerima}
            name="tanggalTerima"
            type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Berat</Form.Label>
          <Form.Control
            onChange={handleTerima}
            value={terima.berat}
            name="berat"
            type="number" />
          <Form.Text>Dalam satuan kilogram (Kg).</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Uang muka</Form.Label>
          <Form.Control
            onChange={handleTerima}
            value={terima.uangMuka}
            name="uangMuka"
            type="number" />
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default KalkulasiAdd
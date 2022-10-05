import { Card, Col, Row, Form, Button } from "react-bootstrap"
import BarangList from "./BarangList"

const BarangAddList = ({
  barang, handleBarang, tambahBarang,
  setShowPilihBarang, handleDaftarBarang, daftarBarang, 
  removeItemBarang, 
}) => {
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Barang</Card.Title>
        <Row className="mt-3">
          <Col>
            <Form.Control 
              onChange={handleBarang}
              value={barang.nama}
              name="nama"
              placeholder="Masukan nama barang" />
          </Col>
          <Col>
            <Form.Control 
              onChange={handleBarang}
              value={barang.jumlah}
              name="jumlah"
              placeholder="Masukan jumlah" />
          </Col>
          <Col>
            <Button onClick={tambahBarang} variant="secondary">Tambah</Button> &nbsp;
            <Button onClick={() => setShowPilihBarang(true)} variant="secondary">Pilih</Button>
          </Col>
        </Row>
        <BarangList 
          daftarBarang={daftarBarang} 
          handleDaftarBarang={handleBarang}
          removeItemBarang={removeItemBarang} />
      </Card.Body>
    </Card>
  )
}

export default BarangAddList
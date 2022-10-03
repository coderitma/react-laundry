import { Card, Col, Container, Row, Form, Button, Table } from "react-bootstrap"


const TransaksiPage = () => {
  return (
    <>
      <Container className="mt-4"> 
        <Row>
          <Col md={4}>
            <Card className="shadow mb-4">
              <Card.Body>
                <Button variant="primary">Simpan</Button>&nbsp;
                <Button variant="danger">Batalkan</Button>
              </Card.Body>
            </Card>
            <Card className="mb-4 shadow">
              <Card.Body>
                <Card.Title>Customer</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Customer</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor HP</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control as={'textarea'} rows={5} />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Kalkulasi</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal terima</Form.Label>
                  <Form.Control  type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Berat</Form.Label>
                  <Form.Control type="number" />
                  <Form.Text>Dalam satuan kilogram (Kg).</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Uang muka</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Barang</Card.Title>
                <Row className="mt-3">
                  <Col>
                    <Form.Control placeholder="Masukan nama barang" />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Masukan jumlah" />
                  </Col>
                  <Col>
                    <Button variant="secondary">Tambah</Button>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Table bordered striped>
                      <thead>
                        <tr>
                          <th>Nama Barang</th>
                          <th>Jumlah Barang</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TransaksiPage
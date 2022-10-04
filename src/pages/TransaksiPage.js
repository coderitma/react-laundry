import { useState } from "react"
import { Card, Col, Container, Row, Form, Button, Table } from "react-bootstrap"


const TransaksiPage = () => {
  const [terima, setTerima] = useState({
    tanggalTerima: "",
    namaCustomer: "",
    alamat: "",
    nomorHP: "",
    uangMuka: 0,
    berat: 0,
  });

  const [barang, setBarang] = useState({
    nama: "",
    jumlah: 0
  })

  const [daftarBarang, setDaftarBarang] = useState([]);


  const handleTerima = (e) => {
    const name = e.target.name 
    const value = e.target.value 
    setTerima((values) => ({...values, [name]: value}))
  }

  const handleBarang = (e) => {
    const name = e.target.name 
    const value = e.target.value 
    setBarang((values) => ({...values, [name]: value}))
  }

  const tambahBarang = (e) => {
    let arr = [...daftarBarang]
    arr.push(barang)
    setDaftarBarang(arr);
    setBarang({
      nama: "",
      jumlah: 0
    })
  }

  const removeItemBarang = (index, e) => {
    let arr = [...daftarBarang]
    arr.splice(index, 1)
    setDaftarBarang(arr);
  }
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
          </Col>
          <Col>
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
                    <Button onClick={tambahBarang} variant="secondary">Tambah</Button>
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
                      <tbody>
                        {daftarBarang.map((brg, index) => (
                          <tr key={index}>
                            <td>{brg.nama}</td>
                            <td>{brg.jumlah}</td>
                            <td>
                              <Button
                                onClick={(e) => removeItemBarang(index, e)} 
                                variant="danger">Hapus</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
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
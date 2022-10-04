import axios from "axios";
import { useState } from "react"
import { Card, Col, Container, Row, Form, Button, Table, Modal } from "react-bootstrap"


const ModalCetak = ({heading, body, status, handleClose, cetakFaktur}) => {
  return <Modal show={status} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{ heading }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ body }</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={cetakFaktur}>
        Cetak Faktur
      </Button>
    </Modal.Footer>
  </Modal>
}

const TransaksiPage = () => {
  const [terima, setTerima] = useState({
    tanggalTerima: "",
    namaCustomer: "",
    alamat: "",
    nomorHP: "",
    uangMuka: 0,
    berat: 0,
    daftarBarang: []
  });

  const [nomorTerima, setNomorTerima] = useState("");
  const [filePDFName, setFilePDFName] = useState("");
  const [statusModal, setStatusModal] = useState(false);

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

  const handleDaftarBarang = (index, e) => {
    const name = e.target.name 
    const value = e.target.value 
    let arr = [...daftarBarang]
    arr[index][name] = value;
    setDaftarBarang(arr);
  }

  const handleKirim = () => {
    let payload = {...terima, ["daftarBarang"]: daftarBarang}
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    }
    
    axios.post('http://localhost:3001/faktur', payload, config)
      .then(response => {
        setNomorTerima(response.data._id);
        setFilePDFName(response.data.tanggalTerima)
        setStatusModal(true);
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const downloadPDF = () => {
    axios({
      url: `http://localhost:3001/faktur/${nomorTerima}/cetak`,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        'Authorization': localStorage.getItem("token"),
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `INVOICE-${filePDFName}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  }
  return (
    <>
      <ModalCetak
        heading={`Cetak Faktur ${nomorTerima}?`}
        body={"Untuk mencetak faktur ke dalam PDF, klik Download PDF"}
        status={statusModal}
        handleClose={() => setStatusModal(!statusModal)}
        cetakFaktur={downloadPDF}
      />
      <Container className="mt-4"> 
        <Row>
          <Col md={4}>
            <Card className="shadow mb-4">
              <Card.Body>
                <Button onClick={handleKirim} variant="primary">Simpan</Button>&nbsp;
                <Button onClick={downloadPDF} variant="danger">Download PDF</Button>

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
                            <td>
                              <Form.Control 
                                onChange={(e) => handleDaftarBarang(index, e)}
                                name="nama"
                                plaintext
                                value={brg.nama} />
                            </td>
                            <td>
                              <Form.Control 
                                onChange={(e) => handleDaftarBarang(index, e)}
                                name="jumlah"
                                plaintext
                                value={brg.jumlah} />
                            </td>
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
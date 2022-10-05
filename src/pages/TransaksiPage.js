import axios from "axios";
import { useState } from "react"
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap"
import CustomerAdd from "../components/CustomerAdd";
import KalkulasiAdd from "../components/KalkulasiAdd";
import ModalCetak from "../components/ModalCetak";
import PilihBarang from "../components/PilihBarang";
import BarangAddList from "../components/BarangAddList";

const defaultTerima = {
  tanggalTerima: "",
  namaCustomer: "",
  alamat: "",
  nomorHP: "",
  uangMuka: 0,
  berat: 0,
  daftarBarang: []
}


const defaultBarang = {
  nama: "",
  jumlah: 0
}

const TransaksiPage = () => {
  const [terima, setTerima] = useState(defaultTerima);

  const [nomorTerima, setNomorTerima] = useState("");
  const [filePDFName, setFilePDFName] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [showPilihBarang, setShowPilihBarang] = useState(false);
  const [isFirstLayout, setIsFirstLayout] = useState(false)

  const [barang, setBarang] = useState(defaultBarang)

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

  const getBarang = (b) => {
    let arr = [...daftarBarang]
    arr.push({nama: b.nama, jumlah: 1})
    setDaftarBarang(arr);
    setBarang(defaultBarang)
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
        handleBatal();
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

  const handleBatal = () => {
    setTerima(defaultTerima)
    setDaftarBarang([])
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
      <PilihBarang 
        getBarang={getBarang} 
        show={showPilihBarang} 
        handleClose={() => setShowPilihBarang(!showPilihBarang)} />
      
      <Container className="mt-3"> 
        <Form.Check 
          type="switch"
          onChange={(e) => setIsFirstLayout(!isFirstLayout)}
          id="custom-switch"
          value={isFirstLayout}
          label="Change layout"
        />
      </Container>
      { !isFirstLayout && 
        <Container className="mt-4">
          <Row className="mb-3">
            <Col>
              <CustomerAdd terima={terima} handleTerima={handleTerima} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <BarangAddList 
                barang={barang} 
                handleBarang={handleBarang}
                tambahBarang={tambahBarang}
                setShowPilihBarang={setShowPilihBarang} 
                handleDaftarBarang={handleDaftarBarang} 
                daftarBarang={daftarBarang}
                removeItemBarang={removeItemBarang} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <KalkulasiAdd terima={terima} handleTerima={handleTerima} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card className="shadow mb-4">
                <Card.Body>
                  <Button onClick={handleKirim} variant="primary">Simpan</Button>&nbsp;
                  <Button onClick={handleBatal} variant="danger">Batalkan</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
      { isFirstLayout &&  
        <Container className="mt-4"> 
          <Row>
            <Col md={4}>
              <Card className="shadow mb-4">
                <Card.Body>
                  <Button onClick={handleKirim} variant="primary">Simpan</Button>&nbsp;
                  <Button onClick={handleBatal} variant="danger">Batalkan</Button>
                </Card.Body>
              </Card>
              <CustomerAdd terima={terima} handleTerima={handleTerima} />
              <KalkulasiAdd terima={terima} handleTerima={handleTerima} />
            </Col>
            <Col>
              <BarangAddList 
                barang={barang} 
                handleBarang={handleBarang}
                tambahBarang={tambahBarang}
                setShowPilihBarang={setShowPilihBarang} 
                handleDaftarBarang={handleDaftarBarang} 
                daftarBarang={daftarBarang}
                removeItemBarang={removeItemBarang} />
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default TransaksiPage
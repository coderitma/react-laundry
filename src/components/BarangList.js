import { Col, Row, Form, Button, Table } from "react-bootstrap"

const BarangList = ({ 
  daftarBarang, handleDaftarBarang,
  removeItemBarang 
}) => {
  return (
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
  )
}

export default BarangList
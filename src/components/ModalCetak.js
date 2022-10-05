
import { Modal, Button } from "react-bootstrap"

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

export default ModalCetak
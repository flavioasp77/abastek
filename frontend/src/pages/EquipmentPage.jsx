import { useContext, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EquipmentForm from '../components/EquipmentForm';
import { AppContext } from '../context/AppContext';
import { Edit, Delete } from '@mui/icons-material';
import { deleteEquipment } from '../services/equipmentService';

export default function EquipmentPage() {
  const { equipments, fetchEquipments, token } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteEquipment(id, token);
      toast.success('Equipamento excluído com sucesso');
      fetchEquipments();
    } catch (error) {
      toast.error('Erro ao excluir equipamento');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2>Equipamentos</h2>
        <Button onClick={() => {
          setSelectedEquipment(null);
          setShowModal(true);
        }}>
          Adicionar Equipamento
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Data de Fabricação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map(equipment => (
            <tr key={equipment.id}>
              <td>{equipment.code}</td>
              <td>{equipment.name}</td>
              <td>{new Date(equipment.manufacture_date).toLocaleDateString()}</td>
              <td>
                <Button variant="link" onClick={() => {
                  setSelectedEquipment(equipment);
                  setShowModal(true);
                }}>
                  <Edit />
                </Button>
                <Button variant="link" onClick={() => handleDelete(equipment.id)}>
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEquipment ? 'Editar Equipamento' : 'Novo Equipamento'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EquipmentForm 
            equipment={selectedEquipment} 
            onSuccess={() => {
              setShowModal(false);
              fetchEquipments();
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
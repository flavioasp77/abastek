import { useContext, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MaintenanceForm from '../components/MaintenanceForm';
import { AppContext } from '../context/AppContext';
import { Edit, Delete } from '@mui/icons-material';
import { deleteMaintenance } from '../services/maintenanceService'

export default function MaintenancePage() {
  const { maintenances, equipments, fetchMaintenances, token } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteMaintenance(id, token);
      toast.success('Manutenção excluída com sucesso');
      fetchMaintenances();
    } catch (error) {
      toast.error('Erro ao excluir manutenção');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2>Manutenções</h2>
        <Button onClick={() => {
          setSelectedMaintenance(null);
          setShowModal(true);
        }}>
          Adicionar Manutenção
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data</th>
            <th>Equipamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map(maintenance => (
            <tr key={maintenance.id}>
              <td>{maintenance.description}</td>
              <td>{new Date(maintenance.maintenance_date).toLocaleDateString()}</td>
              <td>{maintenance.equipment?.name} ({maintenance.equipment?.code})</td>
              <td>
                <Button variant="link" onClick={() => {
                  setSelectedMaintenance(maintenance);
                  setShowModal(true);
                }}>
                  <Edit />
                </Button>
                <Button variant="link" onClick={() => handleDelete(maintenance.id)}>
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
            {selectedMaintenance ? 'Editar Manutenção' : 'Nova Manutenção'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MaintenanceForm 
            maintenance={selectedMaintenance} 
            equipments={equipments}
            onSuccess={() => {
              setShowModal(false);
              fetchMaintenances();
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
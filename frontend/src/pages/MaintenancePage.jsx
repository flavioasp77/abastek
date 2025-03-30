import { useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MaintenanceForm from '../components/MaintenanceForm';
import { useAppContext } from '../context/AppContext';
import { deleteMaintenance } from '../services/maintenanceService';

export default function MaintenancePage() {
  const { maintenances, equipments, fetchMaintenances, token } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  console.log("manutenções", maintenances);

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
              <td>
                {new Date(maintenance.maintenanceDate).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
               {/* <td>{new Date(maintenance.maintenance_date).toLocaleDateString()}</td> */}
              <td>{maintenance.equipment?.name} ({maintenance.equipment?.code})</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedMaintenance(maintenance);
                    setShowModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(maintenance.id)}
                >
                  Excluir
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

import { Table } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

const ReportPage = () => {
  const { reportData, fetchReport } = useAppContext();

  useEffect(() => {
    fetchReport();
  });

  console.log("reportData na pagina ReportPage", reportData)
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Relatório Consolidado</h2>
      
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Equipamento</th>
            <th>Data Fabricação</th>
            <th>Descrição</th>
            <th>Data Manutençao</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.equipmentCode}</td>
              <td>{item.equipmentName}</td>
              <td>
                {new Date(item.equipmentManufactureDate).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td>{item.maintenanceDescription}</td>
              <td>
                {new Date(item.maintenanceDate).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>   
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportPage;

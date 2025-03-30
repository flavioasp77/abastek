import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createMaintenance, updateMaintenance } from '../services/maintenanceService';
import { useAppContext } from '../context/AppContext';

const formatDateToISO = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();

  date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
};

const formatDateForInput = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  return date.toISOString().split('T')[0]; // Mantém apenas a parte YYYY-MM-DD
};

const MaintenanceSchema = Yup.object().shape({
  description: Yup.string()
    .required('Descrição é obrigatória')
    .max(500, 'Máximo 500 caracteres'),
  maintenance_date: Yup.date()
    .required('Data da manutenção é obrigatória'),
  equipment_id: Yup.number()
    .required('Equipamento é obrigatório')
});

export default function MaintenanceForm({ maintenance, equipments, onSuccess }) {
  const { token } = useAppContext();
  const equip = equipments.find(equip => equip.id === maintenance.equipment.id);
  console.log("Pagina de manutenção equip", equip);
  console.log("Pagina de manutenção maintenance", maintenance);


  const initialValues = {
    description: maintenance.description || '',
    maintenance_date: formatDateForInput(maintenance?.maintenanceDate) || '',
    equipment_id: maintenance?.equipment?.id || ''
  };
  
  const handleSubmit = async (values) => { 
    const equipment = equipments.find(equip => equip.id === parseInt(values.equipment_id, 10));

    const payload = {
      description: values.description,
      maintenanceDate: formatDateToISO(values.maintenance_date),
      equipment: {
        id: equipment.id,
        code: equipment.code,
        name: equipment.name,
        manufactureDate: equipment.manufactureDate,
      }
    };    

    try {
      if (maintenance) {
        await updateMaintenance(maintenance.id, payload, token);
        toast.success('Manutenção atualizada com sucesso');
      } else {
        await createMaintenance(payload, token);
        toast.success('Manutenção criada com sucesso');
      }

      onSuccess();
    } catch (error) {
      console.log("Erro", error)
      toast.error(error.response?.data || 'Erro ao salvar manutenção!');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MaintenanceSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição</label>
          <Field 
            as="textarea" 
            name="description" 
            className="form-control"
            rows={4}
          />
          <ErrorMessage name="description" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="maintenance_date" className="form-label">Data da Manutenção</label>
          <Field type="date" name="maintenance_date" className="form-control" />
          <ErrorMessage name="maintenance_date" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="equipment_id" className="form-label">Equipamento</label>
          <Field as="select" name="equipment_id" className="form-select">
            <option value="">Selecione um equipamento</option>
            {equipments.map(equipment => (
              <option key={equipment.id} value={equipment.id}>
                {equipment.name} ({equipment.code})
              </option>
            ))}
          </Field>
          <ErrorMessage name="equipment_id" component="div" className="text-danger" />
        </div>

        <Button type="submit">
          Salvar
        </Button>
      </Form>
    </Formik>
  );
}

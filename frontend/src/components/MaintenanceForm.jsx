import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createMaintenance, updateMaintenance } from '../services/maintenanceService';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

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
  const { token } = useContext(AppContext);

  const initialValues = maintenance || {
    description: '',
    maintenance_date: '',
    equipment_id: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (maintenance) {
        await updateMaintenance(maintenance.id, values, token);
        toast.success('Manutenção atualizada com sucesso');
      } else {
        await createMaintenance(values, token);
        toast.success('Manutenção criada com sucesso');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar manutenção');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MaintenanceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
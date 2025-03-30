import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createEquipment, updateEquipment } from '../services/equipmentService';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const EquipmentSchema = Yup.object().shape({
  code: Yup.string()
    .required('Código é obrigatório')
    .max(20, 'Máximo 20 caracteres'),
  name: Yup.string()
    .required('Nome é obrigatório')
    .max(100, 'Máximo 100 caracteres'),
  manufacture_date: Yup.date()
    .required('Data de fabricação é obrigatória')
});

export default function EquipmentForm({ equipment, onSuccess }) {
  const { token } = useContext(AppContext);

  const initialValues = equipment || {
    code: '',
    name: '',
    manufacture_date: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (equipment) {
        await updateEquipment(equipment.id, values, token);
        toast.success('Equipamento atualizado com sucesso');
      } else {
        await createEquipment(values, token);
        toast.success('Equipamento criado com sucesso');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar equipamento');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EquipmentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Código</label>
            <Field 
              type="text" 
              name="code" 
              className="form-control"
              disabled={!!equipment}
            />
            <ErrorMessage name="code" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="manufacture_date" className="form-label">Data de Fabricação</label>
            <Field type="date" name="manufacture_date" className="form-control" />
            <ErrorMessage name="manufacture_date" component="div" className="text-danger" />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
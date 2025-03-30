import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createEquipment, updateEquipment } from '../services/equipmentService';
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

const EquipmentSchema = Yup.object().shape({
  code: Yup.string().required('Código é obrigatório').max(20, 'Máximo 20 caracteres'),
  name: Yup.string().required('Nome é obrigatório').max(100, 'Máximo 100 caracteres'),
  manufacture_date: Yup.date()
    .required('Data de fabricação é obrigatória'),
});

export default function EquipmentForm({ equipment, onSuccess }) {
  const { token } = useAppContext();

  const initialValues = {
    code: equipment?.code || '',
    name: equipment?.name || '',
    manufacture_date: formatDateForInput(equipment?.manufactureDate) || '',
  };

  const handleSubmit = async (values) => {
    console.log("Valores antes do envio:", values);

    const formattedValues = {
      ...values,
      manufactureDate: formatDateToISO(values.manufacture_date),
    };

    console.log("Valores formatados para envio:", formattedValues);

    try {
      if (equipment) {
        await updateEquipment(equipment.id, formattedValues, token);
        toast.success('Equipamento atualizado com sucesso');
      } else {
        await createEquipment(formattedValues, token);
        toast.success('Equipamento criado com sucesso');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao salvar equipamento');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EquipmentSchema}
      onSubmit={handleSubmit}
      enableReinitialize // Para garantir que os valores sejam atualizados corretamente
    >
      {({ values }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Código</label>
            <Field type="text" name="code" className="form-control" disabled={!!equipment} />
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

          <Button type="submit">Salvar</Button>
        </Form>
      )}
    </Formik>
  );
}
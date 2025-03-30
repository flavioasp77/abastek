import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { FaTools, FaWrench, FaChartBar } from 'react-icons/fa';
import industrialImage from '../assets/industrial-background.png'; // Ajuste o caminho conforme sua estrutura

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Image 
            src={industrialImage} 
            alt="Industrial Automation" 
            fluid
            rounded
            className="mb-4 shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          
          <h1 className="mb-3">Test Abastek</h1>
          <p className="lead mb-4 text-muted">Sistema de Gerenciamento Industrial</p>
          
          <div className="d-grid gap-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/equipments')}
              className="d-flex align-items-center justify-content-center gap-2 py-3"
            >
              <FaTools className="fs-4" /> Equipamentos
            </Button>
            
            <Button 
              variant="success" 
              size="lg"
              onClick={() => navigate('/maintenances')}
              className="d-flex align-items-center justify-content-center gap-2 py-3"
            >
              <FaWrench className="fs-4" /> Manutenções
            </Button>
            
            <Button 
              variant="info" 
              size="lg"
              onClick={() => navigate('/report')}
              className="d-flex align-items-center justify-content-center gap-2 py-3 text-white"
            >
              <FaChartBar className="fs-4" /> Relatório
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
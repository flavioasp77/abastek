# Test Abastek

## 📌 Descrição

Test Abastek é um sistema de gerenciamento de equipamentos e manutenções em uma planta industrial. Ele permite o cadastro, consulta e geração de relatórios combinando informações dessas entidades.

# Backend

## 📂 Configuração do Banco de Dados

Antes de iniciar o servidor, crie uma db no banco e execute as queries SQL fornecidas para criar as tabelas necessárias e a view para relatórios no PostgreSQL.

### 📌 Queries SQL

#### Criação das tabelas:

```sql
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    manufacture_date TIMESTAMPTZ NOT NULL
);

CREATE TABLE maintenance (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    maintenance_date TIMESTAMPTZ NOT NULL,
    equipment_id INTEGER NOT NULL,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);
```

#### Dados iniciais de equipamentos:

```sql
INSERT INTO equipment (code, name, manufacture_date)
VALUES
    ('EQP-001', 'TCA', '2025-03-29T20:23:45.000Z'),
    ('EQP-002', 'TCA-COMBOIO', '2025-03-29T20:24:45.000Z'),
    ('EQP-003', 'DBIC', '2025-03-29T20:25:45.000Z');
```

#### Dados iniciais de manutenção:

```sql
INSERT INTO maintenance (description, maintenance_date, equipment_id)
VALUES
    ('Troca do chip central', '2025-03-29T20:25:45.000Z', 1),
    ('Troca do CI', '2025-03-29T20:26:45.000Z', 2),
    ('Troca do Sensor', '2025-03-29T20:27:45.000Z', 3);
```

#### Criação da View:

```sql
CREATE VIEW maintenance_report AS
SELECT
    e.code AS equipment_code,
    e.name AS equipment_name,
    e.manufacture_date AS equipment_manufacture_date,
    m.description AS maintenance_description,
    m.maintenance_date
FROM
    maintenance m
JOIN
    equipment e ON m.equipment_id = e.id;
```

## 🚀 Iniciando o Servidor

Para iniciar o servidor, utilize o seguinte comando:

```sh
mvn spring-boot:run
```

Na pasta raiz temum arquivo **Postman-abastek** com as requisições para testar no **Postman**

## 🏗 Escolhas Tecnológicas

### **Spring Web + Spring JPA**

A escolha do **Spring Web** foi feita para facilitar a criação de APIs REST robustas e escaláveis. O **Spring JPA** permite interação eficiente com o banco de dados, garantindo padronização e facilidade na gestão de entidades.

### **Arquitetura MSC** (Model-Service-Controller)

Optamos por uma estrutura **MSC** para organizar melhor o código:

- **Model:** Define as entidades que representam as tabelas do banco.
- **Service:** Contém a lógica de negócio, garantindo a separação de responsabilidades.
- **Controller:** Responsável por receber as requisições HTTP e interagir com os services.

Essa abordagem facilita a manutenção, expansão e testes do sistema.

OBS: Tive muitos problemas para configurar o spring web com o Java 8 uma vez que a nova versão do spring não dá suporte para java 8 atraves do site **spring intializr**, que só sá suporte para as versõs 17, 21 e 24. Portanto tive que fazer toda configuração na mão e com consulta ao chatgpt. Infelizmente perdi muito tempo e não consegui fazer o projeto completo. Agracederia se puder explicar melhor o que houve de forma presencial ou através de uam call no meet ou zoom.

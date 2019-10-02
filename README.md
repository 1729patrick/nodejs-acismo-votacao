
### `Configuração`

1. `npm install` para instalar as dependências.

2. Alterar as credênciais de acesso ao DB em `src/config/database.js` para estar de acordo com a configuração instalada.

3. Criar o DB chamado `votacao`.

4. Executar `sequelize db:migrate` para criar as tabelas do DB.

5. Executar o sql que está em `/script_empresas.sql` para criar os dados das empresas de 2019.

### `Scripts disponíveis`

### `npm start`

Executa a API em modo de desenvolvimento em [http://localhost:3333](http://localhost:3333).

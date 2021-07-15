# Instalar dependências

yarn

# Criar Container Docker PostgreSQL

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

##Lembrar de criar o banco de dados conforme o nome especificado no ormconfig.json

# Executar projeto em modo de desenvolvimento

yarn dev

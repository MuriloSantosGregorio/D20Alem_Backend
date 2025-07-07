import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import path from 'path';
 
dotenv.config();

// 2. Interface para tipagem das variáveis
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

function getDatabaseConfig(): DatabaseConfig {
  const requiredVars = {
    DB_HOST: 'string',
    DB_PORT: 'number',
    DB_USERNAME: 'string',
    DB_PASSWORD: 'string',
    DB_NAME: 'string'
  };

  // Verificar cada variável
  for (const [varName, varType] of Object.entries(requiredVars)) {
    if (!process.env[varName]) {
      throw new Error(`Variável de ambiente ${varName} não está definida`);
    }

    if (varType === 'number' && isNaN(parseInt(process.env[varName]!))) {
      throw new Error(`Variável ${varName} deve ser um número`);
    }
  }

  return {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!
  };
}

export const AppDataSource = new DataSource({
  type: "postgres",
  ...getDatabaseConfig(),
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "../entities/**/*.{js,ts}")],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    
    // Verificar JWT_SECRET após a conexão com o banco
    if (!process.env.JWT_SECRET) {
      console.warn("AVISO: JWT_SECRET não está definido no .env, usando valor padrão");
    }
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source:", err.message);
    process.exit(1); // Encerra o processo com erro
  });
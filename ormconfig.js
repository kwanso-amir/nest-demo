module.exports = {
  type: process.env.DATABASE_TYPE || "postgres",
  url: process.env.DATABASE_TYPE + '://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DATABASE,
  synchronize: false,
  migrations: ["dist/migrations/*{.ts,.js}"],
  entities: ["dist/**/*.entity{.ts,.js}"],
  seeds: ["dist/**/*.seed{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations"
  }
}
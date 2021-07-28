const { Pool } = require('pg');
const connectionString =
    'postgres://iyjbpuebqgycbs:4cae2839231ad3d080e0a6b8ad82220c36d4c8db78592cc492a5c38564e6bec0@ec2-23-20-124-77.compute-1.amazonaws.com:5432/d721sitcqrqddv';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = class game {
    static init() {
        return pool.query(
            `
                DROP TABLE IF EXISTS login_tab;
                CREATE TABLE login_tab (
                    id SERIAL primary key ,
                    email VARCHAR not null ,
                    password VARCHAR not null 
                    
                );
            `,
        );
    }
 
    static createUser(email,password) {
        return pool.query(
            `
                INSERT INTO login_tab
                (email,password)
                VALUES
                ($1,$2)
            `,
            [email,password],
        );
    }
    static getUser(email,password) {
        return pool.query(
            `
                SELECT email,password
                FROM login_tab
                where email=$1 and password=$2
            `,
            [email,password],
        );
    }
}
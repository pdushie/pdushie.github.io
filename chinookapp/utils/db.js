import Database from "better-sqlite3";

// Connect to database and export db connection to make it available to other modules
const db = new Database('./database/chinook.sqlite', {fileMustExist: true});
export default db;


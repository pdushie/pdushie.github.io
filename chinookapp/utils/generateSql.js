export function generateInsertStatement(table, payload) {
  const columns = Object.keys(payload);
  const values = Object.values(payload);

  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')});`;
  return {
    sql,
    values
  }
}

export function generateUpdateStatement(table, payload, primaryKeyColumn, primaryKeyValue) {
  const columns = Object.keys(payload);
  const values = Object.values(payload);
  const columnsModified = columns.map(column => {
    return `${column}=?`
  });
  const sql = `UPDATE ${table} SET ${columnsModified.join(', ')} WHERE ${primaryKeyColumn} = ${primaryKeyValue};`;
  return {
    sql,
    values
  }

}

export function generateDeleteStatement(table, primaryKeyColumn) {
  const sql = `DELETE FROM ${table} WHERE ${primaryKeyColumn} = ?;`;
  return {
    sql
  }
}
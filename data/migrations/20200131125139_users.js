exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
  
      tbl.string('username', 128).notNullable().index()
      tbl.string('password', 128).notNullable()
      tbl.string('department', 128).notNullable().index()

    })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users')
  
  };
  
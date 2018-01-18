'use strict';

const tableName = `${process.env.STAGE}_settings`;

module.exports.readOne = (db, id) => {
  const params = {
    TableName: tableName,
    Key: {
      id: id
    }
  };
  return db.get(params).promise();
};

module.exports.put = (db, id, value) => {
  const item = {};
  item.id = id;
  item.value = value;

  const params = {
    TableName : tableName,
    Item: item
  };
  return db.put(params).promise();
};

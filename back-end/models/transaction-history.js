module.exports = (sequelize, type) => {
    return sequelize.define('TransactionHistories', {
        id: {
            field:'tranid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transactiondate: {
            type: type.DATE,
            allowNull: true
        },
        transactionstatus: {
            type: type.BOOLEAN,
            allowNull: true
        },
        transactiontype: {
            type: type.STRING,
            allowNull: true
        },
        money: {
            type: type.FLOAT,
            allowNull: true
        }
    }, {timestamps: false});
}
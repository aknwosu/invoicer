// module.exports = (sequelize, DataTypes) = {
//   const Invoice = sequelize.define('Invoice', {
//     customerName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     customerEmail: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: {
//           message: 'Invalid email address',
//         },
//       },
//     }
//   Invoice.associate = models => {
//     Invoice.hasMany(models.Orders, {
//       foreignKey: 'InvoiceId',
//       as: "InvoiceDetail"
//     });
//   }
//   return Invoice
// }

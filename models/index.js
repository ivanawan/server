const User= require('./user');
const Book= require('./Book');
const Transaction =require('./Transaction');
const Purchase = require('./Purchase')
const PurchasesBook = require('./PurchasesBook');
const Chat = require('./Chat');


Transaction.belongsToMany(Book, { through: Purchase });
Book.belongsToMany(Transaction, { through: Purchase });
Transaction.hasMany(Purchase);
Book.hasMany(Purchase);
Purchase.belongsTo(Transaction);
Purchase.belongsTo(Book);

// Purchase.belongsTo(Transaction,{targetKey:'id',foreignKey:'TransactionId'});
// Purchase.belongsTo(Book,{targetKey:'id',foreignKey:'BookId'});

Transaction.belongsTo(User,{ targetKey: 'id', foreignKey: 'userId'});

User.belongsToMany(Book,{through:PurchasesBook});
Book.belongsToMany(User,{through:PurchasesBook});
User.hasMany(PurchasesBook);
Book.hasMany(PurchasesBook);
PurchasesBook.belongsTo(User);
PurchasesBook.belongsTo(Book);

module.exports={User,Transaction,Purchase,Book,PurchasesBook,Chat};
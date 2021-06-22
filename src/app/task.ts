// id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   statusID: Sequelize.INTEGER,
//   userID: Sequelize.INTEGER,
//   description: Sequelize.STRING,

export interface Task {
    id: number;
    title: string;
    description: string;
    userID: number;
}
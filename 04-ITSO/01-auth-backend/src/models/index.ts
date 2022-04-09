import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

let models = {} as any;

export function registerModels(sequelize: Sequelize){
    const thisFile = path.basename(__filename);
    const modelFiles = fs.readdirSync(__dirname);
    const filterModelFiles = modelFiles.filter(file => file !== thisFile && file.slice(-3) === ".ts");
    for(const file of filterModelFiles){
        const model = require(path.join(__dirname, file)).default(sequelize);
        models[model.name] = model;
    }

    Object.keys(models).forEach(modelName => {
        if(models[modelName].associate) models[modelName].associate(models);
    });
    models.sequelize = sequelize;
}

export default models;
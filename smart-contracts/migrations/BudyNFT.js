// migrations/2_deploy_BudyNFT.js

const BudyNFT = artifacts.require("BudyNFT");
const MinimalForwarder = artifacts.require("MinimalForwarder");

module.exports = async function(deployer) {
    // Desplegar el contrato BudyNFT sin parámetros en el constructor
    await deployer.deploy(MinimalForwarder);
    const MinimalForwarderInstance = await MinimalForwarder.deployed();

    // Obtener la dirección del contrato desplegado
    const MinimalForwarderAddress = MinimalForwarderInstance.address;

    // Desplegar el contrato MinimalForwarder con la dirección de BudyNFT y el selector de inicialización
    await deployer.deploy(BudyNFT, MinimalForwarderAddress);
    const BudyNFTInstance = await BudyNFT.deployed();

    console.log("MinimalForwarderInstance: "+MinimalForwarderAddress);
    console.log("BudyNFTInstance: "+BudyNFTInstance.address);
};
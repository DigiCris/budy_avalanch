// test/ERC1967Proxy.test.js

const { expect } = require('chai');
const BudyNFT = artifacts.require("BudyNFT");
const ModifiedBudyNFT = artifacts.require("ModifiedBudyNFT");
const ERC1967Proxy = artifacts.require("ERC1967Proxy");

contract("ERC1967Proxy", accounts => {
    let BudyNFTInstance;
    let BudyNFTProxyInstance;
    let modifiedBudyNFTInstance;
    let proxyInstance;
    let owner;

    before(async function() {
        owner = accounts[0];
        // Desplegar el contrato BudyNFT
        BudyNFTInstance = await BudyNFT.new();
        
        // Desplegar el ERC1967Proxy con la dirección de BudyNFT
        proxyInstance = await ERC1967Proxy.new(BudyNFTInstance.address, "0x8129fc1c"); // deploy and initialize
        // Crear una nueva instancia del contrato BudyNFT a través del proxy
        BudyNFTProxyInstance = await BudyNFT.at(proxyInstance.address);
    });

    context("BudyNFT NFT", async function() {
        it("1) debería tener el nombre 'BudyNFT' y símbolo 'FP'", async function() {
            const name = await BudyNFTProxyInstance.name();
            const symbol = await BudyNFTProxyInstance.symbol();
            expect(name).to.equal("BudyNFT");
            expect(symbol).to.equal("FP");
        });

        it("2) debería incrementar _nextTokenId en 1 al llamar a increment()", async function() {
            await BudyNFTProxyInstance.increment();
            const nextTokenId = await BudyNFTProxyInstance._nextTokenId();
            console.log(nextTokenId+" == "+1)
            expect(nextTokenId.toNumber()).to.equal(1); // Verifica que _nextTokenId es 1
        });

        it("3) debería desplegar ModifiedBudyNFT", async function() {
            modifiedBudyNFTInstance = await ModifiedBudyNFT.new();
        });

        it("4) debería actualizar el proxy a ModifiedBudyNFT", async function() {
            await BudyNFTProxyInstance.upgradeToAndCall(modifiedBudyNFTInstance.address, "0x");
            // Aquí podrías agregar una verificación para confirmar que el proxy ahora apunta a ModifiedBudyNFT
        });

        it("5) debería incrementar _nextTokenId en 2 al llamar a increment() en ModifiedBudyNFT", async function() {
            await BudyNFTProxyInstance.increment();
            const nextTokenId = await BudyNFTProxyInstance._nextTokenId();
            expect(nextTokenId.toNumber()).to.equal(3); // Verifica que _nextTokenId es 3
        });

    });
});
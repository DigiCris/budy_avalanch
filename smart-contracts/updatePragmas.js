const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol',
  'node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol',
  'node_modules/@openzeppelin/contracts/proxy/Proxy.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol',
  'node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol',
  'node_modules/@openzeppelin/contracts/access/IAccessControl.sol',
  'node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol',
  'node_modules/@openzeppelin/contracts/interfaces/draft-IERC1822.sol',
  'node_modules/@openzeppelin/contracts/interfaces/draft-IERC6093.sol',
  'node_modules/@openzeppelin/contracts/proxy/beacon/IBeacon.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol',
  'node_modules/@openzeppelin/contracts/utils/Address.sol',
  'node_modules/@openzeppelin/contracts/utils/StorageSlot.sol',
  'node_modules/@openzeppelin/contracts/utils/Strings.sol',
  'node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol',
  'node_modules/@openzeppelin/contracts/interfaces/IERC165.sol',
  'node_modules/@openzeppelin/contracts/interfaces/IERC721.sol',
  'node_modules/@openzeppelin/contracts/utils/math/Math.sol',
  'node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol',
  'node_modules/@openzeppelin/contracts/access/Ownable.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol',
  'node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol',
  'node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol',
  'node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol',
  'node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol',
  'node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol',
  'node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol',
  'node_modules/@openzeppelin/contracts/interfaces/IERC5267.sol',
  'node_modules/@openzeppelin/contracts/utils/Context.sol',
  'node_modules/@openzeppelin/contracts/utils/ShortStrings.sol',
  'node_modules/@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol',
  'node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol'
];

const updatePragmaT = (filePath) => {
  const fullPath = path.resolve(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  const updatedContent = content.replace(/pragma solidity \^0\.8\.20;/g, 'pragma solidity ^0.8.19;');

  fs.writeFileSync(fullPath, updatedContent);
  console.log(`Updated ${filePath}`);
};

const updatePragmaP = (filePath) => {
    const fullPath = path.resolve(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
  
    const updatedContent = content.replace(/pragma solidity \^0\.8\.19;/g, 'pragma solidity ^0.8.20;');
  
    fs.writeFileSync(fullPath, updatedContent);
    console.log(`Updated ${filePath}`);
};

/*
filesToUpdate.forEach(updatePragmaT);
filesToUpdate.forEach(updatePragmaP);
*/
// Obtener el argumento de la línea de comandos
const arg = process.argv[2];

if (arg === 'T') {
  filesToUpdate.forEach(updatePragmaT);
} else if (arg === 'P') {
  filesToUpdate.forEach(updatePragmaP);
} else {
  console.log('Por favor, pasa para testing "node updatePragmas.js T" o "node updatePragmas.js P" como argumento para produccion.');
}
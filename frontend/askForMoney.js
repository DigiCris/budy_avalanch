async function transferBudy(amount, addressTo) {
    try {
      const response = await fetch('/api/transferBudy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, to: addressTo }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      console.log('Transacción procesada exitosamente:', data);
    } catch (error) {
      console.error('Error al procesar la transferencia:', error.message);
    }
  }
  amounty = "3000000000000000000000";
  address = "0x93d4f70128b97d56012bc68efE796Fb427aA9d71";
  transferBudy(amounty, address);
const createWhatsappContact = async (shopId, phoneNumber) => {
  let response = await fetch(`/api/shops/${shopId}/whatsapp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneNumber
    })
  });

  return response;
};

export default createWhatsappContact;
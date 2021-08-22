const deleteWhatsappContact = async (shopId, contactId) => {
  let response = await fetch(`/api/shops/${shopId}/whatsapp/${contactId}`, {
    method: 'DELETE'
  });

  return response;
};

export default deleteWhatsappContact;
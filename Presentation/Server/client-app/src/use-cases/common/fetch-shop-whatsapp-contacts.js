const fetchAllShopWhatsappContacts = async (shopId) => {
  let response = await fetch(`/api/shops/${shopId}/whatsapp`, {
    method: 'GET'
  });

  return (await response.json());
}

export default fetchAllShopWhatsappContacts;
import uploadImage from "../../common/upload-image";

const addMerchantVerificationImage = async (accountId, file) => {
  let response = await uploadImage(
    `/api/merchant/verification-requests/${accountId}/photos`,
    'photo',
    file,
    'POST');
};

export default addMerchantVerificationImage;
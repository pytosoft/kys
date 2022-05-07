/**
 * @Name apiEndpointUrl
 * This is used to manage api endpoints
 */
 export const apiEndpointUrl = {
  login: () => `login`,
  subcriber: () => `subscriber`,
  updateSubcriber: () => `subscriber/update`,
  plans: () =>  `plan/list`,
  subscriberById: (id: string) => `subscriber/getUserProfile/${id}`,
  saveSubcription: () => `subscription`,
  deactivateSubcription: () => `subscription/deactive`,
  updateSubcription: () => `subscription/update`,
  getSubscriptionList: () => `subscription/list`,
  getAddressList: (dist:string) => `subscription/list?dist=${dist}`,
  printAddressList: ()=> `subscription/list/address`,
  subscriberByMobile: (id: string) => `subscriber/getSubcriberByMobile/${id}`,
  adminList: () => `user/list`,
  adminNameList: () => `user/list/names`,
  getPlanList: () => `plan/list/names`,
  saveAdmin: () => `user`,
  deleteAdmin: (admin: any) => `user/deleteById?id=${admin._id}&active=${admin.active}`,
  getProfileId: (id: string) => `user/getUserProfile/${id}`,
  getDashboardId: (id: string) => `dashboard/${id}`,
  editAdmin: () => `user/update`,
  depositAmountRequest: () => `user/depositAmountRequest`,
  uploadPic: () => `user/uploadProfilePic`,
  uploadSubscriber: () => `upload/subcribers`,
  verifyAmount: () => `user/verifyAmount`,
  changePassword: () => `auth/reset-password`,
  profile: (id: string) => `subscriber/list/${id}`,
   books: () => `book/list`,
  bookPost:() => `book`,
  bookDelete:()=> `book/deleteById?id=`,
  updateBook:()=> `book/update`,
  getStateList:()=>`common/states/list`,
  getDistList:(data:string)=>`common/distByState?state=${data}`
}



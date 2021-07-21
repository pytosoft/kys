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
  getSubscriptionList: () => `subscription/list`,
  subscriberByMobile: (id: string) => `subscriber/getSubcriberByMobile/${id}`,
  adminList: () => `user/list`,
  saveAdmin: () => `user`,
  deleteAdmin: (admin: any) => `user/deleteById?id=${admin._id}&active=${admin.active}`,
  getProfileId: (id: string) => `user/getUserProfile/${id}`,
  getDashboardId: (id: string) => `dashboard/${id}`,
  editAdmin: () => `user/update`,
  depositAmountRequest: () => `user/depositAmountRequest`,
  verifyAmount: () => `user/verifyAmount`,
  profile: (id: string) => `subscriber/list/${id}`,
   books: () => `book/list`,
  bookPost:() => `book`,
  bookDelete:()=> `book/deleteById?id=`,
  updateBook:()=> `book/update`
}

 

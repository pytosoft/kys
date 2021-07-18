/**
 * @Name apiEndpointUrl
 * This is used to manage api endpoints
 */
 export const apiEndpointUrl = {
  login: () => `login`,
  subcriber: () => `subscriber`,
  updayteSubcriber: () => `subscriber/update`,
  plans: () =>  `plan/list`,
  subscriberById: (id: string) => `subscriber/getUserProfile/${id}`,
  saveSubcription: () => `subscription`,
  subscriberByMobile: (id: string) => `subscriber/getSubcriberByMobile/${id}`,
  adminList: () => `    user/list`,
  saveAdmin: () => `user`,
  deleteAdmin: (admin: any) => `user/deleteById?id=${admin._id}&active=${admin.active}`,
  getProfileId: (id: string) => `user/getUserProfile/${id}`,
  getDashboardId: (id: string) => `dashboard/${id}`,
  editAdmin: () => `user/update`
 }

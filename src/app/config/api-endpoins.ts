/**
 * @Name apiEndpointUrl
 * This is used to manage api endpoints
 */
 export const apiEndpointUrl = {
  login: () => `login`,
  subcriber: () => `subscriber`,
  plans: () =>  `plan/list`,
  subscriberById: (id: string) => `subscriber/getUserProfile/${id}`,
  saveSubcription: () => `subscription`
 }

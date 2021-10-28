export const paths = {
  applications: () => '/applications',
  applicationsEdit: (appId = ':applicationId') => `/applications/${appId}/edit`,
  applicationsNew: () => '/applications/new',
  applicationsRegistrations: (appId = ':applicationId') => `/applications/${appId}/registrations`,
  applicationsView: (appId = ':applicationId') => `/applications/${appId}`,
  dashboard: () => '/',
  registrationRequests: () => '/registration-requests',
  users: () => '/users',
};

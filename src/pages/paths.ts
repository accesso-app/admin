export const paths = {
  dashboard: () => '/',
  applications: () => '/applications',
  applicationsNew: () => '/applications/new',
  applicationsView: (appId = ':applicationId') => `/applications/${appId}`,
  applicationsEdit: (appId = ':applicationId') => `/applications/${appId}/edit`,
  applicationsRegistrations: (appId = ':applicationId') => `/applications/${appId}/registrations`,
  users: () => '/users',
};

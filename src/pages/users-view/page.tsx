import { createStore } from 'effector';
import { useStore } from 'effector-react/scope';
import React from 'react';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { LocalUser } from '~/pages/users-view/common';

export const $user = createStore<LocalUser | null>(null);

export function UsersViewPage() {
  // TODO: add breadcrumbs
  return (
    <NavigationTemplate>
      <StackedTemplate title={<Title />}>
        <UserView />
      </StackedTemplate>
    </NavigationTemplate>
  );
}

const $displayName = $user.map((user) => (user ? `${user.firstName} ${user.lastName}` : null));

function Title() {
  const displayName = useStore($displayName);
  return <>{displayName ?? 'User'}</>;
}

function UserView() {
  const user = useStore($user);
  if (!user) return null;

  return (
    <div>
      <div>ID: {user.id}</div>
      <div>First name: {user.firstName}</div>
      <div>Last name: {user.lastName}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}

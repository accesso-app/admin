import { createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react/scope';
import React from 'react';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import {
  ButtonPrimary,
  Card,
  DescriptionTemplate,
  Field,
  Input,
  Note,
  Paragraph,
} from '~/shared/ui';

export const profileSubmitted = createEvent();

export const emailChanged = createEvent<string>();
export const firstNameChanged = createEvent<string>();
export const lastNameChanged = createEvent<string>();
export const $email = createStore('');
export const $firstName = createStore('');
export const $lastName = createStore('');

export const $originalName = createStore('');
export const $id = createStore('');
export const $isUserFound = createStore(false);
export const $profileLoading = createStore(false);
export const $profileEditing = createStore(false);

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

function Title() {
  const isFound = useStore($isUserFound);
  const displayName = useStore($originalName);
  return <>{isFound ? displayName : 'User'}</>;
}

function UserView() {
  const isFound = useStore($isUserFound);
  const pending = useStore($profileLoading);

  if (pending) return <div className="text-lg">Loading...</div>;
  if (!isFound) {
    return (
      <div className={'text-lg'}>A user with this ID is not exists. Maybe link is broken.</div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-0">
      <Profile />
      <Separator />
      <Registrations />
      <Separator />
      <Actions />
    </div>
  );
}

function Separator() {
  return (
    <div className="py-5 hidden sm:block">
      <div className="border-t border-gray-200" />
    </div>
  );
}

function Profile() {
  const id = useStore($id);
  const email = useStore($email);
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);
  const saving = useStore($profileEditing);

  const onEmailChange = useEvent(emailChanged);
  const onFirstNameChange = useEvent(firstNameChanged);
  const onLastNameChange = useEvent(lastNameChanged);
  const onFormSubmit = useEvent(profileSubmitted);

  return (
    <DescriptionTemplate
      description={
        <Paragraph title="Profile">
          This information will be displayed publicly so be careful what you share.
        </Paragraph>
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onFormSubmit();
        }}
      >
        <Card
          footer={
            <div className="text-right">
              <ButtonPrimary disabled={saving}>{saving ? 'Saving…' : 'Save'}</ButtonPrimary>
            </div>
          }
        >
          <div className="space-y-6">
            <div className={`grid grid-cols-6 gap-6`}>
              <div className="col-span-6 lg:col-span-4">
                <Field label="ID">
                  <Input value={id} readOnly className="font-mono bg-gray-100 text-gray-500" />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => onEmailChange(event.currentTarget.value)}
                  />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-3">
                <Field label="First name">
                  <Input
                    value={firstName}
                    onChange={(event) => onFirstNameChange(event.currentTarget.value)}
                  />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-3">
                <Field label="Last name">
                  <Input
                    value={lastName}
                    onChange={(event) => onLastNameChange(event.currentTarget.value)}
                  />
                </Field>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </DescriptionTemplate>
  );
}

function Registrations() {
  return (
    <DescriptionTemplate
      description={
        <Paragraph title="Registrations">List of applications where user registered.</Paragraph>
      }
    >
      <Card className="space-y-5">
        <Note text="This section temporary disabled" />
        <div>There will be list of applications the user registered in.</div>
      </Card>
    </DescriptionTemplate>
  );
}

function Actions() {
  return (
    <DescriptionTemplate
      description={
        <Paragraph title="Special actions">List of actions with dangerous implications.</Paragraph>
      }
    >
      <Card className="space-y-5">
        <Note text="This section temporary disabled" />

        <div className="flex flex-col items-start space-y-2">
          <h4 className="text-xl">Finish all active sessions</h4>
          <p className="text-gray-500 text-sm pb-2">
            Deleting all active sessions is unrecoverable. User will be required to log in again.
          </p>
          <ButtonPrimary>Finish all session tokens</ButtonPrimary>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <h4 className="text-xl">Set a new password</h4>
          <p className="text-gray-500 text-sm pb-2">
            A new password will be generated for a user. Sessions won't be finished.
          </p>
          <ButtonPrimary>Reset password</ButtonPrimary>
        </div>
      </Card>
    </DescriptionTemplate>
  );
}

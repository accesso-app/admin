import { createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react/scope';
import React from 'react';
import { Link } from 'react-router-dom';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { paths } from '~/pages/paths';
import {
  ButtonPrimary,
  Card,
  DescriptionTemplate,
  Field,
  Input,
  Note,
  Paragraph,
  Separator,
} from '~/shared/ui';

import { Registration } from './common';

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
export const $registrations = createStore<Registration[]>([]);

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
      <Registrations />
      <Actions />
    </div>
  );
}

function Profile() {
  const id = useStore($id);
  const email = useStore($email);
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);
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
              <ButtonPrimary>Save</ButtonPrimary>
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
  const registrations = useStore($registrations);

  if (registrations.length === 0) return null;

  return (
    <>
      <Separator />
      <DescriptionTemplate
        description={
          <Paragraph title="Registrations">List of applications where user registered.</Paragraph>
        }
      >
        <Card className="space-y-5">
          <h2 className="text-xl select-none">Applications user registered in</h2>
          <div className="divide-y divide-gray-500 table w-full">
            <div className="table-row-group">
              {registrations.map((registration) => (
                <div key={registration.id} className="table-row">
                  <div className="table-cell">
                    <Link
                      to={paths.applicationsView(registration.application.id)}
                      title="View application"
                      className=" px-4 lg:-ml-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-indigo-600
                  hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
                    >
                      {registration.application.title}
                    </Link>
                  </div>
                  <div className="table-cell">{registration.createdAt}</div>
                  <div className="table-cell">{registration.accessTokensCount}</div>
                </div>
              ))}
              {registrations.length === 0 ? (
                <div className="table-cell col-span-3 text-center select-none">
                  No registrations at the moment
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </DescriptionTemplate>
    </>
  );
}

function Actions() {
  return (
    <>
      <Separator />
      <DescriptionTemplate
        description={
          <Paragraph title="Access to Accesso">
            Actions changes user's credentials and tokens.
          </Paragraph>
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
    </>
  );
}

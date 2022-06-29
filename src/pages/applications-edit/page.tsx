import { createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react/scope';
import React from 'react';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import {
  ButtonPrimary,
  Card,
  Checkbox,
  DescriptionTemplate,
  Field,
  Input,
  Note,
  Paragraph,
  Separator,
} from '~/shared/ui';

//#region Ports
export const applicationSubmitted = createEvent();
export const titleChanged = createEvent<string>();
export const redirectUriChanged = createEvent<{ index: number; uri: string }>();
export const redirectUriAddClicked = createEvent();
export const allowedRegChanged = createEvent<void>();
export const isDevChanged = createEvent<void>();
export const regenerateSecretClicked = createEvent();

export const $id = createStore('');
export const $title = createStore('');
export const $redirectUri = createStore<string[]>([]);
export const $allowedRegistrations = createStore(false);
export const $isDev = createStore(false);
export const $secretKey = createStore<null | string>(null);
//#endregion

export function ApplicationsEditPage() {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Edit application">
        <ApplicationView />
      </StackedTemplate>
    </NavigationTemplate>
  );
}

function ApplicationView() {
  return (
    <div className="space-y-10 sm:space-y-0">
      <GeneralInfo />
      <Separator />
      <Keys />
    </div>
  );
}

function GeneralInfo() {
  const id = useStore($id);
  const title = useStore($title);
  const redirectUri = useStore($redirectUri);
  const allowedRegistrations = useStore($allowedRegistrations);
  const isDev = useStore($isDev);

  const onApplicationSubmitted = useEvent(applicationSubmitted);
  const onTitleChanged = useEvent(titleChanged);
  const onRedirectUriChanged = useEvent(redirectUriChanged);
  const onAddRedirectUriClicked = useEvent(redirectUriAddClicked);
  const onAllowedRegChanged = useEvent(allowedRegChanged);
  const onIsDevChanged = useEvent(isDevChanged);

  return (
    <DescriptionTemplate
      description={
        <Paragraph title="General">Contains general information about connected app</Paragraph>
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onApplicationSubmitted();
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
                <Field label="Title">
                  <Input
                    value={title}
                    onChange={(event) => onTitleChanged(event.currentTarget.value)}
                  />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field
                  label="List of allowed redirect uri"
                  actions={
                    <button
                      className="button-action button-action-xs"
                      type="button"
                      onClick={() => onAddRedirectUriClicked()}
                    >
                      Add
                    </button>
                  }
                >
                  {redirectUri.map((uri, index) => (
                    <Input
                      key={index}
                      value={uri}
                      onChange={(event) =>
                        onRedirectUriChanged({ index, uri: event?.currentTarget.value.trim() })
                      }
                      placeholder="https://"
                    />
                  ))}
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Allow users to register">
                  <Checkbox
                    defaultChecked={allowedRegistrations}
                    onChange={(_) => onAllowedRegChanged()}
                  />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Application used just for development purpose">
                  <Checkbox checked={isDev} onChange={(_) => onIsDevChanged()} />
                </Field>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </DescriptionTemplate>
  );
}

function Keys() {
  const secretKey = useStore($secretKey);

  const onSecretRegenerate = useEvent(regenerateSecretClicked);

  return (
    <DescriptionTemplate
      description={
        <Paragraph title="Keys">Secret key you use to authorize through Accesso API</Paragraph>
      }
    >
      <Card
        footer={
          <button className="button button-dangerous" onClick={onSecretRegenerate}>
            Generate new secret
          </button>
        }
      >
        <div className={`grid grid-cols-6 gap-6`}>
          <div className="col-span-6 lg:col-span-4 space-y-4">
            <Field label="Secret key">
              <Input
                value={secretKey ?? '****************************************************'}
                readOnly
                className="font-mono bg-gray-100 text-gray-500"
              />
            </Field>
            <Note text="This key is used to authorize into your application through Accesso. It is important to keep it in safe" />
          </div>
        </div>
      </Card>
    </DescriptionTemplate>
  );
}

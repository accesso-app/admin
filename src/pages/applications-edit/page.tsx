import React from 'react';
import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { ButtonPrimary, Card, DescriptionTemplate, Field, Input, Paragraph } from "~/shared/ui";

import { Checkbox } from "~/shared/ui/atoms";
import { useEvent, useStore } from "effector-react/scope";
import { createEvent, createStore } from "effector";

export const applicationSubmitted = createEvent();
export const titleChanged = createEvent<string>();
export const redirectUriChanged = createEvent<string[]>();
export const allowedRegChanged = createEvent<void>();
export const isDevChanged = createEvent<void>();

export const $id = createStore('');
export const $title = createStore('');
export const $redirectUri = createStore<string[]>([]);
export const $allowedRegistrations = createStore(false);
export const $isDev = createStore(false);

export function ApplicationsEditPage() {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Edit application">
        <ApplicationView/>
      </StackedTemplate>
    </NavigationTemplate>
  );
}

function ApplicationView() {
  return (
    <div className="space-y-10 sm:space-y-0">
      <GeneralInfo/>
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
  const onAllowedRegChanged = useEvent(allowedRegChanged);
  const onIsDevChanged = useEvent(isDevChanged);

  return (
    <DescriptionTemplate
      description={
        <Paragraph title="General">
          Contains general information about connected app
        </Paragraph>
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
                  <Input value={id} readOnly className="font-mono bg-gray-100 text-gray-500"/>
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Title">
                  <Input value={title}
                         onChange={(event) => onTitleChanged(event.currentTarget.value)}
                  />
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="List of allowed redirect uri">
                  <Input value={redirectUri.join(',')}
                         onChange={event => onRedirectUriChanged(event?.currentTarget.value.split(','))}/>
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Allow registrations">
                  <Checkbox defaultChecked={allowedRegistrations}
                            onChange={_ => onAllowedRegChanged()}/>
                </Field>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <Field label="Is Dev">
                  <Checkbox checked={isDev}
                            onChange={_ => onIsDevChanged()}/>
                </Field>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </DescriptionTemplate>
  );
}

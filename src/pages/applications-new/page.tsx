import React from 'react';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';

export function ApplicationsNewPage() {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Make a new application">Demo</StackedTemplate>
    </NavigationTemplate>
  );
}

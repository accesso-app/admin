import React from 'react';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';

export function DashboardPage() {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Dashboard">
        <h2 className="text-md leading-6 font-medium">Hi</h2>
      </StackedTemplate>
    </NavigationTemplate>
  );
}
